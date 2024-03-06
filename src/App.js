import './App.css';
import {Route, Routes} from "react-router-dom";
import BoardList from './board/BoardList';
import BoardDetail from './board/BoardDetail';
import Home from "./home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/board" element={<BoardList/>}/>
      <Route path="/board/:boardId" element={<BoardDetail/>}/>
    </Routes>
  );
}

export default App;
