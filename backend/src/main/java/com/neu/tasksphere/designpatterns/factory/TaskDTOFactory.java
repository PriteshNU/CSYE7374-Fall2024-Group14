package com.neu.tasksphere.designpatterns.factory;

import com.neu.tasksphere.designpatterns.builder.TaskDTOBuilder;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.model.CommentDTO;
import com.neu.tasksphere.model.TaskDTO;
import com.neu.tasksphere.model.UserDTO;

import java.util.List;

public class TaskDTOFactory {

    private static TaskDTOFactory INSTANCE = null;

    private TaskDTOFactory() {
    }

    public static TaskDTOFactory getInstance() {
        if (INSTANCE == null) {
            synchronized (TaskDTOFactory.class) {
                if (INSTANCE == null) {
                    INSTANCE = new TaskDTOFactory();
                }
            }
        }

        return INSTANCE;
    }

    public TaskDTO getObject(Task task) {
        TaskDTOBuilder builder = new TaskDTOBuilder()
                .withId(task.getId())
                .withName(task.getName())
                .withDescription(task.getDescription())
                .withDeadline(task.getDeadline())
                .withPriority(task.getPriority())
                .withStatus(task.getStatus());

        if (task.getAssignee() != null) {
            UserDTO userDTO = UserDTOFactory.getInstance().getObject(task.getAssignee());
            builder.withAssignee(userDTO);
        }

        if (task.getComments() != null) {
            List<CommentDTO> commentDTOList = task.getComments().stream()
                    .map(CommentDTOFactory.getInstance()::getObject)
                    .toList();

            builder.withComments(commentDTOList);
        }

        return builder.build();
    }
}

