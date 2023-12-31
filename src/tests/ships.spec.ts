import { createShip } from "../components/ships";

describe("hit", () => {
    it("should increase the number of hits", () => {
        const ship = createShip(3);

        ship.hit();

        expect(ship.hits).toBe(1);
    });

    it("should not increase the number of hits if the ship is sunk", () => {
        const ship = createShip(3);

        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.hits).toBe(3);
    });
});

describe("isSunk", () => {
    it("should return true if the ship is sunk", () => {
        const ship = createShip(3);

        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
    });

    it("should return false if the ship is not sunk", () => {
        const ship = createShip(3);

        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(false);
    });
});
