package dev.notenger.simulation.device;

import dev.notenger.clients.device.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("api/v1/devices")
@RequiredArgsConstructor
@RestController
public class DeviceController {

    private final DeviceService deviceService;

    @PostMapping
    public void registerDevice(@RequestBody RegisterDeviceRequest request) {
        log.info("registering device {}", request);
        Device device = deviceService.registerDevice(request.serialNumber(), request.averageSpeed());
    }

    @GetMapping
    public List<DeviceDTO> getDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("available")
    public List<DeviceDTO> getAvailableDevices() {
        log.info("requested available devices {}", deviceService.getAllAvailableDevices());
        return deviceService.getAllAvailableDevices();
    }

    @GetMapping("{deviceId}")
    public DeviceDTO getDevice(@PathVariable("deviceId") Integer deviceId) {
        return deviceService.getDevice(deviceId);
    }

    @PutMapping("{deviceId}")
    public void updateDevice(@PathVariable("deviceId") Integer deviceId, @RequestBody UpdateDeviceRequest request) {
        log.info("requested averageSpeed is " + request.averageSpeed());
        deviceService.updateDevice(deviceId, request.averageSpeed());
    }

    @PutMapping("attach/{deviceId}")
    public void attachDevice(@PathVariable("deviceId") Integer deviceId, @RequestBody AttachDeviceRequest request) {
        log.info("attaching device {} for place {}", deviceId, request.placeName());
        deviceService.attachDevice(deviceId, request.placeName());
    }

    @PutMapping("detach/{deviceId}")
    public void detachDevice(@PathVariable("deviceId") Integer deviceId) {
        log.info("detaching device {}", deviceId);
        deviceService.detachDevice(deviceId);
    }

    @DeleteMapping("{deviceId}")
    public void deregisterDevice(@PathVariable("deviceId") Integer deviceId) {
        deviceService.deregisterDevice(deviceId);
    }

}