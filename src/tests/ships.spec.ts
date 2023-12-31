import { createShip } from "../components/ships";

describe("createShip", () => {
    it("should create a ship object with the specified length", () => {
        const length = 3;
        const ship = createShip(length);

        expect(ship).toBeDefined();
        expect(ship.length).toBe(length);
        expect(ship.hits).toEqual(0);
    });
});

describe("hit", () => {
    it("should add a hit to the ship", () => {
        const ship = createShip(3);

        ship.hit();

        expect(ship.hits).toEqual(1);
    });
    it("should not add a hit to the ship if it is sunk", () => {
        const ship = createShip(3);

        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.hits).toEqual(3);
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
