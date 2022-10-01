import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuctionLeader from "./AuctionLeader";

const AuctionMy = () => {
  const myName = window.sessionStorage.getItem("name");
  console.log("myName=>", myName);

  const [myList, setMyList] = useState([]);

  const myGetList = () => {
    axios
      .post("https://teamdrafter.herokuapp.com/mylist", {
        LEADER_NAME: myName,
      })
      .then((res) => {
        setMyList(res.data[0]);
        console.log(myList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    myGetList();
  }, []);

  return (
    <div>
      {/* {myLists?.map((ml) => ( */}
      {/* <div>
        <span>이름 {myList.LEADER_NAME}&nbsp;</span>
        <span>팀이름 {myList.LEADER_TEAM}&nbsp;</span>
        <span>내 등급 {myList.LEADER_GRADE}&nbsp;</span>
        <span>내 반 {myList.LEADER_CLASS}&nbsp;</span>
        <span>코인 {myList.LEADER_COIN}&nbsp;</span>
      </div> */}
      {/* ))} */}
    </div>
  );
};

export default AuctionMy;
