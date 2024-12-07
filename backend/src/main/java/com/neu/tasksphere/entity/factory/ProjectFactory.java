package com.neu.tasksphere.entity.factory;

import com.neu.tasksphere.entity.Project;

public class ProjectFactory {

    private static final ProjectFactory instance = new ProjectFactory();

    private ProjectFactory() {

    }

    public static synchronized ProjectFactory getInstance() {
        return instance;
    }

    public Project createProject(String name, String description) {
        return new Project(name, description);
    }

}
