import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const LeaderLogin = () => {
  const nameRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const goMemberjoin = () => { navigate('/memberlogin') }
  const goLeaderJoin = () => { navigate('/leaderjoin') }

  const handleLogin = () => {
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      alert("이름를 입력하세요!!!");
      nameRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력하세요!!!");
      pwRef.current.focus();
      return false;
    }

    axios
      .post("https://teamdrafter.herokuapp.com/leaderlogin", {
        LEADER_NAME: nameRef.current.value,
        LEADER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("name", nameRef.current.value);
          navigate("/main");
        } else {
          alert("로그인 실패");
          navigate("/");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="leaderLogin">
      <div className="input_body">
        <h1>팀장 로그인</h1>
        <div className="inputBox">
          <input
            type="text"
            name="leadername"
            required="required"
            ref={nameRef}
            autoComplete="off"
            onKeyPress={
              (e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }
            }
          />
          <span>ID input</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="pw"
            required="required"
            ref={pwRef}
            autoComplete="off"
            onKeyPress={
              (e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }
            }
          />
          <span>PW input</span>
          <i></i>
        </div>
        <input
          className="loginbtn"
          type="button"
          value="로그인"
          onClick={handleLogin}
          onKeyPress={
            (e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }
          }
        />
        <button
          className="loginbtn"
          onClick={goMemberjoin}>팀원 로그인</button>
        <button
          className="loginbtn"
          onClick={goLeaderJoin}>팀장 등록</button>
      </div>
    </div>
  );
};

export default LeaderLogin;