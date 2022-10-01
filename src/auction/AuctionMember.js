import React from 'react';

const AuctionMember = ({
  atc
}) => {

  var className = atc.MEMBER_CLASS

  if (atc.MEMBER_CLASS === "App") {
    className = 'App 특화 (1 강의실)'
  } else if (atc.MEMBER_CLASS === "JSA") {
    className = 'JS 특화 A (2 강의실)'
  } else if (atc.MEMBER_CLASS === "JSB") {
    className = 'JS 특화 B (3 강의실)'
  } else if (atc.MEMBER_CLASS === "SprA") {
    className = 'Spring 특화 A (4 강의실)'
  } else if (atc.MEMBER_CLASS === "SprB") {
    className = 'Spring 특화 B (5 강의실)'
  } else if (atc.MEMBER_CLASS === "SAMUL") {
    className = '사물지능 (6 강의실)'
  } else if (atc.MEMBER_CLASS === "UNUH") {
    className = '언어지능 (7 강의실)'
  } else if (atc.MEMBER_CLASS === "SIGAK") {
    className = '시각지능 (8 강의실)'
  } else if (atc.MEMBER_CLASS === "CLDA") {
    className = '클라우드 A (9 강의실)'
  } else if (atc.MEMBER_CLASS === "CLDB") {
    className = '클라우드 B (10 강의실)'
  }

  return (
    <div>
      {atc.MEMBER_NAME}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {className}&nbsp;반
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {atc.MEMBER_GACHI}&nbsp;가치
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button>
        드가자~
      </button>
    </div>
  );
};

export default AuctionMember;