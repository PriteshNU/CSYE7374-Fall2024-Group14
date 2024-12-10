package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class OnHoldState implements TaskState {
    private static final OnHoldState instance = new OnHoldState();
    private OnHoldState() {}
    public static OnHoldState getInstance() {
        return instance;
    }
    @Override
    public void next(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
    }

    public void pause(Task task) {
        throw new UnsupportedOperationException("Task is on hold.");
    }
    @Override
    public void prev(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
    }
}