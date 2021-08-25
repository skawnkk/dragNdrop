import "./styles.css";
import { useState } from "react";
import Card from "./Card";
import { datas } from "./datas";
import styled from "styled-components";
export default function App() {
  const [clickedCardID, setClickedCardID] = useState(null);
  const todoItems = (type) =>
    datas.map((data) => {
      if (data.status === type)
        return (
          <Card
            key={data.id}
            value={data}
            {...{ clickedCardID, setClickedCardID }}
          />
        );
    });

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.target.className.includes("column")) {
      const todos = e.target.children;
      const lastChildren = todos[todos.length - 1];
      lastChildren.style.background = "skyblue";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newPlace = e.target.closest(".card") || e.target.closest(".column");
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    card.style.opacity = 1;

    if (card !== newPlace) card.closest(".column").removeChild(card);
    if (newPlace === e.target.closest(".card"))
      newPlace.insertAdjacentElement("afterend", card);
    else newPlace.appendChild(card);

    //drop이후 lastchildren이 있었다면 다시 효과원복
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
