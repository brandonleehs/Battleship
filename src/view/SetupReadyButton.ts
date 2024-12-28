import SetupEvent from './SetupEvent';
import Player from 'Model/player/Player';
import SetupEventManager from './SetupEventManager';
import Setup from './Setup';

export default class SetupReadyButton extends SetupEvent {
  private setup: Setup;

  public constructor(setupEventManager: SetupEventManager, setup: Setup) {
    super(setupEventManager);
    this.setup = setup;
  }

  public ready = (): void => {
    // Check if all ships have been placed
    if (this.setupEventManager.getGameboard().getShipArr().length < 5) {
      alert('Not all ships have been placed.');
      return;
    }

    const player1 = new Player(this.setupEventManager.getBoardSize());
    player1.setGameboard(this.setupEventManager.getGameboard());

    if (this.setup.getPlayer() === 1 && this.setup.getAi()) {
      const player2 = new Player(this.setupEventManager.getBoardSize());
      player2.getGameboard().randomise();
    } else if (this.setup.getPlayer() === 1 && !this.setup.getAi()) {
      this.setup.setPlayer(2);
      this.setup.render();
    } else {
      const player2 = new Player(this.setupEventManager.getBoardSize());
      player2.setGameboard(this.setupEventManager.getGameboard());
    }
    // render game page
  };
}
