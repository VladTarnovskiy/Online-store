import Main from './pages/main/main';
import Basket from './pages/basket/basket';
import ProductDetail from './pages/prod-detail/prod-detail';
import Error from './pages/error/error';
import Card from '../templates/card';
import { CardItem } from '../types/types';
import ModalWindow from '../view/pages/basket/modalWindow/modalWindow';

export class AppView {
  main: Main;
  card: Card;
  basket: Basket;
  prodDetail: ProductDetail;
  modalWindow: ModalWindow;
  error: Error;

  constructor() {
    this.main = new Main();
    this.card = new Card();
    this.basket = new Basket();
    this.prodDetail = new ProductDetail();
    this.modalWindow = new ModalWindow();
    this.error = new Error();
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

  drawError(): void {
    this.error.draw();
  }

  drawModal(): void {
    this.modalWindow.draw();
  }

  getMessageEmptyProducts(container: HTMLElement) {
    const noneProductInfo = <HTMLElement>document.createElement('div');
    noneProductInfo.className = 'product-none-info';
    noneProductInfo.textContent = 'No products found.';
    container.appendChild(noneProductInfo);
  }

  getMessageEmptyBasket(container: HTMLElement) {
    const noneProductInfo = <HTMLElement>document.createElement('div');
    noneProductInfo.className = 'product-none-info';
    noneProductInfo.textContent = 'Cart is empty.';
    container.appendChild(noneProductInfo);
  }
}

export default AppView;
