import axios from "axios";
import React, { useEffect, useState } from "react";

const AuctionList = ({ auc }) => {
  var now = new Date();
  var h = now.getHours() * 3600;
  var m = now.getMinutes() * 60;
  var s = now.getSeconds();

  var total_time = h + m + s;

  var [time, setTime] = useState();

  var cal_time = parseInt(auc.AUCTIONEER_timer - total_time);
  // db에서 불러온 데이터들 중 입력한 시간을 받아와서 현재 시간과 빼기

  var minute = Math.floor((cal_time % 3600) / 60);
  var second = cal_time % 60;

  useEffect(() => {
    var timer = setInterval(() => {
      if (cal_time > 0) {
        setTime(cal_time);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }, [cal_time]);

  const handleConfirm = (e) => {
    if (auc.AUCTIONEER_NAME === window.sessionStorage.getItem("id")) {
      alert(`낙찰이 확정되었습니다.`);
      axios
        .post("https://teamdrafter.herokuapp.com/auctionDelete", {
          num: e.target.id,
        })
        .then(() => {
          // handlelist();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("작성자만 주문 확정을 할 수 있습니다.");
      return false;
    }
  };

  const handleDelete = (e) => {
    if (auc.AUCTIONEER_NAME === window.sessionStorage.getItem("id")) {
      if (window.confirm("그룹을 삭제하시겠습니까?")) {
        alert("그룹이 삭제되었습니다.");
      } else {
        alert("그룹삭제를 취소했습니다.");
        return false;
      }
      axios
        .post("https://teamdrafter.herokuapp.com/auctionDelete", {
          num: e.target.id,
        })
        .then(() => {
          // handlelist();
          // 불러온 리스트 새로고침
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("작성자만 해당 글을 삭제할 수 있습니다.");
      return false;
    }
  };

  if (cal_time < 0) {
    return (
      <div>
        <div className="G_div" id={auc.AUCTIONEER_INDEX}>
          <a id={auc.AUCTIONEER_INDEX}>
            {auc.AUCTIONEER_NAME} 가치:{auc.AUCTIONEER_GACHI}
          </a>
          <br />
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>모집 완료!! 곧 배달됩니다!!</u>
          </span>
          <br />
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일 :{" "}
          {auc.AUCTIONEER_date}
          <br />
        </div>
        <div>
          <button id={auc.AUCTIONEER_INDEX} onClick={handleConfirm}>
            낙<br />찰
            <br />
            확<br />정
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <div
          id={auc.AUCTIONEER_INDEX}
        // onClick={handledetail}
        // 해당 경매 방으로 들어가는 이벤트
        >
          <a id={auc.AUCTIONEER_INDEX}>
            {auc.AUCTIONEER_NAME} 가치:{auc.AUCTIONEER_GACHI}
          </a>
          <br />
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>
              낙찰기간 :&nbsp;
              {minute < 10 ? `0${minute}` : minute}:
              {second < 10 ? `0${second}` : second}
            </u>
          </span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일 :{" "}
          {auc.AUCTIONEER_date}
          <br />
        </div>
        <div>
          <input
            type="button"
            value="삭제"
            id={auc.AUCTIONEER_INDEX}
            onClick={handleDelete}
          // 해당 경매 방 삭제
          />
        </div>
      </div>
    );
};

export default AuctionList;
