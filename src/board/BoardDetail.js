/* BoardDetail.js */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board';

const BoardDetail = () => {
    const baseUrl = 'http://localhost:8080/main/v1/board'
    const { boardId } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoard = async () => {
        const resp = await (await axios.get(baseUrl+`/${boardId}`)).data;
        setBoard(resp.data);
        setLoading(false);
    };

    useEffect(() => {
        getBoard();
        // eslint-disable-next-line
      }, []);
    

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          idx={board.boardId}
          title={board.boardTitle}
          contents={board.boardContent}
          writer={board.nickName}
          email={board.email}
          createdBy={board.writeDatetime}
        />
      )}
    </div>
  );
};

export default BoardDetail;