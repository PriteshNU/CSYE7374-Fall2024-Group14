package com.neu.tasksphere.repository;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, UserProject.UserProjectId> {
    List<UserProject> findByProjectId(Integer projectId);
    List<UserProject> findByUserId(Integer userId);
}
