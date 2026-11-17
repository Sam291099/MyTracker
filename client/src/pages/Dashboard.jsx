
import { useMemo, useState } from "react";

import { useActivities } from "../context/ActivityContext";

import {
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  Circle,
  Clock3,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Flame,
  ArrowUpRight,
  Zap,
  Target,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const weeklyData = [
  { day: "Mon", completed: 5, total: 7 },
  { day: "Tue", completed: 7, total: 8 },
  { day: "Wed", completed: 4, total: 6 },
  { day: "Thu", completed: 6, total: 8 },
  { day: "Fri", completed: 8, total: 9 },
  { day: "Sat", completed: 5, total: 7 },
  { day: "Sun", completed: 6, total: 8 },
];

function Dashboard() {
  const { activities, addActivity, toggleActivity } = useActivities();

  const [newActivity, setNewActivity] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  const completed = activities.filter(
    (activity) => activity.completed
  ).length;

  const total = activities.length;
  const pending = total - completed;

  const progress = total
    ? Math.round((completed / total) * 100)
    : 0;

  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) =>
      activity.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [activities, search]);

  const handleAddActivity = (event) => {
    event.preventDefault();

    if (!newActivity.trim()) return;

    addActivity(newActivity);

    setNewActivity("");
    setShowAdd(false);
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="stat-card">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="stat-label">{title}</p>
            <h2 className="stat-value">{value}</h2>
          </div>

          <div className={`stat-icon ${color}`}>
            <Icon size={21} />
          </div>
        </div>

        <p className="stat-subtitle mb-0">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <>
      <section className="welcome-section">
        <div>
          <div className="welcome-date">
            <CalendarDays size={15} />
            {today}
          </div>

          <h1>
            Good day, <span>Achiever!</span>
          </h1>

          <p>
            Small steps every day lead to big results.
            Let's make today count.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus size={19} />
          Add Activity
        </button>
      </section>

      {showAdd && (
        <form
          className="add-activity-form"
          onSubmit={handleAddActivity}
        >
          <div className="flex-grow-1">
            <label htmlFor="activityName">New activity</label>

            <input
              id="activityName"
              className="form-control dark-input"
              placeholder="What do you want to accomplish?"
              value={newActivity}
              onChange={(event) => setNewActivity(event.target.value)}
              autoFocus
            />
          </div>

          <button type="submit" className="primary-button">
            Save Activity
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setShowAdd(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <section className="row g-3 mb-4">
        <StatCard
          title="Total Activities"
          value={total}
          subtitle="Planned for today"
          icon={CalendarDays}
          color="purple"
        />

        <StatCard
          title="Completed"
          value={completed}
          subtitle="Activities finished"
          icon={CheckCircle2}
          color="green"
        />

        <StatCard
          title="Pending"
          value={pending}
          subtitle="Still on your list"
          icon={Clock3}
          color="orange"
        />

        <StatCard
          title="Productivity"
          value={`${progress}%`}
          subtitle="Today's completion rate"
          icon={ChartNoAxesCombined}
          color="blue"
        />
      </section>

      <section className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <div className="dashboard-card chart-card">
            <div className="card-heading">
              <div>
                <h5>Weekly Overview</h5>
                <p>Your productivity at a glance</p>
              </div>

              <button className="period-button">
                This week <ChevronDown size={15} />
              </button>
            </div>

            <div className="chart-legend">
              <span>
                <i className="legend-dot violet-dot" />
                Completed activities
              </span>

              <span>
                <i className="legend-dot muted-dot" />
                Total activities
              </span>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barGap={5}>
                  <CartesianGrid
                    stroke="#292b40"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#85879f", fontSize: 12 }}
                    dy={10}
                  />

                  <Tooltip
                    cursor={{ fill: "#ffffff08" }}
                    contentStyle={{
                      backgroundColor: "#1c1e30",
                      border: "1px solid #35364c",
                      borderRadius: "10px",
                      color: "#ffffff",
                    }}
                  />

                  <Bar
                    dataKey="total"
                    fill="#34364d"
                    radius={[5, 5, 0, 0]}
                    barSize={15}
                  />

                  <Bar
                    dataKey="completed"
                    fill="#9565f5"
                    radius={[5, 5, 0, 0]}
                    barSize={15}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="dashboard-card productivity-card">
            <div className="card-heading">
              <div>
                <h5>Daily Progress</h5>
                <p>Today's performance</p>
              </div>

              <MoreHorizontal size={21} />
            </div>

            <div
              className="progress-ring"
              style={{
                "--progress": `${progress * 3.6}deg`,
              }}
            >
              <div className="progress-ring-inner">
                <h2>{progress}%</h2>
                <span>Completed</span>
              </div>
            </div>

            <div className="progress-summary">
              <div>
                <span className="summary-dot completed-dot" />
                <span>Completed</span>
                <strong>{completed}</strong>
              </div>

              <div>
                <span className="summary-dot pending-dot" />
                <span>Remaining</span>
                <strong>{pending}</strong>
              </div>
            </div>

            <div className="motivation-message">
              <Zap size={16} />
              You're making progress. Keep going!
            </div>
          </div>
        </div>
      </section>

      <section className="row g-3">
        <div className="col-12 col-xl-8">
          <div className="dashboard-card activities-card">
            <div className="card-heading">
              <div>
                <h5>Today's Activities</h5>
                <p>Manage your daily tasks and routines</p>
              </div>

              <span className="text-action">
                View all <ArrowUpRight size={16} />
              </span>
            </div>

            <input
              className="form-control dark-input mt-3"
              placeholder="Search activities..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="activity-list">
              {filteredActivities.length === 0 && (
                <div className="empty-state">
                  No activities found.
                </div>
              )}

              {filteredActivities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div className="activity-item" key={activity.id}>
                    <button
                      className={`activity-check ${
                        activity.completed ? "checked" : ""
                      }`}
                      onClick={() => toggleActivity(activity.id)}
                      aria-label="Toggle activity completion"
                    >
                      {activity.completed ? (
                        <CheckCircle2 size={21} />
                      ) : (
                        <Circle size={21} />
                      )}
                    </button>

                    <div className={`activity-icon ${activity.color}`}>
                      <Icon size={19} />
                    </div>

                    <div className="activity-details">
                      <h6
                        className={
                          activity.completed ? "completed-title" : ""
                        }
                      >
                        {activity.title}
                      </h6>

                      <span>{activity.category}</span>
                    </div>

                    <div className="activity-time">
                      <span>{activity.time}</span>
                      <small>{activity.duration}</small>
                    </div>

                    <span
                      className={`activity-status ${
                        activity.completed
                          ? "status-done"
                          : "status-pending"
                      }`}
                    >
                      {activity.completed ? "Done" : "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="dashboard-card focus-card">
            <div className="card-heading">
              <div>
                <h5>Focus for Today</h5>
                <p>Your daily priorities</p>
              </div>

              <Target size={21} className="focus-icon" />
            </div>

            <div className="focus-highlight">
              <div className="focus-highlight-icon">
                <Flame size={23} />
              </div>

              <div>
                <h6>Stay consistent</h6>
                <p>Every completed task counts.</p>
              </div>
            </div>

            <div className="focus-progress">
              <div className="d-flex justify-content-between mb-2">
                <span>Daily target</span>
                <strong>{completed}/5</strong>
              </div>

              <div className="progress focus-bar">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min((completed / 5) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="focus-footer">
              <Zap size={16} />
              Make today productive!
            </div>
          </div>
        </div>
      </section>

      <footer className="dashboard-footer">
        MyTracker <span>•</span> Build your day, one task at a time.
      </footer>
    </>
  );
}

export default Dashboard;
