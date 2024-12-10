package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class OpenState implements TaskState {
    private static final OpenState instance = new OpenState();
    private OpenState() {}
    public static OpenState getInstance() {
        return instance;
    }
    @Override
    public void next(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
    }
    @Override
    public void pause(Task task) {
        throw new UnsupportedOperationException("Task is not yet started.");
    }
    @Override
    public void prev(Task task) {
        throw new UnsupportedOperationException("Task is not yet started.");
    }

}