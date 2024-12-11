import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/MainPage.css";

function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [schoolEvents, setSchoolEvents] = useState([]);
  const userId = localStorage.getItem("user_id"); // 로그인 시 저장된 user_id 가져오기
  const username = localStorage.getItem("username"); // 사용자 이름 저장 (필요 시)

  // 학사 일정 가져오기
  const getSchoolEvents = async () => {
    console.log("Fetching school events for:", { username, year: currentDate.getFullYear() }); // 디버깅 정보
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/calendar/school?username=${username}&year=${currentDate.getFullYear()}`
      );
      console.log("School events fetched:", response.data); // 서버 응답 확인
      setSchoolEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch school events:", error.response?.data || error.message);
      alert("Failed to load school calendar data.");
    }
  };

  // 사용자 일정 가져오기
  const getUserEvents = async () => {
    console.log("Fetching user events for user_id:", userId); // 디버깅 정보
    try {
      const response = await axios.get(`http://127.0.0.1:8000/calendar/${userId}`);
      console.log("User events fetched:", response.data); // 서버 응답 확인
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch user events:", error.response?.data || error.message);
      alert("Failed to load user calendar data.");
    }
  };

  useEffect(() => {
    if (userId) {
      getSchoolEvents(); // 학사 일정 가져오기
      getUserEvents(); // 사용자 일정 가져오기
    } else {
      alert("Please sign in first!");
      window.location.href = "/"; // 로그인하지 않았다면 로그인 페이지로 이동
    }
  }, [currentDate]); // 현재 날짜 변경 시 데이터 갱신

  // 캘린더 데이터를 날짜별로 정렬
  const mergedEvents = [...schoolEvents, ...events].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  console.log("Merged events:", mergedEvents); // 병합된 일정 확인

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
        {mergedEvents.map((event, index) => (
          <div className="date-box" key={index}>
            <div className="date-number">{event.date}</div>
            <div className={`event-box ${event.school_schedule ? "school-event" : ""}`}>
              {event.schedule}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
