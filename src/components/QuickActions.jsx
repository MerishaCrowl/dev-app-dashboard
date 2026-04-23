import { Plus, Filter, Download } from 'lucide-react';
const QuickActions = ({ onNewTask }) => {
    return (
        <div className="quick-actions">
            <button className="quick-action-btn primary" onClick={onNewTask}>
                <Plus size={18} />
                New Task
            </button>
            <button className="quick-action-btn">
                <Filter size={18} />
                Filter
            </button>
            <button className="quick-action-btn">
                <Download size={18} />
                Export
            </button>
        </div>
    );
};
export default QuickActions;
