import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MemberJoin = () => {
  const nameRef = useRef();
  const pwRef = useRef();
  const pwchRef = useRef();
  const gachiRef = useRef();
  const classRef = useRef();

  const navigate = useNavigate();

  const handleMember = () => { //인풋벨류 검사 후, axios실행
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      alert("아이디를 입력하세요.");
      nameRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("비밀번호를 입력하세요.");
      pwRef.current.focus();
      return false;
    }
    if (pwchRef.current.value !== pwRef.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pwchRef.current.focus();
      return false;
    }
    if (gachiRef.current.value === "" || gachiRef.current.value === undefined) {
      alert("자신의 예상 가치를 입력하세요.");
      gachiRef.current.focus();
      return false;
    }
    if (classRef.current.value === "" || classRef.current.value === undefined) {
      alert("반을 선택해주세요");
      classRef.current.focus();
      return false;
    }

    axios
      .post("https://teamdrafter.herokuapp.com/memberjoin", {
        MEMBER_NAME: nameRef.current.value,
        MEMBER_PW: pwRef.current.value,
        MEMBER_CLASS: classRef.current.value,
        MEMBER_GACHI: gachiRef.current.value,
      })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert("회원가입 성공!!!");
          navigate("/memberlogin");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };


  return (
    <>
      <div className="input_body">
        <form>
          <table align="center" border="1">
            <tbody align="center">
              <tr>
                <td colSpan={2}>팀원 등록</td>
              </tr>
              <tr>
                <td>
                  이름 입력
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    ref={nameRef}
                    placeholder="이름을 입력하세요"
                    defaultValue=""
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          handleMember();
                        }
                      }
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  비밀번호 입력
                </td>
                <td>
                  <input
                    type="password"
                    name="pw"
                    ref={pwRef}
                    placeholder="비밀번호를 입력하세요"
                    defaultValue=""
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          handleMember();
                        }
                      }
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  비밀번호 확인
                </td>
                <td>
                  <input
                    type="password"
                    name="pwch"
                    ref={pwchRef}
                    placeholder="비밀번호 확인"
                    defaultValue=""
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          handleMember();
                        }
                      }
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  자신의 예상 가치 (0 ~ 100)
                </td>
                <td>
                  <input
                    type='number'
                    name="gachi"
                    min={0}
                    max={100}
                    ref={gachiRef}
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          handleMember();
                        }
                      }
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  반 선택
                </td>
                <td>
                  <select
                    ref={classRef}
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          handleMember();
                        }
                      }
                    }
                  >
                    <option value="">
                      반을 선택하세요
                    </option>
                    <option value="App">
                      App 특화 (1 강의실)
                    </option>
                    <option value="JSA">
                      JS 특화 A (2 강의실)
                    </option>
                    <option value="JSB">
                      JS 특화 B (3 강의실)
                    </option>
                    <option value="SprA">
                      Spring 특화 A (4 강의실)
                    </option>
                    <option value="SprB">
                      Spring 특화 B (5 강의실)
                    </option>
                    <option value="SAMUL">
                      사물지능 (6 강의실)
                    </option>
                    <option value="UNUH">
                      언어지능 (7 강의실)
                    </option>
                    <option value="SIGAK">
                      시각지능 (8 강의실)
                    </option>
                    <option value="CLDA">
                      클라우드 A (9 강의실)
                    </option>
                    <option value="CLDB">
                      클라우드 B (10 강의실)
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    type="button"
                    value="회원등록"
                    onClick={handleMember}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default MemberJoin;
