package com.neu.tasksphere.controller;

import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.payload.request.CommentRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<CommentDTO>> getAllComments(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size) {

        return commentService.getAllComments(page, size);
    }

    @PostMapping("/add")
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentRequest request) {
        return commentService.addComment(request);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable("id") Integer id) {
        return commentService.deleteComment(id);
    }
}