import styled from "styled-components";
import { useState, useEffect } from "react";
function Card({ item, clickedCardID, setClickedCardID, markupUpper, enteredCardID }) {
  const [isDragStart, setDragStart] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  //if (+e.target.id === clickedCardID) return;

  // const placeInfo = e.target.getBoundingClientRect();
  // const placeY = placeInfo.bottom - e.clientY;
  // const targetHeight = placeInfo.bottom - placeInfo.top;
  // setNewPlace(placeY > targetHeight / 2 ? "UP" : "DOWN");

  //브라우저시작부터 target의 bottomm까지의 길이 - 브라우저시작부터 현재 마우스위치까지의 길이
  //else markUpNewPlace(e.target);
  //e.target.style.background = "skyblue";

  const handleDragStart = (e) => {
    setClickedCardID(item.id);
    setDragStart(true);
  };

  const handleDragEnd = () => setDragStart(false);
  const showLine = () => {
    return enteredCardID === item.id && isDragStart;
  };
  return (
    <>
      {showLine() && markupUpper && <DroppablePlace />}
      <CardWrapper
        id={item.id}
        className="card"
        isDragStart={isDragStart}
        draggable={true}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        markupUpper={markupUpper}>
        {item.text}
        {item.id}
      </CardWrapper>
      {showLine() && !markupUpper && <DroppablePlace />}
    </>
  );
}
export default Card;
const CardWrapper = styled.div`
  border-top: ${(props) => (props.markupUpper ? `3px solid skyblue` : `none`)};
  border-bottom: ${(props) => (props.markupUpper ? `3px solid skyblue` : `none`)};
  border: 1px solid black;
  opacity: ${(props) => (props.isDragStart ? 0.5 : 1)};
  height: 50px;
  background-color: white;
`;

const DroppablePlace = styled.div`
  height: 3px;
  background-color: aquamarine;
`;
