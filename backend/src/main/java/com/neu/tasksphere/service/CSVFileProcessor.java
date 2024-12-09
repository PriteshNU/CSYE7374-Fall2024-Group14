package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.factory.ProjectFactory;
import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.repository.ProjectRepository;

public class CSVFileProcessor extends FileProcessor<ProjectDTO> {
    private final ProjectFactory projectFactory = ProjectFactory.getInstance();
    private final ProjectRepository projectRepository;

    public CSVFileProcessor(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    protected ProjectDTO processLine(String line) {
        String[] fields = line.split(",");
        Project project = projectFactory.createProject(fields[0], fields[1]);
        projectRepository.save(project);
        return new ProjectDTO(project.getId(), project.getName(), project.getDescription());
    }

    @Override
    protected void handleException(Exception e) {
        System.err.println("Error processing file: " + e.getMessage());
    }
}
