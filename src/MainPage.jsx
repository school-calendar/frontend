// src/MainPage.jsx

import React, { useState } from "react";
import "./style/MainPage.css"; // 캘린더 전용 CSS

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const today = new Date();

    const totalDays = firstDay + lastDate;
    const totalWeeks = Math.ceil(totalDays / 7);

    const days = [];

    // 빈 셀 추가 (달의 시작 전)
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-start-${i}`} className="calendar-cell empty"></div>
      );
    }

    // 날짜 셀 추가
    for (let day = 1; day <= lastDate; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 (일)부터 6 (토)까지
      const weekDayNames = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const dayClass = weekDayNames[dayOfWeek];

      // 현재 날짜가 몇 주에 속하는지 계산
      const weekNumber = Math.floor((firstDay + day - 1) / 7);

      let weekClass = "";
      if (weekNumber === 0) {
        weekClass = "first-week";
      } else if (weekNumber === totalWeeks - 1) {
        weekClass = "last-week";
      }

      // 오늘 날짜인지 확인
      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

      days.push(
        <div
          key={day}
          className={`calendar-cell ${dayClass} ${weekClass} ${
            isToday ? "today" : ""
          }`}
        >
          <div className="date-number">{day}</div>
          {/* 이벤트가 있는 경우 아래 div를 추가 */}
          {/* <div className="event">Event</div> */}
        </div>
      );
    }

    // 빈 셀 추가 (달의 끝 이후)
    const remainingCells = totalWeeks * 7 - (firstDay + lastDate);
    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <div key={`empty-end-${i}`} className="calendar-cell empty"></div>
      );
    }

    return days;
  };

  const weekDays = [
    { name: "일", className: "sunday" },
    { name: "월", className: "monday" },
    { name: "화", className: "tuesday" },
    { name: "수", className: "wednesday" },
    { name: "목", className: "thursday" },
    { name: "금", className: "friday" },
    { name: "토", className: "saturday" },
  ];

  return (
    <>
      <div className="main-layout">
        <div className="title-nav">
          <div className="title">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </div>
          <div className="nav-buttons">
            <button className="button button--primary" onClick={goToPreviousMonth}>
              이전
            </button>
            <button className="button button--primary" onClick={goToNextMonth}>
              다음
            </button>
          </div>
        </div>
        <div className="calendar-section">
          <div className="calendar-header">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-header-cell ${day.className}`}
                aria-label={day.name}
              >
                {day.name}
              </div>
            ))}
          </div>
          <div className="calendar-grid">{renderCalendar()}</div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
};

export default MainPage;
