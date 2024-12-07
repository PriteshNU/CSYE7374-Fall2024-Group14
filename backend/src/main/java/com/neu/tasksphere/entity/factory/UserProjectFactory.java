package com.neu.tasksphere.entity.factory;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.entity.UserProject;

public class UserProjectFactory {

    private static UserProjectFactory instance = null;
    private UserProjectFactory() {

    }

    public static synchronized UserProjectFactory getInstance() {
        if (instance == null) {
            instance = new UserProjectFactory();
        }
        return instance;
    }

    public UserProject createUserProject(User user, Project project) {
        return new UserProject(user, project);
    }


}
