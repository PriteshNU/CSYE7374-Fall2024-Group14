package com.neu.tasksphere.model;

import java.util.Date;

public class CommentDTO {
    private Integer id;
    private UserDTO user;
    private Date createdAt;
    private String comment;

    public CommentDTO(Integer id, String comment, Date createdAt) {
        this.id = id;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public CommentDTO() {
    }

    public Integer getId() {
        return this.id;
    }

    public UserDTO getUser() {
        return this.user;
    }

    public String getComment() {
        return this.comment;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
