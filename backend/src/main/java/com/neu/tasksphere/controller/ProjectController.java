package com.neu.tasksphere.controller;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.service.ProjectService;
import com.neu.tasksphere.service.UserProjectService;
import com.neu.tasksphere.service.UserProjectServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserProjectService userProjectService;

    public ProjectController(ProjectService projectService, UserProjectServiceImpl userProjectService) {

        this.projectService = projectService;
        this.userProjectService = userProjectService;
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable("id") Integer id) {
        return projectService.getProject(id);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<ProjectDTO>> getAllProjects(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "userId", required = false) Integer userId) {

        return projectService.getAllProjects(page, size, userId);
    }

    @PostMapping("/create")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectRequest request) {
        return projectService.createProject(request);
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectRequest request) {
        return projectService.updateProject(request);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> deleteProject(@PathVariable("id") Integer id) {
        return projectService.deleteProject(id);
    }

    @PostMapping("/assign")
    public ResponseEntity<ApiResponse> assignProject(@RequestBody ProjectRequest request) {
        return userProjectService.assignProject(request);
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<UserDTO>> getAllUsersByProject(@PathVariable("id") Integer id) {
        return userProjectService.getAllUsersByProject(id);
    }

    @PostMapping("/export")
    public ResponseEntity<List<ProjectDTO>> exportProject() {
        return projectService.exportProject();
    }

    @PostMapping("/import")
    public ResponseEntity<List<ProjectDTO>> importProject(@RequestParam("file") MultipartFile multipartFile) {
        return projectService.importProject(multipartFile);
    }
}