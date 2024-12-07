package com.neu.tasksphere.service;

import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface ProjectService {
    ResponseEntity<ProjectDTO> getProject(Integer id);

    ResponseEntity<PagedResponse<ProjectDTO>> getAllProjects(int page, int size, Integer userId);

    ResponseEntity<ProjectDTO> createProject(ProjectRequest request);

    ResponseEntity<ProjectDTO> updateProject(ProjectRequest request);

    ResponseEntity<ApiResponse> deleteProject(Integer id);

    ResponseEntity<List<ProjectDTO>> exportProject();

    ResponseEntity<List<ProjectDTO>> importProject(MultipartFile multipartFile);
}
