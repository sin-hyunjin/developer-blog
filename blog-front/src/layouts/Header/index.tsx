import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { MAIN_PATH, SEARCH_PATH } from "constant";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

//            component : 헤더 레이아웃           //
const Header = () => {
  //            function : 네비게이트 함수            //
  const navigate = useNavigate();
  //            event handler : 로고 클릭 이벤트 처리 함수            //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  //            component : 검색 버튼 컴포넌트            //
  const SearchButton = () => {
    //            state : 검색 버튼 요소 참조 상태            //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    //            state : 검색 버튼 상태            //
    const [status, setStatus] = useState<boolean>(false);
    //            state : 검색어 상태           //
    const [word, setWord] = useState<string>("");
    //            state : 검색어 path variable 상태           //
    const { searchWord } = useParams();
    //            event handler : 검색어 변경 이벤트 처리 함수             //
    const onSearchWordChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      setWord(value);
    };
    //            event handler : 검색어 키 이벤트 처리 함수             //
    const onSearchWordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!searchButtonRef) return;
      searchButtonRef.current?.click();
    };
    //            event handler : 검색 버튼 클릭 이벤트 처리 함수             //
    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    //            effect : 검색어 path variable 변경 될 떄 마다 실해될 함수            //
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);

    if (!status) {
      //            render : 검색 버튼 컴포넌트 렌더링 (클릭 false 상태)         //
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );
    } else {
      //            render : 검색 버튼 컴포넌트 렌더링 (클릭 ture 상태)           //
      return (
        <div className="header-search-input-box">
          <input
            className="header-search-input"
            type="text"
            placeholder="검색어를 입력해주세요."
            value={word}
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchWordKeyDownHandler}
          />
          <div
            ref={searchButtonRef}
            className="icon-button"
            onClick={onSearchButtonClickHandler}
          >
            <div className="icon search-light-icon"></div>
          </div>
        </div>
      );
    }
  };
  //            render : 헤더 레이아웃 렌더링         //
  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{`현진 개발블로그`}</div>
        </div>
        <div className="header-right-box">
          <SearchButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
