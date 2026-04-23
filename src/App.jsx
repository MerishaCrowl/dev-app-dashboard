import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import StatsCards from './components/StatsCards';
import TaskBoard from './components/TaskBoard';
import TaskModal from './components/TaskModal';
import TimeTracker from './components/TimeTracker';
import QuickActions from './components/QuickActions';
import { useTasks, useProjects, useTimeEntries, useStats } from './hooks/useSupabase';
import { isDemoMode } from './lib/supabase';
import './styles/index.css';
function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [theme, setTheme] = useState('dark');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
    const { projects } = useProjects();
    const { entries, activeEntry, startTimer, stopTimer } = useTimeEntries();
    const stats = useStats(tasks, entries);
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };
    const handleNewTask = () => {
        setSelectedTask(null);
        setModalOpen(true);
    };
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };
    const handleSaveTask = async (taskData) => {
        if (selectedTask) {
            await updateTask(selectedTask.id, taskData);
        } else {
            await createTask(taskData);
        }
        setModalOpen(false);
        setSelectedTask(null);
    };
    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setModalOpen(false);
        setSelectedTask(null);
    };
    const inProgressCount = tasks.filter(t => 
        t.status === 'todo' || t.status === 'in_progress'
    ).length;
    return (
        <Layout
            activeView={activeView}
            setActiveView={setActiveView}
            taskCount={inProgressCount}
            theme={theme}
            toggleTheme={toggleTheme}
        >
            {isDemoMode && (
                <div style={{
                    background: 'var(--color-warning-muted)',
                    color: 'var(--color-warning)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-4)',
                    fontSize: '0.875rem'
                }}>
                    🎮 Demo Mode — Data is not persisted. Add Supabase credentials in .env to enable full functionality.
                </div>
            )}
            {activeView === 'dashboard' && (
                <>
                    <StatsCards stats={stats} />
                    <TimeTracker
                        tasks={tasks}
                        activeEntry={activeEntry}
                        onStart={startTimer}
                        onStop={stopTimer}
                    />
                    <QuickActions onNewTask={handleNewTask} />
                    <TaskBoard 
                        tasks={tasks} 
                        onTaskClick={handleTaskClick}
                    />
                </>
            )}
            {activeView === 'tasks' && (
                <>
                    <QuickActions onNewTask={handleNewTask} />
                    <TaskBoard 
                        tasks={tasks} 
                        onTaskClick={handleTaskClick}
                    />
                </>
            )}
            {activeView === 'time' && (
                <>
                    <TimeTracker
                        tasks={tasks}
                        activeEntry={activeEntry}
                        onStart={startTimer}
                        onStop={stopTimer}
                    />
                    <div style={{ marginTop: 'var(--space-6)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Recent Time Entries</h3>
                        {entries.length === 0 ? (
                            <p style={{ color: 'var(--color-text-tertiary)' }}>No time entries yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                {entries.slice(0, 10).map(entry => (
                                    <div 
                                        key={entry.id}
                                        style={{
                                            background: 'var(--color-bg-secondary)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: 'var(--space-3)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <span>{tasks.find(t => t.id === entry.task_id)?.title || 'Unknown task'}</span>
                                        <span style={{ 
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--color-text-secondary)'
                                        }}>
                                            {entry.duration_minutes ? `${Math.floor(entry.duration_minutes / 60)}h ${entry.duration_minutes % 60}m` : 'In progress...'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
            {(activeView === 'projects' || activeView === 'notes' || activeView === 'settings' || activeView === 'help') && (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <h3 className="empty-state-title">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h3>
                    <p className="empty-state-text">This section is coming soon in the full version.</p>
                </div>
            )}
            <TaskModal
                task={selectedTask}
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedTask(null);
                }}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
                projects={projects}
            />
        </Layout>
    );
}
export default App;
