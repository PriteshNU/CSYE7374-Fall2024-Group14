package com.neu.tasksphere.designpatterns.strategy;

import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskPriority;

import java.util.stream.Stream;

public class PriorityFilteringStrategy implements TaskFilteringStrategy {
    private final TaskPriority priority;

    public PriorityFilteringStrategy(TaskPriority priority) {
        this.priority = priority;
    }

    @Override
    public Stream<Task> filterTasks(Stream<Task> tasks) {
        return tasks.filter(task -> task.getPriority().equals(priority));
    }
}
