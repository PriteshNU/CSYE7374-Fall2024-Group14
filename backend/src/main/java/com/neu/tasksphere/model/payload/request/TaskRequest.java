package com.neu.tasksphere.model.payload.request;

import com.neu.tasksphere.designpatterns.decorator.TaskDecorator;
import com.neu.tasksphere.model.TaskDTO;

public class TaskRequest extends TaskDTO implements TaskDecorator {
    private Integer projectId;
    private Integer assigneeId;

    public Integer getProjectId() {
        return this.projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getAssigneeId() {
        return this.assigneeId;
    }

    public void setAssigneeId(Integer assigneeId) {
        this.assigneeId = assigneeId;
    }
}
