/* Board.js */
import React from 'react';

const Board = ({ idx, title, contents, writer, email, createdBy }) => {
  return (
    <div>
      <h2>{title}</h2>
      <h5>작성자 : {writer}({email})</h5>
      <h5>작성시간 : {createdBy}</h5>
      <hr />
      <p>{contents}</p>
    </div>
  );
};

export default Board;