import Ship from './ships/Ship';
import Coordinate from './Coordinate';
import Orientation from 'Ships/Orientation';

// Note that the coordinate system is 0-indexed and is taken from the top-left
export default class Gameboard {
  private readonly size: number;
  private coordinateToShipMap: CoordinateToShipMap = {};
  private coordinateSet = new Set<Coordinate>();

  public constructor(size: number) {
    if (size > 26) {
      throw new Error('Coordinate system has a maximum size of 26x26!');
    }

    this.size = size;
  }

  public addShip = (ship: Ship, coordinate: Coordinate): void => {
    if (this.isOOB(ship, coordinate)) {
      throw new Error('Head coordinate is out of bounds!');
    }

    if (!this.isSpace(ship, coordinate)) {
      throw new Error(
        'Insufficient space to place the ship at the specified coordinates.'
      );
    }

    if (this.collides(ship, coordinate)) {
      throw new Error('Ship collides with another ship');
    }

    this.getShipCoordinateSet(ship, coordinate).forEach((shipCoordinate) =>
      this.coordinateSet.add(shipCoordinate)
    );
    this.coordinateToShipMap[coordinate.toString()] = ship;
  };

  public getSize = (): number => {
    return this.size;
  };

  public getCoordinateToShipMap = (): CoordinateToShipMap => {
    return this.coordinateToShipMap;
  };

  public getCoordinateSet = (): Set<Coordinate> => {
    return this.coordinateSet;
  };

  private isOOB = (ship: Ship, coordinate: Coordinate): boolean => {
    return coordinate.getX() >= this.size || coordinate.getY() >= this.size;
  };

  private isSpace = (ship: Ship, coordinate: Coordinate): boolean => {
    if (ship.getOrientation().valueOf() === Orientation.HORIZONTAL.valueOf()) {
      if (coordinate.getX() + ship.getSize() > this.size) {
        return false;
      }
    }

    if (coordinate.getY() + ship.getSize() > this.size) {
      return false;
    }
    return true;
  };

  private collides = (ship: Ship, coordinate: Coordinate): boolean => {
    // Apparently Set has no intersection method yet
    const shipCoordinateArr = Array.from(
      this.getShipCoordinateSet(ship, coordinate)
    );

    for (const shipCoordinate of shipCoordinateArr) {
      if (shipCoordinate.toString() in this.coordinateToShipMap) {
        return true;
      }
    }
    return false;
  };

  private getShipCoordinateSet = (
    ship: Ship,
    coordinate: Coordinate
  ): Set<Coordinate> => {
    const coordinateSet = new Set([coordinate]);
    for (let i = 1; i < ship.getSize(); i++) {
      if (ship.getOrientation.valueOf() === Orientation.HORIZONTAL) {
        coordinateSet.add(
          new Coordinate(coordinate.getX() + i, coordinate.getY())
        );
      } else {
        coordinateSet.add(
          new Coordinate(coordinate.getX(), coordinate.getY() + i)
        );
      }
    }
    return coordinateSet;
  };
}

interface CoordinateToShipMap {
  [coordinate: string]: Ship;
}
