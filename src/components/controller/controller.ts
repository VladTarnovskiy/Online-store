import AppView from '../view/appView';
import { Model } from '../model/model';

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  Product = 'product',
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

    if (idPage === PageIds.MainPage || idPage === '') {
      this.view.drawMain();
      this.localStorage();
      this.addProductsCart();
      this.productsView();
      this.productsSearch();
      this.productsSort();
      this.getDetailPage();
      this.getfilterCategoryrData();
      this.resetFilters();
      // this.buyProducts();
    } else if (idPage === PageIds.BasketPage) {
      this.view.drawBasket();
      this.viewCardBasket(this.arrProductsBasket);
      this.showResultBasket();
      this.basketCardChangeInfo();
      this.getPageAfterPay('.button_buy');
    } else if (idPage === PageIds.Product) {
      this.view.drawProdDetail();
      this.addDetailPage(Number(localStorage.getItem('prodId')) || 1);
      this.addProductsCart();
    }
    // else {
    //   // this.drawError();
    //   alert('Error, basket dont realize yet');
    // }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      // localStorage.setItem('hashPage', `${window.location.hash.slice(1)}`);
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
    const basketChecker = <HTMLElement>document.querySelector('.basket__checker');
    basketChecker.textContent = `${this.arrProductsBasket.length}`;
    const viewContainer = <HTMLElement>document.querySelector('.view__container');
    viewContainer.addEventListener('click', (event) => {
      this.getProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  private productsSort() {
    const sortInput = <HTMLElement>document.querySelector('.sort__select');
    sortInput.addEventListener('change', (event) => {
      this.sortProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  private productsSearch() {
    const searchInput = <HTMLElement>document.querySelector('.products__search');
    searchInput.addEventListener('input', (event) => {
      this.searchProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  private addProductsCart() {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_add');
    addButtons.forEach((item) => {
      item.addEventListener('click', (event) => {
        this.addProduct(event);
      });
    });
    // this.productsSearch();
  }

  private getfilterCategoryrData() {
    const category = <HTMLElement>document.querySelector('.filters');
    const checkboxesCategry = category.querySelectorAll<HTMLElement>('.filter-block__input');
    const sliders = category.querySelectorAll<HTMLElement>('.slider__range');
    checkboxesCategry.forEach((item) => {
      item.addEventListener('change', (event) => {
        this.filterByCategory(event);
        this.addProductsCart();
        this.getDetailPage();
      });
    });

    sliders.forEach((item) => {
      item.addEventListener('input', (event) => {
        this.filterByRange();
        this.addProductsCart();
        this.getDetailPage();
      });
    });
  }

  private resetFilters() {
    const buttonReset = <HTMLElement>document.querySelector('.button_filters-reset');
    buttonReset.addEventListener('click', () => {
      this.getResetFilters();
      this.getDetailPage();
      this.addProductsCart();
    });
  }

  private getDetailPage() {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_detail');
    addButtons.forEach((item) => {
      item.addEventListener('click', (e) => {
        window.location.href = '#product';
        const hash = window.location.hash.slice(1);
        const target = <HTMLElement>e.target;
        this.renderNewPage(hash);

        localStorage.setItem('prodId', `${target.dataset.id}`);
      });
    });
  }

  // private buyProducts() {
  //   const buyButton = <HTMLElement>document.querySelector('.button_popup');
  //   buyButton.addEventListener('click', () => {
  //     console.log('dddddd');
  //     this.renderNewPage('main-page');
  //   });
  // }

  run() {
    this.enableRouteChange();
    this.renderNewPage('main-page');
  }
}

export default AppController;
