
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Dumbbell,
  BookOpen,
  Code2,
  BriefcaseBusiness,
  Coffee,
  Target,
} from "lucide-react";

const ActivityContext = createContext();

const API_URL = "http://localhost:5000/api/activities";

const getActivityIcon = (category) => {
  const icons = {
    Health: Dumbbell,
    Learning: BookOpen,
    Development: Code2,
    Work: BriefcaseBusiness,
    Personal: Coffee,
  };

  return icons[category] || Target;
};

const formatActivity = (activity) => ({
  ...activity,
  id: activity._id,
  icon: getActivityIcon(activity.category),
  color: activity.color || "purple",
});

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(API_URL);

        setActivities(response.data.data.map(formatActivity));
        setError("");
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError("Unable to load activities from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Add activity
  const addActivity = async (title) => {
    try {
      const response = await axios.post(API_URL, {
        title,
        category: "Personal",
        time: "Anytime",
        duration: "Not set",
        color: "purple",
      });

      const newActivity = formatActivity(response.data.data);

      setActivities((previous) => [...previous, newActivity]);
      setError("");
    } catch (err) {
      console.error("Failed to add activity:", err);
      setError("Unable to save activity.");
    }
  };

  // Toggle completion
  const toggleActivity = async (id) => {
    const activity = activities.find((item) => item.id === id);

    if (!activity) return;

    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !activity.completed,
      });

      const updatedActivity = formatActivity(response.data.data);

      setActivities((previous) =>
        previous.map((item) =>
          item.id === id ? updatedActivity : item
        )
      );

      setError("");
    } catch (err) {
      console.error("Failed to update completion:", err);
      setError("Unable to update activity.");
    }
  };

  // Delete activity
  const deleteActivity = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setActivities((previous) =>
        previous.filter((activity) => activity.id !== id)
      );

      setError("");
    } catch (err) {
      console.error("Failed to delete activity:", err);
      setError("Unable to delete activity.");
    }
  };

  // Edit activity
  const editActivity = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        updatedData
      );

      const updatedActivity = formatActivity(response.data.data);

      setActivities((previous) =>
        previous.map((activity) =>
          activity.id === id ? updatedActivity : activity
        )
      );

      setError("");
      return true;
    } catch (err) {
      console.error("Failed to edit activity:", err);
      setError("Unable to edit activity.");
      return false;
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        toggleActivity,
        deleteActivity,
        editActivity,
        loading,
        error,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivities must be used inside an ActivityProvider"
    );
  }

  return context;
}
