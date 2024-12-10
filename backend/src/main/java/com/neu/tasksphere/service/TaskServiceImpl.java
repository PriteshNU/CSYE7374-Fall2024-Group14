package com.neu.tasksphere.service;

import com.neu.tasksphere.designpatterns.builder.TaskBuilder;
import com.neu.tasksphere.designpatterns.decorator.LoggingDecorator;
import com.neu.tasksphere.designpatterns.decorator.NotificationDecorator;
import com.neu.tasksphere.designpatterns.decorator.TaskDecorator;
import com.neu.tasksphere.designpatterns.factory.TaskDTOFactory;
import com.neu.tasksphere.designpatterns.state.TaskState;
import com.neu.tasksphere.designpatterns.strategy.TaskFilteringStrategy;
import com.neu.tasksphere.designpatterns.strategy.TaskSortingStrategy;
import com.neu.tasksphere.designpatterns.strategy.TaskStrategyResolver;
import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.TaskEvent;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.TaskDTO;
import com.neu.tasksphere.model.payload.request.TaskRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.repository.ProjectRepository;
import com.neu.tasksphere.repository.TaskRepository;
import com.neu.tasksphere.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskStrategyResolver taskStrategyResolver;
    private final TaskNotificationService notificationService;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            UserRepository userRepository,
            ProjectRepository projectRepository,
            TaskStrategyResolver taskStrategyResolver,
            TaskNotificationService notificationService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.taskStrategyResolver = taskStrategyResolver;
        this.notificationService = notificationService;
    }

    public ResponseEntity<TaskDTO> getTaskDetail(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", id));

        return ResponseEntity.ok(mapToTaskDTO(task));
    }

    public ResponseEntity<PagedResponse<TaskDTO>> getAllTasks(
            int page, int size,
            Integer userId, Integer projectId,
            TaskPriority priority, TaskStatus status,
            String sortBy, String filterBy) {

        Page<Task> tasks;
        Pageable pageable = PageRequest.of(page, size);

        if (userId != null && userId > 0 && projectId != null && projectId > 0) {
            tasks = taskRepository.findByAssigneeIdAndProjectId(userId, projectId, pageable);
        } else if (userId != null && userId > 0) {
            tasks = taskRepository.findByAssigneeId(userId, pageable);
        } else if (projectId != null && projectId > 0) {
            tasks = taskRepository.findByProjectId(projectId, pageable);
        } else {
            tasks = taskRepository.findAll(pageable);
        }

        Stream<Task> taskStream = tasks.stream();

        // Apply filtering
        if (filterBy != null && !filterBy.isEmpty()) {
            TaskFilteringStrategy filteringStrategy = taskStrategyResolver.getFilteringStrategy(filterBy, status, priority);
            taskStream = filteringStrategy.filterTasks(taskStream);
        }

        // Apply sorting
        if (sortBy == null || sortBy.isEmpty()) {
            sortBy = "priority";
        }
        TaskSortingStrategy sortingStrategy = taskStrategyResolver.getSortingStrategy(sortBy);
        taskStream = sortingStrategy.sortTasks(taskStream);

        // Convert to DTOs
        List<TaskDTO> taskDTOList = taskStream
                .map(this::mapToTaskDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new PagedResponse<>(
                taskDTOList,
                tasks.getNumber(),
                tasks.getSize(),
                tasks.getTotalElements(),
                tasks.getTotalPages(),
                tasks.isLast())
        );
    }

    public ResponseEntity<TaskDTO> createTask(TaskRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", request.getProjectId()));

        //Fetch the assignee if provided
        User assignee = null;
        if (request.getAssigneeId() > 0) {
            assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getAssigneeId()));
        }

        Task task = new TaskBuilder()
                .setName(request.getName())
                .setDescription(request.getDescription())
                .setDeadline(request.getDeadline())
                .setPriority(request.getPriority())
                .setStatus(request.getStatus())
                .setProject(project)
                .setAssignee(assignee)
                .build();

        taskRepository.save(task);

        // Notify observers
        notificationService.notifyObservers(new TaskEvent(task, "TaskCreated"));

        return ResponseEntity.ok(mapToTaskDTO(task));
    }

    public ResponseEntity<TaskDTO> updateTask(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

        boolean isDeadlineUpdated = request.getDeadline() != null && request.getDeadline() != task.getDeadline();

        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());

        if (request.getAssigneeId() > 0) {
            User user = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getAssigneeId()));

            task.setAssignee(user);
        }

        taskRepository.save(task);

        // Notify observers
        notificationService.notifyObservers(new TaskEvent(task, "TaskUpdated"));

        if (isDeadlineUpdated) {
            notificationService.notifyObservers(new TaskEvent(task, "TaskDeadlineUpdated"));
        }

        return ResponseEntity.ok(mapToTaskDTO(task));
    }

    public ResponseEntity<ApiResponse> deleteTask(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", id));

        taskRepository.delete(task);

        // Notify observers
        notificationService.notifyObservers(new TaskEvent(task, "TaskDeleted"));

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task deleted successfully"));
    }

    public ResponseEntity<ApiResponse> assignTask(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

        User user = userRepository.findById(request.getAssigneeId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getAssigneeId()));

        task.setAssignee(user);
        taskRepository.save(task);

        // Notify observers
        notificationService.notifyObservers(new TaskEvent(task, "TaskAssigned"));

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task assigned to user successfully"));
    }

    public ResponseEntity<ApiResponse> changeTaskPriority(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

        task.setPriority(request.getPriority());
        taskRepository.save(task);

        TaskDecorator decoratedTask = new LoggingDecorator(new NotificationDecorator(request));
        decoratedTask.setPriority(request.getPriority());

        // Notify observers
        notificationService.notifyObservers(new TaskEvent(task, "TaskPriorityChanged"));

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task priority changed successfully"));
    }
    
public ResponseEntity<ApiResponse> changeTaskStatus(TaskRequest request) {
    // Fetch the task from the repository
    Task task = taskRepository.findById(request.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

    // Current and requested states
    TaskState currentState = task.getState();
    TaskStatus requestedStatus = request.getStatus();

    System.out.println("Current State: " + currentState.getClass().getSimpleName());
    System.out.println("Requested State: " + requestedStatus);

    try {
        // If the requested state matches the current state, no action needed
        if (task.getStatus().equals(requestedStatus)) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Task is already in the requested state."));
        }

        // Handle transitions explicitly
        if (requestedStatus == TaskStatus.OnHold) {
            // Pause the task if transitioning to OnHold
            currentState.pause(task);
        } else if (isForwardTransition(task.getStatus(), requestedStatus)) {
            // Transition to the next state
            currentState.next(task);
        } else if (isBackwardTransition(task.getStatus(), requestedStatus)) {
            // Transition to the previous state
            currentState.prev(task);
        } else {
            throw new IllegalArgumentException("Invalid state transition.");
        }

        // Save the updated task
        taskRepository.save(task);

        return ResponseEntity.ok(new ApiResponse(true, "Task state updated successfully."));
    } catch (UnsupportedOperationException | IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Error during state transition: " + e.getMessage()));
    }
}

    // Helper methods to validate transition direction
    private boolean isForwardTransition(TaskStatus currentStatus, TaskStatus requestedStatus) {
        return requestedStatus.ordinal() > currentStatus.ordinal();
    }

    private boolean isBackwardTransition(TaskStatus currentStatus, TaskStatus requestedStatus) {
        return requestedStatus.ordinal() < currentStatus.ordinal();
    }

    private TaskDTO mapToTaskDTO(Task task) {
        return TaskDTOFactory.getInstance().getObject(task);
    }
}
