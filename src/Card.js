import styled from "styled-components";
import { useState } from "react";
function Card({ item, setClickedCardID }) {
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

  return (
    <>
      <CardWrapper
        id={item.id}
        className="card"
        isDragStart={isDragStart}
        draggable={true}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        {item.text}
        {item.id}
      </CardWrapper>
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
