import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const BoardList = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080/main/v1/board'
  const [boardList, setBoardList] = useState([]);
  const [pageList, setPageList] = useState([]);

  const [curPage, setCurPage] = useState(0); //현재 페이지 세팅
  const [prevBlock, setPrevBlock] = useState(0); //이전 페이지 블록
  const [nextBlock, setNextBlock] = useState(0); //다음 페이지 블록
  const [lastPage, setLastPage] = useState(0); //마지막 페이지

  const [search, setSearch] = useState({
    page: 1,
    sk: '',
    sv: '',
  });

  const getBoardList = async () => {
    const params = {
        page: search.page,
        size: 10,
        // sort: '',
        type: 'TITLE',
    };
    const resp = await (await axios.get(baseUrl, {params})).data; // 2) 게시글 목록 데이터에 할당  
    setBoardList(resp.data); // 3) boardList 변수에 할당

    const pngn = resp.paging;

    /* 
      page size totalElements totalPages 10
    */
    const { totalPages, nextBlock, prevBlock, page } = pngn;

    setCurPage(search.page);
    setPrevBlock(prevBlock);
    setNextBlock(nextBlock);
    setLastPage(totalPages);

    const tmpPages = [];
    for (let i = page; i <= totalPages; i++) {
      tmpPages.push(i);
      console.log(i);
    }
    
    setPageList(tmpPages);
  }

  const onClick = (event) => {
    let value = event.target.value;
    setSearch({
      ...search,
      page: value,
    });

    getBoardList();
  };

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const onSearch = () => {
    if (search.sk !== '' && search.sv !== '') {
      setSearch({
        ...search,
        page: 1,
      });
      setCurPage(0);
      getBoardList();
    }
  };

  const moveToWrite = () => {
    navigate('/write');
  };

  // eslint-disable-next-line
  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
    // eslint-disable-next-line
  }, [search]);

  return (
    <div>
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
      <ul>
        {boardList.map((board) => (
          // 4) map 함수로 데이터 출력
          <li key={board.boardId}>
            <Link to={`/board/${board.boardId}`}>{board.boardTitle}</Link>
        </li>
        ))}
      </ul>
      <div>
        <button onClick={onClick} value={1}>
          &lt;&lt;
        </button>
        <button onClick={onClick} value={prevBlock}>
          &lt;
        </button>
        {pageList.map((page, index) => (
          <button key={index} onClick={onClick} value={page}>
            {page}
          </button>
        ))}
        <button onClick={onClick} value={nextBlock}>
          &gt;
        </button>
        <button onClick={onClick} value={lastPage}>
          &gt;&gt;
        </button>
      </div>
      <hr/>

    </div>
  );
};

export default BoardList;