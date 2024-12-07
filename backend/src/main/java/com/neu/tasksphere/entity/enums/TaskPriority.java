package com.neu.tasksphere.entity.enums;

public enum TaskPriority {
    Lowest(4),
    Low(3),
    Medium(2),
    High(1),
    Highest(0);

    private final int priority;

    TaskPriority(int priority) {
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }

}