import "./styles.css";
import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { datas } from "./datas";
import { STATUS_GROUP } from "./constants";
export default function App() {
  const [todoFullData, setTodoFullData] = useState(datas);
  const [clickedCardID, setClickedCardID] = useState(null);

  const todoItems = (type) =>
    todoFullData.map((data) => {
      return data.status === type ? (
        <Card key={data.id} item={data} setClickedCardID={setClickedCardID} />
      ) : null;
    });

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedPlace = e.target;
    const currentColumn = droppedPlace.closest(".cardlist");
    const clickedCard = document.getElementById(clickedCardID);

    if (e.target === currentColumn) currentColumn.appendChild(clickedCard);
    else {
      const placeInfo = droppedPlace.getBoundingClientRect();
      const placeY = placeInfo.bottom - e.clientY;
      const targetHeight = placeInfo.bottom - placeInfo.top;
      const insertPlace = placeY > targetHeight / 2 ? "beforebegin" : "afterend";

      droppedPlace.insertAdjacentElement(insertPlace, clickedCard);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const title = (status) => status.toUpperCase();
  return (
    <ColumnBox>
      {STATUS_GROUP.map((status, idx) => (
        <Column key={idx} id={`column${idx}`}>
          <h1>{title(status)}</h1>
          <CardList className="cardlist" onDragOver={handleDragOver} onDrop={handleDrop}>
            {todoItems(status)}
          </CardList>
        </Column>
      ))}
    </ColumnBox>
  );
}

const ColumnBox = styled.div`
  display: flex;
  height: 500px;
  gap: 0 10px;
`;

const Column = styled.div`
  width: 200px;
  background-color: pink;
  padding: 10px;
  h1 {
    text-align: center;
  }
`;

const CardList = styled.div`
  background-color: orange;
  height: 400px;
  overflow-y: auto;
`;
