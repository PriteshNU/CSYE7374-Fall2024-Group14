package com.neu.tasksphere.model.factory;

import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.ProjectDTO;

import java.util.Date;

public class CommentDtoFactory {
    private static CommentDtoFactory instance = null;
    private CommentDtoFactory(){

    }

    public static synchronized CommentDtoFactory getInstance(){
        if(instance == null){
            instance = new CommentDtoFactory();
        }
        return instance;
    }

    public CommentDTO createCommentDto(Integer id, String comment, Date createdAt){
        return new CommentDTO(id, comment, createdAt);
    }
}
