import { createPlayer } from "../components/player";

describe("attack", () => {
    it("should call the opponent's receiveAttack method", () => {
        const player1 = createPlayer("Player 1");
        const player2 = createPlayer("Player 2");

        player1.attack(player2.gameboard, 0, 0);

        expect(player2.gameboard.boardGrid[0][0].hit).toBe(true);
    });
});
