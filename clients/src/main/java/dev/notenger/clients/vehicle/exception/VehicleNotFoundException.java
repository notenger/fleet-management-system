package dev.notenger.clients.vehicle.exception;

import dev.notenger.clients.config.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class VehicleNotFoundException extends ResourceNotFoundException {

    public VehicleNotFoundException(String message) {
        super(message);
    }
}
