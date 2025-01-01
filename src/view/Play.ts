import Player from 'Model/player/Player';
import View from './View';
import Game from 'Model/game/Game';
import Coordinate from 'Model/game/Coordinate';
import Turn from 'Model/game/Turn';
import Ring from 'Model/game/Ring';
import AttackStatus from 'Model/game/AttackStatus';
import Home from './Home';

export default class Play extends View {
  private game: Game;
  private flag = 0; // Used to prevent rapid firing
  private target = false;
  private directions: Direction[] = [
    Direction.NORTH,
    Direction.SOUTH,
    Direction.EAST,
    Direction.WEST,
  ];
  private lastCoordinate: Coordinate | null = null;
  private originalCoordinate: Coordinate | null = null;

  public constructor(player1: Player, player2: Player) {
    super();
    this.game = new Game(player1, player2);
  }

  public render = (): void => {
    this.createElements();
    this.bindEvents();
  };

  private createElements = (): void => {
    const body = document.querySelector('body') as HTMLBodyElement;

    let alertColor = '';
    let playerDisplay = '';
    let player: number;
    let otherPlayer: number;

    if (this.game.getTurn() === Turn.PLAYER_1) {
      alertColor = 'bg-blue-200 text-blue-700';
      playerDisplay = 'Player 1';
      player = 1;
      otherPlayer = 2;
    } else {
      alertColor = 'bg-red-200 text-red-700';
      playerDisplay = 'Player 2';
      otherPlayer = 1;
      player = 2;
    }

    body.innerHTML = `
    <p class="fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Scroll/Swipe/Click to switch boards</p>
    <main class="grid place-items-center gap-1 lg:gap-2 bg-neutral-200 p-4 rounded-lg text-neutral-900">
    <p class="[text-shadow:none] font-bold text-lg md:text-xl bg-gray-400 w-full text-center jagged py-1">${playerDisplay}</p>
    <p class="[text-shadow:none] font-semibold text-center md:text-lg board-label">Your board</p>
    <div class="grid gap-2">
    <section class="relative playView overflow-scroll flex items-center">
    ${this.getBoardView(player)}
    ${this.getBoardView(otherPlayer)}
    <canvas class="absolute h-full left-0 top-0 [pointer-events:none]"></canvas>
    </section>
    <div class="flex justify-center items-center gap-2">
    <a class="scroll-button scroll-button--active scroll-button-primary" id="scroll-button-${player}"></a>
    <a class="scroll-button scroll-button-secondary" id="scroll-button-${otherPlayer}"></a>
    </div>
    </div>
    </main>
    <dialog id="gameover-dialog" class="*:[text-shadow:none] *:text-center shadow-md p-5 rounded-md bg-neutral-50 md:p-10 ">
    <main class="grid justify-center gap-3 md:gap-4">
    <div class="flex flex-col gap-1 md:gap-2">
    <p class="title text-xl font-bold"></p>
    <p class="stats"></p>
    </div>
    <div><button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Try again</button></div>
    </main>
    </dialog>`;

    (document.querySelector(`#board-${player}`) as HTMLElement).classList.add(
      'primary-board'
    );
    (
      document.querySelector(`#board-${otherPlayer}`) as HTMLElement
    ).classList.add('secondary-board');

    this.paintBoard();
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
    const body = document.querySelector('body') as HTMLBodyElement;
    const dialog = document.querySelector(
      '#gameover-dialog'
    ) as HTMLDialogElement;

    const primaryScrollButton = document.querySelector(
      '.scroll-button-primary'
    ) as HTMLAnchorElement;
    const secondaryScrollButton = document.querySelector(
      '.scroll-button-secondary'
    ) as HTMLAnchorElement;

    playView.addEventListener('scroll', (e: WheelEvent): void => {
      if (playView.scrollLeft > 127) {
        primaryScrollButton.classList.remove('scroll-button--active');
        secondaryScrollButton.classList.add('scroll-button--active');
        boardLabel.innerText = 'Enemy board';
      } else {
        primaryScrollButton.classList.add('scroll-button--active');
        secondaryScrollButton.classList.remove('scroll-button--active');
        boardLabel.innerText = 'Your board';
      }
    });

    playView.addEventListener('wheel', (e: WheelEvent): void => {
      e.preventDefault();
      if (
        e.deltaY > 0 &&
        primaryScrollButton.classList.contains('scroll-button--active')
      ) {
        playView.scrollLeft += 300;
      } else if (
        e.deltaY < 0 &&
        !primaryScrollButton.classList.contains('scroll-button--active')
      ) {
        playView.scrollLeft -= 300;
      }
    });

    scrollButton1.addEventListener('click', (e: Event): void => {
      if (scrollButton1.classList.contains('scroll-button--active')) {
        return;
      }
      (document.querySelector('#board-1') as HTMLElement).scrollIntoView();
    });

    scrollButton2.addEventListener('click', (e: Event): void => {
      if (scrollButton2.classList.contains('scroll-button--active')) {
        return;
      }
      (document.querySelector('#board-2') as HTMLElement).scrollIntoView();
    });

    let target = '';
    let active = '';
    let alertColor = '';

    // Vary styles depending on player
    if (
      (
        document.querySelector('#scroll-button-1') as HTMLAnchorElement
      ).classList.contains('scroll-button-primary')
    ) {
      target = 'target--blue';
      active = 'active--red';
      alertColor = 'bg-blue-200 text-blue-700';
    } else {
      target = 'target--red';
      active = 'active--blue';
      alertColor = 'bg-red-200 text-red-700';
    }

    const cellList: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.secondary-board .cell[data-x-coordinate]'
    );

