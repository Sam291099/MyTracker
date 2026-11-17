
import { useState } from "react";

import {
  CheckCircle2,
  Circle,
  Trash2,
  Pencil,
  X,
  Save,
} from "lucide-react";

import { useActivities } from "../context/ActivityContext";

function Activities() {
  const {
    activities,
    toggleActivity,
    deleteActivity,
    editActivity,
  } = useActivities();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Personal",
    time: "",
    duration: "",
  });

  const startEditing = (activity) => {
    setEditingId(activity.id);

    setFormData({
      title: activity.title,
      category: activity.category,
      time: activity.time,
      duration: activity.duration,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Activity title is required");
      return;
    }

    const success = await editActivity(editingId, formData);

    if (success) {
      setEditingId(null);
    } else {
      alert("Unable to update activity. Please try again.");
    }
  };

  const handleDelete = (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (confirmed) {
      deleteActivity(id);
    }
  };

  return (
    <div className="dashboard-card activities-card">
      <div className="card-heading">
        <div>
          <h5>All Activities</h5>
          <p>Manage all your daily activities here.</p>
        </div>
      </div>

      <div className="activity-list mt-3">
        {activities.length === 0 ? (
          <div className="empty-state">
            No activities available. Add an activity from Dashboard.
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div key={activity.id}>
                {editingId === activity.id ? (
                  <form
                    className="add-activity-form my-3"
                    onSubmit={handleSave}
                  >
                    <div className="row g-3 w-100">
                      <div className="col-12">
                        <label>Activity title</label>
                        <input
                          className="form-control dark-input"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label>Category</label>
                        <select
                          className="form-select dark-input"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="Personal">Personal</option>
                          <option value="Health">Health</option>
                          <option value="Learning">Learning</option>
                          <option value="Development">Development</option>
                          <option value="Work">Work</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-6">
                        <label>Time</label>
                        <input
                          className="form-control dark-input"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          placeholder="Example: 08:00 PM"
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label>Duration</label>
                        <input
                          className="form-control dark-input"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          placeholder="Example: 60 min"
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <button
                        type="submit"
                        className="primary-button"
                      >
                        <Save size={17} />
                        Save Changes
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setEditingId(null)}
                      >
                        <X size={17} />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="activity-item">
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

                    <button
                      type="button"
                      className="activity-check"
                      onClick={() => startEditing(activity)}
                      title="Edit activity"
                      aria-label={`Edit ${activity.title}`}
                      style={{ marginLeft: "10px" }}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      className="activity-check"
                      onClick={() =>
                        handleDelete(activity.id, activity.title)
                      }
                      title="Delete activity"
                      aria-label={`Delete ${activity.title}`}
                      style={{ color: "#ef6464", marginLeft: "5px" }}
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Activities;
