import "./styles/main.css";
import { createBoard } from "./components/board";

const boardsContainerEl = document.getElementById("boards-container")!;
const boards = [createBoard(10, 10), createBoard(10, 10)];

boards.forEach((board) => {
    boardsContainerEl.appendChild(board.boardEl);
});
