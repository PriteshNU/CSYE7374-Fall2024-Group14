package com.neu.tasksphere.controller;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import com.neu.tasksphere.model.TaskDTO;
import com.neu.tasksphere.model.payload.request.TaskRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("{id}")
    public ResponseEntity<TaskDTO> getTaskDetail(@PathVariable("id") Integer id) {
        return taskService.getTaskDetail(id);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<TaskDTO>> getAllTasks(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "userId", required = false) Integer userId,
            @RequestParam(name = "projectId", required = false) Integer projectId,
            @RequestParam(name = "priority", required = false) TaskPriority priority,
            @RequestParam(name = "status", required = false) TaskStatus status,
            @RequestParam(name = "sortBy", required = false) String sortBy,
            @RequestParam(name = "filterBy", required = false) String filterBy) {

        return taskService.getAllTasks(page, size, userId, projectId, priority, status, sortBy, filterBy);
    }

    @PostMapping("/create")
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @PutMapping("/update")
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskRequest request) {
        return taskService.updateTask(request);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable("id") Integer id) {
        return taskService.deleteTask(id);
    }

    @PostMapping("/assign")
    public ResponseEntity<ApiResponse> assignTask(@RequestBody TaskRequest request) {
        return taskService.assignTask(request);
    }

    @PutMapping("/changePriority")
    public ResponseEntity<ApiResponse> changeTaskPriority(@RequestBody TaskRequest request) {
        return taskService.changeTaskPriority(request);
    }

    @PutMapping("/changeStatus")
    public ResponseEntity<ApiResponse> changeTaskStatus(@RequestBody TaskRequest request) {
        return taskService.changeTaskStatus(request);
    }
}
