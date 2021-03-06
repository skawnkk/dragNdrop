import styled from "styled-components";
import { useState } from "react";
function Card({ value, newPlace, clickedCardID, setClickedCardID }) {
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
    e.dataTransfer.setData("card_id", value.id);
    setClickedCardID(value.id); //?필요한건가
    setDragStart(true);
    //setTimeout(() => (e.target.style.display = "none"), 0);
  };

  const handleDragEnd = () => setDragStart(false);

  return (
    <>
      {newPlace === "UP" && isDragStart && (
        <NewPlaceMarking>내용</NewPlaceMarking>
      )}
      <CardWrapper
        id={value.id}
        className="card"
        isDragStart={isDragStart}
        draggable={true}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {value.text}
        {value.id}
      </CardWrapper>

      {newPlace === "DOWN" && isDragStart && (
        <NewPlaceMarking>내용</NewPlaceMarking>
      )}
    </>
  );
}
export default Card;
const CardWrapper = styled.div`
  height: 50px;
  margin-bottom: 5px;
  border: 1px solid black;
  background-color: white;
  opacity: ${(props) => (props.isDragStart ? 0.5 : 1)};
`;

const NewPlaceMarking = styled.div`
  height: 3px;
  padding: 1px 0;
  background-color: aquamarine;
`;
