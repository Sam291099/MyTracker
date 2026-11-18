
import { useMemo } from "react";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useActivities } from "../context/ActivityContext";

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#6366f1",
];

function Analytics() {
  const { activities, loading } = useActivities();

  const analytics = useMemo(() => {
    const total = activities.length;
    const completed = activities.filter(
      (activity) => activity.completed
    ).length;
    const pending = total - completed;

    const productivity =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const categoryCounts = {};

    activities.forEach((activity) => {
      const category = activity.category || "Other";

      if (!categoryCounts[category]) {
        categoryCounts[category] = {
          category,
          total: 0,
          completed: 0,
        };
      }

      categoryCounts[category].total += 1;

      if (activity.completed) {
        categoryCounts[category].completed += 1;
      }
    });

    const categoryData = Object.values(categoryCounts);

    const completionData = [
      { name: "Completed", value: completed },
      { name: "Pending", value: pending },
    ];

    return {
      total,
      completed,
      pending,
      productivity,
      categoryData,
      completionData,
    };
  }, [activities]);

  const statCards = [
    {
      title: "Total Activities",
      value: analytics.total,
      icon: Activity,
      color: "#8b5cf6",
    },
    {
      title: "Completed",
      value: analytics.completed,
      icon: CheckCircle2,
      color: "#10b981",
    },
    {
      title: "Pending",
      value: analytics.pending,
      icon: Clock3,
      color: "#f59e0b",
    },
    {
      title: "Productivity",
      value: `${analytics.productivity}%`,
      icon: TrendingUp,
      color: "#06b6d4",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-card">
        <p className="text-secondary mb-0">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h4 className="mb-1">Productivity Analytics</h4>
        <p className="text-secondary mb-0">
          Understand your activity and completion performance.
        </p>
      </div>

      {/* Statistics */}
      <div className="row g-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="col-12 col-sm-6 col-xl-3" key={stat.title}>
              <div className="dashboard-card h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-secondary mb-2">
                      {stat.title}
                    </p>
                    <h3 className="mb-0 fw-bold">
                      {stat.value}
                    </h3>
                  </div>

                  <div
                    className="rounded-3 p-3"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {analytics.total === 0 ? (
        <div className="dashboard-card text-center py-5">
          <Target size={40} className="text-secondary mb-3" />
          <h5>No analytics available yet</h5>
          <p className="text-secondary mb-0">
            Add some activities and complete them to see your productivity reports.
          </p>
        </div>
      ) : (
        <>
          {/* Completion chart */}
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <div className="dashboard-card h-100">
                <h5 className="mb-4">Completion Overview</h5>

                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={analytics.completionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Category chart */}
            <div className="col-12 col-lg-6">
              <div className="dashboard-card h-100">
                <h5 className="mb-4">Activities by Category</h5>

                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <BarChart data={analytics.categoryData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#64748b"
                      />

                      <XAxis dataKey="category" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />

                      <Bar
                        dataKey="total"
                        name="Total"
                        fill="#8b5cf6"
                        radius={[5, 5, 0, 0]}
                      />

                      <Bar
                        dataKey="completed"
                        name="Completed"
                        fill="#10b981"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Category details */}
          <div className="dashboard-card">
            <h5 className="mb-4">Category Performance</h5>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total</th>
                    <th>Completed</th>
                    <th>Pending</th>
                    <th>Progress</th>
                  </tr>
                </thead>

                <tbody>
                  {analytics.categoryData.map((item, index) => {
                    const pending =
                      item.total - item.completed;

                    const progress = Math.round(
                      (item.completed / item.total) * 100
                    );

                    return (
                      <tr key={item.category}>
                        <td>
                          <span
                            className="d-inline-block rounded-circle me-2"
                            style={{
                              width: 9,
                              height: 9,
                              backgroundColor:
                                COLORS[index % COLORS.length],
                            }}
                          />
                          {item.category}
                        </td>

                        <td>{item.total}</td>
                        <td>{item.completed}</td>
                        <td>{pending}</td>

                        <td style={{ minWidth: "120px" }}>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress flex-grow-1">
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              />
                            </div>
                            <small>{progress}%</small>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;
