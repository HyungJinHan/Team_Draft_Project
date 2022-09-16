import { Routes, Route, Link } from "react-router-dom";
import LeaderLogin from "./Login/LeaderLogin";
import LeaderJoin from "./Login/LeaderJoin";
import Main from "./main/Main";
import MemberLogin from "./Login/MemberLogin";
import MemberJoin from "./Login/MemberJoin";
import Auction from "./auction/Auction";
import background from "./main/videos/mainvideo.mp4";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/leaderlogin" element={<LeaderLogin/>} />
        <Route path="/leaderjoin" element={<LeaderJoin/>} />
        <Route path="/memberlogin" element={<MemberLogin/>} />
        <Route path="/memberjoin" element={<MemberJoin/>} />
        <Route path="/auction" element={<Auction/>} />
      </Routes>
    </div>
  );
}

export default App;
