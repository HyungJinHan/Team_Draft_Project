import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuctionLeader from "./AuctionLeader";
import AuctionClassSelect from "./AuctionClassSelect";
import AuctionMy from "./AuctionMy";
import "./Auction.css";
import LeaderCategory from "./LeaderCategory";


const Auction = () => {

  const location = useLocation();

  const auctionPath = location.pathname;
  console.log("auctionPath =>", auctionPath);

  return (
    <>
      <div className="AuctionBody">
        <div className="AuctionItem">
          <LeaderCategory />
        </div>
        <div className="AuctionItem">
          <AuctionClassSelect />
        </div>
        <div className="AuctionItem">
          <AuctionMy />
        </div>
      </div>
    </>
  )
}

export default Auction;

