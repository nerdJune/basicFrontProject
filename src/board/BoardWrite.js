/* BoardWrite.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    boardTitle: '',
    createdBy: '',
    boardContent: '',
  });

  const { boardTitle, writer, boardContent } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    await axios.post(`//localhost:8080/main/v1/board`, board).then((res) => {
      alert('등록되었습니다.');
      navigate('/board');
    });
  };

  const backToList = () => {
    navigate('/board');
  };

  return (
    <div>
      <div>
        <span>제목</span><br />
        <input type="text" name="title" value={boardTitle} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span><br />
        <input
          type="text"
          name="writer"
          value={writer}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <span>내용</span><br />
        <textarea
          name="contents"
          cols="30"
          rows="10"
          value={boardContent}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;