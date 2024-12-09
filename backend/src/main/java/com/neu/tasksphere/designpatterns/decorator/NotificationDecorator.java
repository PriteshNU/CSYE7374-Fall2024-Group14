package com.neu.tasksphere.designpatterns.decorator;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;

/**
 * @author jovinnicholas
 */
public class NotificationDecorator extends TaskRequestDecorator {

    public NotificationDecorator(TaskDecorator taskDecorator) {
        super(taskDecorator);
    }

    @Override
    public void setPriority(TaskPriority priority) {
        System.out.println("Notification: Priority changed to: " + priority);
        super.setPriority(priority);
    }

    @Override
    public void setStatus(TaskStatus status) {
        System.out.println("Notification: Status changed to: " + status);
        super.setStatus(status);
    }

    private void sendNotification(String message) {
        System.out.println("Notification: " + message);
    }
}
