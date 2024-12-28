import Coordinate from 'Model/game/Coordinate';
import SetupEvent from './SetupEvent';

export default class SetupRandomButton extends SetupEvent {
  public random = (player: number): void => {
    let gameboard = this.setupEventManager.getGameboard();

    gameboard.randomise();

    for (const coordinate in gameboard.getCoordinateToShipMap()) {
      const cell = this.getCell(
        Coordinate.fromString(coordinate)
      ) as HTMLDivElement;
      let active = player === 1 ? 'active--blue' : 'active--red';

      cell.classList.add(active);
    }
    this.setupEventManager.setShipSizes([]);
    this.setupEventManager.setShipToBePlaced(null);
  };
}
