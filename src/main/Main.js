import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import useStore from "../store/Store";

const Main = () => {
  const { LEADER_COIN } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const login_id = window.sessionStorage.getItem("name");
    if (login_id === null) {
      alert('로그인이 필요한 서비스입니다.')
      navigate("/");
    }
  }, []);

  return (
    <div className="main_body">
      <div className="maintext">
        <h1 className="mainTitle">DRAFTER</h1>
        <a href="https://teamdrafter.herokuapp.com/auction">START</a>
        <br />
        <br />
        <input type="button" onClick={handleLogout} value="로그아웃" />
      </div>
    </div>
  );
};

export default Main;
