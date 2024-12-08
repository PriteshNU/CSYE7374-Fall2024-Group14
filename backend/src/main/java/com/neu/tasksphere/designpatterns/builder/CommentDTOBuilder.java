package com.neu.tasksphere.designpatterns.builder;

import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.UserDTO;

import java.util.Date;

public class CommentDTOBuilder {
    private final CommentDTO commentDTO;

    public CommentDTOBuilder() {
        this.commentDTO = new CommentDTO();
    }

    public CommentDTOBuilder withId(Integer id) {
        commentDTO.setId(id);
        return this;
    }

    public CommentDTOBuilder withComment(String comment) {
        commentDTO.setComment(comment);
        return this;
    }

    public CommentDTOBuilder withCreatedAt(Date createdAt) {
        commentDTO.setCreatedAt(createdAt);
        return this;
    }

    public CommentDTOBuilder withUser(UserDTO user) {
        commentDTO.setUser(user);
        return this;
    }

    public CommentDTO build() {
        return commentDTO;
    }
}

