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
    public void next(Task task) {
        throw new UnsupportedOperationException("Task is already cancelled.");
    }

    public void pause(Task task) {
        throw new UnsupportedOperationException("Task is already completed.");
    }
    @Override
    public void prev(Task task) {
        throw new UnsupportedOperationException("Task is already cancelled.");
    }
}