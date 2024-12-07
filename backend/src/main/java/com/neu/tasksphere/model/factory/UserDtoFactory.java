package com.neu.tasksphere.model.factory;


import com.neu.tasksphere.entity.enums.Role;
import com.neu.tasksphere.model.UserDTO;

public class UserDtoFactory {

    private static UserDtoFactory instance = null;
    private UserDtoFactory(){

    }

    public static synchronized UserDtoFactory getInstance(){
        if(instance == null){
            instance = new UserDtoFactory();
        }
        return instance;
    }

    public UserDTO createUserDTO(Integer id, String username, String firstname, String lastname, Role role){
        return new UserDTO(id, username, firstname, lastname, role);
    }
}
