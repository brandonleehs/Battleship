import Gameboard from 'Model/game/Gameboard';
import Orientation from 'Model/game/Orientation';
import Ship from 'Model/game/Ship';
import SetupEvent from './SetupEvent';

export default class SetupClickEvent extends SetupEvent {
  public activate = (cell: HTMLDivElement): void => {
    let gameboard = this.setupEventManager.getGameboard();
    let shipToBePlaced = this.setupEventManager.getShipToBePlaced();
    let shipSizes = this.setupEventManager.getShipSizes();

    if (shipToBePlaced === null) {
      return;
    }
    try {
      gameboard.addShip(shipToBePlaced, this.getCoordinate(cell));

      const coordinateArr = this.getCoordinatesToHighlight(
        cell,
        shipToBePlaced
      );
      coordinateArr.forEach((coordinate) => {
        const cell = this.getCell(coordinate) as HTMLDivElement;
        cell.classList.remove('highlight');
        cell.classList.add('active');
      });

      if (shipSizes.length > 0) {
        this.setupEventManager.setShipToBePlaced(
          new Ship(shipSizes.shift() as number, Orientation.VERTICAL)
        );
      } else {
        this.setupEventManager.setShipToBePlaced(null);
      }
    } catch (e) {}
  };
}
