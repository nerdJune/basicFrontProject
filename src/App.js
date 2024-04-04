import './App.css';
import {Route, Routes} from "react-router-dom";
import BoardList from './board/BoardList';
import BoardDetail from './board/BoardDetail';
import Login from './member/Login';
import BoardWrite from './board/BoardWrite'
import Home from "./home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/board" element={<BoardList/>}/>
      <Route path="/board/:boardId" element={<BoardDetail/>}/>
      <Route path="/write" element={<BoardWrite/>}/>
    </Routes>
  );
}

export default App;
