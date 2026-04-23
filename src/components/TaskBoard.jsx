import TaskCard from './TaskCard';
const TaskBoard = ({ tasks, onTaskClick }) => {
    const columns = [
        { id: 'todo', title: 'To Do' },
        { id: 'in_progress', title: 'In Progress' },
        { id: 'review', title: 'Review' },
        { id: 'done', title: 'Done' }
    ];
    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };
    return (
        <div className="task-board">
            {columns.map(column => {
                const columnTasks = getTasksByStatus(column.id);
                return (
                    <div key={column.id} className="task-column">
                        <div className="column-header">
                            <div className="column-title">
                                <span className={`column-dot ${column.id}`}></span>
                                {column.title}
                            </div>
                            <span className="column-count">{columnTasks.length}</span>
                        </div>
                        <div className="column-tasks">
                            {columnTasks.map(task => (
                                <TaskCard 
                                    key={task.id} 
                                    task={task} 
                                    onClick={onTaskClick}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default TaskBoard;
