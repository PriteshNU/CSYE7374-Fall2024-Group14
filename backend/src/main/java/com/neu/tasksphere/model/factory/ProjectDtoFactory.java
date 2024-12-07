package com.neu.tasksphere.model.factory;

import com.neu.tasksphere.model.ProjectDTO;

public enum ProjectDtoFactory {

    INSTANCE {
        @Override
        public ProjectDTO createProjectDto(Integer id, String name, String description) {
            return new ProjectDTO(id, name, description);
        }
    };

    public abstract ProjectDTO createProjectDto(Integer id, String name, String description);
}
