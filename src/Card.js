import styled from "styled-components";
import { useState } from "react";
function Card({ value, clickedCardID, setClickedCardID }) {
  const [isDragStart, setDragStart] = useState(false);
  const handleDragEnd = () => {
    setDragStart(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (+e.target.id === clickedCardID) return;
    //else markUpNewPlace(e.target);
    else e.target.style.background = "skyblue";
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("card_id", value.id);
    setDragStart(true);
    setClickedCardID(value.id);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    console.log("leave");
    e.target.style.background = "white";
  };

  return (
    <CardWrapper
      id={value.id}
      className="card"
      isDragStart={isDragStart}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      {value.text}
      {value.id}
    </CardWrapper>
  );
}
export default Card;
const CardWrapper = styled.div`
  border: 1px solid black;
  height: 50px;
  background-color: white;
  opacity: ${(props) => (props.isDragStart ? 0.5 : 1)};
  border: 1px solid ${(props) => (props.isDragStart ? "grey" : "black")};
  margin-top: 5px;
  .line {
    padding: 1px 0;
    height: 3px;
    font-size: 3px;
    height: 3px;
    background-color: "aquamarine";
  }
`;
