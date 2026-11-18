
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import {
  Target,
  Plus,
  Trash2,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/goals`;

function Goals() {
  const { token } = useAuth();

  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch authenticated user's goals
  useEffect(() => {
    const fetchGoals = async () => {
      if (!token) {
        setGoals([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGoals(response.data.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        setGoals([]);
        setError("Unable to load goals from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [token]);

  // Create a new goal
  const addGoal = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setFormError("Please enter a goal title.");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const response = await axios.post(
        API_URL,
        {
          title: title.trim(),
          targetDate: targetDate || null,
          progress: 0,
        },
        authConfig
      );

      setGoals((previous) => [
        response.data.data,
        ...previous,
      ]);

      setTitle("");
      setTargetDate("");
      setError("");
    } catch (err) {
      console.error("Failed to create goal:", err);
      setFormError(
        err.response?.data?.message || "Unable to create goal."
      );
    } finally {
      setSaving(false);
    }
  };

  // Update goal progress
  const updateProgress = async (id, progress) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        { progress: Number(progress) },
        authConfig
      );

      setGoals((previous) =>
        previous.map((goal) =>
          goal._id === id ? response.data.data : goal
        )
      );

      setError("");
    } catch (err) {
      console.error("Failed to update goal:", err);
      setError("Unable to update goal progress.");
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authConfig);

      setGoals((previous) =>
        previous.filter((goal) => goal._id !== id)
      );

      setError("");
    } catch (err) {
      console.error("Failed to delete goal:", err);
      setError("Unable to delete goal.");
    }
  };

  const completedGoals = goals.filter(
    (goal) => goal.progress === 100
  ).length;

  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce((sum, goal) => sum + goal.progress, 0) /
            goals.length
        )
      : 0;

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h4 className="mb-1">My Goals</h4>
        <p className="text-secondary mb-0">
          Set targets and track your progress.
        </p>
      </div>

      {/* Goal statistics */}
      <div className="row g-3">
        <div className="col-12 col-sm-4">
          <div className="dashboard-card h-100">
            <Target className="text-primary mb-2" size={24} />
            <p className="text-secondary mb-1">Total Goals</p>
            <h3 className="mb-0">{goals.length}</h3>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="dashboard-card h-100">
            <CheckCircle2 className="text-success mb-2" size={24} />
            <p className="text-secondary mb-1">Completed Goals</p>
            <h3 className="mb-0">{completedGoals}</h3>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="dashboard-card h-100">
            <TrendingUp className="text-info mb-2" size={24} />
            <p className="text-secondary mb-1">Average Progress</p>
            <h3 className="mb-0">{averageProgress}%</h3>
          </div>
        </div>
      </div>

      {/* Add goal form */}
      <div className="dashboard-card">
        <h5 className="mb-3">Create a New Goal</h5>

        <form onSubmit={addGoal}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Goal title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Complete MERN Stack"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                required
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Target date</label>
              <input
                type="date"
                className="form-control"
                value={targetDate}
                onChange={(event) =>
                  setTargetDate(event.target.value)
                }
              />
            </div>

            <div className="col-12 col-md-2 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={saving}
              >
                <Plus size={17} className="me-1" />
                {saving ? "Saving..." : "Add Goal"}
              </button>
            </div>
          </div>

          {formError && (
            <p className="text-danger small mt-2 mb-0">
              {formError}
            </p>
          )}
        </form>
      </div>

      {/* Goals list */}
      <div className="dashboard-card">
        <h5 className="mb-4">Your Goals</h5>

        {error && (
          <p className="text-danger">{error}</p>
        )}

        {loading ? (
          <p className="text-secondary">Loading goals...</p>
        ) : goals.length === 0 ? (
          <div className="text-center py-5">
            <Target size={40} className="text-secondary mb-3" />
            <h6>No goals created yet</h6>
            <p className="text-secondary mb-0">
              Create your first goal to start tracking progress.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {goals.map((goal) => (
              <div
                key={goal._id}
                className="border border-secondary-subtle rounded-3 p-3"
              >
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <h6 className="mb-2">{goal.title}</h6>

                    {goal.targetDate && (
                      <small className="text-secondary d-flex align-items-center gap-1">
                        <CalendarDays size={14} />
                        Target:{" "}
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </small>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteGoal(goal._id)}
                    aria-label={`Delete ${goal.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                  <small className="text-secondary">
                    Progress
                  </small>
                  <strong>{goal.progress}%</strong>
                </div>

                <div
                  className="progress mb-3"
                  style={{ height: "9px" }}
                >
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${goal.progress}%` }}
                    aria-valuenow={goal.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>

                <div className="d-flex align-items-center gap-3">
                  <input
                    type="range"
                    className="form-range flex-grow-1 mb-0"
                    min="0"
                    max="100"
                    step="5"
                    value={goal.progress}
                    onChange={(event) =>
                      updateProgress(goal._id, event.target.value)
                    }
                    aria-label={`Progress for ${goal.title}`}
                  />

                  {goal.progress === 100 && (
                    <span className="text-success small fw-semibold">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;
