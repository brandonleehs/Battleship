import Gameboard from 'Model/game/Gameboard';
import SetupEvent from './SetupEvent';
import Ship from 'Model/game/Ship';

export default class SetupMouseoutEvent extends SetupEvent {
  public removeHighlight = (cell: HTMLDivElement, player: number): void => {
    let gameboard = this.setupEventManager.getGameboard();
    let shipToBePlaced = this.setupEventManager.getShipToBePlaced();

    if (shipToBePlaced === null) {
      return;
    }
    try {
      gameboard.checkShipPlacement(shipToBePlaced, this.getCoordinate(cell));

      const coordinateArr = this.getCoordinatesToHighlight(
        cell,
        shipToBePlaced
      );
      let highlight = player === 1 ? 'highlight--blue' : 'highlight--red';

      coordinateArr.forEach((coordinate) =>
        (this.getCell(coordinate) as HTMLDivElement).classList.remove(highlight)
      );
    } catch (e) {}
  };
}
