import Player from 'Model/player/Player';

export default class Game {
  readonly player1: Player;
  readonly player2: Player;
  turn: Turn;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.turn = Turn.PLAYER_1;
  }

  public start = (): void => {};
}

enum Turn {
  PLAYER_1,
  PLAYER_2,
}
