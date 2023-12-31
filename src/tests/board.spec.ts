import { createBoard } from "../components/board";
import { createShip } from "../components/ships";

describe("placeShip", () => {
    it("should add the ship to the ships array", () => {
        const board = createBoard();

        board.placeShip(createShip(3), 0, 0, true);
        board.placeShip(createShip(3), 1, 0, true);

        expect(board.ships.length).toBe(2);
    });

    it("should add the ship to the correct cells", () => {
        const board = createBoard();

        board.placeShip(createShip(3), 0, 0, true);

        expect(board.boardGrid[0][0].ship).toBeDefined();
        expect(board.boardGrid[1][0].ship).toBeDefined();
        expect(board.boardGrid[2][0].ship).toBeDefined();
    });

    it("should not add the ship if it overlaps another ship", () => {
        const board = createBoard();

        board.placeShip(createShip(3), 0, 0, true);
        board.placeShip(createShip(4), 0, 0, true);

        expect(board.ships.length).toBe(1);
    });
});
