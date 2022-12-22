import AppView from '../view/appView';
import {Model} from '../model/model';

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  ErrorPage = 'erorr-page',
}

class AppController extends AppView {
  private static container: HTMLElement = document.body;
  private static defaultPageId = 'main-page';
  module: Model;
    
  constructor() {
    super()
      this.module = new Model();
  }

  // start routing
    renderNewPage(idPage: string) {
    const currentPageHTML = <HTMLElement>document.querySelector('body');
    currentPageHTML.replaceChildren();

    if (idPage === PageIds.MainPage) {
      this.drawMain();
    this.module.getProductsdef();
    this.productsSort()
    this.productsView();
    } else if (idPage === PageIds.BasketPage) {
      console.log('hhhhhhh');
      this.drawBasket();
    } else {
      // this.drawError();
      alert('Error, basket dont realize yet')
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  //endrouting
  
  private productsView() {
    const viewContainer = <HTMLElement>document.querySelector('.view__container')
    viewContainer.addEventListener('click', (event)=>{
      this.module.getProducts(event)
    });
  }

  private productsSort() {
    const sortInput = <HTMLElement>document.querySelector('.sort__select')
    sortInput.addEventListener('change', (event)=>{
      this.module.sortProducts(event)
    });
  }

  run() {
    window.location.hash='main-page';
    this.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default AppController;