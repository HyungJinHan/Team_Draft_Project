import React, { useState, useEffect, useRef, } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const AuctionClassSelect = () => {
  const [classList, setClassList] = useState([]);

  const classGetList = () => {
    axios
      .post("https://teamdrafter.herokuapp.com/classchoice")
      .then((res) => {
        const { data } = res;
        setClassList({
          classList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const totClass = classList.classList;

  useEffect(() => { classGetList(); }, []);

  return (
    <div>
      {totClass?.map((cl) => (
        <table key={cl.CLASS_NAME} border="1">
          <tbody align="center">
            <tr>
              <td width={170}>
                {cl.CLASS_NAME}
                &nbsp;반
              </td>
              <td width={170}>
                {cl.CLASS_MAIN}
                &nbsp;강사님
              </td>
              <td width={170}>
                {cl.CLASS_SUB}
                &nbsp;부 강사님
              </td>
              <td width={170}>
                {cl.CLASS_LANG}
                &nbsp;언어
              </td>
              <td className="intoPlayer">
                <Link to={cl.CLASS_PATH}><p>입장</p></Link>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}

export default AuctionClassSelect;