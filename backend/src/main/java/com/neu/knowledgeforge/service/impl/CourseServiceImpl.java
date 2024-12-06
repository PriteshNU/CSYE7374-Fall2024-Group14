package com.neu.knowledgeforge.service.impl;

import com.neu.knowledgeforge.model.Course;
import com.neu.knowledgeforge.repository.CourseRepository;
import com.neu.knowledgeforge.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(String id, Course updatedCourse) {
        Optional<Course> existingCourse = courseRepository.findById(id);
        if (existingCourse.isPresent()) {
            return courseRepository.save(updatedCourse);
        } else {
            throw new RuntimeException("Course not found with id: " + id);
        }
    }

    @Override
    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }
}
