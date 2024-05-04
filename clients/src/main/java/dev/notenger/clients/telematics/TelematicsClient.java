package dev.notenger.clients.telematics;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(
        name = "${clients.telematics.name}",
        url = "${clients.telematics.url}",
        path = "api/v1/telemetry"
)
public interface TelematicsClient {

    @GetMapping("last-odometer-reading/{deviceId}")
    Double getLastOdometerReading(@PathVariable("deviceId") Integer deviceId);

}
