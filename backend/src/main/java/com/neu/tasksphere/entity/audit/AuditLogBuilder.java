package com.neu.tasksphere.entity.audit;

import com.neu.tasksphere.entity.AuditLog;

public class AuditLogBuilder {
    private String eventType;
    private String message;

    public AuditLogBuilder setEventType(String event) {
        this.eventType = event;
        return this;
    }

    public AuditLogBuilder setMessage(String message) {
        this.message = message;
        return this;
    }

    public AuditLog build() {
        return new AuditLog(eventType, message);
    }
}

