package com.letslive.letslearnbackend.dto;

import com.letslive.letslearnbackend.entities.TopicAssignment;
import com.letslive.letslearnbackend.entities.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class TeacherAssignmentResponseDTO {
    private UUID id;
    private UUID originalAssignmentResponseId;
    private String note;
    private BigDecimal mark;
    private String gradedAt; // no need on upload
    private UserDTO gradedBy; // no need on upload
}
