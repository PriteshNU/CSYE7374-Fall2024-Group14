package com.neu.tasksphere.exception;

import com.neu.tasksphere.model.payload.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

    private ApiResponse apiResponse;

    private String message;

    public UnauthorizedException(String message) {
        super(message);
        this.message = message;
        this.setApiResponse();
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }

    public void setApiResponse(ApiResponse apiResponse) {
        this.apiResponse = apiResponse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ApiResponse getApiResponse() {
        return apiResponse;
    }

    private void setApiResponse() {
        apiResponse = new ApiResponse(Boolean.FALSE, message);
    }
}