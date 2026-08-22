package com.taskflow.service;

import com.taskflow.dto.TaskRequest;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(TaskRequest request, String userId) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .userId(userId)
                .build();

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task getTaskById(String id, String userId) {
        Task task = taskRepository.findByIdAndUserId(id, userId);
        if (task == null) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }
        return task;
    }

    public Task updateTask(String id, TaskRequest request, String userId) {
        Task existing = getTaskById(id, userId);

        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setPriority(request.getPriority());
        existing.setStatus(request.getStatus());
        existing.setDueDate(request.getDueDate());

        return taskRepository.save(existing);
    }

    public void deleteTask(String id, String userId) {
        Task existing = getTaskById(id, userId);
        taskRepository.delete(existing);
    }

    public List<Task> filterByStatus(String userId, Task.Status status) {
        return taskRepository.findByUserIdAndStatus(userId, status);
    }

    public List<Task> filterByPriority(String userId, Task.Priority priority) {
        return taskRepository.findByUserIdAndPriority(userId, priority);
    }

    public List<Task> searchByKeyword(String userId, String keyword) {
        return taskRepository.findByUserIdAndTitleContainingIgnoreCase(userId, keyword);
    }
}
