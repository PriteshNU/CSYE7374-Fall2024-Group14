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
    public void start(Task task) {
        task.setStatus(TaskStatus.InProgress);
        task.setState(InProgressState.getInstance());
        System.out.println("Task transitioned from Open to InProgress.");
    }

    @Override
    public void hold(Task task) {
        task.setStatus(TaskStatus.OnHold);
        task.setState(OnHoldState.getInstance());
        System.out.println("Task transitioned from InProgress to OnHold.");
    }

    @Override
    public void complete(Task task) {
        task.setStatus(TaskStatus.Done);
        task.setState(DoneState.getInstance());
        System.out.println("Task transitioned from InProgress to Done.");
    }

    @Override
    public void review(Task task) {
        task.setStatus(TaskStatus.InReview);
        task.setState(InReviewState.getInstance()); // Use Singleton Instance
        System.out.println("Task transitioned from In Progress to In Review.");

    }


    @Override
    public void cancel(Task task) {
        task.setStatus(TaskStatus.Cancelled);
        task.setState(CancelledState.getInstance());
        System.out.println("Task transitioned from In Progress to Cancelled.");
    }

    @Override
    public void reject(Task task) {
        throw new UnsupportedOperationException("Task cannot be rejected from Open state.");
    }
}