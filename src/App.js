import "./styles.css";
import { useState } from "react";
import Card from "./Card";
import { datas } from "./datas";
import styled from "styled-components";
export default function App() {
  const [todoFullData, setTodoFullData] = useState(datas);
  const [clickedCardID, setClickedCardID] = useState(null);
  const [newPlace, setNewPlace] = useState("UP");
  const todoItems = (type) =>
    todoFullData.map((data) => {
      return data.status === type ? (
        <Card
          key={data.id}
          value={data}
          {...{
            newPlace,
            clickedCardID,
            setClickedCardID,
          }}
        />
      ) : null;
    });

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // if (e.target.className.includes("column")) {
  //   const todos = e.target.children;
  //   const lastChildren = todos[todos.length - 1];
  //   lastChildren.style.background = "skyblue";
  // }

  // const placeInfo = e.target.getBoundingClientRect();
  // const placeY = placeInfo.bottom - e.clientY;
  // const targetHeight = placeInfo.bottom - placeInfo.top;
  // setNewPlace(placeY > targetHeight / 2 ? "UP" : "DOWN");

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedPlace = e.target;
    const currentColumn = droppedPlace.closest(".cardlist");

    const clickedCardID = e.dataTransfer.getData("card_id");
    const clickedCard = document.getElementById(clickedCardID);

    const placeInfo = droppedPlace.getBoundingClientRect();
    const placeY = placeInfo.bottom - e.clientY;
    const targetHeight = placeInfo.bottom - placeInfo.top;
    const insertPlace = placeY > targetHeight / 2 ? "beforebegin" : "afterend";

    droppedPlace.insertAdjacentElement(insertPlace, clickedCard);
    console.log("부모", clickedCard.parentNode);
  };

  return (
    <ColumnBox>
      <Column>
        <h1>TODO</h1>
        <CardList
          id={"column" + 1}
          className="cardlist"
          type="todo"
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          {todoItems("todo")}
        </CardList>
      </Column>

      <Column>
        <h1>DOING</h1>
        <CardList
          id={"column" + 2}
          className="cardlist"
          type="doing"
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          {todoItems("doing")}
        </CardList>
      </Column>

      <Column>
        <h1>DONE</h1>
        <CardList
          id={"column" + 3}
          className="cardlist"
          type="done"
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          {todoItems("done")}
        </CardList>
      </Column>
    </ColumnBox>
  );
}

const ColumnBox = styled.div`
  display: flex;
  gap: 0 10px;
`;

const Column = styled.div`
  width: 200px;
  background-color: pink;
  padding: 10px;
`;

const CardList = styled.div`
  background-color: orange;
  overflow-y: auto;
  height: 500px;
`;
