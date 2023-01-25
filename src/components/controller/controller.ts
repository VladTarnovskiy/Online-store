import { Model } from '../model/model';

class AppController extends Model {
  constructor() {
    super();
  }

  protected productsView(): void {
    this.addTotalAmountBasket();
    const viewContainer = document.querySelector<HTMLElement>('.view__container');
    viewContainer?.addEventListener('click', (event) => {
      this.getProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  protected productsSort(): void {
    const sortInput = document.querySelector<HTMLElement>('.sort__select');
    sortInput?.addEventListener('change', (event) => {
      const target = <HTMLInputElement>event.target;
      this.sortProducts(target.value);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  protected addModalPageFromDetail(): void {
    const prodButBuy = document.querySelector<HTMLElement>('.prod__but-buy');
    prodButBuy?.addEventListener('click', () => {
      setTimeout(() => {
        this.getPageAfterPay();
      }, 200);
    });
  }

  protected buyProductDetailPage(): void {
    const butBuy = document.querySelector<HTMLElement>('.prod__but-buy');
    butBuy?.addEventListener('click', (event) => {
      setTimeout(() => {
        window.location.hash = '#basket-page';
        this.addProductDetailPage(event);
      }, 30);
    });
  }

  protected addModalPageFromBasket(): void {
    const prodButBuy = document.querySelector<HTMLElement>('.button_buy');
    if (prodButBuy) {
      prodButBuy.addEventListener('click', () => {
        this.getPageAfterPay();
      });
    }
  }

  protected productsSearch(): void {
    const searchInput = document.querySelector<HTMLElement>('.products__search');
    searchInput?.addEventListener('input', (event) => {
      this.searchProducts(event);
      this.addProductsCart();
      this.getDetailPage();
    });
  }

  protected addProductsCart(): void {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_add');
    addButtons.forEach((item) => {
      item.addEventListener('click', (event) => {
        this.addProduct(event);
      });
    });
  }

  protected getfilterCategoryrData(): void {
    const category = document.querySelector<HTMLElement>('.filters');
    const checkboxesCategry = category?.querySelectorAll<HTMLElement>('.filter-block__input');
    const sliders = category?.querySelectorAll<HTMLElement>('.slider__range');
    checkboxesCategry?.forEach((item) => {
      item.addEventListener('change', (event) => {
        this.filterByCategory(event);
        this.addProductsCart();
        this.getDetailPage();
      });
    });

    sliders?.forEach((item) => {
      item.addEventListener('input', () => {
        this.filterByRange();
        this.addProductsCart();
        this.getDetailPage();
      });
    });
  }

  protected resetFilters(): void {
    const buttonReset = document.querySelector<HTMLElement>('.button_filters-reset');
    buttonReset?.addEventListener('click', () => {
      this.getResetFilters();
      this.getDetailPage();
      this.addProductsCart();
    });
  }

  protected checkDetailProdInBasket(): void {
    const buttonProdForId = document.querySelector<HTMLElement>('.card__button_add');
    const target = Number(buttonProdForId?.dataset.id);

    this.arrProductsBasket.forEach((itemBasket) => {
      if (itemBasket.id === target && buttonProdForId) {
        buttonProdForId.classList.add('card__button-add_active');
        buttonProdForId.textContent = 'In cart';
      }
    });
  }

  protected getDetailPage(): void {
    const addButtons = document.querySelectorAll<HTMLElement>('.card__button_detail');
    addButtons.forEach((item) => {
      item.addEventListener('click', (e) => {
        window.location.href = `#product-details?/${item.dataset.id}`;
        // const hash = window.location.hash.slice(1);
        const target = <HTMLElement>e.target;
        // this.renderNewPage(hash);

        localStorage.setItem('prodId', `${target.dataset.id}`);
      });
    });
  }

  protected getLimitBasketProducts(): void {
    if (this.arrProductsBasket.length > 0) {
      const limitValue = document.querySelector<HTMLElement>('.pagination-limit__value');
      const pageControlCounter = document.querySelector<HTMLElement>('.pagination-page__counter');
      limitValue?.setAttribute('max', `${this.arrProductsBasket.length}`);
      if (localStorage.getItem('limit')) {
        this.arrLimit = Number(localStorage.getItem('limit'));
        limitValue?.setAttribute('value', `${this.arrLimit}`);
        this.changeProductWithPagination(this.arrLimit, this.arrPage);
      } else {
        this.arrLimit = this.arrProductsBasket.length;
      }

      limitValue?.addEventListener('input', (e) => {
        if (pageControlCounter) {
          pageControlCounter.textContent = '1';
        }
        localStorage.setItem('pageNum', `1`);
        this.arrPage = 1;

        const target = <HTMLInputElement>e.target;
        this.arrLimit = Number(target.value);
        localStorage.setItem('limit', `${target.value}`);
        this.changeProductWithPagination(this.arrLimit, this.arrPage);
      });
    }
  }

  protected changePageBasketProducts(): void {
    if (this.arrProductsBasket.length > 0) {
      const pageControl = document.querySelector<HTMLElement>('.pagination-page__control');
      const pageControlCounter = document.querySelector<HTMLElement>('.pagination-page__counter');
      if (localStorage.getItem('pageNum') && pageControlCounter) {
        this.arrPage = Number(localStorage.getItem('pageNum'));
        pageControlCounter.textContent = String(this.arrPage);
        this.changeProductWithPagination(this.arrLimit, this.arrPage);
      }

      pageControl?.addEventListener('click', (e) => {
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
        pageControlCounter ? (pageControlCounter.textContent = `${this.arrPage}`) : null;
      });
    }
  }
}

export default AppController;
