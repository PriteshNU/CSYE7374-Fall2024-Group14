package com.neu.tasksphere.designpatterns.decorator;

import com.neu.tasksphere.entity.enums.TaskPriority;
import com.neu.tasksphere.entity.enums.TaskStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author jovinnicholas
 */
public class LoggingDecorator extends TaskRequestDecorator {

    private final Logger logger = LoggerFactory.getLogger(LoggingDecorator.class);

    public LoggingDecorator(TaskDecorator taskDecorator) {
        super(taskDecorator);
    }

    @Override
    public void setPriority(TaskPriority priority) {
        System.out.println("Logging: Priority changed  to: " + priority);
        super.setPriority(priority);
    }

    @Override
    public void setStatus(TaskStatus status) {
        System.out.println("Logging: Status changed to: " + status);
        super.setStatus(status);
    }
}
