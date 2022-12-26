import AppController from '../controller/controller';
import Main from './pages/main/main';
import Basket from './pages/basket/basket';
import Card from '../templates/card';
import { CardItem } from '../types/types';

export class AppView {
  main: Main;
  card: Card;
  basket: Basket;
  // controller: AppController;
  // error: Error;

  constructor() {
    this.main = new Main();
    this.card = new Card();
    this.basket = new Basket();
    // this.controller = new AppController();
    // this.error = new Error();
  }

  viewCardBlock(data: CardItem[]) {
    data.forEach((item: CardItem) => {
      this.card.drawBlock(item);
    });
  }

  viewCardList(data: CardItem[]) {
    data.forEach((item: CardItem) => {
      this.card.drawList(item);
    });
  }

  viewCardBasket(data: CardItem[]) {
    data.forEach((item: CardItem) => {
      this.card.drawCardBasket(item);
    });
    // this.controller.showResultBasket;
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
