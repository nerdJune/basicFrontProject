import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const BoardList = () => {
  const baseUrl = 'http://localhost:8080/main/v1/board'
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const params = {
        page: 1,
        size: 10,
        // sort: '',
        type: 'TITLE',
    };
    const resp = await (await axios.get(baseUrl, {params})).data; // 2) 게시글 목록 데이터에 할당  
    setBoardList(resp.data); // 3) boardList 변수에 할당
  }

  // eslint-disable-next-line
  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ul>
        {boardList.map((board) => (
          // 4) map 함수로 데이터 출력
          <li key={board.boardId}>
            <Link to={`/board/${board.boardId}`}>{board.boardTitle}</Link>
        </li>
        ))}
      </ul>
      <hr/>

    </div>
  );
};

export default BoardList;