package com.neu.tasksphere.designpatterns.decorator;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;

/**
 * @author jovinnicholas
 */
public abstract class TaskRequestDecorator implements TaskDecorator {
    private TaskDecorator taskDecorator;

    public TaskRequestDecorator(TaskDecorator taskDecorator) {
        this.taskDecorator = taskDecorator;
    }

    @Override
    public void setPriority(TaskPriority priority) {
        taskDecorator.setPriority(priority);
    }

    @Override
    public void setStatus(TaskStatus status) {
        taskDecorator.setStatus(status);
    }
}
