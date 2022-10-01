import create from "zustand";
import axios from "axios";
import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

const useStore = create(() => {
  const userName = window.sessionStorage.getItem("name");
  if (userName !== null) {
    axios
      .post("http://localhost:8008/leaderinfo", {
        userName: userName,
      })
      .then((res) => {
        console.log(res.data[0].LEADER_PW);

        var SECRET_KEY = res.data[0].LEADER_PW;
        const secureStorage = new SecureStorage(sessionStorage, {
          hash: function hash(key) {
            key = CryptoJS.SHA256(key, SECRET_KEY);
            return key.toString();
          },
          encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);
            data = data.toString();
            return data;
          },
          decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);
            data = data.toString(CryptoJS.enc.Utf8);
            return data;
          },
        });

        var data = {
          secret: "data",
        };
        secureStorage.setItem("data", data);

        console.log(secureStorage.key("data"));
        console.log(window.sessionStorage.getItem(secureStorage.key("data")));

        // LEADER_NAME1 = res.data[0].LEADER_NAME;
        // LEADER_PW1 = res.data[0].LEADER_PW;
        // LEADER_TEAM1 = res.data[0].LEADER_TEAM;
        // LEADER_GRADE1 = res.data[0].LEADER_GRADE;
        // LEADER_CLASS1 = res.data[0].LEADER_CLASS;
        // LEADER_COIN1 = res.data[0].LEADER_COIN;

        // window.sessionStorage.setItem("pw", res.data[0].LEADER_PW);
        // window.sessionStorage.setItem("grade", res.data[0].LEADER_GRADE);
        // window.sessionStorage.setItem("team", res.data[0].LEADER_TEAM);
        // window.sessionStorage.setItem("class", res.data[0].LEADER_CLASS);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return {
    LEADER_NAME: window.sessionStorage.getItem("name"),
    LEADER_PW: window.sessionStorage.getItem("pw"),
    LEADER_GRADE: window.sessionStorage.getItem("grade"),
    LEADER_TEAM: window.sessionStorage.getItem("team"),
    LEADER_CLASS: window.sessionStorage.getItem("class"),
    LEADER_COIN: window.sessionStorage.getItem("coin"),
  };
});

export default useStore;
