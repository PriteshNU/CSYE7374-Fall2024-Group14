package com.neu.tasksphere.entity;

import com.neu.tasksphere.designpatterns.state.*;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public User assignee;

    @JsonIgnore
    @OneToMany(mappedBy = "task", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Transient
    private TaskState state;
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
        this.state = OpenState.getInstance();
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

    public void setAssignee(User user) {
        this.assignee = user;
    }
    public void setState(TaskState state) {
        this.state = state;
        System.out.println("Task state transitioned to: " + state.getClass().getSimpleName());

    }

    public TaskState getState() {
        return state;
    }

    public void start() {
        state.start(this);
    }

    public void hold() {
        state.hold(this);
    }

    public void complete() {
        state.complete(this);
    }

    public void review() {
        state.review(this);
    }

    public void cancel() {
        state.cancel(this);
    }

    public void reject() {
        state.reject(this);
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
    @PostLoad
    public void initializeState() {
        switch (this.status) {
            case Open:
                this.state = OpenState.getInstance();
                break;
            case InProgress:
                this.state = InProgressState.getInstance();
                break;
            case Done:
                this.state = DoneState.getInstance();
                break;
            case OnHold:
                this.state = OnHoldState.getInstance();
                break;
            case InReview:
                this.state = InReviewState.getInstance();
                break;
            case Cancelled:
                this.state = CancelledState.getInstance();
                break;
            case Rejected:
                this.state = RejectedState.getInstance();
                break;
            default:
                throw new IllegalStateException("Unknown TaskStatus: " + this.status);
        }
    }
}
