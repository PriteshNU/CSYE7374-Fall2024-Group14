package com.neu.tasksphere.entity.audit;

import com.neu.tasksphere.entity.AuditLog;

public class DefaultAuditLogFactory extends AuditLogFactory {

    @Override
    public AuditLog createAuditLog(String eventType, String message) {
        return new AuditLog(eventType, message);
    }
    
}
