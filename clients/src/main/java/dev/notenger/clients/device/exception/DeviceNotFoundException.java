package dev.notenger.clients.device.exception;

import dev.notenger.clients.config.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class DeviceNotFoundException extends ResourceNotFoundException {
    public DeviceNotFoundException(String message) {
        super(message);
    }
}
