import { Player } from "../types";
import { createBoard } from "./board";

export const createPlayer = (name: string): Player => {
    let player: Player = {
        name,
        gameboard: createBoard(10, 10),
        attack(opponent, x, y) {
            opponent.receiveAttack(x, y);
        },
    };

    return player;
};
