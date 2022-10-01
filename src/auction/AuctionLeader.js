import React from "react";

const AuctionLeader = ({
  ld
}) => {
  var className = ld.LEADER_CLASS

  if (ld.LEADER_CLASS === "App") {
    className = 'App 특화 (1 강의실)'
  } else if (ld.LEADER_CLASS === "JSA") {
    className = 'JS 특화 A (2 강의실)'
  } else if (ld.LEADER_CLASS === "JSB") {
    className = 'JS 특화 B (3 강의실)'
  } else if (ld.LEADER_CLASS === "SprA") {
    className = 'Spring 특화 A (4 강의실)'
  } else if (ld.LEADER_CLASS === "SprB") {
    className = 'Spring 특화 B (5 강의실)'
  } else if (ld.LEADER_CLASS === "SAMUL") {
    className = '사물지능 (6 강의실)'
  } else if (ld.LEADER_CLASS === "UNUH") {
    className = '언어지능 (7 강의실)'
  } else if (ld.LEADER_CLASS === "SIGAK") {
    className = '시각지능 (8 강의실)'
  } else if (ld.LEADER_CLASS === "CLDA") {
    className = '클라우드 A (9 강의실)'
  } else if (ld.LEADER_CLASS === "CLDB") {
    className = '클라우드 B (10 강의실)'
  }

  return (
    <div>
      <div>
        {ld.LEADER_NAME}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {ld.LEADER_TEAM}
        &nbsp;팀
        &nbsp;&nbsp;&nbsp;&nbsp;
        {ld.LEADER_GRADE}
        &nbsp;등급
        &nbsp;&nbsp;&nbsp;&nbsp;
        {className}
        &nbsp;반
        &nbsp;&nbsp;&nbsp;&nbsp;
        {ld.LEADER_COIN}
        &nbsp;Coin
      </div>
    </div>
  );
};

export default AuctionLeader;
