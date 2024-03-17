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
    receiveAttack(y: number, x: number): void;
    allSunk(): boolean;
    addRandomShip(ship: Ship): void;
    addRandomShips(): void;
};

export type Player = {
    name: string;
    gameboard: Gameboard;
    attack(opponent: Gameboard, x: number, y: number): void;
    attackRand(opponent: Gameboard): void;
};
