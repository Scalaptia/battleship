import "./styles/main.css";
import "./styles/boards.css";
import "./styles/ships.css";
import { createPlayer } from "./components/player";
import { createShip } from "./components/ships";
import { Gameboard } from "./";
import { Ship } from "./";

const Ships = {
    Carrier: createShip(5),
    Battleship: createShip(4),
    Cruiser: createShip(3),
    Submarine: createShip(3),
    Destroyer: createShip(2),
};

/* UI */
const renderBoard = (boardEl: HTMLElement, board: Gameboard, show: boolean) => {
    const boardTop = boardEl.querySelector(".board-top")!;
    boardTop.innerHTML = "";

    for (let i = 0; i < board.boardGrid.length; i++) {
        for (let j = 0; j < board.boardGrid[i].length; j++) {
            const cellEl = document.createElement("cell");
            cellEl.dataset.y = `${i}`;
            cellEl.dataset.x = `${j}`;

            if (show) {
                if (board.boardGrid[i][j].ship) {
                    cellEl.classList.add("ship");
                }
            }

            if (board.boardGrid[i][j].ship) {
                if (board.boardGrid[i][j].hit) {
                    if (board.boardGrid[i][j].ship!.sunk) {
                        cellEl.classList.add("sunk");
                    } else {
                        cellEl.classList.add("hit");
                    }
                }
            } else {
                if (board.boardGrid[i][j].hit) {
                    cellEl.classList.add("miss");
                }
            }

            boardTop.appendChild(cellEl);
        }
    }
};

const createBoardElement = (id: string) => {
    const boardEl = document.createElement("board");
    boardEl.id = id;

    const boardTop = document.createElement("div");
    boardTop.classList.add("board-top");
    boardEl.appendChild(boardTop);

    const boardSide = document.createElement("div");
    boardSide.classList.add("board-side");
    boardEl.appendChild(boardSide);

    const boardFront = document.createElement("div");
    boardFront.classList.add("board-front");
    boardEl.appendChild(boardFront);

    return boardEl;
};

/* Create players */
const boardsContainerEl = document.getElementById("boards-container")!;

const p1BoardEl = createBoardElement("p1-board");
boardsContainerEl.appendChild(p1BoardEl);
const p1 = createPlayer("Player 1");
renderBoard(p1BoardEl, p1.gameboard, true);

const cpuBoardEl = createBoardElement("cpu-board");
cpuBoardEl.classList.toggle("hidden");
boardsContainerEl.appendChild(cpuBoardEl);
const cpu = createPlayer("CPU");
renderBoard(cpuBoardEl, cpu.gameboard, false);

/* Place ships scene */
const shipsContainerEl = document.getElementById("ships-container")!;
const shipsEl = document.getElementById("ships")!;
const playButtonEl = document.querySelector(".play-btn")!;

/* Append ships name and element to shipsEl */
for (const ship in Ships) {
    const shipObj = Ships[ship as keyof typeof Ships];

    const shipEl = document.createElement("div");
    shipEl.classList.add("ui-ship");
    shipEl.draggable = true;

    // Create ship cells and append to shipEl
    for (let i = 0; i < shipObj.length; i++) {
        const cellEl = document.createElement("cell");
        cellEl.classList.add("ship");
        shipEl.appendChild(cellEl);
    }

    shipsEl.appendChild(shipEl);
}

const startGame = async () => {
    shipsContainerEl.classList.add("hidden");
    cpuBoardEl.classList.remove("hidden");
    boardsContainerEl.classList.add("isometric");

    gameLoop();
};

playButtonEl.addEventListener("click", startGame);

const placeShips = () => {};
placeShips();

/* Game Loop */

const headerEl = document.getElementById("header")!;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const playerTurn = () => {
    return new Promise((resolve): void => {
        const boardTop = cpuBoardEl.querySelector(".board-top")!;

        boardTop.addEventListener("click", function attack(e) {
            const cellEl = e.target as HTMLElement;
            const x = parseInt(cellEl.dataset.x!);
            const y = parseInt(cellEl.dataset.y!);

            if (cpu.gameboard.boardGrid[x][y].hit) {
                return;
            }

            cpu.gameboard.receiveAttack(x, y);
            renderBoard(cpuBoardEl, cpu.gameboard, false);
            boardTop.removeEventListener("click", attack);
            resolve(() => {});
        });
    });
};

const gameLoop = async () => {
    // Player's turn
    headerEl.textContent = `${p1.name}'s turn`;

    await playerTurn();

    renderBoard(cpuBoardEl, cpu.gameboard, false);
    if (cpu.gameboard.allSunk()) {
        headerEl.textContent = `${p1.name} won!`;
        return;
    }

    // CPU's turn
    headerEl.textContent = `${cpu.name}'s turn`;
    await delay(1000);
    cpu.attackRand(p1.gameboard);
    renderBoard(p1BoardEl, p1.gameboard, true);
    if (p1.gameboard.allSunk()) {
        headerEl.textContent = `${cpu.name} won!`;
        return;
    }

    gameLoop();
};
