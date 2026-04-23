import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
const StatsCards = ({ stats }) => {
    const cards = [
        {
            label: 'Total Tasks',
            value: stats.totalTasks,
            icon: CheckCircle2,
            iconClass: 'primary',
            trend: '+12%',
            trendUp: true
        },
        {
            label: 'Completed',
            value: stats.completedTasks,
            icon: TrendingUp,
            iconClass: 'success',
            trend: '+8%',
            trendUp: true
        },
        {
            label: 'In Progress',
            value: stats.inProgressTasks,
            icon: Clock,
            iconClass: 'warning',
            trend: null
        },
        {
            label: 'Overdue',
            value: stats.overdueTasks,
            icon: AlertTriangle,
            iconClass: 'error',
            trend: stats.overdueTasks > 0 ? '-2' : null,
            trendUp: false
        }
    ];
    return (
        <div className="stats-grid">
            {cards.map((card, index) => (
                <div key={index} className="stat-card">
                    <div className="stat-header">
                        <div className={`stat-icon ${card.iconClass}`}>
                            <card.icon />
                        </div>
                        {card.trend && (
                            <span className={`stat-trend ${card.trendUp ? 'up' : 'down'}`}>
                                {card.trend}
                            </span>
                        )}
                    </div>
                    <div className="stat-value">{card.value}</div>
                    <div className="stat-label">{card.label}</div>
                </div>
            ))}
        </div>
    );
};
export default StatsCards;
