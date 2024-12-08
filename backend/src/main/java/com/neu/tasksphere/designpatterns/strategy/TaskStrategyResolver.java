package com.neu.tasksphere.designpatterns.strategy;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import org.springframework.stereotype.Service;

@Service
public class TaskStrategyResolver {

    public TaskSortingStrategy getSortingStrategy(String sortBy) {
        return switch (sortBy) {
            case "dueDate" -> new DueDateSortingStrategy();
            case "priority" -> new PrioritySortingStrategy();
            default -> task -> task;
        };
    }

    public TaskFilteringStrategy getFilteringStrategy(String filterBy, TaskStatus status, TaskPriority priority) {
        return switch (filterBy) {
            case "status" -> new StatusFilteringStrategy(status);
            case "priority" -> new PriorityFilteringStrategy(priority);
            default -> task -> task;
        };
    }
}
