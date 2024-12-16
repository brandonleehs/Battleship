import View from './View';

export default class Home extends View {
  public render = (): void => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.className = 'w-screen h-screen bg-blue-400';
  };

  private createElements = (): void => {};
  private bindEvents = (): void => {};
}
