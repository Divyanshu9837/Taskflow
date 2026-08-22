import { useState } from 'react';
import type { Task, Status } from '../types';
import TaskCard from './TaskCard';

const columnMeta: Record<Status, { label: string; dot: string; underline: string }> = {
  TODO: {
    label: 'To Do',
    dot: 'bg-status-todo',
    underline: 'bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    dot: 'bg-status-progress',
    underline: 'bg-gradient-to-r from-flow-light via-flow to-flow-light',
  },
  DONE: {
    label: 'Done',
    dot: 'bg-status-done',
    underline: 'bg-gradient-to-r from-emerald-200 via-emerald-500 to-emerald-200',
  },
};

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
  onCardClick: (task: Task) => void;
  onDropTask: (taskId: string, newStatus: Status) => void;
  onAddClick: () => void;
}

export default function KanbanColumn({
  status,
  tasks,
  onCardClick,
  onDropTask,
  onAddClick,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const meta = columnMeta[status];

  return (
    <div className="flex flex-col w-full md:w-1/3 min-w-[280px] bg-surface-bg rounded-2xl">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
            <h3 className="font-display font-semibold text-sm text-ink">{meta.label}</h3>
            <span className="text-xs text-ink-muted font-medium">{tasks.length}</span>
          </div>
          <button
            onClick={onAddClick}
            aria-label={`Add task to ${meta.label}`}
            className="w-6 h-6 flex items-center justify-center rounded-md text-ink-muted hover:bg-white hover:text-flow transition-colors"
          >
            +
          </button>
        </div>
        <div
          className={`flow-underline mt-3 animate-flowline ${meta.underline}`}
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
          const taskId = e.dataTransfer.getData('taskId');
          if (taskId) onDropTask(taskId, status);
        }}
        className={`flex-1 px-3 pb-4 space-y-2.5 overflow-y-auto scroll-thin min-h-[120px] rounded-xl transition-colors ${
          isOver ? 'bg-flow-light/60' : ''
        }`}
      >
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 text-xs text-ink-muted border border-dashed border-surface-border rounded-xl">
            No tasks here yet
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onCardClick(task)}
            onDragStart={(e, id) => e.dataTransfer.setData('taskId', id)}
          />
        ))}
      </div>
    </div>
  );
}
