import { apiClient } from './client';
import type { Task, TaskInput, Priority, Status } from '../types';

export const taskApi = {
  getAll: () => apiClient.get<Task[]>('/tasks'),
  getById: (id: string) => apiClient.get<Task>(`/tasks/${id}`),
  create: (payload: TaskInput) => apiClient.post<Task>('/tasks', payload),
  update: (id: string, payload: TaskInput) =>
    apiClient.put<Task>(`/tasks/${id}`, payload),
  remove: (id: string) => apiClient.delete<void>(`/tasks/${id}`),
  filterByStatus: (status: Status) =>
    apiClient.get<Task[]>(`/tasks/filter/status/${status}`),
  filterByPriority: (priority: Priority) =>
    apiClient.get<Task[]>(`/tasks/filter/priority/${priority}`),
  search: (keyword: string) =>
    apiClient.get<Task[]>(`/tasks/search?keyword=${encodeURIComponent(keyword)}`),
};
