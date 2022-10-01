import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LeaderLogin.css";
import SecureStorage from "secure-web-storage";
var CryptoJS = require("crypto-js");

const LeaderLogin = () => {
  const nameRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

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
      .post("http://localhost:8008/leaderlogin", {
        LEADER_NAME: nameRef.current.value,
        LEADER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("name", nameRef.current.value);
          var SECRET_KEY = nameRef.current.value;

          const secureStorage = new SecureStorage(sessionStorage, {
            hash: function hash(key) {
              key = CryptoJS.SHA256(key, SECRET_KEY);
              return key.toString()
            },
            encrypt: function encrypt(data) {
              data = CryptoJS.AES.encrypt(data, SECRET_KEY);
              data = data.toString();
              return data
            },
            decrypt: function decrypt(data) {
              data = CryptoJS.AES.decrypt(data, SECRET_KEY);
              data = data.toString(CryptoJS.enc.Utf8);
              return data
            }
          })

          var data = {
            secret: 'data'
          }
          secureStorage.setItem('data', data);
          navigate("/");

          console.log(secureStorage.key('data'));
          // console.log(secureStorage.value('data'));
          console.log(secureStorage.getItem('data'));
        } else {
          alert("로그인 실패");
          navigate("/leaderlogin");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="input_body">
        <div className="inputBox">
          <input
            type="text"
            name="leadername"
            required="requireds"
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
            required="requireds"
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
          type="button"
          value="로그인"
          onClick={handleLogin}
        />
        <Link to="/leaderjoin">팀장 등록</Link>
        <Link to="/memberlogin">팀원 로그인</Link>
      </div>
    </>
  );
};

export default LeaderLogin;