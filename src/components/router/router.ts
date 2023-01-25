import AppView from '../view/appView';
import AppController from '../controller/controller';
import { PageIds } from '../types/types';

export class Router extends AppController {
  view: AppView;
  private static currentPageHash = '#';

  constructor() {
    super();
    this.view = new AppView();
  }

  renderNewPage(idPage: string): void {
    const currentPageHTML = <HTMLElement>document.querySelector('body');
    currentPageHTML.replaceChildren();
    const arrBasket = JSON.parse(localStorage.getItem('arrBasket') as string);
    if (arrBasket) {
      this.arrProductsBasket = arrBasket;
    }

    if (idPage === PageIds.MainPage || idPage === '') {
      const hash = localStorage.getItem('url');
      if (hash) {
        window.location.hash = hash;
      }
      this.initMainPage();
    } else if (idPage === PageIds.BasketPage) {
      this.initBasketPage();
    } else if (idPage === PageIds.Product) {
      const pageId = Number(localStorage.getItem('prodId')) || 1;
      this.initProductPage(pageId);
    } else {
      this, this.initErrorPage();
    }
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.split('?')[0];
      if (hash === PageIds.Product) {
        Router.currentPageHash = hash;
        this.productGetIdFromUrl();
        this.renderNewPage(PageIds.Product);
        return;
      }
      if (Router.currentPageHash !== hash) {
        Router.currentPageHash = hash;
        this.renderNewPage(hash);
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.split('?')[0];
      Router.currentPageHash = hash;
      this.renderNewPage(hash);
    });
  }

  private productGetIdFromUrl(): void {
    const productId = window.location.hash.split('?/')[1];
    localStorage.setItem('prodId', `${productId}`);
  }

  private initMainPage(): void {
    this.view.drawMain();
    this.getDataFromStorage();
    this.addProductsCart();
    this.productsView();
    this.productsSearch();
    this.productsSort();
    this.getDetailPage();
    this.getfilterCategoryrData();
    this.resetFilters();
  }

  private initBasketPage(): void {
    this.view.drawBasket();
    this.viewCardBasket(this.arrProductsBasket);
    this.showResultBasket();
    this.basketCardChangeInfo();
    this.addModalPageFromBasket();
    this.getLimitBasketProducts();
    this.changePageBasketProducts();
  }

  private initProductPage(pageId: number): void {
    this.view.drawProdDetail();
    this.addDetailPage(pageId);
    this.addProductsCart();
    this.buyProductDetailPage();
    this.addModalPageFromDetail();
    this.checkDetailProdInBasket();
  }

  private initErrorPage(): void {
    this.view.drawError();
  }

  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}
