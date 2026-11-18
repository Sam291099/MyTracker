
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Circle,
} from "lucide-react";

import { useActivities } from "../context/ActivityContext";

function Calendar() {
  const { activities, loading } = useActivities();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const isSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const activitiesByDate = useMemo(() => {
    const grouped = {};

    activities.forEach((activity) => {
      if (!activity.createdAt) return;

      const date = new Date(activity.createdAt);

      if (Number.isNaN(date.getTime())) return;

      const key = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(activity);
    });

    return grouped;
  }, [activities]);

  const getDateKey = (date) =>
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

  const selectedActivities =
    activitiesByDate[getDateKey(selectedDate)] || [];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const selectDay = (day) => {
    if (!day) return;

    setSelectedDate(new Date(year, month, day));
  };

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="d-flex flex-column gap-4">
      <div className="dashboard-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">Activity Calendar</h5>
            <p className="text-secondary mb-0">
              Track your activities by date.
            </p>
          </div>

          <CalendarDays size={25} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <h5 className="mb-0">{monthName}</h5>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="row g-2 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div className="col" key={day}>
                <small className="text-secondary fw-semibold">
                  {day}
                </small>
              </div>
            )
          )}
        </div>

        <div className="row g-2 text-center">
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-1" key={`empty-${index}`}>
                  <div className="p-2" />
                </div>
              );
            }

            const date = new Date(year, month, day);
            const dateKey = getDateKey(date);
            const dayActivities = activitiesByDate[dateKey] || [];

            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selectedDate);

            return (
              <div
                className="col"
                key={day}
                style={{ minWidth: "12.5%" }}
              >
                <button
                  onClick={() => selectDay(day)}
                  className={`w-100 rounded-3 border p-2 ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : isToday
                      ? "border-primary"
                      : "border-secondary-subtle"
                  }`}
                  style={{ minHeight: "75px" }}
                >
                  <div className="fw-semibold">{day}</div>

                  {dayActivities.length > 0 && (
                    <div
                      className={`small mt-1 ${
                        isSelected ? "text-white" : "text-secondary"
                      }`}
                    >
                      {dayActivities.length}{" "}
                      {dayActivities.length === 1 ? "activity" : "activities"}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="d-flex gap-3 mt-4 flex-wrap">
          <small className="text-secondary">
            <span className="text-primary">●</span> Today
          </small>

          <small className="text-secondary">
            <span className="text-primary">●</span> Selected date
          </small>
        </div>
      </div>

      <div className="dashboard-card">
        <h5 className="mb-1">
          Activities for{" "}
          {selectedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h5>

        <p className="text-secondary mb-4">
          {selectedActivities.length} activities found
        </p>

        {loading ? (
          <p className="text-secondary">Loading activities...</p>
        ) : selectedActivities.length === 0 ? (
          <div className="text-center py-4">
            <CalendarDays
              size={35}
              className="text-secondary mb-2"
            />
            <p className="text-secondary mb-0">
              No activities recorded for this date.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {selectedActivities.map((activity) => (
              <div
                key={activity.id}
                className="d-flex justify-content-between align-items-center border-bottom border-secondary-subtle pb-3"
              >
                <div>
                  <div className="d-flex align-items-center gap-2">
                    {activity.completed ? (
                      <CheckCircle2
                        size={18}
                        className="text-success"
                      />
                    ) : (
                      <Circle
                        size={18}
                        className="text-secondary"
                      />
                    )}

                    <span className="fw-semibold">
                      {activity.title}
                    </span>
                  </div>

                  <small className="text-secondary ms-4">
                    {activity.category}
                  </small>
                </div>

                <div className="text-end">
                  <div className="small d-flex align-items-center gap-1 justify-content-end">
                    <Clock3 size={14} />
                    {activity.time}
                  </div>

                  <small className="text-secondary">
                    {activity.duration}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
