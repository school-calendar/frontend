import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/MainPage.css";

function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [schoolEvents, setSchoolEvents] = useState([]);
  const userId = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");

  const getSchoolEvents = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/calendar/school?username=${username}&year=${currentDate.getFullYear()}`
      );
      setSchoolEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch school events:", error.response?.data || error.message);
    }
  };

  const getUserEvents = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/calendar/${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch user events:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getSchoolEvents();
      getUserEvents();
    } else {
      alert("Please sign in first!");
      window.location.href = "/";
    }
  }, [currentDate]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();

    // 이전 달 날짜 추가
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }

    // 현재 달 날짜 추가
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    // 다음 달 날짜 추가
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push(nextDate);
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  // 이벤트를 날짜별로 정리
  const organizeEventsByDate = (events) => {
    const eventMap = {};
    events.forEach((event) => {
      const dateKey = event.date; // 날짜를 키로 사용
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = [];
      }
      eventMap[dateKey].push(event.schedule);
    });
    return eventMap;
  };

  const currentMonthEvents = organizeEventsByDate([...schoolEvents, ...events]);

  return (
    <div className="main-page">
      <div className="header">
        <div className="month-text">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <div className="navigation-buttons">
          <button
            className="nav-button"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
          >
            {"<"}
          </button>
          <button className="today-button" onClick={() => setCurrentDate(new Date())}>
            Today
          </button>
          <button
            className="nav-button"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="calendar-container">
        <div className="calendar-days">
          {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <div className="day-box" key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-dates">
          {days.map((day, index) => {
            const key = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
            const dayEvents = currentMonthEvents[key] || [];

            return (
              <div
                className={`date-box ${
                  day.getMonth() !== currentDate.getMonth() ? "next-month" : ""
                }`}
                key={index}
              >
                <div className="date-number">{day.getDate()}</div>
                {dayEvents.slice(0, 2).map((event, i) => (
                  <div className="event-box" key={i}>
                    {event}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div
                    className="more-events"
                    onClick={() => alert(`More events: ${dayEvents.join(", ")}`)}
                  >
                    ... more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