    for (let i = 0; i < cellList.length; i++) {
      const cell = cellList[i];
      cell.addEventListener('click', async (e: Event) => {
        if (this.flag > 0) {
          return;
        }
        this.flag++;
        if (this.game.getTurn() === Turn.PLAYER_1) {
          this.game.getPlayer1().incrementMoves();
        } else {
          this.game.getPlayer2().incrementMoves();
        }

        this.explode(cell);

        const coordinate = new Coordinate(
          parseInt(cell.getAttribute('data-x-coordinate') as string),
          parseInt(cell.getAttribute('data-y-coordinate') as string)
        );
        const { hit, sink } = this.attack(coordinate);
        if (sink) {
          this.addHit(coordinate);
          cell.classList.add(active);
          body.insertAdjacentHTML(
            'beforeend',
            `<p class="sink-alert fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Ship sunk!</p>`
          );
          setTimeout(() => {
            const sinkAlert = document.querySelector('.sink-alert');
            if (sinkAlert) {
              sinkAlert.remove();
            }
          }, 4000);
          if (this.game.isOver()) {
            const title = document.querySelector(
              'dialog .title'
            ) as HTMLParagraphElement;
            const stats = document.querySelector(
              'dialog .stats'
            ) as HTMLParagraphElement;

            title.innerText = 'You won!';
            stats.innerText = `You won in ${this.game
              .getPlayer1()
              .getMoves()} moves.`;

            dialog.showModal();
          }
        } else if (hit) {
          this.addHit(coordinate);

          cell.classList.add(active);
          body.insertAdjacentHTML(
            'beforeend',
            `<p class="hit-alert fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Hit!</p>`
          );
          setTimeout(() => {
            const hitAlert = document.querySelector('.hit-alert');
            if (hitAlert) {
              hitAlert.remove();
            }
          }, 4000);
        } else {
          this.addMiss(coordinate);
          cell.classList.add('miss');
          body.insertAdjacentHTML(
            'beforeend',
            `<p class="miss-alert fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Miss!</p>`
          );
          setTimeout(() => {
            const missAlert = document.querySelector('.miss-alert');
            if (missAlert) {
              missAlert.remove();
            }
          }, 4000);
          if (this.game.getPlayer2().getAi() === true) {
            const scrollButtonPrimary = document.querySelector(
              '#scroll-button-1'
            ) as HTMLAnchorElement;
            const scrollButtonSecondary = document.querySelector(
              '#scroll-button-2'
            ) as HTMLAnchorElement;
            scrollButtonPrimary.click();
            await sleep(500);
            await this.randomAttack();
            scrollButtonSecondary.click();
          } else {
            await sleep(1000);
            const turn =
              this.game.getTurn() === Turn.PLAYER_2
                ? Turn.PLAYER_1
                : Turn.PLAYER_2;
            const otherPlayer = this.game.getTurn() === Turn.PLAYER_1 ? 2 : 1;
            body.insertAdjacentHTML(
              'beforeend',
              `<p class="switch-alert fade-in-out font-bold [text-shadow:none] text-center ${alertColor} absolute top-3 px-8 py-2 rounded-md shadow-md text-sm"></p>`
            );
            for (let i = 3; i > 0; i--) {
              (
                document.querySelector('.switch-alert') as HTMLParagraphElement
              ).innerText = `Switching to Player ${otherPlayer} in ${i}`;
              await sleep(1000);
            }
            this.game.setTurn(turn);
            this.render();
          }
        }
        await sleep(500);
        this.flag--;
      });

      cell.addEventListener('mouseover', (e: Event): void => {
        cell.classList.add('target', target);
      });

      cell.addEventListener('mouseout', (e: Event): void => {
        cell.classList.remove('target', target);
      });
    }

