package com.taskflow.service;

import com.taskflow.dto.TaskRequest;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private final String userId = "user-123";

    @Test
    void createTask_shouldSaveAndReturnTask() {
        TaskRequest request = new TaskRequest();
        request.setTitle("Write unit tests");
        request.setPriority(Task.Priority.HIGH);
        request.setStatus(Task.Status.TODO);

        Task saved = Task.builder()
                .id("task-1")
                .title("Write unit tests")
                .priority(Task.Priority.HIGH)
                .status(Task.Status.TODO)
                .userId(userId)
                .build();

        when(taskRepository.save(any(Task.class))).thenReturn(saved);

        Task result = taskService.createTask(request, userId);

        assertThat(result.getId()).isEqualTo("task-1");
        assertThat(result.getTitle()).isEqualTo("Write unit tests");
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getAllTasks_shouldReturnTasksForUser() {
        Task task1 = Task.builder().id("1").title("Task A").userId(userId).build();
        Task task2 = Task.builder().id("2").title("Task B").userId(userId).build();

        when(taskRepository.findByUserId(userId)).thenReturn(List.of(task1, task2));

        List<Task> results = taskService.getAllTasks(userId);

        assertThat(results).hasSize(2);
        assertThat(results).extracting(Task::getTitle).containsExactly("Task A", "Task B");
    }

    @Test
    void getTaskById_shouldThrowWhenNotFound() {
        when(taskRepository.findByIdAndUserId("missing-id", userId)).thenReturn(null);

        assertThatThrownBy(() -> taskService.getTaskById("missing-id", userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("missing-id");
    }

    @Test
    void deleteTask_shouldCallRepositoryDelete() {
        Task task = Task.builder().id("task-1").userId(userId).build();
        when(taskRepository.findByIdAndUserId("task-1", userId)).thenReturn(task);

        taskService.deleteTask("task-1", userId);

        verify(taskRepository, times(1)).delete(task);
    }

    @Test
    void updateTask_shouldModifyExistingTaskFields() {
        Task existing = Task.builder()
                .id("task-1")
                .title("Old title")
                .priority(Task.Priority.LOW)
                .status(Task.Status.TODO)
                .userId(userId)
                .build();

        TaskRequest request = new TaskRequest();
        request.setTitle("New title");
        request.setPriority(Task.Priority.HIGH);
        request.setStatus(Task.Status.IN_PROGRESS);

        when(taskRepository.findByIdAndUserId("task-1", userId)).thenReturn(existing);
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Task updated = taskService.updateTask("task-1", request, userId);

        assertThat(updated.getTitle()).isEqualTo("New title");
        assertThat(updated.getPriority()).isEqualTo(Task.Priority.HIGH);
        assertThat(updated.getStatus()).isEqualTo(Task.Status.IN_PROGRESS);
    }
}
