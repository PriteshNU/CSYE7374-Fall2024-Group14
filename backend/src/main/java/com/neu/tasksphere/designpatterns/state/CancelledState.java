package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class CancelledState implements TaskState {
    private static final CancelledState instance = new CancelledState();

    private CancelledState() {}

    public static CancelledState getInstance() {
        return instance;
    }
    @Override
    public void start(Task task) {
        throw new UnsupportedOperationException("Cancelled tasks cannot be restarted.");
    }

    @Override
    public void hold(Task task) {
        throw new UnsupportedOperationException("Cancelled tasks cannot be put on hold.");
    }

    @Override
    public void complete(Task task) {
        throw new UnsupportedOperationException("Cancelled tasks cannot be completed.");
    }

    @Override
    public void review(Task task) {
        throw new UnsupportedOperationException("Cancelled tasks cannot be reviewed.");
    }

    @Override
    public void cancel(Task task) {
        throw new UnsupportedOperationException("Task is already cancelled.");
    }

    @Override
    public void reject(Task task) {
        throw new UnsupportedOperationException("Cancelled tasks cannot be rejected.");
    }
}