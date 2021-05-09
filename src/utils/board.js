let createBoard = function () {
    let board = [];
    for (let index = 0; index < 9; index++) {
      let arr = [];
      for (let ind = 0; ind < 9; ind++) {
        arr.push(-1);
      }
      board.push(arr);
    }
    return board;
  };
  
export { createBoard };
  