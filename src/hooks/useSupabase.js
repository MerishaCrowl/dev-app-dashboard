import { useState, useEffect, useCallback } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';
// Demo data for when Supabase isn't configured
const demoTasks = [
    {
        id: '1',
        title: 'Build authentication flow',
        description: 'Implement login, signup, and password reset using Supabase Auth',
        status: 'in_progress',
        priority: 'high',
        project: 'DevDash',
        due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_hours: 8,
        actual_hours: 3.5,
        tags: ['auth', 'supabase', 'security'],
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Design dashboard UI',
        description: 'Create mockups for the main dashboard view with stats and charts',
        status: 'done',
        priority: 'medium',
        project: 'DevDash',
        due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_hours: 6,
        actual_hours: 5,
        tags: ['design', 'ui'],
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment',
        status: 'todo',
        priority: 'medium',
        project: 'Infrastructure',
        due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_hours: 4,
        actual_hours: 0,
        tags: ['devops', 'automation'],
        created_at: new Date().toISOString()
    },
    {
        id: '4',
        title: 'API rate limiting',
        description: 'Implement rate limiting middleware to prevent abuse',
        status: 'review',
        priority: 'high',
        project: 'Backend API',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_hours: 3,
        actual_hours: 2.5,
        tags: ['api', 'security'],
        created_at: new Date().toISOString()
    },
    {
        id: '5',
        title: 'Write unit tests',
        description: 'Add Jest tests for core utility functions',
        status: 'todo',
        priority: 'low',
        project: 'DevDash',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_hours: 5,
        actual_hours: 0,
        tags: ['testing'],
        created_at: new Date().toISOString()
    },
    {
        id: '6',
        title: 'Database optimization',
        description: 'Add indexes and optimize slow queries',
        status: 'in_progress',
        priority: 'urgent',
        project: 'Backend API',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_hours: 4,
        actual_hours: 1,
        tags: ['database', 'performance'],
        created_at: new Date().toISOString()
    }
];
const demoProjects = [
    { id: '1', name: 'DevDash', color: '#6366f1', status: 'active' },
    { id: '2', name: 'Backend API', color: '#10b981', status: 'active' },
    { id: '3', name: 'Infrastructure', color: '#f59e0b', status: 'active' },
    { id: '4', name: 'Mobile App', color: '#ec4899', status: 'paused' }
];
const demoTimeEntries = [
    {
        id: '1',
        task_id: '1',
        description: 'Working on login form',
        start_time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        duration_minutes: 120
    },
    {
        id: '2',
        task_id: '6',
        description: 'Analyzing query performance',
        start_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        duration_minutes: 60
    }
];
export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        
        if (isDemoMode) {
            setTasks(demoTasks);
            setLoading(false);
            return;
        }
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setTasks(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);
    const createTask = async (task) => {
        if (isDemoMode) {
            const newTask = {
                ...task,
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                actual_hours: 0
            };
            setTasks(prev => [newTask, ...prev]);
            return { data: newTask, error: null };
        }
        const { data, error } = await supabase
            .from('tasks')
            .insert([task])
            .select()
            .single();
        if (!error) {
            setTasks(prev => [data, ...prev]);
        }
        return { data, error };
    };
    const updateTask = async (id, updates) => {
        if (isDemoMode) {
            setTasks(prev => prev.map(t => 
                t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t
            ));
            return { error: null };
        }
        const { error } = await supabase
            .from('tasks')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id);
        if (!error) {
            setTasks(prev => prev.map(t => 
                t.id === id ? { ...t, ...updates } : t
            ));
        }
        return { error };
    };
    const deleteTask = async (id) => {
        if (isDemoMode) {
            setTasks(prev => prev.filter(t => t.id !== id));
            return { error: null };
        }
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);
        if (!error) {
            setTasks(prev => prev.filter(t => t.id !== id));
        }
        return { error };
    };
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);
    return { tasks, loading, error, createTask, updateTask, deleteTask, refetch: fetchTasks };
}
export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (isDemoMode) {
            setProjects(demoProjects);
            setLoading(false);
            return;
        }
        const fetchProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('name');
            setProjects(data || []);
            setLoading(false);
        };
        fetchProjects();
    }, []);
    return { projects, loading };
}
export function useTimeEntries() {
    const [entries, setEntries] = useState([]);
    const [activeEntry, setActiveEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (isDemoMode) {
            setEntries(demoTimeEntries);
            setLoading(false);
            return;
        }
        const fetchEntries = async () => {
            const { data } = await supabase
                .from('time_entries')
                .select('*')
                .order('start_time', { ascending: false })
                .limit(50);
            setEntries(data || []);
            
            // Check for active (unfinished) entry
            const active = data?.find(e => !e.end_time);
            setActiveEntry(active || null);
            setLoading(false);
        };
        fetchEntries();
    }, []);
    const startTimer = async (taskId, description = '') => {
        const newEntry = {
            task_id: taskId,
            description,
            start_time: new Date().toISOString()
        };
        if (isDemoMode) {
            const entry = { ...newEntry, id: Date.now().toString() };
            setActiveEntry(entry);
            return { data: entry, error: null };
        }
        const { data, error } = await supabase
            .from('time_entries')
            .insert([newEntry])
            .select()
            .single();
        if (!error) {
            setActiveEntry(data);
        }
        return { data, error };
    };
    const stopTimer = async () => {
        if (!activeEntry) return { error: 'No active timer' };
        const endTime = new Date();
        const startTime = new Date(activeEntry.start_time);
        const durationMinutes = Math.round((endTime - startTime) / 60000);
        const updates = {
            end_time: endTime.toISOString(),
            duration_minutes: durationMinutes
        };
        if (isDemoMode) {
            const completedEntry = { ...activeEntry, ...updates };
            setEntries(prev => [completedEntry, ...prev]);
            setActiveEntry(null);
            return { data: completedEntry, error: null };
        }
        const { data, error } = await supabase
            .from('time_entries')
            .update(updates)
            .eq('id', activeEntry.id)
            .select()
            .single();
        if (!error) {
            setEntries(prev => [data, ...prev.filter(e => e.id !== data.id)]);
            setActiveEntry(null);
        }
        return { data, error };
    };
    return { entries, activeEntry, loading, startTimer, stopTimer };
}
export function useStats(tasks, timeEntries) {
    const stats = {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'done').length,
        inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
        overdueTasks: tasks.filter(t => 
            t.status !== 'done' && 
            t.due_date && 
            new Date(t.due_date) < new Date()
        ).length,
        totalHoursLogged: timeEntries.reduce((sum, e) => sum + (e.duration_minutes || 0), 0) / 60,
        tasksThisWeek: tasks.filter(t => {
            const created = new Date(t.created_at);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return created > weekAgo;
        }).length
    };
    return stats;
}
