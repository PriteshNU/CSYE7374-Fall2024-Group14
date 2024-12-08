package com.neu.tasksphere.designpatterns.observer;

import com.neu.tasksphere.entity.TaskEvent;

public interface TaskObserver {
    void update(TaskEvent event);
}
