package com.neu.tasksphere.designpatterns.state;

import com.neu.tasksphere.entity.Task;

import com.neu.tasksphere.entity.Task;

public interface TaskState {
    void start(Task task);
    void hold(Task task);
    void complete(Task task);
    void review(Task task);
    void cancel(Task task);
    void reject(Task task);
}