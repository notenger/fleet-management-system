package dev.notenger.simulation.device;

import com.anylogic.engine.Point;
import com.notenger.model.SimulationClient;
import dev.notenger.clients.device.DeviceDTO;
import dev.notenger.clients.device.exception.DeviceNotFoundException;
import dev.notenger.clients.vehicle.exception.VehicleNotFoundException;
import dev.notenger.simulation.place.Place;
import dev.notenger.simulation.place.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Slf4j
@RequiredArgsConstructor
@Service
public class DeviceService {

    private final SimulationClient simulationClient;
    private final PlaceService placeService;
    private final DeviceDTOMapper deviceDTOMapper;

    public Device registerDevice(String serialNumber, Double averageSpeed) {
        Device device = Device.builder()
                .serialNumber(serialNumber)
                .averageSpeed(averageSpeed)
                .build();
        simulationClient.addDeviceAgent(device);

        return device;
    }

    public void attachDevice(Integer deviceId, String placeName) {
        Place place = placeService.getPlaceByName(placeName);
        Device device = (Device) simulationClient.findDeviceAgentById(deviceId)
                .orElseThrow(() -> new DeviceNotFoundException(
                    "device with id [%s] not found".formatted(deviceId)
                ));
        device.reset();
        device.noteUnavailable();
        device.setLastLocation(getRandomNearPoint(place.getLatitude(), place.getLongitude()));
        device.setLastVisitedPlace(place);
        device.activate();
    }

    public void detachDevice(Integer deviceId) {
        Device device = (Device) simulationClient.findDeviceAgentById(deviceId)
                .orElseThrow(() -> new VehicleNotFoundException(
                        "device with id [%s] not found".formatted(deviceId)
                ));
        device.noteAvailable();
        device.deactivate();
    }


    private Point getRandomNearPoint(double latitude, double longitude) {
        Point originalPoint = new Point().setLatLon(latitude, longitude);
        Random random = new Random();
        final double range = 0.005;
        double latOffset = -range + (random.nextDouble() * (2 * range));
        double lonOffset = -range + (random.nextDouble() * (2 * range));
        Point offset = new Point().setLatLon(latOffset, lonOffset);

        return originalPoint.add(offset);
    }

    public void deregisterDevice(Integer deviceId) {
        checkIfDeviceExistsOrThrow(deviceId);
        simulationClient.removeDeviceAgentById(deviceId);
    }

    private void checkIfDeviceExistsOrThrow(Integer deviceId) {
        if (!simulationClient.existsDeviceAgentById(deviceId)) {
            throw new DeviceNotFoundException(
                    "device with id [%s] not found".formatted(deviceId)
            );
        }
    }

    public void updateDevice(Integer deviceId, Double averageSpeed) {
        Device device = (Device) simulationClient.findDeviceAgentById(deviceId)
                                        .orElseThrow(() -> new DeviceNotFoundException(
                                            "device with id [%s] not found".formatted(deviceId)
                                        ));
        device.setAverageSpeed(averageSpeed);
    }

    public List<DeviceDTO> getAllAvailableDevices() {
        return simulationClient.findAllAvailableDeviceAgents()
                                    .stream()
                                    .map(d -> (Device) d)
                                    .map(deviceDTOMapper)
                                    .toList();
    }

    public List<DeviceDTO> getAllDevices() {
        return simulationClient.findAllDeviceAgents()
                                    .stream()
                                    .map(d -> (Device) d)
                                    .map(deviceDTOMapper)
                                    .toList();
    }

    public DeviceDTO getDevice(Integer deviceId) {
        return simulationClient.findDeviceAgentById(deviceId)
                                    .map(d -> (Device) d)
                                    .map(deviceDTOMapper)
                                    .orElseThrow(() -> new DeviceNotFoundException(
                                            "device with id [%s] not found".formatted(deviceId)
                                    ));
    }
}
