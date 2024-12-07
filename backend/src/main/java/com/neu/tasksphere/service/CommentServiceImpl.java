package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.Comment;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.entity.factory.CommentFactory;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.factory.CommentDtoFactory;
import com.neu.tasksphere.model.payload.request.CommentRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.repository.CommentRepository;
import com.neu.tasksphere.repository.TaskRepository;
import com.neu.tasksphere.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public CommentServiceImpl(
            CommentRepository commentRepository,
            UserRepository userRepository,
            TaskRepository taskRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public ResponseEntity<PagedResponse<CommentDTO>> getAllComments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Comment> comments = commentRepository.findAll(pageable);

        Comment.LastestCommentComparator commentComparator = new Comment.LastestCommentComparator();

        List<CommentDTO> commentDTOList = comments.stream()
                .sorted(commentComparator)
                .map(this::mapToCommentDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new PagedResponse<>(
                commentDTOList,
                comments.getNumber(),
                comments.getSize(),
                comments.getTotalElements(),
                comments.getTotalPages(),
                comments.isLast())
        );
    }

    public ResponseEntity<CommentDTO> addComment(CommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getUserId()));

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "ID", request.getTaskId()));

        Comment comment = CommentFactory.INSTANCE.createComment(user, task, request.getComment());

        commentRepository.save(comment);

        CommentDTO commentDTO = new CommentDTO(
                comment.getId(),
                comment.getComment(),
                comment.getCreatedAt()
        );

        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        commentDTO.setUser(userDTO);

        return ResponseEntity.ok(commentDTO);
    }

    public ResponseEntity<ApiResponse> deleteComment(Integer id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "ID", id));

        commentRepository.delete(comment);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Comment deleted successfully"));
    }

    private CommentDTO mapToCommentDTO(Comment comment) {

        CommentDtoFactory commentDtoFactory = CommentDtoFactory.getInstance();
        CommentDTO commentDTO = commentDtoFactory.createCommentDto(comment.getId(),
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