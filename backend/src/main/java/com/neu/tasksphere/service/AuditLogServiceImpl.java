package com.neu.tasksphere.service;

import com.neu.tasksphere.entity.AuditLog;
import com.neu.tasksphere.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void saveAuditLog(String eventType, String message) {
        AuditLog auditLog = new AuditLog(eventType, message);
        auditLogRepository.save(auditLog);
    }
}
