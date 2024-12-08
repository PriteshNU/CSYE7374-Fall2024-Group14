package com.neu.tasksphere.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType;

    @Lob
    private String message;

    private LocalDateTime timestamp;

    public AuditLog() {
    }

    public AuditLog(String eventType, String message) {
        this.eventType = eventType;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
