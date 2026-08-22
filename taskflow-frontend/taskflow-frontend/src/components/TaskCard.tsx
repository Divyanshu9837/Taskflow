import type { Task } from '../types';

const priorityStyles: Record<Task['priority'], { bar: string; badge: string; label: string }> = {
  LOW: { bar: 'bg-priority-low', badge: 'bg-slate-100 text-slate-600', label: 'Low' },
  MEDIUM: { bar: 'bg-priority-medium', badge: 'bg-amber-100 text-amber-700', label: 'Medium' },
  HIGH: { bar: 'bg-priority-high', badge: 'bg-red-100 text-red-600', label: 'High' },
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export default function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
  const p = priorityStyles[task.priority];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={onClick}
      className="group relative bg-white rounded-xl border border-surface-border pl-4 pr-3.5 py-3.5 cursor-grab active:cursor-grabbing hover:border-flow/40 hover:shadow-md transition-all animate-cardIn"
    >
      <span className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${p.bar}`} />

      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-ink leading-snug line-clamp-2">
          {task.title}
        </h4>
      </div>

      {task.description && (
        <p className="mt-1.5 text-xs text-ink-muted line-clamp-2">{task.description}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${p.badge}`}>
          {p.label}
        </span>
        {task.dueDate && (
          <span className="text-[11px] text-ink-muted font-medium">
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
