import SetupEvent from './SetupEvent';
import Coordinate from 'Model/game/Coordinate';
import Gameboard from 'Model/game/Gameboard';
import Ship from 'Model/game/Ship';
import ShipUtil from 'Model/game/ShipUtil';

export default class SetupMouseoverEvent extends SetupEvent {
  public highlight = (cell: HTMLDivElement): void => {
    let gameboard = this.setupEventManager.getGameboard();
    let shipToBePlaced = this.setupEventManager.getShipToBePlaced();
    try {
      if (shipToBePlaced === null) {
        return;
      }
      gameboard.checkShipPlacement(shipToBePlaced, this.getCoordinate(cell));

      const coordinateArr = this.getCoordinatesToHighlight(
        cell,
        shipToBePlaced
      );
      coordinateArr.forEach((coordinate) =>
        (this.getCell(coordinate) as HTMLDivElement).classList.add('highlight')
      );
    } catch (e) {}
  };
}
