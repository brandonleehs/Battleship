import Ship from './Ship';
import Coordinate from './Coordinate';
import Orientation from 'Model/game/Orientation';
import AttackStatus from 'Model/game/AttackStatus';
import ShipUtil from './ShipUtil';

// Note that the coordinate system is 0-indexed and is taken from the top-left
export default class Gameboard {
  private readonly size: number;
  private shipArr: Array<Ship> = [];
  private coordinateToShipMap: CoordinateToShipMap = {};
  private coordinateToHitMap: CoordinateToHitMap = {};

  public constructor(size: number) {
    if (size > 26) {
      throw new Error('Coordinate system has a maximum size of 26x26!');
    }

    this.size = size;
  }

  public randomise = (): void => {
    // Clear gameboard
    this.shipArr = [];
    this.coordinateToHitMap = {};
    this.coordinateToShipMap = {};

    const coordinateArr: Coordinate[] = [];

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        coordinateArr.push(new Coordinate(x, y));
      }
    }

    const shipSizes = [5, 4, 3, 3, 2];
    for (const shipSize of shipSizes) {
      let done = false;
      while (!done) {
        const orientation =
          Math.round(Math.random()) === 0
            ? Orientation.VERTICAL
            : Orientation.HORIZONTAL;
        const ship = new Ship(shipSize, orientation);

        const coordinate =
          coordinateArr[Math.floor(Math.random() * coordinateArr.length)];

        try {
          this.addShip(ship, coordinate);
          // Remove ship coordinates from coordinateArr
          for (const shipCoordinate of Array.from(
            ShipUtil.getShipCoordinateSet(ship, coordinate)
          )) {
            // Only splice array if item is found
            const index = coordinateArr.indexOf(coordinate);
            if (index > -1) {
              coordinateArr.splice(index, 1);
            }
          }
          done = true;
        } catch (e) {
          // continue
        }
      }
    }
  };

  public checkShipPlacement = (ship: Ship, coordinate: Coordinate): void => {
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
  };

  public addShip = (ship: Ship, coordinate: Coordinate): void => {
    this.checkShipPlacement(ship, coordinate);

    ShipUtil.getShipCoordinateSet(ship, coordinate).forEach(
      (shipCoordinate) => {
        this.coordinateToShipMap[shipCoordinate.toString()] = ship;
        this.coordinateToHitMap[shipCoordinate.toString()] = false;
      }
    );

    this.shipArr.push(ship);
  };

  public receiveAttack = (coordinate: Coordinate): AttackStatus => {
    let hit = false;
    let sink = false;

    if (coordinate.toString() in this.coordinateToHitMap) {
      hit = true;
      // If has not been hit
      if (!this.coordinateToHitMap[coordinate.toString()]) {
        this.coordinateToHitMap[coordinate.toString()] = true;
        const ship = this.coordinateToShipMap[coordinate.toString()];
        ship.takesHit();
        if (ship.isSunk()) {
          sink = true;
        }
      }
    }
    return { hit, sink, coordinate };
  };

  public allShipsSunk = (): boolean => {
    return this.shipArr.every((ship) => ship.isSunk());
  };

  public getSize = (): number => {
    return this.size;
  };

  public getCoordinateToShipMap = (): CoordinateToShipMap => {
    return this.coordinateToShipMap;
  };

  public getCoordinateToHitMap = (): CoordinateToHitMap => {
    return this.coordinateToHitMap;
  };

  public getShipArr = (): Array<Ship> => {
    return this.shipArr;
  };

  private isOOB = (ship: Ship, coordinate: Coordinate): boolean => {
    return coordinate.getX() >= this.size || coordinate.getY() >= this.size;
  };

  private isSpace = (ship: Ship, coordinate: Coordinate): boolean => {
    if (
      ship.getOrientation().valueOf() === Orientation.HORIZONTAL.valueOf() &&
      coordinate.getX() + ship.getSize() > this.size
    ) {
      return false;
    }

    if (
      ship.getOrientation().valueOf() === Orientation.VERTICAL.valueOf() &&
      coordinate.getY() + ship.getSize() > this.size
    ) {
      return false;
    }

    return true;
  };

  private collides = (ship: Ship, coordinate: Coordinate): boolean => {
    // Apparently Set has no intersection method yet
    const shipCoordinateArr = Array.from(
      ShipUtil.getShipCoordinateSet(ship, coordinate)
    );

    for (const shipCoordinate of shipCoordinateArr) {
      if (shipCoordinate.toString() in this.coordinateToHitMap) {
        return true;
      }
    }
    return false;
  };
}

interface CoordinateToShipMap {
  [coordinate: string]: Ship;
}

interface CoordinateToHitMap {
  [coordinate: string]: boolean;
}
