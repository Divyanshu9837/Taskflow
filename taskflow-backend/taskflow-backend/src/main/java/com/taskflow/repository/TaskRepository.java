package com.taskflow.repository;

import com.taskflow.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByUserId(String userId);

    List<Task> findByUserIdAndStatus(String userId, Task.Status status);

    List<Task> findByUserIdAndPriority(String userId, Task.Priority priority);

    List<Task> findByUserIdAndTitleContainingIgnoreCase(String userId, String keyword);

    Task findByIdAndUserId(String id, String userId);
}
