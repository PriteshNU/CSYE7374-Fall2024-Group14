package com.neu.tasksphere.entity;

import jakarta.persistence.*;

import java.util.Comparator;
import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    @Column(name = "comment_text", nullable = false, length = 2000)
    private String comment;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public Comment(User user, Task task, String comment) {
        this.user = user;
        this.task = task;
        this.comment = comment;
    }

    public Comment() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Integer getId() {
        return this.id;
    }

    public User getUser() {
        return this.user;
    }

    public Task getTask() {
        return this.task;
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

    public void setUser(User user) {
        this.user = user;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public static class LastestCommentComparator implements Comparator<Comment> {

        @Override
        public int compare(Comment o1, Comment o2) {
            return o2.getCreatedAt().compareTo(o1.getCreatedAt());
        }
    }
}