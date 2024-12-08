package com.neu.tasksphere.designpatterns.factory;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.model.ProjectDTO;

public enum ProjectDTOFactory {
    INSTANCE {
        @Override
        public ProjectDTO getObject(Project project) {
            return new ProjectDTO(project.getId(), project.getName(), project.getDescription());
        }
    };

    public abstract ProjectDTO getObject(Project project);
}
