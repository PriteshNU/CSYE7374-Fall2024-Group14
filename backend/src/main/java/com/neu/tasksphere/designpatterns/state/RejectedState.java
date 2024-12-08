package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;

public class RejectedState implements TaskState {
    private static final RejectedState instance = new RejectedState();
    private RejectedState() {}
    public static RejectedState getInstance() {
        return instance;
    }

    @Override
    public void start(Task task) {
        throw new UnsupportedOperationException("Rejected tasks cannot be restarted.");
    }

    @Override
    public void hold(Task task) {
        throw new UnsupportedOperationException("Rejected tasks cannot be put on hold.");
    }

    @Override
    public void complete(Task task) {
        throw new UnsupportedOperationException("Rejected tasks cannot be completed.");
    }

    @Override
    public void review(Task task) {
        throw new UnsupportedOperationException("Rejected tasks cannot be reviewed.");
    }

    @Override
    public void cancel(Task task) {
        throw new UnsupportedOperationException("Rejected tasks cannot be cancelled.");
    }

    @Override
    public void reject(Task task) {
        throw new UnsupportedOperationException("Task is already rejected.");
    }
}