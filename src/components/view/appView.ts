import AppController from '../controller/controller';
import Main from './pages/main/main';
import Basket from './pages/basket/basket';
import Card from '../templates/card';

export class AppView {
  main: Main;
  card: Card;
  basket: Basket;
  // error: Error;

  constructor() {
    this.main = new Main();
    this.card = new Card();
    this.basket = new Basket();
    // this.error = new Error();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewCardBlock(data: any) {
    data.forEach((item) => {
      this.card.drawBlock(item);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewCardList(data: any) {
    data.forEach((item) => {
      this.card.drawList(item);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewCardBasket(data: any) {
    data.forEach((item) => {
      this.card.drawList(item);
    });
  }

  drawMain(): void {
    this.main.draw();
  }

  drawBasket(): void {
    this.basket.draw();
  }

  // drawError(data: Data): void{
  //     this.error.draw();
  // }
}

export default AppView;
