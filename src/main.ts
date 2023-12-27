import "./styles/main.css";
import { board } from "./components/board";

const boardsContainerEl = document.getElementById("boards-container")!;
const boards = [board(10, 10), board(10, 10)];

boards.forEach((board) => {
    boardsContainerEl.appendChild(board.boardEl);
});
