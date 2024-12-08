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
    public void start(Task task) {

        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());

     }

    @Override
    public void hold(Task task) {
        throw new UnsupportedOperationException("Task is already on hold.");
    }

    @Override
    public void complete(Task task) {

        task.setStatus(TaskStatus.Done);
        task.setState(DoneState.getInstance());
    }

    @Override
    public void review(Task task) {
        task.setStatus(TaskStatus.InReview);
        task.setState(InReviewState.getInstance());

        
    }

    @Override
    public void cancel(Task task) {
        task.setStatus(TaskStatus.Cancelled);
    }

    @Override
    public void reject(Task task) {
        throw new UnsupportedOperationException("Task cannot be rejected from Open state.");
    }
}