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
    public void start(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
        System.out.println("Task transitioned from Open to InProgress.");
    }

    @Override
    public void hold(Task task) {
        throw new UnsupportedOperationException("Task cannot be put on hold from Open state.");
    }

    @Override
    public void complete(Task task) {
        throw new UnsupportedOperationException("Task cannot be completed from Open state.");
    }

    @Override
    public void review(Task task) {
        throw new UnsupportedOperationException("Task cannot be reviewed from Open state.");
    }

    @Override
    public void cancel(Task task) {

        task.setStatus(TaskStatus.Cancelled);
        task.setState(CancelledState.getInstance());
    }

    @Override
    public void reject(Task task) {
        throw new UnsupportedOperationException("Task cannot be rejected from Open state.");
    }
}