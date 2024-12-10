package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class InProgressState implements TaskState {
    private static final InProgressState instance = new InProgressState();

    private InProgressState() {}

    public static InProgressState getInstance() {
        return instance;
    }

    @Override
    public void next(Task task) {
        task.setStatus(TaskStatus.Done);
        task.setState(DoneState.getInstance());
    }

    @Override
    public void pause(Task task) {
        task.setStatus(TaskStatus.OnHold);
        task.setState(OnHoldState.getInstance());
    }
    @Override
    public void prev(Task task) {
        task.setStatus(TaskStatus.Open);
        task.setState(OpenState.getInstance());
    }
}