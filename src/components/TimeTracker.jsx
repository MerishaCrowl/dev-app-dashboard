import { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
const TimeTracker = ({ tasks, activeEntry, onStart, onStop }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedTaskId, setSelectedTaskId] = useState('');
    useEffect(() => {
        let interval;
        if (activeEntry) {
            const updateTime = () => {
                const start = new Date(activeEntry.start_time);
                const now = new Date();
                setElapsedTime(Math.floor((now - start) / 1000));
            };
            
            updateTime();
            interval = setInterval(updateTime, 1000);
        } else {
            setElapsedTime(0);
        }
        return () => clearInterval(interval);
    }, [activeEntry]);
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const handleStart = () => {
        if (selectedTaskId) {
            onStart(selectedTaskId);
        }
    };
    const activeTasks = tasks.filter(t => t.status !== 'done');
    return (
        <div className="time-tracker">
            <div className="tracker-header">
                <h3 className="tracker-title">
                    <Clock size={20} />
                    Time Tracker
                </h3>
            </div>
            <div className="tracker-display">
                <div className={`time-display ${activeEntry ? 'active' : ''}`}>
                    {formatTime(elapsedTime)}
                </div>
                {!activeEntry && (
                    <div className="tracker-task-select">
                        <select
                            value={selectedTaskId}
                            onChange={(e) => setSelectedTaskId(e.target.value)}
                        >
                            <option value="">Select a task to track...</option>
                            {activeTasks.map(task => (
                                <option key={task.id} value={task.id}>
                                    {task.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="tracker-controls">
                    {activeEntry ? (
                        <button className="tracker-btn stop" onClick={onStop}>
                            <Square size={18} />
                            Stop
                        </button>
                    ) : (
                        <button 
                            className="tracker-btn start" 
                            onClick={handleStart}
                            disabled={!selectedTaskId}
                        >
                            <Play size={18} />
                            Start
                        </button>
                    )}
                </div>
            </div>
            {activeEntry && (
                <p style={{ 
                    marginTop: 'var(--space-3)', 
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    Tracking: {tasks.find(t => t.id === activeEntry.task_id)?.title || 'Unknown task'}
                </p>
            )}
        </div>
    );
};
export default TimeTracker;
