package com.neu.tasksphere.entity.enums;

public enum TaskStatus {
    Open("The task is open and ready for the assignee to start work on it"),
    InProgress("This task is being actively worked on at the moment by the assignee"),
    OnHold("This task is kept on hold at the moment by the assignee"),
    Done("Work has finished on the task"),
    InReview("The assignee has carried out the work needed on the task, and needs peer review before being considered done"),
    Cancelled("Work has stopped on the task and the task is considered done"),
    Rejected("A reviewer has rejected the work completed on the task and the task is considered done");

    private final String description;

    private TaskStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
