package com.neu.tasksphere.model.payload.request;

import com.neu.tasksphere.model.TaskDTO;

public class TaskRequest extends TaskDTO {
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
