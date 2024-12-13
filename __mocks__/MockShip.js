export default class MockShip {
  size;
  hits = 0;

  constructor(size) {
    this.size = size;
  }

  takesHit = function mockTakesHit() {
    this.hits++;
  };

  isSunk = function mockIsSunk() {
    return this.hits >= this.size;
  };

  getSize = function mockGetSize() {
    return this.size;
  };

  getHits = function mockGetHits() {
    return this.hits;
  };
}
