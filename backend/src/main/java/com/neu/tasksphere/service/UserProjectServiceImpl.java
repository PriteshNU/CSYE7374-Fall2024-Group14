package com.neu.tasksphere.service;

import com.neu.tasksphere.designpatterns.factory.ProjectDTOFactory;
import com.neu.tasksphere.designpatterns.factory.UserDTOFactory;
import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.User;
import com.neu.tasksphere.entity.UserProject;
import com.neu.tasksphere.entity.factory.UserProjectFactory;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.UserDTO;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.repository.ProjectRepository;
import com.neu.tasksphere.repository.UserProjectRepository;
import com.neu.tasksphere.repository.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProjectServiceImpl implements UserProjectService {

    private final UserProjectRepository userProjectRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public UserProjectServiceImpl(
            UserProjectRepository userProjectRepository,
            UserRepository userRepository,
            ProjectRepository projectRepository) {
        this.userProjectRepository = userProjectRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public ResponseEntity<ApiResponse> assignProject(ProjectRequest request) {
        Project project = projectRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", request.getId()));

        User user = userRepository.findById(request.getAssigneeId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", request.getAssigneeId()));

        UserProjectFactory userProjectFactory = UserProjectFactory.getInstance();
        UserProject userProject = userProjectFactory.createUserProject(user, project);
        userProjectRepository.save(userProject);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Project assigned to user successfully"));
    }

    public ResponseEntity<List<UserDTO>> getAllUsersByProject(Integer projectId) {

        List<UserProject> usersOfProject = userProjectRepository.findByProjectId(projectId);

        List<UserDTO> userDTOList = usersOfProject.stream()
                .map((userProject) -> UserDTOFactory.getInstance().getObject(userProject.getUser()))
                .toList();

        return ResponseEntity.ok(userDTOList);
    }

    public List<ProjectDTO> getAllProjectsByUser(Integer userId) {

        List<UserProject> usersOfProject = userProjectRepository.findByUserId(userId);

        return usersOfProject.stream()
                .map((userProject) -> ProjectDTOFactory.INSTANCE.getObject(userProject.getProject()))
                .toList();
    }
}
