package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.Task;
import com.neu.tasksphere.entity.factory.ProjectFactory;
import com.neu.tasksphere.exception.ResourceNotFoundException;
import com.neu.tasksphere.model.ProjectDTO;
import com.neu.tasksphere.model.factory.ProjectDtoFactory;
import com.neu.tasksphere.model.payload.request.ProjectRequest;
import com.neu.tasksphere.model.payload.response.ApiResponse;
import com.neu.tasksphere.model.payload.response.PagedResponse;
import com.neu.tasksphere.repository.ProjectRepository;
import com.neu.tasksphere.repository.UserProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserProjectService userProjectService;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              UserProjectService userProjectService) {
        this.projectRepository = projectRepository;
        this.userProjectService = userProjectService;
    }

    public ResponseEntity<ProjectDTO> getProject(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", id));

        ProjectDTO projectDTO = ProjectDtoFactory.INSTANCE.createProjectDto(project.getId(), project.getName(), project.getDescription());
        return ResponseEntity.ok(projectDTO);
    }

    public ResponseEntity<PagedResponse<ProjectDTO>> getAllProjects(int page, int size, Integer userId) {
        List<ProjectDTO> projectDtoList = new ArrayList<>();

        Page<Project> projects;
        Pageable pageable = PageRequest.of(page, size);

        if (userId != null && userId > 0) {
            projectDtoList = userProjectService.getAllProjectsByUser(userId);
            return ResponseEntity.ok(new PagedResponse<>(
                    projectDtoList,
                    0,
                    0,
                    0,
                    0,
                    false)
            );
        } else {
            projects = projectRepository.findAll(pageable);
        }

        for (Project project : projects.getContent()) {
            projectDtoList.add(new ProjectDTO(
                    project.getId(),
                    project.getName(),
                    project.getDescription()
            ));
        }

        return ResponseEntity.ok(new PagedResponse<>(
                projectDtoList,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages(),
                projects.isLast())
        );
    }

    public ResponseEntity<ProjectDTO> createProject(ProjectRequest request) {
//        if (category.getCreatedBy().equals(currentUser.getId()) || currentUser.getAuthorities()
//                .contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
//            category.setName(newCategory.getName());
//            Category updatedCategory = categoryRepository.save(category);
//            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
//        }

        ProjectFactory projectFactory = ProjectFactory.getInstance();
        Project project = projectFactory.createProject(request.getName(), request.getDescription());

        projectRepository.save(project);

        ProjectDTO projectDTO = new ProjectDTO(project.getId(), project.getName(), project.getDescription());

        return ResponseEntity.ok(projectDTO);
    }

    public ResponseEntity<ProjectDTO> updateProject(ProjectRequest request) {
        Project project = projectRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", request.getId()));

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        projectRepository.save(project);

        ProjectDTO projectDTO = new ProjectDTO(project.getId(), project.getName(), project.getDescription());

        return ResponseEntity.ok(projectDTO);
    }

    public ResponseEntity<ApiResponse> deleteProject(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "ID", id));

        projectRepository.delete(project);

        return ResponseEntity.ok(new ApiResponse(Boolean.TRUE, "Project deleted successfully"));
    }

    @Override
    public ResponseEntity<List<ProjectDTO>> exportProject() {
        List<Project> projects = projectRepository.findAll();
        List<ProjectDTO> list = new ArrayList<>();
        try (FileWriter fw = new FileWriter("src/data/project.csv"); BufferedWriter bw = new BufferedWriter(fw)) {
            for (Project p : projects) {
                StringBuilder sb = new StringBuilder();
                sb.append(p.getId()).append(",");
                sb.append(p.getName()).append(",");
                sb.append(p.getDescription()).append(",");
                sb.append(p.getCreatedAt());
                bw.write(sb.toString());
                bw.newLine();

                list.add(new ProjectDTO(p.getId(), p.getName(), p.getDescription()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(list);

    }

    @Override
    public ResponseEntity<List<ProjectDTO>> importProject(MultipartFile multipartFile) {
//        File file = new File(multipartFile.getOriginalFilename());
//        try {
//            multipartFile.transferTo(file);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        ProjectFactory projectFactory = ProjectFactory.getInstance();
        List<ProjectDTO> list = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(multipartFile.getInputStream()))) {
            String inputLine = null;
            while ((inputLine = br.readLine()) != null) {
                String[] fields = inputLine.split(",");
                Project project = projectFactory.createProject(fields[0], fields[1]);
                projectRepository.save(project);
                list.add(new ProjectDTO(project.getId(), project.getName(), project.getDescription()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(list);
    }
}
