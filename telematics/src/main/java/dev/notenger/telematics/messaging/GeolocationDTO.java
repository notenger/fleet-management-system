package dev.notenger.telematics.messaging;

import java.util.List;

public record GeolocationDTO(
        Integer deviceId,
        Integer vehicleId,
        Double latitude,
        Double longitude,
        Double heading,
        List<List<Double>> pathData) {
}
