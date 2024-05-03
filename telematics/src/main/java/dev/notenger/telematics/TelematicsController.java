package dev.notenger.telematics;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping(path = "api/v1/telemetry")
public class TelematicsController {

    private final TelematicsService telematicsService;

    @GetMapping("last-odometer-reading/{deviceId}")
    public Double getLastOdometerReading(@PathVariable("deviceId") Integer deviceId) {
        return telematicsService.getLastOdometerReadingByDeviceId(deviceId);
    }
}
