package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import com.neu.tasksphere.model.TaskDTO;
import com.neu.tasksphere.model.payload.request.TaskRequest;
import com.neu.tasksphere.model.payload.request.UserRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import org.springframework.http.ResponseEntity;

public interface TaskService {
    ResponseEntity<TaskDTO> getTaskDetail(Integer id);

    ResponseEntity<PagedResponse<TaskDTO>> getAllTasks(
            int page, int size, Integer userId, Integer projectId,
            TaskPriority priority, TaskStatus status);

    ResponseEntity<TaskDTO> createTask(TaskRequest request);

    ResponseEntity<TaskDTO> updateTask(TaskRequest request);

    ResponseEntity<ApiResponse> deleteTask(Integer id);

    ResponseEntity<ApiResponse> assignTask(TaskRequest request);

    ResponseEntity<ApiResponse> changeTaskPriority(TaskRequest request);

    ResponseEntity<ApiResponse> changeTaskStatus(TaskRequest request);
}
