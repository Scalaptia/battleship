import { createBoard } from "../components/board";
import { createShip } from "../components/ships";

describe("placeShip", () => {
    it("should add the ship to the ships array", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(3), 0, 0, true);
        board.placeShip(createShip(3), 1, 0, true);

        expect(board.ships.length).toBe(2);
    });

    it("should add the ship to the correct cells", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(3), 0, 0, true);

        expect(board.boardGrid[0][0].ship).toBeDefined();
        expect(board.boardGrid[1][0].ship).toBeDefined();
        expect(board.boardGrid[2][0].ship).toBeDefined();
    });

    it("should not add the ship if it overlaps another ship", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(3), 0, 0, true);
        board.placeShip(createShip(4), 0, 0, true);

        expect(board.ships.length).toBe(1);
    });
});

describe("receiveAttack", () => {
    it("should mark the cell as hit", () => {
        const board = createBoard(10, 10);

        board.receiveAttack(0, 0);

        expect(board.boardGrid[0][0].hit).toBe(true);
    });

    it("should mark the ship as hit", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(3), 0, 0, true);
        board.receiveAttack(0, 0);

        expect(board.boardGrid[0][0].ship?.hits).toBe(1);
    });

    it("should mark the cell as missed if there is no ship", () => {
        const board = createBoard(10, 10);

        board.receiveAttack(0, 0);

        expect(board.boardGrid[0][0].hit).toBe(true);
        expect(board.missedShots).toBe(1);
    });

    it("should not mark the cell as hit if it has already been hit", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(3), 0, 0, true);
        board.receiveAttack(0, 0);
        board.receiveAttack(0, 0);

        expect(board.boardGrid[0][0].hit).toBe(true);
        expect(board.boardGrid[0][0].ship?.hits).toBe(1);
    });
});

describe("allSunk", () => {
    it("should return true if all ships are sunk", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(1), 0, 0, true);
        board.placeShip(createShip(2), 1, 0, false);

        board.receiveAttack(0, 0);
        board.receiveAttack(1, 0);
        board.receiveAttack(2, 0);

        expect(board.allSunk()).toBe(true);
    });

    it("should return false if not all ships are sunk", () => {
        const board = createBoard(10, 10);

        board.placeShip(createShip(1), 0, 0, true);
        board.placeShip(createShip(1), 1, 0, true);

        board.receiveAttack(0, 0);

        expect(board.allSunk()).toBe(false);
    });
});
