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
            setClickedCardID
          }}
        />
      ) : null;
    });

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("drag");

    // if (e.target.className.includes("column")) {
    //   const todos = e.target.children;
    //   const lastChildren = todos[todos.length - 1];
    //   lastChildren.style.background = "skyblue";
    // }

    // const placeInfo = e.target.getBoundingClientRect();
    // const placeY = placeInfo.bottom - e.clientY;
    // const targetHeight = placeInfo.bottom - placeInfo.top;
    // setNewPlace(placeY > targetHeight / 2 ? "UP" : "DOWN");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const clickedCardID = e.dataTransfer.getData("card_id");
    const clickedCard = document.getElementById(clickedCardID);
    clickedCard.style.display = "block";

    const placeInfo = e.target.getBoundingClientRect();
    const placeY = placeInfo.bottom - e.clientY;
    const targetHeight = placeInfo.bottom - placeInfo.top;
    let targetIndex = getNewPlaceIndex(e.target.id);
    targetIndex = placeY > targetHeight / 2 ? targetIndex - 1 : targetIndex + 1;

    function getNewPlaceIndex(id) {
      const droppedColumn = Array.from(e.target.closest(".column").childNodes);
      const idArray = droppedColumn.map((el) => el.id);
      return idArray.indexOf(id);
    }
    const newPlace = e.target.closest(".card") || e.target.closest(".column");

    //처음위치와 달라진 경우

    if (newPlace === e.target.closest(".card"))
      newPlace.insertAdjacentElement("afterend", clickedCard);
    else newPlace.appendChild(clickedCard);
  };

  return (
    <ColumnBox>
      <Column>
        <h1>TODO</h1>
        <CardList
          id={"column" + 1}
          className="column"
          type="todo"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {todoItems("todo")}
        </CardList>
      </Column>

      <Column>
        <h1>DOING</h1>
        <CardList
          id={"column" + 2}
          className="column"
          type="doing"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {todoItems("doing")}
        </CardList>
      </Column>

      <Column>
        <h1>DONE</h1>
        <CardList
          id={"column" + 3}
          className="column"
          type="done"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {todoItems("done")}
        </CardList>
      </Column>
    </ColumnBox>
  );
}

const ColumnBox = styled.div`
  display: flex;
`;
const Column = styled.div`
  width: 200px;
  background-color: pink;
  padding: 10px;
  margin-right: 10px;
`;

const CardList = styled.div`
  height: 500px;
  overflow-y: auto;
`;
