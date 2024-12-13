import Ship from 'Root/__mocks__/MockShip';

let ship;

describe('Ship of size 5', () => {
  beforeEach(() => {
    ship = new Ship(5);
  });

  describe('takesHit() is called', () => {
    test('1 hit', () => {
      ship.takesHit();
      expect(ship.getHits()).toBe(1);
    });
  });

  describe('isSunk() is called', () => {
    test('No hits', () => {
      expect(ship.isSunk()).toBeFalsy();
    });

    test('5 hits', () => {
      for (let i = 0; i < 5; i++) {
        ship.takesHit();
      }
      expect(ship.isSunk()).toBeTruthy();
    });
  });
});
