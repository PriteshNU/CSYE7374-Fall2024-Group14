package com.neu.tasksphere.designpatterns.strategy;

import com.neu.tasksphere.entity.Task;

import java.util.stream.Stream;

public interface TaskSortingStrategy {
    Stream<Task> sortTasks(Stream<Task> tasks);
}
