package com.neu.tasksphere.model.payload.request;

import com.neu.tasksphere.entity.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class RegisterRequest {

    private String username;
    private String firstname;
    private String lastname;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public RegisterRequest(
            String username,
            String password,
            String firstname,
            String lastname,
            Role role) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public Role getRole() {
        return this.role;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
