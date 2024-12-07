package com.neu.tasksphere.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task implements Comparable<Task> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
    private String description;
    private Date deadline;
    @Column(nullable = false)
    private Date createdAt;
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User assignee;

    @JsonIgnore
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public Task(
            String name,
            String description,
            Date deadline,
            TaskPriority priority,
            TaskStatus status,
            Project project) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.status = status;
        this.project = project;
    }

    public Task() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Date getDeadline() {
        return this.deadline;
    }

    public TaskPriority getPriority() {
        return this.priority;
    }

    public TaskStatus getStatus() {
        return this.status;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public Project getProject() {
        return this.project;
    }

    public User getAssignee() {
        return this.assignee;
    }

    public List<Comment> getComments() {
        return comments == null ? null : new ArrayList<>(comments);
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setAssignee() {
        this.project = project;
    }

    public void setAssignee(User user) {
        this.assignee = user;
    }

    public String toString() {
        return "Task(id=" + this.getId() +
                ", name=" + this.getName() +
                ", description=" + this.getDescription() +
                ", deadline=" + this.getDeadline() +
                ", priority=" + this.getPriority() +
                ", status=" + this.getStatus() +
                ", createdAt=" + this.getCreatedAt() + ")";
    }

    @Override
    public int compareTo(Task o) {
        return Integer.compare(this.getPriority().getPriority(), o.getPriority().getPriority());
    }
}
