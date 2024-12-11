import React, { useState, useEffect } from "react";
import "./style/MainPage.css";
import api from "./utils/api";

function MainPage() {
<<<<<<< Updated upstream
    

  // 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
=======
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("user_id"); // 로그인 시 저장된 user_id 가져오기
>>>>>>> Stashed changes

  const getCalendarEvents = async () => {
    try {
      const response = await api.get(`/calendar/${userId}`);
      setEvents(response.data); // 일정 데이터 설정
    } catch (error) {
      console.error("Failed to fetch calendar events:", error);
    }
  };

  useEffect(() => {
    getCalendarEvents();
  }, [currentDate]); // 현재 날짜 변경 시 이벤트 갱신

  // 캘린더 날짜 계산 (기존 로직 재사용)

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
            today
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
        {/* 캘린더 그리드 표시 */}
        {events.map((event) => (
          <div className="date-box" key={event.id}>
            <div className="date-number">{event.date}</div>
            <div className="event-box">{event.schedule}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
