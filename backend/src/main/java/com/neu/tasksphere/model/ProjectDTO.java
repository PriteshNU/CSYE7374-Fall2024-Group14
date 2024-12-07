package com.neu.tasksphere.model;

public class ProjectDTO {

    private Integer id;

    private String name;

    private String description;

    public ProjectDTO(Integer id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public ProjectDTO() {
    }

    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setId(Integer id) {
         this.id = id;
    }

    public void setName(String name) {
         this.name = name;
    }

    public void getDescription(String description) {
         this.description = description;
    }
}
