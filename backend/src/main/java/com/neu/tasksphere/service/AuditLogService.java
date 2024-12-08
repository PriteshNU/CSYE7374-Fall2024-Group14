package com.neu.tasksphere.service;

public interface AuditLogService {
    void saveAuditLog(String eventType, String message);
}
