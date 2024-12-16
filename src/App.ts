import './assets/battleship.jpg';
import './css/styles.css';
import Home from './view/Home';

class App {
  public static main() {
    document.addEventListener('DOMContentLoaded', () => {
      const home = new Home();
      home.render();
    });
  }
}

App.main();
