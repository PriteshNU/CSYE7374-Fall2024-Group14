package com.neu.tasksphere.model;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;

import java.util.Date;
import java.util.List;

public class TaskDTO {
    private Integer id;
    private String name;
    private String description;
    private Date deadline;
    private TaskPriority priority;
    private TaskStatus status;
    private UserDTO assignee;
    private List<CommentDTO> comments;

    public TaskDTO(
            Integer id,
            String name,
            String description,
            Date deadline,
            TaskPriority priority,
            TaskStatus status
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.status = status;
    }

    public TaskDTO() {
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

    public UserDTO getAssignee() {
        return this.assignee;
    }

    public List<CommentDTO> getComments() {
        return this.comments;
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

    public void setAssignee(UserDTO assignee) {
        this.assignee = assignee;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }
}
