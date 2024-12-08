package com.neu.tasksphere.designpatterns.builder;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.TaskDTO;
import com.neu.tasksphere.model.UserDTO;

import java.util.Date;
import java.util.List;

public class TaskDTOBuilder {
    private final TaskDTO taskDTO;

    public TaskDTOBuilder() {
        this.taskDTO = new TaskDTO();
    }

    public TaskDTOBuilder withId(Integer id) {
        taskDTO.setId(id);
        return this;
    }

    public TaskDTOBuilder withName(String name) {
        taskDTO.setName(name);
        return this;
    }

    public TaskDTOBuilder withDescription(String description) {
        taskDTO.setDescription(description);
        return this;
    }

    public TaskDTOBuilder withDeadline(Date deadline) {
        taskDTO.setDeadline(deadline);
        return this;
    }

    public TaskDTOBuilder withPriority(TaskPriority priority) {
        taskDTO.setPriority(priority);
        return this;
    }

    public TaskDTOBuilder withStatus(TaskStatus status) {
        taskDTO.setStatus(status);
        return this;
    }

    public TaskDTOBuilder withAssignee(UserDTO assignee) {
        taskDTO.setAssignee(assignee);
        return this;
    }

    public TaskDTOBuilder withComments(List<CommentDTO> comments) {
        taskDTO.setComments(comments);
        return this;
    }

    public TaskDTO build() {
        return taskDTO;
    }
}
