import "./styles.css";
import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { datas } from "./datas";
import { STATUS_GROUP } from "./constants";
import { getInsertPlace } from "./util/function";
export default function App() {
  const [todoFullData, setTodoFullData] = useState(datas);
  const [markupUpper, setMarkupUpper] = useState(false);
  const [enteredCardID, setEnteredCardID] = useState(null);
  const [clickedCardID, setClickedCardID] = useState(null);

  const todoItems = (type) =>
    todoFullData.map((data) => {
      return data.status === type ? (
        <Card
          key={data.id}
          item={data}
          clickedCardID={clickedCardID}
          setClickedCardID={setClickedCardID}
          markupUpper={markupUpper}
          enteredCardID={enteredCardID}
        />
      ) : null;
    });

  const handleDrop = (e) => {
    e.preventDefault();
    const currentColumn = e.target.closest(".cardlist");
    const clickedCard = document.getElementById(clickedCardID);

    if (e.target === currentColumn) currentColumn.appendChild(clickedCard);
    else e.target.insertAdjacentElement(getInsertPlace(e), clickedCard);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    getInsertPlace(e) === "beforebegin" ? setMarkupUpper(true) : setMarkupUpper(false);
    setEnteredCardID(e.target.id ? +e.target.id : null);
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
