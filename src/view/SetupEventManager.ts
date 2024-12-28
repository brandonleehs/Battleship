import SetupClickEvent from './SetupClickEvent';
import SetupMouseoverEvent from './SetupMouseoverEvent';
import SetupMouseoutEvent from './SetupMouseoutEvent';
import SetupRotateButton from './SetupRotateButton';
import Gameboard from 'Model/game/Gameboard';
import Ship from 'Model/game/Ship';
import Orientation from 'Model/game/Orientation';
import SetupClearButton from './SetupClearButton';
import SetupRandomButton from './SetupRandomButton';

export default class SetupEventManager {
  boardSize: number;
  setupClickEvent: SetupClickEvent;
  setupMouseoverEvent: SetupMouseoverEvent;
  setupMouseoutEvent: SetupMouseoutEvent;
  setupRotateButton: SetupRotateButton;
  setupClearButton: SetupClearButton;
  setupRandomButton: SetupRandomButton;
  private shipSizes: number[];
  private gameboard: Gameboard;
  private shipToBePlaced: Ship | null;

  public constructor(boardSize: number) {
    this.boardSize = boardSize;
    this.setupClickEvent = new SetupClickEvent(this);
    this.setupMouseoverEvent = new SetupMouseoverEvent(this);
    this.setupMouseoutEvent = new SetupMouseoutEvent(this);
    this.setupRotateButton = new SetupRotateButton(this);
    this.setupClearButton = new SetupClearButton(this);
    this.setupRandomButton = new SetupRandomButton(this);

    this.shipSizes = [5, 4, 3, 3, 2];
    this.gameboard = new Gameboard(boardSize);
    this.shipToBePlaced = new Ship(
      this.shipSizes.shift() as number,
      Orientation.VERTICAL
    );
  }

  public bindEvents = (): void => {
    this.bindCells();
    this.bindButtons();
  };

  public bindCells = (): void => {
    const cellList = document.querySelectorAll(
      '.cell'
    ) as NodeListOf<HTMLDivElement>;

    for (let i = 0; i < cellList.length; i++) {
      cellList[i].addEventListener('click', (e: Event): void => {
        this.setupClickEvent.activate(cellList[i]);
      });

      cellList[i].addEventListener('mouseover', (e: Event): void => {
        this.setupMouseoverEvent.highlight(cellList[i]);
      });

      cellList[i].addEventListener('mouseout', (e: Event) => {
        this.setupMouseoutEvent.removeHighlight(cellList[i]);
      });
    }
  };

  public bindButtons = (): void => {
    const rotateButton = document.querySelector('.rotate') as HTMLButtonElement;
    rotateButton.addEventListener('click', (e: Event): void => {
      this.setupRotateButton.rotate();
    });

    const clearButton = document.querySelector('.clear') as HTMLButtonElement;
    clearButton.addEventListener('click', (e: Event): void => {
      this.setupClearButton.clear();
    });

    const randomButton = document.querySelector('.random') as HTMLButtonElement;
    randomButton.addEventListener('click', (e: Event): void => {
      this.setupClearButton.clear();
      this.setupRandomButton.random();
    });
  };

  public getBoardSize = (): number => {
    return this.boardSize;
  };

  public getGameboard = (): Gameboard => {
    return this.gameboard;
  };

  public getShipToBePlaced = (): Ship | null => {
    return this.shipToBePlaced;
  };

  public getShipSizes = (): number[] => {
    return this.shipSizes;
  };

  public setGameboard = (gameboard: Gameboard): void => {
    this.gameboard = gameboard;
  };

  public setShipToBePlaced = (shipToBePlaced: Ship | null): void => {
    this.shipToBePlaced = shipToBePlaced;
  };

  public setShipSizes = (shipSizes: number[]): void => {
    this.shipSizes = shipSizes;
  };
}