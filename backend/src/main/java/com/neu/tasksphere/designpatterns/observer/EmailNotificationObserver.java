package com.neu.tasksphere.designpatterns.observer;

import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.TaskEvent;
import com.neu.tasksphere.service.EmailService;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationObserver implements TaskObserver {

    private final EmailService emailService;

    public EmailNotificationObserver(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void update(TaskEvent event) {
        String message = generateEmailMessage(event);

        if (message == null) {
            // Skip sending email for unsupported events
            return;
        }

        Task task = event.task();
        String recipient = task.getAssignee() != null ? task.getAssignee().getUsername() : null;

        if (recipient != null) {
            String subject = "Task Notification: " + task.getName();
            emailService.sendEmail(recipient, subject, message);
        }
    }

    private String generateEmailMessage(TaskEvent event) {
        Task task = event.task();
        return switch (event.eventType()) {
            case "TaskCreated" -> {
                if (task.getAssignee() != null)
                    yield "You have been assigned a new task:\n" +
                            "Task Name: " + task.getName() + "\n" +
                            "Description: " + task.getDescription() + "\n" +
                            "Deadline: " + task.getDeadline();
                else
                    yield null;
            }
            case "TaskDeadlineUpdated" -> "The deadline for the task '" + task.getName() + "' has been updated.\n" +
                    "New Deadline: " + task.getDeadline();
            case "TaskAssigned" -> "You have been assigned a new task:\n" +
                    "Task Name: " + task.getName() + "\n" +
                    "Description: " + task.getDescription() + "\n" +
                    "Deadline: " + task.getDeadline();
            case "TaskPriorityChanged" -> "The priority for the task '" + task.getName() + "' has been changed.\n" +
                    "New Priority: " + task.getPriority();
            case "TaskStatusChanged" -> "The status of the task '" + task.getName() + "' has been updated.\n" +
                    "New Status: " + task.getStatus();
            default -> null;
        };
    }
}
