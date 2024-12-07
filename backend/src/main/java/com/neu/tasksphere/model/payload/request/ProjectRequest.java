package com.neu.tasksphere.model.payload.request;

import com.neu.tasksphere.model.ProjectDTO;

public class ProjectRequest extends ProjectDTO {
    private Integer assigneeId;

    public Integer getAssigneeId() {
        return this.assigneeId;
    }

    public void setAssigneeId(Integer assigneeId) {
        this.assigneeId = assigneeId;
    }
}
