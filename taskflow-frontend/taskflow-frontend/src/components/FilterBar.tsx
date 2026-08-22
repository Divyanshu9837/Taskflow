import type { Priority, Status } from '../types';

interface FilterBarProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  statusFilter: Status | 'ALL';
  onStatusFilterChange: (val: Status | 'ALL') => void;
  priorityFilter: Priority | 'ALL';
  onPriorityFilterChange: (val: Priority | 'ALL') => void;
  onNewTask: () => void;
}

export default function FilterBar({
  keyword,
  onKeywordChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onNewTask,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-sm">
        <SearchIcon />
        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-surface-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as Status | 'ALL')}
        className="px-3.5 py-2.5 rounded-lg border border-surface-border bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
      >
        <option value="ALL">All statuses</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => onPriorityFilterChange(e.target.value as Priority | 'ALL')}
        className="px-3.5 py-2.5 rounded-lg border border-surface-border bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
      >
        <option value="ALL">All priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <button
        onClick={onNewTask}
        className="sm:ml-auto bg-flow hover:bg-flow-dark text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
      >
        + New task
      </button>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
    >
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
