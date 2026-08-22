import { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import KanbanBoard from '../components/KanbanBoard';
import TaskModal from '../components/TaskModal';
import FilterBar from '../components/FilterBar';
import { taskApi } from '../api/tasks';
import type { Task, TaskInput, Priority, Status } from '../types';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'ALL'>('ALL');

  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>('TODO');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesKeyword = keyword.trim()
        ? t.title.toLowerCase().includes(keyword.trim().toLowerCase())
        : true;
      const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
      return matchesKeyword && matchesStatus && matchesPriority;
    });
  }, [tasks, keyword, statusFilter, priorityFilter]);

  function openNewTaskModal(status: Status = 'TODO') {
    setActiveTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setActiveTask(task);
    setModalOpen(true);
  }

  async function handleSave(data: TaskInput) {
    if (activeTask) {
      const updated = await taskApi.update(activeTask.id, data);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await taskApi.create(data);
      setTasks((prev) => [...prev, created]);
    }
  }

  async function handleDelete() {
    if (!activeTask) return;
    await taskApi.remove(activeTask.id);
    setTasks((prev) => prev.filter((t) => t.id !== activeTask.id));
  }

  async function handleDropTask(taskId: string, newStatus: Status) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await taskApi.update(taskId, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: newStatus,
        dueDate: task.dueDate,
      });
    } catch {
      // revert on failure
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
      );
    }
  }

  return (
    <div className="min-h-screen flex bg-surface-bg">
      <Sidebar />

      <main className="flex-1 px-5 md:px-8 py-7 overflow-x-hidden">
        <div className="mb-6">
          <h1 className="font-display font-semibold text-2xl text-ink">Dashboard</h1>
          <p className="text-sm text-ink-muted mt-1">
            Drag tasks between columns as work moves forward.
          </p>
        </div>

        <FilterBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          onNewTask={() => openNewTaskModal()}
        />

        {loading && (
          <p className="text-sm text-ink-muted">Loading your tasks...</p>
        )}

        {loadError && !loading && (
          <div className="text-sm text-priority-high bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">
            {loadError}
          </div>
        )}

        {!loading && !loadError && (
          <KanbanBoard
            tasks={filteredTasks}
            onCardClick={openEditModal}
            onDropTask={handleDropTask}
            onAddClick={openNewTaskModal}
          />
        )}
      </main>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={activeTask ? handleDelete : undefined}
        initialTask={activeTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
