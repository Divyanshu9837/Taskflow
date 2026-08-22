package com.taskflow.dto;

import com.taskflow.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Priority is required")
    private Task.Priority priority;

    @NotNull(message = "Status is required")
    private Task.Status status;

    private LocalDate dueDate;
}
