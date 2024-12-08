package com.neu.tasksphere.designpatterns.strategy;

import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

import java.util.stream.Stream;

public class StatusFilteringStrategy implements TaskFilteringStrategy {
    private final TaskStatus status;

    public StatusFilteringStrategy(TaskStatus status) {
        this.status = status;
    }

    @Override
    public Stream<Task> filterTasks(Stream<Task> tasks) {
        return tasks.filter(task -> task.getStatus().equals(status));
    }
}
