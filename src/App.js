import { Routes, Route } from "react-router-dom";
import LeaderLogin from "./Login/LeaderLogin";
import LeaderJoin from "./Login/LeaderJoin";
import Main from "./main/Main";
import MemberLogin from "./Login/MemberLogin";
import MemberJoin from "./Login/MemberJoin";
import Auction from "./auction/Auction";
import background from "./main/videos/mainvideo.mp4";
import "./App.css";
import AuctionList from "./auction/AuctionArticle";
import AuctionCreate from "./auction/AuctionCreate";

function App() {
  return (
    <div className="mainBody">
      <div className="mainVideo">
        <video loop autoPlay muted>
          <source src={background} type="video/mp4" />
        </video>
        <div className="appBody">
          <Routes>
            <Route path="/" element={<LeaderLogin />} />
            <Route path="/leaderjoin" element={<LeaderJoin />} />
            <Route path="/memberlogin" element={<MemberLogin />} />
            <Route path="/memberjoin" element={<MemberJoin />} />
            <Route path="/main" element={<Main />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/auction/App" element={<AuctionList />} />
            <Route path="/auction/JSA" element={<AuctionList />} />
            <Route path="/auction/JSB" element={<AuctionList />} />
            <Route path="/auction/SprA" element={<AuctionList />} />
            <Route path="/auction/SprB" element={<AuctionList />} />
            <Route path="/auction/SAMUL" element={<AuctionList />} />
            <Route path="/auction/SIGAK" element={<AuctionList />} />
            <Route path="/auction/UNUH" element={<AuctionList />} />
            <Route path="/auction/CLDA" element={<AuctionList />} />
            <Route path="/auction/CLDB" element={<AuctionList />} />
            <Route path="/auction/create/JSA" element={<AuctionCreate />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
