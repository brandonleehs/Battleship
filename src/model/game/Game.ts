import Player from 'Model/player/Player';
import Turn from './Turn';

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

  public setTurn = (turn: Turn): void => {
    this.turn = turn;
  };

  public isOver = (): boolean => {
    return (
      this.player1.getGameboard().allShipsSunk() ||
      this.player2.getGameboard().allShipsSunk()
    );
  };
}
