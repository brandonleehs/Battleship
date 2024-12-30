import Gameboard from 'Model/game/Gameboard';
import Orientation from 'Model/game/Orientation';
import Ship from 'Model/game/Ship';
import SetupEvent from './SetupEvent';

export default class SetupClickEvent extends SetupEvent {
  public activate = (cell: HTMLDivElement, player: number): void => {
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

      let highlight = player === 1 ? 'highlight--blue' : 'highlight--red';
      let active = player === 1 ? 'active--blue' : 'active--red';

      coordinateArr.forEach((coordinate) => {
        const cell = this.getCell(coordinate) as HTMLDivElement;
        cell.classList.remove(highlight);
        cell.classList.add(active);
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
