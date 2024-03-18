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

            const checkAdjacent = (x: number, y: number) => {
                const directions = [
                    [-1, 0], // left
                    [1, 0], // right
                    [0, -1], // up
                    [0, 1], // down
                    [-1, -1], // top-left
                    [1, -1], // top-right
                    [-1, 1], // bottom-left
                    [1, 1], // bottom-right
                ];

                for (let i = 0; i < directions.length; i++) {
                    const [dirX, dirY] = directions[i];
                    const newX = x + dirX;
                    const newY = y + dirY;

                    if (
                        newX >= 0 &&
                        newX < this.boardGrid[0].length &&
                        newY >= 0 &&
                        newY < this.boardGrid.length
                    ) {
                        if (this.boardGrid[newY][newX].ship) {
                            return true;
                        }
                    }
                }

                return false;
            };

            const checkCollision = (x: number, y: number) => {
                if (this.boardGrid[y][x].ship) {
                    return true;
                }
                return false;
            };

            if (vertical) {
                // Check wall collision
                if (y + ship.length > this.boardGrid.length) {
                    this.ships.pop();
                    return false;
                }

                // Check ship collision and adjacency
                for (let i = 0; i < ship.length; i++) {
                    if (checkCollision(x, y + i) || checkAdjacent(x, y + i)) {
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

                // Check ship collision and adjacency
                for (let i = 0; i < ship.length; i++) {
                    if (checkCollision(x + i, y) || checkAdjacent(x + i, y)) {
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
