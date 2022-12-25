import AppView from '../view/appView';
import { productData } from './data';
import { Filters } from './datafilters';
import { CardItem } from '../types/types';
import { Data } from '../types/types';

export class Model extends AppView {
  initDataProduct: CardItem[] = productData.products;
  filterDataProduct: CardItem[] = productData.products.slice(0);
  arrProductsBasket: CardItem[] = [];

  filters: Filters;

  constructor() {
    super();
    this.filters = new Filters();
  }

  getProducts(e: MouseEvent) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const target = <HTMLElement>e.target;
    if (target.classList.contains('view__block')) {
      productsContainer.replaceChildren();
      this.viewCardBlock(this.filterDataProduct);
      localStorage.setItem('view', 'block');
    } else if (target.classList.contains('view__list')) {
      productsContainer.replaceChildren();
      this.viewCardList(this.filterDataProduct);
      localStorage.setItem('view', 'list');
    }
  }

  sortWays(data: string | null) {
    switch (data) {
      case 'priceInc':
        localStorage.setItem('sort', 'priceInc');
        this.filterDataProduct.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case 'priceDec':
        localStorage.setItem('sort', 'priceDec');
        this.filterDataProduct.sort((a, b) => {
          return b.price - a.price;
        });
        break;
      case 'rateInc':
        localStorage.setItem('sort', 'rateInc');
        this.filterDataProduct.sort((a, b) => {
          return a.rating - b.rating;
        });
        break;
      case 'rateDec':
        localStorage.setItem('sort', 'rateDec');
        this.filterDataProduct.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
    }
  }

  sortProducts(e: Event) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    this.sortWays(target.value);
    this.localStorage();
  }

  searchProducts(e: Event) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const productsCounter = <HTMLElement>document.querySelector('.sort__counter-display');
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    const arrSearch: CardItem[] = [];
    if (target.value === '') {
      this.initDataProduct.forEach((item) => arrSearch.push(item));
    } else {
      this.initDataProduct.forEach((item) => {
        const itemTitle = item.title.toLowerCase().split(' ');
        const itemDescr = item.description.toLowerCase().split(' ');
        const brandDescr = item.brand.toLowerCase().split(' ');
        const categoryDescr = item.brand.toLowerCase().split(' ');
        const arrSearchData = itemTitle.concat(itemDescr, brandDescr, categoryDescr);

        arrSearchData.forEach((it) => {
          if (it === target.value.toLowerCase() && !arrSearch.includes(item)) {
            arrSearch.push(item);
          }
        });
      });
    }
    productsCounter.textContent = `${arrSearch.length}`;
    this.filterDataProduct = arrSearch.slice();
    this.localStorage();
  }

  addProduct(e: Event) {
    const target = <HTMLElement>e.target;
    // const arrBasket: CardItem[] = [];
    this.initDataProduct.forEach((item) => {
      if (String(item.id) === target.dataset.id) {
        this.arrProductsBasket.push(item);
      }
    });
  }

  localStorage() {
    //вид продуктов
    const viewStorage = localStorage.getItem('view');
    const prodContainer = <HTMLElement>document.querySelector('.product-items');
    const blockBut = <HTMLElement>document.querySelector('.view__block');
    const listBut = <HTMLElement>document.querySelector('.view__list');
    if (viewStorage === 'list') {
      listBut.classList.add('view__item_active');
      blockBut.classList.remove('view__item_active');
      prodContainer.classList.add('product-items_list');
      this.viewCardList(this.filterDataProduct);
    } else {
      blockBut.classList.add('view__item_active');
      listBut.classList.remove('view__item_active');
      prodContainer.classList.remove('product-items_list');
      this.viewCardBlock(this.filterDataProduct);
    }

    //сортировка продуктов
    const sortProd = localStorage.getItem('sort');
    const sortSelect = document.querySelectorAll<HTMLInputElement>('.select__item');
    sortSelect.forEach((item) => {
      if (item.value === `${sortProd}`) {
        item.setAttribute('selected', '');
      }
    });
    this.sortWays(sortProd);
  }
}
