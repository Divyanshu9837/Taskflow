import type { Task, Status } from '../types';
import KanbanColumn from './KanbanColumn';

const STATUSES: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];

interface KanbanBoardProps {
  tasks: Task[];
  onCardClick: (task: Task) => void;
  onDropTask: (taskId: string, newStatus: Status) => void;
  onAddClick: (status: Status) => void;
}

export default function KanbanBoard({
  tasks,
  onCardClick,
  onDropTask,
  onAddClick,
}: KanbanBoardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onCardClick={onCardClick}
          onDropTask={onDropTask}
          onAddClick={() => onAddClick(status)}
        />
      ))}
    </div>
  );
}
