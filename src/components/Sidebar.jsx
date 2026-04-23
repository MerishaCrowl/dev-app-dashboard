import { 
    LayoutDashboard, 
    CheckSquare, 
    Clock, 
    FolderKanban,
    FileText,
    Settings,
    HelpCircle,
    Zap,
    LogOut
} from 'lucide-react';
const Sidebar = ({ activeView, setActiveView, taskCount }) => {
    const mainNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: taskCount },
        { id: 'time', label: 'Time Tracking', icon: Clock },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'notes', label: 'Notes', icon: FileText },
    ];
    const secondaryNavItems = [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
    ];
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <Zap />
                    </div>
                    <span className="logo-text">DevDash</span>
                </div>
            </div>
            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="nav-section-title">Main</span>
                    {mainNavItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => setActiveView(item.id)}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                            {item.badge > 0 && (
                                <span className="nav-item-badge">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="nav-section">
                    <span className="nav-section-title">Support</span>
                    {secondaryNavItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => setActiveView(item.id)}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">JD</div>
                    <div className="user-details">
                        <div className="user-name">Jane Developer</div>
                        <div className="user-status">
                            <span className="status-dot"></span>
                            Online
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;
