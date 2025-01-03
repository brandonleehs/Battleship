import SetupEvent from './SetupEvent';
import SetupEventManager from './SetupEventManager';
import Setup from './Setup';
import Play from './Play';

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
    const player1 = this.setupEventManager.getSetup().getPlayer1();
    const player2 = this.setupEventManager.getSetup().getPlayer2();

    if (this.setup.getPlayer() === 1 && this.setup.getAi()) {
      player1.setGameboard(this.setupEventManager.getGameboard());
      player2.getGameboard().randomise();
      player2.setAi(true);

      const play = new Play(player1, player2);
      play.render();
    } else if (this.setup.getPlayer() === 1 && !this.setup.getAi()) {
      player1.setGameboard(this.setupEventManager.getGameboard());
      this.setup.setPlayer(2);
      this.setup.render();
    } else {
      player2.setGameboard(this.setupEventManager.getGameboard());

      const play = new Play(player1, player2);
      play.render();
    }
  };
}
