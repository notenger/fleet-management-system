package dev.notenger.clients.device;

import dev.notenger.clients.LoadBalancerConfiguration;
import dev.notenger.clients.config.CustomErrorDecoder;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(
        name = "${clients.device.name}",
        path = "api/v1/devices",
        configuration = CustomErrorDecoder.class
)
//@LoadBalancerClient(name = "simulation", configuration = LoadBalancerConfiguration.class)
public interface DeviceClient {

    @PostMapping
    void registerDevice(@RequestBody RegisterDeviceRequest request);

    @GetMapping
    List<DeviceDTO> getDevices();

    @GetMapping("available")
    List<DeviceDTO> getAvailableDevices();

    @GetMapping("{deviceId}")
    DeviceDTO getDevice(@PathVariable("deviceId") Integer deviceId);

    @PutMapping("{deviceId}")
    void updateDevice(@PathVariable("deviceId") Integer deviceId, @RequestBody UpdateDeviceRequest request);

    @PutMapping("attach/{deviceId}")
    void attachDevice(@PathVariable("deviceId") Integer deviceId, @RequestBody AttachDeviceRequest request);

    @PutMapping("detach/{deviceId}")
    void detachDevice(@PathVariable("deviceId") Integer deviceId);

    @DeleteMapping("{deviceId}")
    void deregisterDevice(@PathVariable("deviceId") Integer deviceId);
}
