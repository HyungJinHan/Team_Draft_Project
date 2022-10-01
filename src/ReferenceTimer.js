import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const ReferenceTimer = ({
  article
}) => {
  var now = new Date();
  var h = now.getHours() * 3600;
  var m = now.getMinutes() * 60;
  var s = now.getSeconds();

  var total_time = h + m + s;

  var [time, setTime] = useState();

  var cal_time = parseInt(article.BOARD_TIME - total_time);
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
    if (article.BOARD_WRITER === window.sessionStorage.getItem("id")) {
      if (window.confirm(`주문을 확정하시겠습니까?
주문 확정이 되면 환불이 불가능합니다.`)
      ) {
        Swal.fire({
          title: "주문이 확정되었습니다.",
          width: "370px",
        });
      } else {
        Swal.fire({
          title: "주문확정을 취소했습니다.",
          width: "370px",
        });
        return false;
      }
      axios
        .post("http://localhost:8008/delete", {
          num: e.target.id,
        })
        .then(() => {
          // handlelist();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      Swal.fire({
        title: "작성자만 주문 확정을 할 수 있습니다.",
        width: "370px",
      });
      return false;
    }
  };

  const handleDelete = (e) => {
    if (article.BOARD_WRITER === window.sessionStorage.getItem("id")) {
      if (window.confirm("그룹을 삭제하시겠습니까?")) {
        Swal.fire({
          title: "그룹이 삭제되었습니다.",
          width: "370px",
        });
        // alert 대신 사용하는 라이브러리
        // https://sweetalert2.github.io/#examples
        // npm i sweetalert2
      } else {
        Swal.fire({
          title: "그룹삭제를 취소했습니다.",
          width: "370px",
        });
        return false;
      }
      axios
        .post("http://localhost:8008/delete", {
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
      Swal.fire({
        title: "작성자만 해당 글을 삭제할 수 있습니다.",
        width: "370px",
      });
      return false;
    }
  };

  if (cal_time < 0) {
    return (
      <div>
        <div
          className="G_div"
          id={article.BOARD_NUM}
        >
          <b>{article.BOARD_NUM}</b> &nbsp;
          <a
            id={article.BOARD_NUM}
          >
            {article.BOARD_TITLE}
          </a>
          <br />
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>모집 완료!! 곧 배달됩니다!!</u>
          </span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성자 : {article.BOARD_WRITER}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;픽업장소 : {article.BOARD_LOCATION}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일 : {article.BOARD_DATE}
          <br />
        </div>
        <div>
          <button
            id={article.BOARD_NUM}
            onClick={handleConfirm}
          >
            주<br />문
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
          id={article.BOARD_NUM}
        // onClick={handledetail}
        // 해당 경매 방으로 들어가는 이벤트
        >
          <b>{article.BOARD_NUM}</b> &nbsp;
          <a
            id={article.BOARD_NUM}
          >
            {article.BOARD_TITLE}
          </a>
          <br />
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>
              그룹 모집시간 :&nbsp;
              {minute < 10 ? `0${minute}` : minute}:
              {second < 10 ? `0${second}` : second}
            </u>
          </span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성자 : {article.BOARD_WRITER}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;픽업장소 : {article.BOARD_LOCATION}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일 : {article.BOARD_DATE}
          <br />
        </div>
        <div>
          <input
            type="button"
            value="수정"
            id={article.BOARD_NUM}
          // onClick={handleupdateform}
          // 해당 경매 방 수정
          />
          <input
            type="button"
            value="삭제"
            id={article.BOARD_NUM}
            onClick={handleDelete}
          // 해당 경매 방 삭제
          />
        </div>
      </div>
    );
};

export default ReferenceTimer;