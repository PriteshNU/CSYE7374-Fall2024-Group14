package com.neu.tasksphere.designpatterns.observer;

import com.neu.tasksphere.service.TaskNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaskObserverConfiguration {

    @Autowired
    public TaskObserverConfiguration(TaskNotificationService notificationService,
                                     EmailNotificationObserver emailObserver,
                                     AuditLoggingObserver loggingObserver) {
        notificationService.registerObserver(emailObserver);
        notificationService.registerObserver(loggingObserver);
    }
}
