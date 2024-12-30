import Player from 'Model/player/Player';
import View from './View';
import Game from 'Model/game/Game';

export default class Play extends View {
  private game: Game;

  public constructor(player1: Player, player2: Player) {
    super();
    this.game = new Game(player1, player2);
  }

  public render = (): void => {
    this.createElements(1);
    this.bindEvents();
  };

  private createElements = (player: number): void => {
    const body = document.querySelector('body') as HTMLBodyElement;

    let alertColor = '';
    let playerDisplay = '';
    let otherPlayer: number;

    if (player === 1) {
      alertColor = 'bg-blue-200 text-blue-700';
      playerDisplay = 'Player 1';
      otherPlayer = 2;
    } else {
      alertColor = 'bg-red-200 text-red-700';
      playerDisplay = 'Player 2';
      otherPlayer = 1;
    }

    body.innerHTML = `
    <p class="fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Scroll/Swipe/Click to switch boards</p>
    <main class="grid place-items-center gap-1 lg:gap-2 bg-neutral-200 p-4 rounded-lg text-neutral-900">
    <p class="[text-shadow:none] font-bold text-lg md:text-xl bg-gray-400 w-full text-center jagged py-1">${playerDisplay}</p>
    <p class="[text-shadow:none] font-semibold text-center md:text-lg board-label">Your board</p>
    <div class="grid gap-2">
    <section class="playView overflow-scroll flex items-center">
    ${this.getBoardView(player)}
    ${this.getBoardView(otherPlayer)}
    </section>
    <div class="flex justify-center items-center gap-2">
    <a class="scroll-button scroll-button--active scroll-button-primary" id="scroll-button-${player}"></a>
    <a class="scroll-button scroll-button-secondary" id="scroll-button-${otherPlayer}"></a>
    </div>
    </div>
    </main>`;

    (document.querySelector(`#board-${player}`) as HTMLElement).classList.add(
      'primary-board'
    );
    (
      document.querySelector(`#board-${otherPlayer}`) as HTMLElement
    ).classList.add('secondary-board');
  };

  private bindEvents = (): void => {
    const scrollButton1 = document.querySelector(
      '#scroll-button-1'
    ) as HTMLAnchorElement;
    const scrollButton2 = document.querySelector(
      '#scroll-button-2'
    ) as HTMLAnchorElement;
    const playView = document.querySelector('.playView') as HTMLElement;
    const board1 = document.querySelector('#board-1') as HTMLElement;
    const board2 = document.querySelector('#board-1') as HTMLElement;
    const boardLabel = document.querySelector(
      '.board-label'
    ) as HTMLParagraphElement;

    playView.addEventListener('wheel', (e: WheelEvent): void => {
      e.preventDefault();
      const primaryScrollButton = document.querySelector(
        '.scroll-button-primary'
      ) as HTMLAnchorElement;
      const secondaryScrollButton = document.querySelector(
        '.scroll-button-secondary'
      ) as HTMLAnchorElement;

      if (
        e.deltaY > 0 &&
        primaryScrollButton.classList.contains('scroll-button--active')
      ) {
        primaryScrollButton.classList.toggle('scroll-button--active');
        secondaryScrollButton.classList.toggle('scroll-button--active');
        boardLabel.innerText = 'Enemy board';
        playView.scrollLeft += 300;
      } else if (
        e.deltaY < 0 &&
        !primaryScrollButton.classList.contains('scroll-button--active')
      ) {
        primaryScrollButton.classList.toggle('scroll-button--active');
        secondaryScrollButton.classList.toggle('scroll-button--active');
        boardLabel.innerText = 'Your board';
        playView.scrollLeft -= 300;
      }
    });

    scrollButton1.addEventListener('click', (e: Event): void => {
      if (scrollButton1.classList.contains('scroll-button--active')) {
        return;
      }
      (document.querySelector('#board-1') as HTMLElement).scrollIntoView();
      scrollButton1.classList.toggle('scroll-button--active');
      scrollButton2.classList.toggle('scroll-button--active');
      if (board1.classList.contains('primary-board')) {
        boardLabel.innerText = 'Enemy board';
      } else {
        boardLabel.innerText = 'Your board';
      }
    });

    scrollButton2.addEventListener('click', (e: Event): void => {
      if (scrollButton2.classList.contains('scroll-button--active')) {
        return;
      }
      (document.querySelector('#board-2') as HTMLElement).scrollIntoView();
      scrollButton2.classList.toggle('scroll-button--active');
      scrollButton1.classList.toggle('scroll-button--active');

      if (board2.classList.contains('primary-board')) {
        boardLabel.innerText = 'Enemy board';
      } else {
        boardLabel.innerText = 'Your board';
      }
    });
  };

  private getBoardView = (player: number): string => {
    const asciiUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let cells = '';
    let boardSize = this.game.getPlayer1().getBoardSize();

    for (let row = 0; row < boardSize + 1; row++) {
      for (let col = 0; col < boardSize + 1; col++) {
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

    let boardView = `<section id="board-${player}" class="boardView flex-shrink-0 grid grid-rows-${
      boardSize + 1
    } grid-cols-${
      boardSize + 1
    } text-xs outline outline-neutral-900 outline-[2px]">${cells}</section>`;
    return boardView;
  };
}
