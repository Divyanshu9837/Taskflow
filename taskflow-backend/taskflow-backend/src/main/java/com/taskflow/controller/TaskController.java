package com.taskflow.controller;

import com.taskflow.dto.TaskRequest;
import com.taskflow.model.Task;
import com.taskflow.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Authentication principal holds the userId set by JwtAuthFilter
    private String currentUserId(Authentication authentication) {
        return authentication.getName();
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request,
                                            Authentication authentication) {
        Task task = taskService.createTask(request, currentUserId(authentication));
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(Authentication authentication) {
        return ResponseEntity.ok(taskService.getAllTasks(currentUserId(authentication)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id, Authentication authentication) {
        return ResponseEntity.ok(taskService.getTaskById(id, currentUserId(authentication)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id,
                                            @Valid @RequestBody TaskRequest request,
                                            Authentication authentication) {
        return ResponseEntity.ok(taskService.updateTask(id, request, currentUserId(authentication)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id, Authentication authentication) {
        taskService.deleteTask(id, currentUserId(authentication));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter/status/{status}")
    public ResponseEntity<List<Task>> filterByStatus(@PathVariable Task.Status status,
                                                       Authentication authentication) {
        return ResponseEntity.ok(taskService.filterByStatus(currentUserId(authentication), status));
    }

    @GetMapping("/filter/priority/{priority}")
    public ResponseEntity<List<Task>> filterByPriority(@PathVariable Task.Priority priority,
                                                         Authentication authentication) {
        return ResponseEntity.ok(taskService.filterByPriority(currentUserId(authentication), priority));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Task>> searchTasks(@RequestParam String keyword,
                                                    Authentication authentication) {
        return ResponseEntity.ok(taskService.searchByKeyword(currentUserId(authentication), keyword));
    }
}
