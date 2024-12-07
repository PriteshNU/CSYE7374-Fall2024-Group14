package com.neu.tasksphere.service;

import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserProjectService {
    ResponseEntity<ApiResponse> assignProject(ProjectRequest request);

    ResponseEntity<List<UserDTO>> getAllUsersByProject(Integer projectId);

    List<ProjectDTO> getAllProjectsByUser(Integer userId);
}
