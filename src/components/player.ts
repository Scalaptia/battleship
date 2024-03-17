import { Player } from "..";
import { createBoard } from "./board";

export const createPlayer = (name: string): Player => {
    let player: Player = {
        name,
        gameboard: createBoard(10, 10),
        attack(opponent, x, y) {
            opponent.receiveAttack(x, y);
        },
        attackRand(opponent) {
            let x, y;

            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (opponent.boardGrid[y][x].hit);

            opponent.receiveAttack(y, x);
        },
    };

    return player;
};
