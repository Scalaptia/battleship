import { Ship } from "../types";

export const createShip = (length: number): Ship => {
    const ship: Ship = {
        length,
        hits: 0,
        sunk: false,
        hit() {
            if (!this.isSunk()) {
                this.hits++;
            }
        },
        isSunk() {
            return this.hits === this.length;
        },
    };

    return ship;
};
