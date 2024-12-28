import Ship from './Ship';
import Coordinate from './Coordinate';
import Orientation from './Orientation';

export default class ShipUtil {
  private constructor() {}

  public static getShipCoordinateSet = (
    ship: Ship,
    coordinate: Coordinate
  ): Set<Coordinate> => {
    const coordinateSet = new Set([coordinate]);
    for (let i = 1; i < ship.getSize(); i++) {
      if (
        ship.getOrientation().valueOf() === Orientation.HORIZONTAL.valueOf()
      ) {
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
