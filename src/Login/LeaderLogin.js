import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
      .post("http://localhost:8005/leaderlogin", {
        leader_name: nameRef.current.value,
        leader_pw: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("name", nameRef.current.value);
          navigate("/");
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
    <form>
      <table align="center" border="1">
        <tbody align="center">
          <tr>
            <td colSpan={2}>팀장 로그인</td>
          </tr>
          <tr>
            <td>
              이름입력
            </td>
            <td>
              <input
                type="text"
                name="leadername"
                size="20"
                ref={nameRef}
              />
            </td>
          </tr>
          <tr>
            <td>
              비밀번호
            </td>
            <td>
              <input
                type="text"
                name="pw"
                size="20"
                ref={pwRef}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                type="button"
                value="로그인"
                onClick={handleLogin}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/leaderjoin">팀장 등록</Link>
            </td>
            <td>
              <Link to="/memberlogin">팀원 로그인</Link>
            </td>  
          </tr>
        </tbody>
      </table>
    </form>
    </>
  );
};
export default LeaderLogin;
