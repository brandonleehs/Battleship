import Gameboard from 'Model/game/Gameboard';

class Player {
  protected boardSize: number;
  protected gameboard: Gameboard;

  constructor(boardSize: number) {
    this.gameboard = new Gameboard(boardSize);
    this.boardSize = boardSize;
  }

  public getGameboard = (): Gameboard => {
    return this.gameboard;
  };

  public setGameboard = (gameboard: Gameboard): void => {
    this.gameboard = gameboard;
  };

  public getBoardSize = (): number => {
    return this.boardSize;
  };
}

export default Player;
