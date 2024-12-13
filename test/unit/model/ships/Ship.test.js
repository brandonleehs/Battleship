import Ship from 'Ships/Ship';

function mockTakesHit() {
  this.hits++;
}

function mockIsSunk() {
  return this.hits >= this.size;
}

function mockGetSize() {
  return this.size;
}

function mockGetHits() {
  return this.hits;
}

jest.mock('Ships/Ship', () => {
  return function Ship(size) {
    this.size = size;
    this.hits = 0;
    this.takesHit = mockTakesHit;
    this.isSunk = mockIsSunk;
    this.getSize = mockGetSize;
    this.getHits = mockGetHits;
  };
});

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
