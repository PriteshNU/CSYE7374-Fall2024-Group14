package com.neu.knowledgeforge.service;

import com.neu.knowledgeforge.model.Course;
import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    Course createCourse(Course course);
    Course updateCourse(String id, Course updatedCourse);
    void deleteCourse(String id);
}
