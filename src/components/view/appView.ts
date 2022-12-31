import Main from './pages/main/main';
import Basket from './pages/basket/basket';
import ProductDetail from './pages/prod-detail/prod-detail';
import Card from '../templates/card';
import { CardItem } from '../types/types';

export class AppView {
  main: Main;
  card: Card;
  basket: Basket;
  prodDetail: ProductDetail;
  // error: Error;

  constructor() {
    this.main = new Main();
    this.card = new Card();
    this.basket = new Basket();
    this.prodDetail = new ProductDetail();
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
  }

  viewCardProdDetail(card: CardItem) {
    this.card.darwCardDetailPage(card);
  }

  drawMain(): void {
    this.main.draw();
  }

  drawBasket(): void {
    this.basket.draw();
  }

  drawProdDetail(): void {
    this.prodDetail.draw();
  }

  // drawError(data: Data): void{
  //     this.error.draw();
  // }
}

export default AppView;
