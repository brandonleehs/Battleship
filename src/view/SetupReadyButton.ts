import SetupEvent from './SetupEvent';
import Player from 'Model/player/Player';

export default class SetupReadyButton extends SetupEvent {
  public ready = (): void => {
    // render game page
    const player1 = new Player(this.setupEventManager.getBoardSize());
    const player2 = new Player(this.setupEventManager.getBoardSize());

    player1.setGameboard(this.setupEventManager.getGameboard());
    player2.getGameboard().randomise();
  };
}
