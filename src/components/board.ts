import { Gameboard } from "..";
import { createShip } from "./ships.ts";

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
                // Check wall collision
                if (y + ship.length > this.boardGrid.length) {
                    this.ships.pop();
                    return false;
                }

                // Check ship collision
                for (let i = 0; i < ship.length; i++) {
                    if (this.boardGrid[y + i][x].ship) {
                        this.ships.pop();
                        return false;
                    }
                }

                // Add ship to board
                for (let i = 0; i < ship.length; i++) {
                    this.boardGrid[y + i][x].ship = ship;
                }
            } else {
                // Check wall collision
                if (x + ship.length > this.boardGrid[0].length) {
                    this.ships.pop();
                    return false;
                }

                // Check ship collision
                for (let i = 0; i < ship.length; i++) {
                    if (this.boardGrid[y][x + i].ship) {
                        this.ships.pop();
                        return false;
                    }
                }

                // Add ship to board
                for (let i = 0; i < ship.length; i++) {
                    this.boardGrid[y][x + i].ship = ship;
                }
            }

            return true;
        },
        receiveAttack(y, x) {
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
        addRandomShip(ship) {
            let placed = false;
            while (!placed) {
                let x = Math.floor(Math.random() * this.boardGrid[0].length);
                let y = Math.floor(Math.random() * this.boardGrid.length);
                let vertical = Math.random() < 0.5;

                placed = this.placeShip(ship, x, y, vertical);
            }
        },
        addRandomShips() {
            this.addRandomShip(createShip(5));
            this.addRandomShip(createShip(4));
            this.addRandomShip(createShip(3));
            this.addRandomShip(createShip(3));
            this.addRandomShip(createShip(2));
        },
    };

    return board;
};
