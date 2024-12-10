package com.neu.tasksphere.designpatterns.state;

import com.neu.tasksphere.entity.Task;

import com.neu.tasksphere.entity.Task;

public interface TaskState {
public void next(Task task);
public void pause(Task task);
public void prev(Task task);

}