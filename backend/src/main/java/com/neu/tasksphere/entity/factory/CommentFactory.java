package com.neu.tasksphere.entity.factory;

import com.neu.tasksphere.entity.Comment;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.User;

public enum CommentFactory {

    INSTANCE {
        @Override
        public Comment createComment(User user, Task task, String comment) {
            return new Comment(user, task, comment);
        }
    };

    public abstract Comment createComment(User user, Task task, String comment);
}
