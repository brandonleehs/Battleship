import Coordinate from 'Model/game/Coordinate';
import Ship from 'Model/game/Ship';
import ShipUtil from 'Model/game/ShipUtil';
import SetupEventManager from './SetupEventManager';

export default class SetupEvent {
  setupEventManager: SetupEventManager;

  public constructor(setupEventManager: SetupEventManager) {
    this.setupEventManager = setupEventManager;
  }

  protected getCell = (coordinate: Coordinate): HTMLDivElement | null => {
    return document.querySelector(
      `[data-x-coordinate="${coordinate.getX()}"][data-y-coordinate="${coordinate.getY()}"]`
    );
  };

  protected getCoordinate = (cell: HTMLDivElement): Coordinate => {
    let x = parseInt(cell.getAttribute('data-x-coordinate') as string);
    let y = parseInt(cell.getAttribute('data-y-coordinate') as string);
    return new Coordinate(x, y);
  };

  protected getCoordinatesToHighlight = (
    cell: HTMLDivElement,
    ship: Ship
  ): Coordinate[] => {
    const coordinate = this.getCoordinate(cell);

    const coordinateArr = Array.from(
      ShipUtil.getShipCoordinateSet(ship, coordinate)
    );
    return coordinateArr;
  };
}
