import Orientation from 'Model/game/Orientation';
import SetupEvent from './SetupEvent';
import Gameboard from 'Model/game/Gameboard';
import Ship from 'Model/game/Ship';

export default class SetupClearButton extends SetupEvent {
  public clear = (): void => {
    this.setupEventManager.setShipSizes([5, 4, 3, 3, 2]);

    this.setupEventManager.setShipToBePlaced(
      new Ship(
        this.setupEventManager.getShipSizes().shift() as number,
        Orientation.VERTICAL
      )
    );
    this.setupEventManager.setGameboard(
      new Gameboard(this.setupEventManager.getBoardSize())
    );

    const cellList: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.cell');
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].className = 'cell';
    }
  };
}
