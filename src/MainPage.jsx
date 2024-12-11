import React, { useState } from "react";
import "./style/MainPage.css";

function MainPage() {
    

  // 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜

  // 현재 월의 첫 날과 마지막 날 계산
  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1); // 해당 월의 첫 날
    const lastDay = new Date(year, month + 1, 0); // 해당 월의 마지막 날

    // 이전 달 날짜 추가 (시작 요일 계산)
    const startDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate(); // 이전 달의 마지막 날
    const prevMonthDays = Array.from(
      { length: startDayOfWeek },
      (_, i) => prevMonthLastDay - startDayOfWeek + i + 1
    );

    // 현재 월 날짜
    const currentMonthDays = Array.from(
      { length: lastDay.getDate() },
      (_, i) => i + 1
    );

    // 다음 달 날짜 추가
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

  // 달력 데이터 가져오기
  const { prevMonthDays, currentMonthDays, nextMonthDays } =
    getCalendarDays(currentDate);

  // 이전 월로 이동
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // 다음 월로 이동
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // "today" 버튼 클릭 시 현재 월로 이동
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
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
      <div className="calendar-container">
        {/* 요일 */}
        <div className="calendar-days">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div className="day-box" key={day}>
              {day}
            </div>
          ))}
        </div>
        {/* 날짜 */}
        <div className="calendar-dates">
          {/* 이전 월 날짜 */}
          {prevMonthDays.map((day, index) => (
            <div className="date-box next-month" key={`prev-${index}`}>
              <div className="date-number">{day}</div>
            </div>
          ))}
          {/* 현재 월 날짜 */}
          {currentMonthDays.map((day) => (
            <div
              className={`date-box ${
                day === currentDate.getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
                  ? "highlighted-date"
                  : ""
              }`}
              key={day}
            >
              <div className="date-number">{day}</div>
              <div className="event-box">일정 예시</div>
            </div>
          ))}
          {/* 다음 월 날짜 */}
          {nextMonthDays.map((day, index) => (
            <div className="date-box next-month" key={`next-${index}`}>
              <div className="date-number">{day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
