package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class DoneState implements TaskState {
    private static final DoneState instance = new DoneState();
    private DoneState() {}
    public static DoneState getInstance() {
        return instance;
    }

    @Override
    public void next(Task task) {
        task.setStatus(TaskStatus.InReview);
        task.setState(InReviewState.getInstance());

    }

    public void pause(Task task) {
        throw new UnsupportedOperationException("Task is already completed.");
    }

    @Override
    public void prev(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
    }
}