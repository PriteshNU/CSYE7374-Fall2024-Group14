package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class InReviewState implements TaskState {
    private static final InReviewState instance = new InReviewState();
    private InReviewState() {}
    public static InReviewState getInstance() {
        return instance;
    }

    @Override
    public void start(Task task) {
        throw new UnsupportedOperationException("Task cannot be restarted during review.");
    }

    @Override
    public void hold(Task task) {
        throw new UnsupportedOperationException("Task cannot be put on hold during review.");
    }

    @Override
    public void complete(Task task) {
        task.setStatus(TaskStatus.Done);
    }

    @Override
    public void review(Task task) {
        throw new UnsupportedOperationException("Task is already under review.");
    }

    @Override
    public void cancel(Task task) {
        throw new UnsupportedOperationException("Task cannot be cancelled during review.");
    }

    @Override
    public void reject(Task task) {
        task.setStatus(TaskStatus.Rejected);
    }
}