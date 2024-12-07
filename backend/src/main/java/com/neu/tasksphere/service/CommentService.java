package com.neu.tasksphere.service;

import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.payload.request.CommentRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import org.springframework.http.ResponseEntity;

public interface CommentService {
    ResponseEntity<PagedResponse<CommentDTO>> getAllComments(int page, int size);

    ResponseEntity<CommentDTO> addComment(CommentRequest request);

    ResponseEntity<ApiResponse> deleteComment(Integer id);
}
