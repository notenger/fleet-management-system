package dev.notenger.clients.place.exception;

import dev.notenger.clients.config.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class PlaceNotFoundException extends ResourceNotFoundException {
    public PlaceNotFoundException(String message) {
        super(message);
    }
}
