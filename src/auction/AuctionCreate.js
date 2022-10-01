import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuctionCreate = () => {
  const location = useLocation();
  console.log(location.state.classKey);

  useEffect(() => {
    auctionCreatefunc();
  }, []);
  const [memberinfo, Setmemberinfo] = useState([]);
  const appealRef = useRef();
  const timerRef = useRef();
  const navigate = useNavigate();
  const auctionCreatefunc = () => {
    axios
      .post("https://teamdrafter.herokuapp.com/memberinfo", {
        MEMBER_NAME: window.sessionStorage.getItem("name"),
      })
      .then((res) => {
        Setmemberinfo(res.data[0]);
        console.log(memberinfo);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const auctioneerCreate = () => {
    console.log(memberinfo.MEMBER_NAME);
    console.log(appealRef.current.value);
    console.log(timerRef.current.value);
    console.log(memberinfo.MEMBER_GACHI);
    axios
      .post("https://teamdrafter.herokuapp.com/auctioneerCreate", {
        ACTIONEER_NAME: memberinfo.MEMBER_NAME,
        ACTIONEER_APPEAL: appealRef.current.value,
        ACTIONEER_TIMER: timerRef.current.value,
        ACTIONEER_GACHI: memberinfo.MEMBER_GACHI,
        ACTIONEER_CLASS: location.state.classKey,
      })
      .then((res) => {
        alert("방 생성 완료");
        navigate("/auction/JSA");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="auctionArticleBody">
      <div className="auctionArticlItem">
        <div>{memberinfo.MEMBER_NAME}</div>
      </div>
      <div className="auctionArticlItem">
        <textarea placeholder="어필해라" ref={appealRef}></textarea>
      </div>
      <div className="auctionArticlItem">
        <select>
          <option value="5" ref={timerRef}>
            5분
          </option>
          <option value="10" ref={timerRef}>
            10분
          </option>
        </select>
      </div>
      <div className="auctionArticlItem">
        <input type="button" value="방생성" onClick={auctioneerCreate} />
      </div>
    </div>
  );
};

export default AuctionCreate;
