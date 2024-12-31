import './assets/images/battleship.jpg';
import './css/styles.css';
import Home from './view/Home';

class App {
  public static main() {
    document.addEventListener('DOMContentLoaded', () => {
      const home = new Home();
      home.render();

      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'r') {
          const rotateButton: HTMLButtonElement | null =
            document.querySelector('.rotate');

          if (rotateButton) {
            rotateButton.click();
          }

          const nodeList = document.querySelectorAll(
            '.boardView .cell[data-x-coordinate]'
          ) as NodeListOf<HTMLDivElement>;
          for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove('highlight--blue');
            nodeList[i].classList.remove('highlight--red');
          }
        }
      });
    });
  }
}

App.main();
