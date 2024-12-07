package com.neu.tasksphere.repository;

import com.neu.tasksphere.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByTaskIdAndUserId(Integer taskId, Integer userId);
}
