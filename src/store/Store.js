import create from "zustand";
import axios from "axios";
import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";
import { useEffect } from "react";

const useStore = create(() => {
  const leaderName = window.sessionStorage.getItem("leaderName");
  const memberName = window.sessionStorage.getItem("memberName");
  if (leaderName !== null) {
    axios
      .post("http://localhost:8008/leaderinfo", {
        leaderName: leaderName,
      })
      .then((res) => {
        useStore.setState({
          LEADER_NAME: res.data[0].LEADER_NAME,
          LEADER_PW: res.data[0].LEADER_PW,
          LEADER_TEAM: res.data[0].LEADER_TEAM,
          LEADER_GRADE: res.data[0].LEADER_GRADE,
          LEADER_CLASS: res.data[0].LEADER_CLASS,
          LEADER_COIN: res.data[0].LEADER_COIN,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
  if (memberName !== null) {
    axios
      .post("http://localhost:8008/memberinfo", {
        memberName: memberName,
      })
      .then((res) => {
        useStore.setState({
          MEMBER_NAME: res.data[0].MEMBER_NAME,
          MEMBER_PW: res.data[0].MEMBER_PW,
          MEMBER_CLASS: res.data[0].MEMBER_CLASS,
          MEMBER_GACHI: res.data[0].MEMBER_COIN,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return {
    LEADER_NAME: "",
    LEADER_PW: "",
    LEADER_GRADE: "",
    LEADER_TEAM: "",
    LEADER_CLASS: "",
    LEADER_COIN: "",
    MEMBER_NAME: "",
    MEMBER_PW: "",
    MEMBER_CLASS: "",
    MEMBER_GACHI: "",
  };
});

export default useStore;
