import Orientation from 'Model/game/Orientation';
import SetupEvent from './SetupEvent';

export default class SetupRotateButton extends SetupEvent {
  public rotate = (): void => {
    let shipToBePlaced = this.setupEventManager.getShipToBePlaced();

    if (shipToBePlaced === null) {
      return;
    }

    shipToBePlaced.setOrientation(
      shipToBePlaced.getOrientation() === Orientation.VERTICAL
        ? Orientation.HORIZONTAL
        : Orientation.VERTICAL
    );
  };
}
