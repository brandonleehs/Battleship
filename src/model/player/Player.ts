import Gameboard from 'Model/game/Gameboard';

class Player {
  private boardSize: number;
  private gameboard: Gameboard;
  private ai: boolean;
  private moves = 0;
  private hits: string[];
  private misses: string[];

  constructor(boardSize: number) {
    this.gameboard = new Gameboard(boardSize);
    this.boardSize = boardSize;
    this.ai = false;
    this.hits = [];
    this.misses = [];
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

  public getAi = (): boolean => {
    return this.ai;
  };

  public setAi = (ai: boolean): void => {
    this.ai = ai;
  };

  public getMoves = (): number => {
    return this.moves;
  };

  public incrementMoves = (): void => {
    this.moves++;
  };

  public getHits = (): string[] => {
    return this.hits;
  };

  public getMisses = (): string[] => {
    return this.misses;
  };

  public addHit = (hit: string): void => {
    this.hits.push(hit);
  };

  public addMiss = (miss: string): void => {
    this.misses.push(miss);
  };
}

export default Player;
