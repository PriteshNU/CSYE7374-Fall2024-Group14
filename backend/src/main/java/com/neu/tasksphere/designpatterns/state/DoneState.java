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
    public void start(Task task) {
        throw new UnsupportedOperationException("Task cannot be restarted once it is done.");
    }

    @Override
    public void hold(Task task) {
        throw new UnsupportedOperationException("Task cannot be put on hold once it is done.");
    }

    @Override
    public void complete(Task task) {
        throw new UnsupportedOperationException("Task is already completed.");
    }

    @Override
    public void review(Task task) {
        task.setStatus(TaskStatus.InReview);
        task.setState(InReviewState.getInstance());
    }

    @Override
    public void cancel(Task task) {
        throw new UnsupportedOperationException("Task cannot be cancelled once it is done.");
    }

    @Override
    public void reject(Task task) {
        throw new UnsupportedOperationException("Task cannot be rejected once it is done.");
    }
}