    const tryAgainButton = document.querySelector(
      'dialog button'
    ) as HTMLButtonElement;
    tryAgainButton.addEventListener('click', (e: Event): void => {
      const home = new Home();
      home.render();
    });
  };

  private getCanvasCoordinate = (x: number, y: number): [number, number] => {
    const playView = document.querySelector('.playView') as HTMLElement;
    return [
      (x / playView.offsetWidth / 2) * 300,
      (y / playView.offsetHeight) * 150,
    ];
  };

  private paintBoard = (): void => {
    let player: Player;
    let otherPlayer: Player;
    let active: string;
    let playerNum: number;
    let otherPlayerNum: number;
    let hitStyle: string;

    if (this.game.getTurn() === Turn.PLAYER_1) {
      player = this.game.getPlayer1();
      otherPlayer = this.game.getPlayer2();
      playerNum = 1;
      active = 'active--blue';
      otherPlayerNum = 2;
      hitStyle = 'active--red';
    } else {
      player = this.game.getPlayer2();
      otherPlayer = this.game.getPlayer1();
      playerNum = 2;
      otherPlayerNum = 1;
      active = 'active--red';
      hitStyle = 'active--blue';
    }

    const coordinateToShipMap = player.getGameboard().getCoordinateToShipMap();
    for (const coordinateString in coordinateToShipMap) {
      const coordinate = Coordinate.fromString(coordinateString);
      const cell = document.querySelector(
        `#board-${playerNum} [data-x-coordinate="${coordinate.getX()}"][data-y-coordinate="${coordinate.getY()}"]`
      ) as HTMLDivElement;

      if (otherPlayer.getHits().includes(coordinateString)) {
        cell.classList.add('destroyed');
      } else {
        cell.classList.add(active);
      }
    }

    for (const miss of otherPlayer.getMisses()) {
      const coordinate = Coordinate.fromString(miss);
      const cell = document.querySelector(
        `#board-${playerNum} [data-x-coordinate="${coordinate.getX()}"][data-y-coordinate="${coordinate.getY()}"]`
      ) as HTMLDivElement;
      cell.classList.add('miss');
    }

    for (const hit of player.getHits()) {
      const coordinate = Coordinate.fromString(hit);
      const cell = document.querySelector(
        `#board-${otherPlayerNum} [data-x-coordinate="${coordinate.getX()}"][data-y-coordinate="${coordinate.getY()}"]`
      ) as HTMLDivElement;
      cell.classList.add(hitStyle);
    }

    for (const miss of player.getMisses()) {
      const coordinate = Coordinate.fromString(miss);
      const cell = document.querySelector(
        `#board-${otherPlayerNum} [data-x-coordinate="${coordinate.getX()}"][data-y-coordinate="${coordinate.getY()}"]`
      ) as HTMLDivElement;
      cell.classList.add('miss');
    }
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

  private attack = (coordinate: Coordinate): AttackStatus => {
    const player =
      this.game.getTurn() !== Turn.PLAYER_1
        ? this.game.getPlayer1()
        : this.game.getPlayer2();

    return player.getGameboard().receiveAttack(coordinate);
  };

  private randomAttack = async (): Promise<void> => {
    let hit = false,
      sink = false;
    const ai = this.game.getPlayer2();
    const body = document.querySelector('body') as HTMLBodyElement;

    do {
      let coordinate: Coordinate | null = null;
      if (this.target && this.lastCoordinate) {
        const direction = this.directions[0];
        let x: number = this.lastCoordinate.getX();
        let y: number = this.lastCoordinate.getY();

        if (
          direction === Direction.NORTH &&
          this.inRange(x) &&
          this.inRange(y - 1)
        ) {
          coordinate = new Coordinate(x, y - 1);
        } else if (
          direction === Direction.SOUTH &&
          this.inRange(x) &&
          this.inRange(y + 1)
        ) {
          coordinate = new Coordinate(x, y + 1);
        } else if (
          direction === Direction.EAST &&
          this.inRange(x + 1) &&
          this.inRange(y)
        ) {
          coordinate = new Coordinate(x + 1, y);
        } else if (
          direction === Direction.WEST &&
          this.inRange(x - 1) &&
          this.inRange(y)
        ) {
          coordinate = new Coordinate(x - 1, y);
        }

        if (!coordinate && this.lastCoordinate !== this.originalCoordinate) {
          this.lastCoordinate = this.originalCoordinate;
          this.directions = [
            Direction.NORTH,
            Direction.SOUTH,
            Direction.EAST,
            Direction.WEST,
          ];
          hit = true;
          continue;
        }
        const tries = ai.getMisses().concat(ai.getHits());
        if (
          coordinate &&
          tries.includes(coordinate.toString()) &&
          this.directions.length > 1
        ) {
          this.directions.shift();
          hit = true;
          continue;
        } else if (
          coordinate &&
          tries.includes(coordinate.toString()) &&
          this.directions.length <= 1
        ) {
          if (this.lastCoordinate !== this.originalCoordinate) {
            this.lastCoordinate = this.originalCoordinate;
            this.directions = [
              Direction.NORTH,
              Direction.SOUTH,
              Direction.EAST,
              Direction.WEST,
            ];
            hit = true;
            continue;
          }
          hit = false;
          this.lastCoordinate = null;
          this.originalCoordinate = null;
          coordinate = null;
        }
      }

      if (!coordinate) {
        const x = Math.floor(
          Math.random() * this.game.getPlayer1().getGameboard().getSize()
        );
        const y = Math.floor(
          Math.random() * this.game.getPlayer1().getGameboard().getSize()
        );
        coordinate = new Coordinate(x, y);
      }

      const tries = ai.getMisses().concat(ai.getHits());
      if (tries.includes(coordinate.toString())) {
        hit = true;
        continue;
      }

      const cell = document.querySelector(
        `#board-1 [data-x-coordinate="${coordinate.getX()}"][data-y-coordinate="${coordinate.getY()}"]`
      ) as HTMLDivElement;

      ({ hit, sink } = this.game
        .getPlayer1()
        .getGameboard()
        .receiveAttack(coordinate));

      this.explode(cell);

      if (sink) {
        this.target = false;
        this.directions = [
          Direction.NORTH,
          Direction.SOUTH,
          Direction.EAST,
          Direction.WEST,
        ];

        ai.addHit(coordinate.toString());
        cell.classList.remove('active--blue');

        cell.classList.add('destroyed');
        body.insertAdjacentHTML(
          'beforeend',
          `<p class="sink-alert fade-in-out font-bold [text-shadow:none] text-center bg-red-200 text-red-700 absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Ship sunk!</p>`
        );
        setTimeout(() => {
          const sinkAlert = document.querySelector('.sink-alert');
          if (sinkAlert) {
            sinkAlert.remove();
          }
        }, 4000);
        if (this.game.isOver()) {
          const dialog = document.querySelector('dialog') as HTMLDialogElement;
          const title = document.querySelector(
            'dialog .title'
          ) as HTMLParagraphElement;
          const stats = document.querySelector(
            'dialog .stats'
          ) as HTMLParagraphElement;

          title.innerText = 'You lost!';
          stats.innerText = 'Better luck next time!';

          dialog.showModal();
        }
      } else if (hit) {
        if (!this.target) {
          this.originalCoordinate = coordinate;
        }
        this.lastCoordinate = coordinate;
        if (!this.target) {
          this.target = true;
        }

        ai.addHit(coordinate.toString());
        cell.classList.remove('active--blue');

        cell.classList.add('destroyed');
        body.insertAdjacentHTML(
          'beforeend',
          `<p class="hit-alert fade-in-out font-bold [text-shadow:none] text-center bg-red-200 text-red-700 absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Hit!</p>`
        );
        setTimeout(() => {
          const hitAlert = document.querySelector('.hit-alert');
          if (hitAlert) {
            hitAlert.remove();
          }
        }, 4000);
      } else {
        if (this.target && this.lastCoordinate) {
          this.directions.shift();
        }

        ai.addMiss(coordinate.toString());

        cell.classList.add('miss');
        body.insertAdjacentHTML(
          'beforeend',
          `<p class="miss-alert fade-in-out font-bold [text-shadow:none] text-center bg-red-200 text-red-700 absolute top-3 px-8 py-2 rounded-md shadow-md text-sm">Miss!</p>`
        );
        setTimeout(() => {
          const missAlert = document.querySelector('.miss-alert');
          if (missAlert) missAlert.remove();
        }, 4000);
      }
      await sleep(500);
    } while (hit);
  };

  private explode = (cell: HTMLDivElement): void => {
    const size =
      cell.getBoundingClientRect().right - cell.getBoundingClientRect().left;

    const centerCoordinate = [
      cell.offsetLeft + size / 2,
      cell.offsetTop + size / 2,
    ];

    const canvasCoordinate = this.getCanvasCoordinate(
      centerCoordinate[0],
      centerCoordinate[1]
    );

    const ring = new Ring(canvasCoordinate[0], canvasCoordinate[1]);
    ring.ripple();
  };

  private addHit = (coordinate: Coordinate): void => {
    if (this.game.getTurn() === Turn.PLAYER_1) {
      this.game.getPlayer1().addHit(coordinate.toString());
    } else {
      this.game.getPlayer2().addHit(coordinate.toString());
    }
  };

  private addMiss = (coordinate: Coordinate): void => {
    if (this.game.getTurn() === Turn.PLAYER_1) {
      this.game.getPlayer1().addMiss(coordinate.toString());
    } else {
      this.game.getPlayer2().addMiss(coordinate.toString());
    }
  };

  private inRange = (n: number): boolean => {
    return n >= 0 && n <= 9;
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

enum Axis {
  VERTICAL,
  HORIZONTAL,
}
