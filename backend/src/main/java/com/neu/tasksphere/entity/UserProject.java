package com.neu.tasksphere.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "user_projects")
public class UserProject {

    @EmbeddedId
    private UserProjectId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId("userId")
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId("projectId")
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private Project project;

    public UserProject() {
    }

    public UserProject(User user, Project project) {
        this.user = user;
        this.project = project;
        this.id = new UserProjectId(user.getId(), project.getId());
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return this.user;
    }

    public Project getProject() {
        return this.project;
    }

    public String toString() {
        return "UserProject(user=" + this.getUser() + ", project=" + this.getProject() + ")";
    }

    @Embeddable
    public static class UserProjectId implements Serializable {
        @Column(name = "user_id", nullable = false)
        private Integer userId;

        @Column(name = "project_id", nullable = false)
        private Integer projectId;

        public UserProjectId() {
        }

        public UserProjectId(Integer userId, Integer projectId) {
            this.userId = userId;
            this.projectId = projectId;
        }

        public Integer getUserId() {
            return this.userId;
        }

        public Integer getProjectId() {
            return this.projectId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public void setProjectId(Integer projectId) {
            this.projectId = projectId;
        }

        public String toString() {
            return "UserProject.UserProjectId(userId=" + this.getUserId() + ", projectId=" + this.getProjectId() + ")";
        }
    }
}
