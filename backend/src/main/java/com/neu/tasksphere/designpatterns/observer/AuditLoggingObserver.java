package com.neu.tasksphere.designpatterns.observer;

import com.neu.tasksphere.entity.TaskEvent;
import com.neu.tasksphere.service.AuditLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AuditLoggingObserver implements TaskObserver {

    private final Logger logger = LoggerFactory.getLogger(AuditLoggingObserver.class);
    private final AuditLogService auditLogService;

    public AuditLoggingObserver(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @Override
    public void update(TaskEvent event) {
        String logMessage = getLogMessage(event);
        logger.info(logMessage);

        // Save log to the database
        auditLogService.saveAuditLog(event.eventType(), logMessage);
    }

    private String getLogMessage(TaskEvent event) {
        return switch (event.eventType()) {
            case "TaskCreated" -> "A new task was created: " + event.task().getName() +
                    "\nDescription: " + event.task().getDescription() +
                    "\nDeadline: " + event.task().getDeadline();
            case "TaskUpdated" -> "Task updated: " + event.task().getName() +
                    "\nUpdated details: " + event.task();
            case "TaskDeadlineUpdated" -> "Deadline updated for task: " + event.task().getName() +
                    "\nNew Deadline: " + event.task().getDeadline();
            case "TaskDeleted" -> "Task deleted: " + event.task().getName();
            case "TaskAssigned" -> "Task assigned to a new user: " + event.task().getName() +
                    "\nAssigned To: " + event.task().getAssignee();
            case "TaskPriorityChanged" -> "Priority updated for task: " + event.task().getName() +
                    "\nNew Priority: " + event.task().getPriority();
            case "TaskStatusChanged" -> "Task status updated for: " + event.task().getName() +
                    "\nNew Status: " + event.task().getStatus();
            default -> "Task event occurred: " + event.eventType() +
                    "\nTask Name: " + event.task().getName();
        };
    }

}
