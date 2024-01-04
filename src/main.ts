import "./styles/main.css";
import { createPlayer } from "./components/player";
import { createShip } from "./components/ships";
import { Gameboard } from "./";

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
const renderBoard = (boardEl: HTMLElement, board: Gameboard, show: boolean) => {
    const boardTop = boardEl.querySelector(".board-top")!;
    boardTop.innerHTML = "";

    for (let i = 0; i < board.boardGrid.length; i++) {
        for (let j = 0; j < board.boardGrid[i].length; j++) {
            const cellEl = document.createElement("cell");
            cellEl.dataset.x = `${i}`;
            cellEl.dataset.y = `${j}`;

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

const boardsContainerEl = document.getElementById("boards-container")!;

const p1BoardEl = createBoardElement("p1-board");
const cpuBoardEl = createBoardElement("cpu-board");

renderBoard(p1BoardEl, p1.gameboard, true);
renderBoard(cpuBoardEl, cpu.gameboard, false);

boardsContainerEl.appendChild(p1BoardEl);
boardsContainerEl.appendChild(cpuBoardEl);

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
gameLoop();
