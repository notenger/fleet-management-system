package dev.notenger.telematics;

import dev.notenger.telematics.messaging.GeolocationDTO;
import dev.notenger.telematics.messaging.TelemetryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TelematicsService {

    private final MongoTemplate mongoTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    public void send(Telemetry telemetry) {
        mongoTemplate.insert(telemetry);
        GeolocationDTO geolocationDTO = new GeolocationDTO(
                                                telemetry.getDeviceId(),
                                                telemetry.getVehicleId(),
                                                telemetry.getLatitude(),
                                                telemetry.getLongitude(),
                                                telemetry.getHeading(),
                                                telemetry.getPathData());
        messagingTemplate.convertAndSend("/telematics/geolocation", geolocationDTO);
    }

    @Scheduled(fixedRate = 3_000)
    public void pushAggregatedData() {
        TelemetryDTO telemetryDTO = getDeviceTelemetrySummary();
        messagingTemplate.convertAndSend("/telematics/telemetry", telemetryDTO);
    }

    private TelemetryDTO getDeviceTelemetrySummary() {
        List<Telemetry> telemetryList = mongoTemplate.findAll(Telemetry.class);
        Map<Integer, Telemetry> latestTelemetryByDeviceId = telemetryList.stream()
                .collect(Collectors.toMap(Telemetry::getDeviceId, Function.identity(), BinaryOperator.maxBy(Comparator.comparingDouble(Telemetry::getTimestamp))));
        // todo: discard too old records
        double totalAverageSpeed = latestTelemetryByDeviceId.values().stream()
                .mapToDouble(Telemetry::getSpeedometer)
                .average()
                .orElse(0);

        double totalAverageOdometer = latestTelemetryByDeviceId.values().stream()
                .mapToDouble(Telemetry::getOdometer)
                .average()
                .orElse(0);

        double totalAverageFuelGauge = latestTelemetryByDeviceId.values().stream()
                .mapToDouble(Telemetry::getFuelGauge)
                .average()
                .orElse(0);

        return new TelemetryDTO(totalAverageSpeed, totalAverageOdometer, totalAverageFuelGauge);
    }

    public Double getLastOdometerReadingByDeviceId(Integer deviceId) {
        List<Telemetry> telemetryList = mongoTemplate.findAll(Telemetry.class);

        Telemetry telemetry = telemetryList.stream()
                .filter(telemetry1 -> Objects.equals(telemetry1.getDeviceId(), deviceId))
                .max(Comparator.comparingDouble(Telemetry::getTimestamp))
                .orElseThrow(null);

        return telemetry.getOdometer();
    }

}
