package com.neu.tasksphere.designpatterns.strategy;

import com.neu.tasksphere.entity.Task;

import java.util.stream.Stream;

public interface TaskFilteringStrategy {
    Stream<Task> filterTasks(Stream<Task> tasks);
}
