package com.neu.tasksphere.service;

import com.neu.tasksphere.designpatterns.observer.TaskObserver;
import com.neu.tasksphere.entity.TaskEvent;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskNotificationServiceImpl implements TaskNotificationService {

    private final List<TaskObserver> observers = new ArrayList<>();

    public void registerObserver(TaskObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(TaskObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers(TaskEvent event) {
        for (TaskObserver observer : observers) {
            observer.update(event);
        }
    }
}
