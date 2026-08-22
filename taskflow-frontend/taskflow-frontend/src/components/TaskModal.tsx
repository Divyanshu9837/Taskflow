import { useState, useEffect } from 'react';
import type { Task, TaskInput, Priority, Status } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialTask?: Task | null;
  defaultStatus?: Status;
}

const emptyForm: TaskInput = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  status: 'TODO',
  dueDate: '',
};

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTask,
  defaultStatus,
}: TaskModalProps) {
  const [form, setForm] = useState<TaskInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title,
        description: initialTask.description || '',
        priority: initialTask.priority,
        status: initialTask.status,
        dueDate: initialTask.dueDate || '',
      });
    } else {
      setForm({ ...emptyForm, status: defaultStatus || 'TODO' });
    }
    setError('');
  }, [initialTask, defaultStatus, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save task');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    setSaving(true);
    try {
      await onDelete();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete task');
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-cardIn">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-ink">
            {initialTask ? 'Edit task' : 'New task'}
          </h2>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="What needs to get done?"
              className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add more detail (optional)"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Due date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
            />
          </div>

          {error && <p className="text-xs text-priority-high">{error}</p>}

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-flow hover:bg-flow-dark text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : initialTask ? 'Save changes' : 'Create task'}
            </button>
            {initialTask && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-priority-high border border-priority-high/30 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
