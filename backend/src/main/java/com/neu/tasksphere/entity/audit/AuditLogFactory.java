package com.neu.tasksphere.entity.audit;

import com.neu.tasksphere.entity.AuditLog;

public abstract class AuditLogFactory {
    public abstract AuditLog createAuditLog(String eventType, String message);
}
