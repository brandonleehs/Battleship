import View from './View';
import Setup from './Setup';

export default class Home extends View {
  public render = (): void => {
    this.createElements();
    this.bindEvents();
  };

  private createElements = (): void => {
    const head = document.querySelector('head') as HTMLHeadElement;
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    head.appendChild(script);

    const aiIcon = `<svg class="bg-gradient-to-tr from-red-300 to-red-700 size-16 md:size-20 lg:size-24 rounded-full border-solid border-[#e4807d]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="-4 -4 24 24">
    <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
    <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
    </svg>`;
    const humanIcon = `<svg class="bg-gradient-to-tr from-blue-300 to-blue-700 size-16 md:size-20 lg:size-24 rounded-full border-solid border-[#6ca9ef]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="-4 -4 24 24">
<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>`;

    const body = document.querySelector('body') as HTMLBodyElement;
    body.className =
      'grid place-items-center relative font-inter text-neutral-50 bg-battleship w-screen h-screen bg-cover py-10 px-5 text-shadow body-mask';
    body.innerHTML = `
    <h1 class="text-5xl md:text-7xl text-center">Battleship</h1>
    <main>
    <form class="grid p-5 md:p-12">
    <p class="text-center text-lg xs:text-2xl md:text-3xl lg:text-4xl">Choose your opponent</p>
    <div class="grid grid-cols-2 justify-items-center gap-5 md:gap-10 mt-6">
    ${aiIcon}
    ${humanIcon}
    <p class="text-center text-md sm:text-xl md:text-2xl">Challenge the AI Admiral</p>
    <p class="text-center text-md sm:text-xl md:text-2xl">Face a Human Opponent</p>
    <p class="text-center text-sm sm:text-base md:text-lg">Test your strategic brilliance against a cunning AI opponent.</p>
    <p class="text-center text-sm sm:text-base md:text-lg">Engage in an epic naval battle with a friend.</p>
    <button type="button" class="ai-button outline-button--red">AI</button>
    <button type="button" class="human-button outline-button--blue">Human</button>
    </div>
    </form>
    </main>`;
  };
  private bindEvents = (): void => {
    const aiButton = document.querySelector('.ai-button') as HTMLButtonElement;
    const humanButton = document.querySelector(
      '.human-button'
    ) as HTMLButtonElement;

    const boardSize = 10;

    aiButton.addEventListener('click', (e: Event): void => {
      const setup = new Setup({ boardSize, ai: true });
      setup.render();
    });

    humanButton.addEventListener('click', (e: Event): void => {});
  };
}
