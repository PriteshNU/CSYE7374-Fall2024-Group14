package com.neu.tasksphere.designpatterns.factory;

import com.neu.tasksphere.designpatterns.builder.CommentDTOBuilder;
import com.neu.tasksphere.entity.Comment;
import com.neu.tasksphere.model.CommentDTO;

public class CommentDTOFactory {
    private static final CommentDTOFactory INSTANCE = new CommentDTOFactory();

    private CommentDTOFactory() {
    }

    public static CommentDTOFactory getInstance() {
        return INSTANCE;
    }

    public CommentDTO getObject(Comment comment) {
        return new CommentDTOBuilder()
                .withId(comment.getId())
                .withComment(comment.getComment())
                .withCreatedAt(comment.getCreatedAt())
                .withUser(UserDTOFactory.getInstance().getObject(comment.getUser()))
                .build();
    }
}
