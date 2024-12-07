package com.neu.tasksphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class TaskSphereApplication {

    public static void main(String[] args) {

        SpringApplication.run(TaskSphereApplication.class, args);
    }
}