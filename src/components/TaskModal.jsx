import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
const TaskModal = ({ task, isOpen, onClose, onSave, onDelete, projects }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        project: '',
        due_date: '',
        estimated_hours: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'todo',
                priority: task.priority || 'medium',
                project: task.project || '',
                due_date: task.due_date ? task.due_date.split('T')[0] : '',
                estimated_hours: task.estimated_hours || '',
                tags: task.tags || []
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                project: '',
                due_date: '',
                estimated_hours: '',
                tags: []
            });
        }
    }, [task, isOpen]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };
    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
            estimated_hours: formData.estimated_hours ? parseFloat(formData.estimated_hours) : null
        });
    };
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        {task ? 'Edit Task' : 'Create Task'}
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Title *</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-textarea"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Add details about this task..."
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="review">Review</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Priority</label>
                                <select
                                    name="priority"
                                    className="form-select"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    name="due_date"
                                    className="form-input"
                                    value={formData.due_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Estimated Hours</label>
                                <input
                                    type="number"
                                    name="estimated_hours"
                                    className="form-input"
                                    value={formData.estimated_hours}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    step="0.5"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Project</label>
                            <select
                                name="project"
                                className="form-select"
                                value={formData.project}
                                onChange={handleChange}
                            >
                                <option value="">No project</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tags</label>
                            <input
                                type="text"
                                className="form-input"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Type and press Enter to add tags"
                            />
                            {formData.tags.length > 0 && (
                                <div className="task-tags" style={{ marginTop: '0.5rem' }}>
                                    {formData.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="task-tag"
                                            onClick={() => handleRemoveTag(tag)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {tag} ×
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        {task && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => onDelete(task.id)}
                                style={{ marginRight: 'auto' }}
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        )}
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {task ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default TaskModal;
