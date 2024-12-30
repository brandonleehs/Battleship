import Player from 'Model/player/Player';

export default class Game {
  private player1: Player;
  private player2: Player;
  private turn: Turn;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.turn = Turn.PLAYER_1;
  }

  public start = (): void => {};

  public getPlayer1 = (): Player => {
    return this.player1;
  };

  public getPlayer2 = (): Player => {
    return this.player2;
  };

  public getTurn = (): Turn => {
    return this.turn;
  };
}

enum Turn {
  PLAYER_1,
  PLAYER_2,
}
