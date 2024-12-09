package com.neu.tasksphere.designpatterns.decorator;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;

/**
 * @author jovinnicholas
 */
public interface TaskDecorator {
    void setPriority(TaskPriority priority);
    void setStatus(TaskStatus status);
}

