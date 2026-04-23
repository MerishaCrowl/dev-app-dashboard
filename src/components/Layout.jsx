import Sidebar from './Sidebar';
import Header from './Header';
const Layout = ({ children, activeView, setActiveView, taskCount, theme, toggleTheme }) => {
    const getPageTitle = () => {
        const titles = {
            dashboard: 'Dashboard',
            tasks: 'Task Board',
            time: 'Time Tracking',
            projects: 'Projects',
            notes: 'Notes',
            settings: 'Settings',
            help: 'Help & Support'
        };
        return titles[activeView] || 'Dashboard';
    };
    return (
        <div className="app-layout">
            <Sidebar 
                activeView={activeView} 
                setActiveView={setActiveView}
                taskCount={taskCount}
            />
            <main className="main-content">
                <Header 
                    title={getPageTitle()} 
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};
export default Layout;
