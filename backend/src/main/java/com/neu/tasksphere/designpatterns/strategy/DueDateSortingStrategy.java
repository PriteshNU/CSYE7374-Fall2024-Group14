package com.neu.tasksphere.designpatterns.strategy;

import com.neu.tasksphere.entity.Task;

import java.util.Comparator;
import java.util.stream.Stream;

public class DueDateSortingStrategy implements TaskSortingStrategy {
    @Override
    public Stream<Task> sortTasks(Stream<Task> tasks) {
        return tasks.sorted(Comparator.comparing(Task::getDeadline));
    }
}
