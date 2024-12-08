package com.neu.tasksphere.designpatterns.builder;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;

import java.util.Date;

public class TaskBuilder {
    private String name;
    private String description;
    private Date deadline;
    private TaskPriority priority;
    private TaskStatus status;
    private Project project;
    private User assignee;

    // Builder methods for setting fields
    public TaskBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public TaskBuilder setDescription(String description) {
        this.description = description;
        return this;
    }

    public TaskBuilder setDeadline(Date deadline) {
        this.deadline = deadline;
        return this;
    }

    public TaskBuilder setPriority(TaskPriority priority) {
        this.priority = priority;
        return this;
    }

    public TaskBuilder setStatus(TaskStatus status) {
        this.status = status;
        return this;
    }

    public TaskBuilder setProject(Project project) {
        this.project = project;
        return this;
    }

    public TaskBuilder setAssignee(User assignee) {
        this.assignee = assignee;
        return this;
    }

    public Task build() {
        if (name == null || project == null || priority == null || status == null) {
            throw new IllegalStateException("Required fields are missing: name, project, priority, or status.");
        }
        Task task = new Task(name, description, deadline, priority, status, project);
        task.setAssignee(assignee);
        return task;
    }
}
