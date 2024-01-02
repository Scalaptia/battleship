import "./styles/main.css";
import { createPlayer } from "./components/player";
import { createShip } from "./components/ships";
import { Gameboard } from "./types";

const Ships = {
    Carrier: createShip(5),
    Battleship: createShip(4),
    Cruiser: createShip(3),
    Submarine: createShip(3),
    Destroyer: createShip(2),
};

const p1 = createPlayer("Player 1");
const cpu = createPlayer("CPU");

p1.gameboard.placeShip(Ships.Carrier, 0, 0, false);
p1.gameboard.placeShip(Ships.Battleship, 0, 1, false);
p1.gameboard.placeShip(Ships.Cruiser, 0, 2, false);
p1.gameboard.placeShip(Ships.Submarine, 0, 3, false);
p1.gameboard.placeShip(Ships.Destroyer, 0, 4, false);

cpu.gameboard.placeShip(Ships.Carrier, 0, 0, false);
cpu.gameboard.placeShip(Ships.Battleship, 0, 1, false);
cpu.gameboard.placeShip(Ships.Cruiser, 0, 2, false);
cpu.gameboard.placeShip(Ships.Submarine, 0, 3, false);
cpu.gameboard.placeShip(Ships.Destroyer, 0, 4, false);

/* UI */
const fillBoard = (boardEl: HTMLDivElement, board: Gameboard) => {
    for (let i = 0; i < board.boardGrid.length; i++) {
        for (let j = 0; j < board.boardGrid[i].length; j++) {
            const cellEl = document.createElement("div");

            cellEl.classList.add("cell");

            if (board.boardGrid[i][j].hit) {
                cellEl.classList.add("hit");
            }

            if (board.boardGrid[i][j].ship) {
                cellEl.classList.add("ship");
            }

            boardEl.appendChild(cellEl);
        }
    }
};

const boardsContainerEl = document.getElementById("boards-container")!;

const p1BoardEl = document.createElement("div");
p1BoardEl.id = "p1-board";
p1BoardEl.classList.add("board");

const cpuBoardEl = document.createElement("div");
cpuBoardEl.id = "cpu-board";
cpuBoardEl.classList.add("board");

fillBoard(p1BoardEl, p1.gameboard);
fillBoard(cpuBoardEl, cpu.gameboard);

boardsContainerEl.appendChild(p1BoardEl);
boardsContainerEl.appendChild(cpuBoardEl);
