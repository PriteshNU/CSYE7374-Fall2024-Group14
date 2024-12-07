package com.neu.tasksphere.service;

import com.neu.tasksphere.model.payload.request.AuthenticationRequest;
import com.neu.tasksphere.model.payload.response.AuthenticationResponse;
import com.neu.tasksphere.model.payload.request.RegisterRequest;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    ResponseEntity<?> register(RegisterRequest request);

    ResponseEntity<AuthenticationResponse> login(AuthenticationRequest request);
}