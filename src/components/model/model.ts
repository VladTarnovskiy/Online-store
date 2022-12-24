import AppView from '../view/appView';
import { productData } from './data';
import { Filters } from './datafilters';
import { CardItem } from '../types/types';
import { Data } from '../types/types';

export class Model {
  initDataProduct: CardItem[] = productData.products;
  filterDataProduct: CardItem[];
  view: AppView;
  filters: Filters;

  constructor() {
    this.view = new AppView();
    this.filters = new Filters();
    this.filterDataProduct = productData.products.slice(0);
  }

  getProducts(e: MouseEvent) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const target = <HTMLElement>e.target;
    if (target.classList.contains('view__block')) {
      productsContainer.replaceChildren();
      this.view.viewCardBlock(this.filterDataProduct);
      localStorage.setItem('view', 'block');
    } else if (target.classList.contains('view__list')) {
      productsContainer.replaceChildren();
      this.view.viewCardList(this.filterDataProduct);
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
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    this.filterDataProduct.filter((item) => {
      const x = item.title.toLowerCase().split(' ');
      x.forEach((it) => {
        if (it === target.value.toLowerCase()) {
          console.log('true');
          return true;
        }
      });
    });

    //     const y: CardItem[] = [];
    //     this.filterDataProduct.forEach((item: CardItem) => {
    //         const x = item.title.toLowerCase().split(' ')

    //         x.forEach((it) => {
    //             if(it === target.value.toLowerCase()){
    //                y.push(item)
    //                 console.log(y)
    //             }
    //         })

    //     })
    // this.filterDataProduct = y.slice()

    // this.filterDataProduct.filter((item) => {
    //     return (item.title.toLowerCase() === target.value.toLowerCase())

    // })
    this.localStorage();
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
      this.view.viewCardList(this.filterDataProduct);
    } else {
      blockBut.classList.add('view__item_active');
      listBut.classList.remove('view__item_active');
      prodContainer.classList.remove('product-items_list');
      this.view.viewCardBlock(this.filterDataProduct);
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
