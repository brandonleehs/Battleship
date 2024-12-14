import Coordinate from 'Model/Coordinate';

describe('(2, 1) is compared with (1, 2)', () => {
  test('equals() with (2, 1)', () => {
    const coordinate21 = new Coordinate(2, 1);
    const coordinate12 = new Coordinate(1, 2);
    expect(coordinate21.equals(coordinate12)).toBeFalsy();
  });

  test('equals() with (1, 2)', () => {
    const coordinate21 = new Coordinate(2, 1);
    const coordinate12 = new Coordinate(1, 2);
    expect(coordinate12.equals(coordinate21)).toBeFalsy();
  });
});

describe('(2, 1) is compared with (2, 1)', () => {
  test('equals()', () => {
    const coordinate1 = new Coordinate(2, 1);
    const coordinate2 = new Coordinate(2, 1);
    expect(coordinate1.equals(coordinate2)).toBeTruthy();
    expect(coordinate2.equals(coordinate1)).toBeTruthy();
  });
});

describe('Coordinate of (0, 0)', () => {
  test('toString()', () => {
    const coordinate = new Coordinate(0, 0);
    expect(coordinate.toString()).toBe('A1');
  });
});

describe('Coordinate of (25, 25)', () => {
  test('toString()', () => {
    const coordinate = new Coordinate(25, 25);
    expect(coordinate.toString()).toBe('Z26');
  });
});

describe('Coordinate of (25, 26)', () => {
  test('Coordinate()', () => {
    expect(() => new Coordinate(25, 26)).toThrow(
      'Coordinate system has a maximum limit of 25 by 25!'
    );
  });
});

describe('Coordinate of (26, 25)', () => {
  test('Coordinate()', () => {
    expect(() => new Coordinate(26, 25)).toThrow(
      'Coordinate system has a maximum limit of 25 by 25!'
    );
  });
});

describe('Coordinate of (26, 26)', () => {
  test('Coordinate()', () => {
    expect(() => new Coordinate(26, 26)).toThrow(
      'Coordinate system has a maximum limit of 25 by 25!'
    );
  });
});
