import Coordinate from 'Model/game/Coordinate';
import SetupEvent from './SetupEvent';

export default class SetupRandomButton extends SetupEvent {
  public random = (): void => {
    let gameboard = this.setupEventManager.getGameboard();

    gameboard.randomise();

    for (const coordinate in gameboard.getCoordinateToShipMap()) {
      const cell = this.getCell(
        Coordinate.fromString(coordinate)
      ) as HTMLDivElement;
      cell.classList.add('active');
    }
    this.setupEventManager.setShipSizes([]);
    this.setupEventManager.setShipToBePlaced(null);
  };
}
