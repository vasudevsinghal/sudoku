import { useState } from "react";
import { createBoard } from "./utils/board";
import { InputBase } from "@material-ui/core";
import produce from "immer";

function App() {
  let empty = createBoard();
  let [board, setBoard] = useState(empty);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {board.map(function (row, rowIndex) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {row.map(function (item, colIndex) {
              return (
                <InputBase
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "grey",
                    border: "2px solid red",
                    textAlign: "center"
                  }}
                  value={board[rowIndex][colIndex]===-1? "": board[rowIndex][colIndex]}
                  onChange={function (event) {
                    const updated = produce(board, (draftState) => {
                      if (!isNaN(event.target.value)) {
                        draftState[rowIndex][colIndex] = event.target.value%10;
                        console.log(board[rowIndex][colIndex]);
                      }
                    });
                    setBoard(updated);
                  }}
                  defaultValue=""
                  inputProps={{ "aria-label": "naked" }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
