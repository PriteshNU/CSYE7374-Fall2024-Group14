package com.neu.tasksphere.designpatterns.factory;

import com.neu.tasksphere.designpatterns.builder.UserDTOBuilder;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.model.UserDTO;

public class UserDTOFactory {
    private static final UserDTOFactory INSTANCE = new UserDTOFactory();

    private UserDTOFactory() {
    }

    public static UserDTOFactory getInstance() {
        return INSTANCE;
    }

    public UserDTO getObject(User user) {
        return new UserDTOBuilder()
                .withId(user.getId())
                .withFirstname(user.getFirstname())
                .withLastname(user.getLastname())
                .withUsername(user.getUsername())
                .withRole(user.getRole().name())
                .build();
    }
}
