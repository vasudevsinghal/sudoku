import { useState } from "react";
import { createBoard, solutionBoard } from "./utils/board";
import { Box, InputBase, Typography, Button } from "@material-ui/core";
import produce from "immer";

function App() {
  let empty = createBoard();
  let solution = solutionBoard();
  let [board, setBoard] = useState(empty);
  let [state, setState] = useState("");

  let handleReset = () => {
    const updated = produce(board, (draftState) => {
      for (const row of draftState) {
        for (const item of row) {
          if (item[1] == 0) {
            item[0] = -1;
          }
        }
      }
    });
    setBoard(updated);
    setState("");
  };

  let handleCheck = () => {
    for (const rowIndex in board) {
     for (const colIndex in board[rowIndex]) {
       if(board[rowIndex][colIndex][0] !== solution[rowIndex][colIndex]){
          setState("Try Again");
          return;
       }
     }
    }
    setState("You Win !");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#cccccc",
      }}
    >
      <Typography
        style={{
          margin: "10px",
        }}
        variant="h2"
      >
        Sudoku
      </Typography>
      <Typography
        style={{
          margin: "10px",
        }}
        variant="h4"
      >
        {state}
      </Typography>
      <Box
        style={{
          background: "#fff",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {board.map(function (row, rowIndex) {
          return (
            <div
              key = {rowIndex}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {row.map(function (item, colIndex) {
                return (
                  <InputBase
                    key = {colIndex}
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "2px solid #000",
                      padding: "15px",
                      color: board[rowIndex][colIndex][1] == 1 ? "blue" : "black"
                    }}
                    value={
                      board[rowIndex][colIndex][0] === -1
                        ? ""
                        : board[rowIndex][colIndex][0]
                    }
                    onChange={function (event) {
                      const updated = produce(board, (draftState) => {
                        if (
                          draftState[rowIndex][colIndex][1] == 0 &&
                          !isNaN(event.target.value) &&
                          event.target.value % 10 !== 0
                        ) {
                          draftState[rowIndex][colIndex][0] =
                            event.target.value % 10;
                        }
                      });
                      setBoard(updated);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </Box>
      <Box
        styles={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{
            margin: "20px",
          }}
          onClick={handleCheck}
        >
          Check
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          style={{
            margin: "20px",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </div>
  );
}

export default App;
