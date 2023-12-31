export type Ship = {
    length: number;
    hits: number;
    sunk: boolean;
    hit(): void;
    isSunk(): boolean;
};

type Cell = {
    ship: Ship | null;
    hit: boolean;
};

export type Gameboard = {
    boardGrid: Cell[][];
    ships: Ship[];
    missedShots: number;
    placeShip(ship: Ship, x: number, y: number, vertical: boolean): boolean;
    receiveAttack(x: number, y: number): void;
    allSunk(): boolean;
};
