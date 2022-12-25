import AppView from '../view/appView';
import { Model } from '../model/model';

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  ErrorPage = 'erorr-page',
}

class AppController extends Model {
  private static container: HTMLElement = document.body;
  private static defaultPageId = 'main-page';
  view: AppView;

  constructor() {
    super();
    this.view = new AppView();
  }

  // start routing
  renderNewPage(idPage: string) {
    const currentPageHTML = <HTMLElement>document.querySelector('body');
    currentPageHTML.replaceChildren();

    if (idPage === PageIds.MainPage) {
      this.view.drawMain();
      this.productsSort();
      this.productsSearch();
      this.productsView();
      this.localStorage();
      this.addProductsCart();
    } else if (idPage === PageIds.BasketPage) {
      this.view.drawBasket();
      this.viewCardBasket(this.arrProductsBasket);
      this.showResultBasket();
      // this.basketCardChangeInfo();
    } else {
      // this.drawError();
      alert('Error, basket dont realize yet');
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
    const viewContainer = <HTMLElement>document.querySelector('.view__container');
    viewContainer.addEventListener('click', (event) => {
      this.getProducts(event);
    });
  }

  private productsSort() {
    const sortInput = <HTMLElement>document.querySelector('.sort__select');
    sortInput.addEventListener('change', (event) => {
      this.sortProducts(event);
    });
  }

  private productsSearch() {
    const searchInput = <HTMLElement>document.querySelector('.products__search');
    searchInput.addEventListener('input', (event) => {
      this.searchProducts(event);
    });
  }

  private addProductsCart() {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_add');
    addButtons.forEach((item) => {
      item.addEventListener('click', (event) => {
        this.addProduct(event);
      });
    });
  }

  run() {
    window.location.hash = 'main-page';
    this.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default AppController;
