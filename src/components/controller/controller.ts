import AppView from '../view/appView';
import { Model } from '../model/model';
import { PageIds } from '../types/types';

class AppController extends Model {
  view: AppView;
  private static currentPageHash = '#';

  arrLimit = 1;
  arrPage = 1;

  constructor() {
    super();
    this.view = new AppView();
  }

  // start routing
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
      this.view.drawMain();
      this.getDataFromStorage();
      this.addProductsCart();
      this.productsView();
      this.productsSearch();
      this.productsSort();
      this.getDetailPage();
      this.getfilterCategoryrData();
      this.resetFilters();
    } else if (idPage === PageIds.BasketPage) {
      this.view.drawBasket();
      this.viewCardBasket(this.arrProductsBasket);
      this.showResultBasket();
      this.basketCardChangeInfo();
      this.addModalPageFromBasket();
      this.getLimitBasketProducts();
      this.changePageBasketProducts();
    } else if (idPage === PageIds.Product) {
      const pageId = Number(localStorage.getItem('prodId')) || 1;
      this.view.drawProdDetail();
      this.addDetailPage(pageId);
      this.addProductsCart();
      this.buyProductDetailPage();
      this.addModalPageFromDetail();
      this.checkDetailProdInBasket();
    } else {
      this.view.drawError();
    }
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.split('?')[0];
      if (hash === PageIds.Product) {
        AppController.currentPageHash = hash;
        this.productGetIdFromUrl();
        this.renderNewPage(PageIds.Product);
        return;
      }
      if (AppController.currentPageHash !== hash) {
        AppController.currentPageHash = hash;
        this.renderNewPage(hash);
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.split('?')[0];
      AppController.currentPageHash = hash;
      this.renderNewPage(hash);
    });
  }

  private productGetIdFromUrl(): void {
    const productId = window.location.hash.split('?/')[1];
    localStorage.setItem('prodId', `${productId}`);
  }
  //endrouting

  private productsView(): void {
    this.addTotalAmountBasket();
    const viewContainer = <HTMLElement>document.querySelector('.view__container');
    viewContainer.addEventListener('click', (event) => {
      this.getProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  private productsSort(): void {
    const sortInput = <HTMLElement>document.querySelector('.sort__select');
    sortInput.addEventListener('change', (event) => {
      const target = <HTMLInputElement>event.target;
      this.sortProducts(target.value);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  private addModalPageFromDetail(): void {
    const prodButBuy = <HTMLElement>document.querySelector('.prod__but-buy');
    prodButBuy.addEventListener('click', () => {
      setTimeout(() => {
        this.getPageAfterPay();
      }, 200);
    });
  }

  private buyProductDetailPage(): void {
    const butBuy = <HTMLElement>document.querySelector('.prod__but-buy');
    butBuy.addEventListener('click', (event) => {
      setTimeout(() => {
        window.location.hash = '#basket-page';
        this.addProductDetailPage(event);
      }, 30);
    });
  }

  private addModalPageFromBasket(): void {
    const prodButBuy = <HTMLElement>document.querySelector('.button_buy');
    if (prodButBuy) {
      prodButBuy.addEventListener('click', () => {
        this.getPageAfterPay();
      });
    }
  }

  private productsSearch(): void {
    const searchInput = <HTMLElement>document.querySelector('.products__search');
    searchInput.addEventListener('input', (event) => {
      this.searchProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  private addProductsCart(): void {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_add');
    addButtons.forEach((item) => {
      item.addEventListener('click', (event) => {
        this.addProduct(event);
      });
    });
  }

  private getfilterCategoryrData(): void {
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
      item.addEventListener('input', () => {
        this.filterByRange();
        this.addProductsCart();
        this.getDetailPage();
      });
    });
  }

  private resetFilters(): void {
    const buttonReset = <HTMLElement>document.querySelector('.button_filters-reset');
    buttonReset.addEventListener('click', () => {
      this.getResetFilters();
      this.getDetailPage();
      this.addProductsCart();
    });
  }

  private checkDetailProdInBasket(): void {
    const buttonProdForId = <HTMLElement>document.querySelector('.card__button_add');
    const target = Number(buttonProdForId.dataset.id);

    this.arrProductsBasket.forEach((itemBasket) => {
      if (itemBasket.id === target) {
        buttonProdForId.classList.add('card__button-add_active');
        buttonProdForId.textContent = 'In cart';
      }
    });
  }

  private getDetailPage(): void {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_detail');
    addButtons.forEach((item) => {
      item.addEventListener('click', (e) => {
        window.location.href = `#product-details?/${item.dataset.id}`;
        const hash = window.location.hash.slice(1);
        const target = <HTMLElement>e.target;
        this.renderNewPage(hash);

        localStorage.setItem('prodId', `${target.dataset.id}`);
      });
    });
  }

  private getLimitBasketProducts(): void {
    if (this.arrProductsBasket.length > 0) {
      const limitValue = <HTMLElement>document.querySelector('.pagination-limit__value');
      const pageControlCounter = <HTMLElement>document.querySelector('.pagination-page__counter');
      limitValue.setAttribute('max', `${this.arrProductsBasket.length}`);
      if (localStorage.getItem('limit')) {
        this.arrLimit = Number(localStorage.getItem('limit'));
        limitValue.setAttribute('value', `${this.arrLimit}`);
        this.changeProductWithPagination(this.arrLimit, this.arrPage);
      } else {
        this.arrLimit = this.arrProductsBasket.length;
      }

      limitValue.addEventListener('input', (e) => {
        pageControlCounter.textContent = '1';
        localStorage.setItem('pageNum', `1`);
        this.arrPage = 1;

        const target = <HTMLInputElement>e.target;
        this.arrLimit = Number(target.value);
        localStorage.setItem('limit', `${target.value}`);
        this.changeProductWithPagination(this.arrLimit, this.arrPage);
      });
    }
  }

  private changePageBasketProducts(): void {
    if (this.arrProductsBasket.length > 0) {
      const pageControl = <HTMLElement>document.querySelector('.pagination-page__control');
      const pageControlCounter = <HTMLElement>document.querySelector('.pagination-page__counter');
      if (localStorage.getItem('pageNum')) {
        this.arrPage = Number(localStorage.getItem('pageNum'));
        pageControlCounter.textContent = String(this.arrPage);
        this.changeProductWithPagination(this.arrLimit, this.arrPage);
      }

      pageControl.addEventListener('click', (e) => {
        const target = <HTMLElement>e.target;
        if (target.classList.contains('pagination-page__control-left') && this.arrPage > 1) {
          this.arrPage -= 1;
        } else if (
          target.classList.contains('pagination-page__control-right') &&
          this.arrPage < Math.ceil(this.arrProductsBasket.length / this.arrLimit)
        ) {
          this.arrPage += 1;
        }
        this.changeProductWithPagination(this.arrLimit, this.arrPage);

        localStorage.setItem('pageNum', `${this.arrPage}`);
        pageControlCounter.textContent = `${this.arrPage}`;
      });
    }
  }

  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}

export default AppController;
