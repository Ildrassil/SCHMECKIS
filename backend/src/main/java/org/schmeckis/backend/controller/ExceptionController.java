package org.schmeckis.backend.controller;

import org.schmeckis.backend.model.dto.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage globalIllegalArgumentExceptionHandler(IllegalArgumentException exception) {
        return new ErrorMessage(exception.getMessage());
    }

    @ExceptionHandler({NoSuchElementException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage globalNoSuchElementExceptionHandler(NoSuchElementException exception) {
        return new ErrorMessage(exception.getMessage());
    }


}
