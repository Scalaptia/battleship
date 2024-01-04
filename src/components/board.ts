import { Gameboard } from "..";

export const createBoard = (width: number, height: number): Gameboard => {
    let board: Gameboard = {
        boardGrid: Array.from({ length: width }, () =>
            Array.from({ length: height }, () => ({
                ship: null,
                hit: false,
            }))
        ),
        ships: [],
        missedShots: 0,
        placeShip(ship, x, y, vertical) {
            ship = { ...ship };
            this.ships.push(ship);

            if (vertical) {
                for (let i = 0; i < ship.length; i++) {
                    if (this.boardGrid[y + i][x].ship) {
                        this.ships.pop();
                        return false;
                    }

                    this.boardGrid[y + i][x].ship = ship;
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    if (this.boardGrid[y][x + i].ship) {
                        this.ships.pop();
                        return false;
                    }

                    this.boardGrid[y][x + i].ship = ship;
                }
            }

            return true;
        },
        receiveAttack(x, y) {
            const cell = this.boardGrid[y][x];

            if (!cell.hit) {
                cell.hit = true;

                if (cell.ship) {
                    cell.ship.hit();
                    console.log(cell.ship);
                } else {
                    this.missedShots++;
                }
            }
        },
        allSunk() {
            return this.ships.every((ship) => ship.sunk);
        },
    };

    return board;
};
