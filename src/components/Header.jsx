import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useState } from 'react';
const Header = ({ title, theme, toggleTheme }) => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <header className="header">
            <div className="header-left">
                <button className="icon-button mobile-menu-btn">
                    <Menu />
                </button>
                <h1 className="page-title">{title}</h1>
            </div>
            <div className="header-right">
                <div className="search-box">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search tasks, projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="icon-button" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun /> : <Moon />}
                </button>
                <button className="icon-button">
                    <Bell />
                    <span className="notification-badge"></span>
                </button>
            </div>
        </header>
    );
};
export default Header;
