package com.neu.tasksphere.service;

import com.neu.tasksphere.designpatterns.observer.TaskObserver;
import com.neu.tasksphere.entity.TaskEvent;

public interface TaskNotificationService {
    void registerObserver(TaskObserver observer);

    void removeObserver(TaskObserver observer);

    void notifyObservers(TaskEvent event);
}
