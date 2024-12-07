package com.neu.tasksphere.model.payload.request;

public class CommentRequest {
    private Integer taskId;
    private Integer userId;
    private String comment;


    public CommentRequest(Integer taskId, Integer userId, String comment) {
        this.taskId = taskId;
        this.userId = userId;
        this.comment = comment;
    }

    public CommentRequest() {
    }

    public Integer getTaskId() {
        return this.taskId;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public String getComment() {
        return this.comment;
    }
}
