import { MoreVertical, Calendar, Clock } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
const TaskCard = ({ task, onClick }) => {
    const formatDueDate = (date) => {
        if (!date) return null;
        const dueDate = new Date(date);
        if (isToday(dueDate)) return 'Today';
        return format(dueDate, 'MMM d');
    };
    const isOverdue = task.due_date && 
        isPast(new Date(task.due_date)) && 
        task.status !== 'done';
    return (
        <div className="task-card" onClick={() => onClick(task)}>
            <div className="task-card-header">
                <span className={`task-priority ${task.priority}`}>
                    {task.priority}
                </span>
                <button 
                    className="task-menu-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Menu logic here
                    }}
                >
                    <MoreVertical size={16} />
                </button>
            </div>
            <h3 className="task-title">{task.title}</h3>
            
            {task.description && (
                <p className="task-description">{task.description}</p>
            )}
            {task.tags && task.tags.length > 0 && (
                <div className="task-tags">
                    {task.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="task-tag">{tag}</span>
                    ))}
                </div>
            )}
            <div className="task-footer">
                <div className="task-meta">
                    {task.due_date && (
                        <span 
                            className="task-meta-item" 
                            style={{ color: isOverdue ? 'var(--color-error)' : undefined }}
                        >
                            <Calendar />
                            {formatDueDate(task.due_date)}
                        </span>
                    )}
                    {task.estimated_hours && (
                        <span className="task-meta-item">
                            <Clock />
                            {task.actual_hours || 0}/{task.estimated_hours}h
                        </span>
                    )}
                </div>
                {task.project && (
                    <div className="task-project">
                        <span 
                            className="project-dot" 
                            style={{ background: '#6366f1' }}
                        ></span>
                        {task.project}
                    </div>
                )}
            </div>
        </div>
    );
};
export default TaskCard;
