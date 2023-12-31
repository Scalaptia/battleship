export type Ship = {
    length: number;
    hits: number;
    sunk: boolean;
    hit(): void;
    isSunk(): boolean;
};
