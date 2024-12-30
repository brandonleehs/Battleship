import View from './View';
import SetupEventManager from './SetupEventManager';

export default class Setup extends View {
  private boardSize: number;
  private ai: boolean;
  private player: number;
  setupEventManager: SetupEventManager;

  constructor(options: options) {
    super();
    Object.assign(this, options);
    this.player = 1;
  }

  public render = (): void => {
    this.createElements();
    this.bindEvents();
  };

  private createElements = (): void => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const asciiUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let cells = '';

    for (let row = 0; row < this.boardSize + 1; row++) {
      for (let col = 0; col < this.boardSize + 1; col++) {
        if (!row) {
          cells += !col
            ? `<div class="cell"></div>`
            : `<div class="cell">${asciiUppercase.charAt(col - 1)}</div>`;
        } else {
          cells += !col
            ? `<div class="cell">${row}</div>`
            : `<div class="cell" data-x-coordinate="${
                col - 1
              }" data-y-coordinate="${row - 1}"></div>`;
        }
      }
    }

    let boardView = `<section class="boardView grid grid-rows-${
      this.boardSize + 1
    } grid-cols-${
      this.boardSize + 1
    } text-xs outline outline-neutral-900 outline-[2px]">${cells}</section>`;

    let alertColor = '';
    let playerDisplay = '';
    if (this.player === 1) {
      alertColor = 'bg-blue-200 text-blue-700';
      playerDisplay = 'Player 1';
    } else {
      alertColor = 'bg-red-200 text-red-700';
      playerDisplay = 'Player 2';
    }

    body.innerHTML = `
    <p class="fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Place your ships!</p>
    <main class="grid place-items-center gap-4 bg-neutral-200 p-4 rounded-lg text-neutral-900">
    <p class="[text-shadow:none] font-bold text-lg bg-gray-400 w-full text-center jagged py-1">${playerDisplay}</p>
    ${boardView}
    <section class="w-full grid grid-cols-2 grid-rows-2 gap-4 [&_button]:font-bold [&_button]:border-solid [&_button]:border-neutral-900 [&_button]:border-[2px] [&_button]:rounded-md [&_button]:px-5 [&_button]:py-1">
    <button type="button" class="rotate">Rotate</button>
    <button type="button" class="random">Random</button>
    <button type="button" class="clear">Clear</button>
    <button type="button" class="ready">Ready</button>
    </section>
    </main>`;
  };

  public getBoardSize = (): number => {
    return this.boardSize;
  };

  public getPlayer = (): number => {
    return this.player;
  };

  public setPlayer = (player: number): void => {
    this.player = player;
  };

  public getAi = (): boolean => {
    return this.ai;
  };

  private bindEvents = (): void => {
    this.setupEventManager = new SetupEventManager(this);
    this.setupEventManager.bindEvents();
  };
}

interface options {
  boardSize: number;
  ai: boolean;
}
