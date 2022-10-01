import React, { useState, useEffect } from "react";
import axios from 'axios';

const LeaderCategory = () => {

  const [classAdd, setClassAdd] = useState("");
  const [leaderList, setLeaderList] = useState([]);

  const handleClick = (e) => {
    if (classAdd === e.target.value) {
      setClassAdd("")
    }
    else {
      setClassAdd(e.target.value);
    }
  };

  const leaderGetList = () => {
    axios
      .post("https://teamdrafter.herokuapp.com/leadercategory", {
        LEADER_CLASS: classAdd,
      })
      .then((res) => {
        const { data } = res;
        setLeaderList({
          leaderList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const leaders = leaderList.leaderList;

  useEffect(() => { leaderGetList() }, [classAdd]);
  console.log("classAdd =>", classAdd);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "App" ? "" : "On")}
                onClick={handleClick}
                value="App"
              >
                App 특화 반 {classAdd === "App" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "JSA" ? "On" : "")}
                onClick={handleClick}
                value="JSA"
              >
                JS 특화 A 반 {classAdd === "JSA" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "JSB" ? "On" : "")}
                onClick={handleClick}
                value="JSB"
              >
                JS 특화 B 반 {classAdd === "JSB" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SprA" ? "On" : "")}
                onClick={handleClick}
                value="SprA"
              >
                Spring 특화 A 반 {classAdd === "SprA" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SprB" ? "On" : "")}
                onClick={handleClick}
                value="SprB"
              >
                Spring 특화 B 반 {classAdd === "SprB" ? "▽" : "△"}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SAMUL" ? "On" : "")}
                onClick={handleClick}
                value="SAMUL"
              >
                사물지능 반 {classAdd === "SAMUL" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SIGAK" ? "On" : "")}
                onClick={handleClick}
                value="SIGAK"
              >
                시각지능 반 {classAdd === "SIGAK" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "UNUH" ? "On" : "")}
                onClick={handleClick}
                value="UNUH"
              >
                언어지능 반 {classAdd === "UNUH" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "CLDA" ? "On" : "")}
                onClick={handleClick}
                value="CLDA"
              >
                클라우드 A 반 {classAdd === "CLDA" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "CLDB" ? "On" : "")}
                onClick={handleClick}
                value="CLDB"
              >
                클라우드 B 반 {classAdd === "CLDB" ? "▽" : "△"}
              </button>
            </td>
          </tr>
          {leaders?.map((ld) => (
            <tr key={ld.LEADER_NAME}>
              <td>
                {ld.LEADER_NAME}
              </td>
              <td>
                {ld.LEADER_TEAM}
              </td>
              <td>
                {ld.LEADER_GEADE}
              </td>
              <td>
                {ld.LEADER_CLASS}
              </td>
              <td>
                {ld.LEADER_COIN}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderCategory;