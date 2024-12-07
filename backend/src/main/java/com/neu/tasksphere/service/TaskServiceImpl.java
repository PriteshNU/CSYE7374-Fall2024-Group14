package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.Comment;
import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.TaskDTO;
import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.factory.TaskDtoFactory;
import com.neu.tasksphere.model.payload.request.TaskRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.repository.ProjectRepository;
import com.neu.tasksphere.repository.TaskRepository;
import com.neu.tasksphere.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.relational.core.sql.In;
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

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public ResponseEntity<TaskDTO> getTaskDetail(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", id));

        return ResponseEntity.ok(mapToTaskDTO(task));
    }

    public ResponseEntity<PagedResponse<TaskDTO>> getAllTasks(
            int page, int size,
            Integer userId, Integer projectId,
            TaskPriority priority, TaskStatus status) {

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
        if (status != null) {
            taskStream = taskStream.filter(task -> task.getStatus().equals(status));
        }
        if (priority != null) {
            taskStream = taskStream.filter(task -> task.getPriority().equals(priority));
        }

        List<TaskDTO> taskDTOList = taskStream
                .sorted()
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

        Task task = new Task(
                request.getName(),
                request.getDescription(),
                request.getDeadline(),
                request.getPriority(),
                request.getStatus(),
                project
        );

        if (request.getAssigneeId() > 0) {
            User user = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getAssigneeId()));

            task.setAssignee(user);
        }

        taskRepository.save(task);

        return ResponseEntity.ok(mapToTaskDTO(task));
    }

    public ResponseEntity<TaskDTO> updateTask(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

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

        return ResponseEntity.ok(mapToTaskDTO(task));
    }

    public ResponseEntity<ApiResponse> deleteTask(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", id));

        taskRepository.delete(task);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task deleted successfully"));
    }

    public ResponseEntity<ApiResponse> assignTask(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

        User user = userRepository.findById(request.getAssigneeId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getAssigneeId()));

        task.setAssignee(user);
        taskRepository.save(task);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task assigned to user successfully"));
    }

    public ResponseEntity<ApiResponse> changeTaskPriority(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

        task.setPriority(request.getPriority());
        taskRepository.save(task);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task priority changed successfully"));
    }

    public ResponseEntity<ApiResponse> changeTaskStatus(TaskRequest request) {
        Task task = taskRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getId()));

        task.setStatus(request.getStatus());
        taskRepository.save(task);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Task status changed successfully"));
    }

    private TaskDTO mapToTaskDTO(Task task) {

        TaskDtoFactory taskDtoFactory = TaskDtoFactory.getInstance();
        TaskDTO taskDTO = taskDtoFactory.createTaskDto(
                task.getId(),
                task.getName(),
                task.getDescription(),
                task.getDeadline(),
                task.getPriority(),
                task.getStatus()
        );


        if (task.getAssignee() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(task.getAssignee().getId());
            userDTO.setFirstname(task.getAssignee().getFirstname());
            userDTO.setLastname(task.getAssignee().getLastname());
            taskDTO.setAssignee(userDTO);
        }

        if (task.getComments() != null) {
            List<CommentDTO> commentDTOList = task.getComments().stream()
                    .map(this::mapToCommentDTO)
                    .collect(Collectors.toList());

            taskDTO.setComments(commentDTOList);
        }

        return taskDTO;
    }

    private CommentDTO mapToCommentDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO(
                comment.getId(),
                comment.getComment(),
                comment.getCreatedAt()
        );

        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(comment.getUser().getUsername());
        userDTO.setFirstname(comment.getUser().getFirstname());
        userDTO.setLastname(comment.getUser().getLastname());
        commentDTO.setUser(userDTO);

        return commentDTO;
    }
}
