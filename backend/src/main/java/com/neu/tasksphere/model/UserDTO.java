package com.neu.tasksphere.model;

import com.neu.tasksphere.entity.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class UserDTO {
    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    @Enumerated(EnumType.STRING)
    private Role role;

    public UserDTO(Integer id, String username, String firstname, String lastname, Role role) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    }

    public UserDTO() {
    }

    public Integer getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public Role getRole() {
        return this.role;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
