package com.neu.tasksphere.repository;

import com.neu.tasksphere.entity.Project;
import com.neu.tasksphere.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Page<Task> findByAssigneeId(Integer userId, Pageable pageable);
    Page<Task> findByProjectId(Integer projectId, Pageable pageable);
    Page<Task> findByAssigneeIdAndProjectId(Integer userId, Integer projectId, Pageable pageable);
}
