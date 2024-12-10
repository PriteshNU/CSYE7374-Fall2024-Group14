package com.neu.tasksphere.designpatterns.state;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.enums.TaskStatus;

public class InReviewState implements TaskState {
    private static final InReviewState instance = new InReviewState();

    private InReviewState() {
    }

    public static InReviewState getInstance() {
        return instance;
    }

    @Override
    public void next(Task task) {
    throw new UnsupportedOperationException("Task is already in review.");
    }


    @Override
    public void pause(Task task) {
    throw new UnsupportedOperationException("Task is already in review.");
    }

    @Override
    public void prev(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
    }
}