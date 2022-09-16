import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MemberJoin = () => {
  const nameRef = useRef(); 
  const pwRef = useRef(); 
  const pwchRef = useRef(); 
  const hopeRef = useRef(); 
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
    if (hopeRef.current.value === "" || hopeRef.current.value === undefined) {
      alert("희망 팀장의 등급을 입력하세요.");
      hopeRef.current.focus();
      return false;
    }
    if (classRef.current.value === "" || classRef.current.value === undefined) {
      alert("반을 선택해주세요");
      classRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8005/memberjoin", {
        member_name: nameRef.current.value, 
        member_pw: pwRef.current.value, 
        member_hope: hopeRef.current.value, 
        member_class: classRef.current.value,
      })
      .then((res) => {
        if (res.data.affectedRows === 1);
        else alert("회원가입 실패!!!");
        navigate("/memberlogin");
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
                placeholder="이름를 입력하세요"
                defaultValue=""
              />
            </td>
          </tr>
          <tr>
            <td>
              비밀번호 입력
            </td>
            <td>
              <input
                type="text"
                name="pw"
                ref={pwRef}
                placeholder="비밀번호를 입력하세요"
                defaultValue=""
              />
            </td>
          </tr>
          <tr>
            <td>
              비밀번호 확인
            </td>
            <td>
              <input
                type="text"
                name="pwch"
                ref={pwchRef}
                placeholder="비밀번호 확인"
                defaultValue=""
              />
            </td>
          </tr>
          <tr>
            <td>
              희망 팀장의 등급
            </td>
            <td>
              <select ref={hopeRef}>
                <option value="">희망 팀장 등급 선택</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              반 선택
            </td>
            <td>
              <select ref={classRef}>
                <option value="">반을 선택하세요</option>
                <option value="JSA">JS_A</option>
                <option value="JSB">JS_B</option>
                <option value="PythonA">Python_A</option>
                <option value="PythonB">Python_B</option>
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
    </>
  );
};

export default MemberJoin;
