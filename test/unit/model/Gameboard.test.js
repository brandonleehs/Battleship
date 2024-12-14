import Gameboard from 'Model/Gameboard';
import Coordinate from 'Model/Coordinate';
import Orientation from 'Ships/Orientation';
import Ship from 'Root/__mocks__/MockShip';

// Mock Orientation enum
jest.mock('Ships/Orientation', () => ({ VERTICAL: 0, HORIZONTAL: 1 }));

test('Gameboard of size 27', () => {
  expect(() => new Gameboard(27)).toThrow(
    'Coordinate system has a maximum size of 26x26!'
  );
});

let ship;
let gameboard;

describe('Ship of size 4, Gameboard of size 10', () => {
  describe('Head coordinate', () => {
    beforeEach(() => {
      ship = new Ship(4, Orientation.VERTICAL);
      gameboard = new Gameboard(10);
    });

    test('addShip() with invalid head coordinate (9, 10)', () => {
      expect(() => gameboard.addShip(ship, new Coordinate(9, 10))).toThrow(
        'Head coordinate is out of bounds!'
      );
    });

    test('addShip() with invalid head coordinate (10, 9)', () => {
      expect(() => gameboard.addShip(ship, new Coordinate(9, 10))).toThrow(
        'Head coordinate is out of bounds!'
      );
    });

    test.only('addShip() with valid coordinate (0, 0)', () => {
      gameboard.addShip(ship, new Coordinate(0, 0));
      expect('A1' in gameboard.getCoordinateToShipMap()).toBeTruthy();
    });
  });

  describe('Space', () => {
    beforeEach(() => {
      gameboard = new Gameboard(10);
    });

    test('Insufficient vertical space', () => {
      expect(() => {
        const ship = new Ship(4, Orientation.VERTICAL);
        gameboard.addShip(ship, new Coordinate(9, 7));
      }).toThrow(
        'Insufficient space to place the ship at the specified coordinates.'
      );
    });

    test('Insufficient horizontal space', () => {
      expect(() => {
        const ship = new Ship(4, Orientation.HORIZONTAL);
        gameboard.addShip(ship, new Coordinate(7, 6));
      }).toThrow(
        'Insufficient space to place the ship at the specified coordinates.'
      );
    });

    test('Insufficient vertical and horizontal space', () => {
      expect(() => {
        const ship = new Ship(4, Orientation.VERTICAL);
        gameboard.addShip(ship, new Coordinate(9, 9));
      }).toThrow(
        'Insufficient space to place the ship at the specified coordinates.'
      );
    });

    test('Sufficient space', () => {
      const ship = new Ship(4, Orientation.VERTICAL);
      gameboard.addShip(ship, new Coordinate(6, 6));
      expect('G7' in gameboard.getCoordinateToShipMap()).toBeTruthy();
    });
  });

  describe('Collides', () => {
    test('Same head coordinate', () => {
      expect(() => {
        const ship1 = new Ship(4, Orientation.VERTICAL);
        const ship2 = new Ship(4, Orientation.VERTICAL);
        gameboard.addShip(ship1, new Coordinate(0, 0));
        gameboard.addShip(ship2, new Coordinate(0, 0));
      }).toThrow('Ship collides with another ship');
    });

    describe('Different head coordinate, but ship bodies collide', () => {
      test('Vertial orientation', () => {
        expect(() => {
          const ship1 = new Ship(4, Orientation.VERTICAL);
          const ship2 = new Ship(4, Orientation.VERTICAL);
          gameboard.addShip(ship1, new Coordinate(0, 0));
          gameboard.addShip(ship2, new Coordinate(0, 3));
        }).toThrow('Ship collides with another ship');
      });

      test('Horizontal orientation', () => {
        expect(() => {
          const ship1 = new Ship(4, Orientation.HORIZONTAL);
          const ship2 = new Ship(4, Orientation.HORIZONTAL);
          gameboard.addShip(ship1, new Coordinate(5, 9));
          gameboard.addShip(ship2, new Coordinate(6, 9));
        }).toThrow('Ship collides with another ship');
      });

      test('Vertical and Horizontal orientation', () => {
        expect(() => {
          const ship1 = new Ship(4, Orientation.VERTICAL);
          const ship2 = new Ship(4, Orientation.HORIZONTAL);
          gameboard.addShip(ship1, new Coordinate(4, 4));
          gameboard.addShip(ship2, new Coordinate(2, 5));
        }).toThrow('Ship collides with another ship');
      });
    });

    test('No collision', () => {
      const ship1 = new Ship(4, Orientation.VERTICAL);
      const ship2 = new Ship(4, Orientation.HORIZONTAL);
      gameboard.addShip(ship1, new Coordinate(1, 6));
      gameboard.addShip(ship2, new Coordinate(7, 5));
      expect('B7' in gameboard.getCoordinateToShipMap()).toBeTruthy();
      expect('F8' in gameboard.getCoordinateToShipMap()).toBeTruthy();
    });
  });
});
