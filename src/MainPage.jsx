import React, { useState } from "react";
import "./style/MainPage.css";

function MainPage() {
  // 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTodayInfo, setShowTodayInfo] = useState(false); // today 정보 상태 추가
  const [selectedDate, setSelectedDate] = useState(null); // 클릭된 날짜 상태
  const [events, setEvents] = useState({}); // 날짜별 일정 저장

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from(
      { length: startDayOfWeek },
      (_, i) => prevMonthLastDay - startDayOfWeek + i + 1
    );

    const currentMonthDays = Array.from(
      { length: lastDay.getDate() },
      (_, i) => i + 1
    );

    const endDayOfWeek = lastDay.getDay();
    const nextMonthDays = Array.from(
      { length: 6 - endDayOfWeek },
      (_, i) => i + 1
    );

    return {
      prevMonthDays,
      currentMonthDays,
      nextMonthDays,
    };
  };

  const { prevMonthDays, currentMonthDays, nextMonthDays } =
    getCalendarDays(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setShowTodayInfo(false);
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setShowTodayInfo(false);
    setSelectedDate(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setShowTodayInfo(true); // today 정보 표시
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setShowTodayInfo(false);
  };

  const handleSaveEvent = (eventText) => {
    if (!selectedDate) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: eventText,
    }));
    alert(`${dateKey} 일정이 저장되었습니다.`);
  };

  return (
    <>
        <div className="main-page">
      <div className="header">
        <div className="month-text">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <div className="navigation-buttons">
          <button className="nav-button" onClick={handlePrevMonth}>
            {"<"}
          </button>
          <button className="today-button" onClick={handleToday}>
            today
          </button>
          <button className="nav-button" onClick={handleNextMonth}>
            {">"}
          </button>
        </div>
      </div>
      <div className="sub-container">
      <div className="content-container">
        <div className="calendar-container">
          <div className="calendar-days">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div className="day-box" key={day}>
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-dates">
            {prevMonthDays.map((day, index) => (
              <div className="date-box next-month" key={`prev-${index}`}>
                <div className="date-number">{day}</div>
              </div>
            ))}
            {currentMonthDays.map((day) => {
              const year = currentDate.getFullYear();
              const month = currentDate.getMonth();
              const dateKey = new Date(year, month, day)
                .toISOString()
                .split("T")[0];
              return (
                <div
                  className={`date-box ${
                    day === currentDate.getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear()
                      ? "highlighted-date"
                      : ""
                  }`}
                  key={day}
                  onClick={() => handleDateClick(day)}
                >
                  <div className="date-number">{day}</div>
                  {events[dateKey] && <div className="event-box">일정</div>}
                </div>
              );
            })}
            {nextMonthDays.map((day, index) => (
              <div className="date-box next-month" key={`next-${index}`}>
                <div className="date-number">{day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedDate && (
          <div className="event-editor">
            <h3>{selectedDate.toLocaleDateString()}의 일정 추가</h3>
            <textarea
              className="event-input"
              placeholder="일정을 입력하세요..."
              onBlur={(e) => handleSaveEvent(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default MainPage;
