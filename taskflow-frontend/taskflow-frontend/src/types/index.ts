export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string; // ISO date string, e.g. "2026-08-25"
  userId: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
}
