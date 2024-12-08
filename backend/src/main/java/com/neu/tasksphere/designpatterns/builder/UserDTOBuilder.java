package com.neu.tasksphere.designpatterns.builder;

import com.neu.tasksphere.model.UserDTO;

public class UserDTOBuilder {
    private final UserDTO userDTO;

    public UserDTOBuilder() {
        this.userDTO = new UserDTO();
    }

    public UserDTOBuilder withId(Integer id) {
        userDTO.setId(id);
        return this;
    }

    public UserDTOBuilder withFirstname(String firstname) {
        userDTO.setFirstname(firstname);
        return this;
    }

    public UserDTOBuilder withLastname(String lastname) {
        userDTO.setLastname(lastname);
        return this;
    }

    public UserDTOBuilder withUsername(String username) {
        userDTO.setUsername(username);
        return this;
    }

    public UserDTO build() {
        return userDTO;
    }
}
