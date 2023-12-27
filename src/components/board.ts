import "../styles/board.css";

export const board = (width: number, height: number) => {
    const boardGrid = [];

    for (let i = 0; i < height; i++) {
        const row: HTMLDivElement[] = [];

        for (let j = 0; j < width; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.push(cell);
        }

        boardGrid.push(row);
    }

    const boardEl = document.createElement("div");
    boardEl.classList.add("board");

    boardGrid.forEach((row) => {
        row.forEach((cell) => {
            boardEl.appendChild(cell);
        });
    });

    return {
        boardGrid,
        boardEl,
    };
};
