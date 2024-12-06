package com.neu.knowledgeforge.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "user")
public class User {

    @Id
    private String id;

    private String userName;
    private String email;
    private String contactNumber;
    private String password;
    private List<String> registeredCourses;
    private Map<String, Object> courseProgress;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRegisteredCourses() {
        return registeredCourses;
    }

    public void setRegisteredCourses(List<String> registeredCourses) {
        this.registeredCourses = registeredCourses;
    }

    public Map<String, Object> getCourseProgress() {
        return courseProgress;
    }

    public void setCourseProgress(Map<String, Object> courseProgress) {
        this.courseProgress = courseProgress;
    }
}

