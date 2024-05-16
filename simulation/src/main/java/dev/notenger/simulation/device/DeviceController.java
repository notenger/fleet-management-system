package dev.notenger.simulation.device;

import dev.notenger.clients.device.AttachDeviceRequest;
import dev.notenger.clients.device.DeviceDTO;
import dev.notenger.clients.device.RegisterDeviceRequest;
import dev.notenger.clients.device.UpdateDeviceRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("api/v1/devices")
@RequiredArgsConstructor
@CrossOrigin
@RestController
public class DeviceController {

    private final DeviceService deviceService;

    @PostMapping
    public void registerDevice(@RequestBody RegisterDeviceRequest request) {
        deviceService.registerDevice(request.serialNumber(), request.averageSpeed());
    }

    @GetMapping
    public List<DeviceDTO> getDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("available")
    public List<DeviceDTO> getAvailableDevices() {
        return deviceService.getAllAvailableDevices();
    }

    @GetMapping("{deviceId}")
    public DeviceDTO getDevice(@PathVariable("deviceId") Integer deviceId) {
        return deviceService.getDevice(deviceId);
    }

    @PutMapping("{deviceId}")
    public void updateDevice(@PathVariable("deviceId") Integer deviceId, @RequestBody UpdateDeviceRequest request) {
        deviceService.updateDevice(deviceId, request.averageSpeed());
    }

    @PutMapping("attach/{deviceId}")
    public void attachDevice(@PathVariable("deviceId") Integer deviceId, @RequestBody AttachDeviceRequest request) {
        deviceService.attachDevice(deviceId, request.placeName());
    }

    @PutMapping("detach/{deviceId}")
    public void detachDevice(@PathVariable("deviceId") Integer deviceId) {
        deviceService.detachDevice(deviceId);
    }

    @DeleteMapping("{deviceId}")
    public void deregisterDevice(@PathVariable("deviceId") Integer deviceId) {
        deviceService.deregisterDevice(deviceId);
    }

}