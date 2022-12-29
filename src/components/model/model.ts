import AppView from '../view/appView';
import { productData } from './data';
// import { Filters } from './datafilters';
import { CardItem } from '../types/types';
import { Data } from '../types/types';

export class Model extends AppView {
  initDataProduct: CardItem[] = productData.products;
  filterDataProduct: CardItem[] = productData.products.slice(0);
  arrProductsBasket: CardItem[] = [];
  arrFiltCategory: string[] = [];
  arrWaysBrand: string[] = [];
  // filters: Filters;

  constructor() {
    super();
    // this.filters = new Filters();
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

  sortProducts(e: Event) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    this.sortWays(target.value);
    this.localStorage();
    // localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
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

  filterByCategory(e: Event) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const productsCounter = <HTMLElement>document.querySelector('.sort__counter-display');
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    const arrSearch: CardItem[] = [];
    const arrWithBrand: CardItem[] = [];
    if (target.name === 'category') {
      // console.log('here');
      if (target.checked) {
        this.arrFiltCategory.push(target.value);
        console.log(this.arrFiltCategory);
        // this.initDataProduct.forEach((item) => {
        //   this.arrFiltCategory.forEach((itemWays) => {
        //     if (item.category === itemWays) {
        //       arrSearch.push(item);
        //     }
        //   });
        // });
      } else {
        this.arrFiltCategory.splice(this.arrFiltCategory.indexOf(target.value), 1);
        // if (this.arrFiltCategory.length === 0) {
        //   this.initDataProduct.forEach((item) => arrSearch.push(item));
        // } else {
        //   this.initDataProduct.forEach((item) => {
        //     this.arrFiltCategory.forEach((itemWays) => {
        //       if (item.category === itemWays) {
        //         arrSearch.push(item);
        //       }
        //     });
        //   });
        // }
      }
    } else if (target.name === 'brand') {
      // console.log('here');
      if (target.checked) {
        this.arrWaysBrand.push(target.value);
        console.log(this.arrWaysBrand);
        // this.initDataProduct.forEach((item) => {
        //   this.arrWaysBrand.forEach((itemWays) => {
        //     if (item.brand === itemWays) {
        //       arrSearch.push(item);
        //     }
        //   });
        // });
      } else {
        this.arrWaysBrand.splice(this.arrWaysBrand.indexOf(target.value), 1);
        // if (this.arrWaysBrand.length === 0) {
        //   this.initDataProduct.forEach((item) => arrSearch.push(item));
        // } else {
        //   this.initDataProduct.forEach((item) => {
        //     this.arrWaysBrand.forEach((itemWays) => {
        //       if (item.brand === itemWays) {
        //         arrSearch.push(item);
        //       }
        //     });
        //   });
        // }
      }
    }

    if (target.checked) {
      this.initDataProduct.forEach((item) => {
        this.arrFiltCategory.forEach((itemWays) => {
          if (item.category === itemWays) {
            arrSearch.push(item);
          }
        });
      });
      this.filterDataProduct = arrSearch.slice();
    } else {
      if (this.arrFiltCategory.length === 0) {
        this.initDataProduct.forEach((item) => arrSearch.push(item));
      }
      this.filterDataProduct = arrSearch.slice();
    }

    if (this.arrWaysBrand.length > 0) {
      if (this.arrFiltCategory.length === 0) {
        this.initDataProduct.forEach((item) => arrSearch.push(item));
      }
      if (target.checked) {
        arrSearch.forEach((item) => {
          this.arrWaysBrand.forEach((itemWays) => {
            if (item.brand === itemWays) {
              arrWithBrand.push(item);
            }
          });
        });
        this.filterDataProduct = arrWithBrand.slice();
      } else {
        if (this.arrWaysBrand.length === 0) {
          arrSearch.forEach((item) => arrSearch.push(item));
        } else {
          arrSearch.forEach((item) => {
            this.arrWaysBrand.forEach((itemWays) => {
              if (item.brand === itemWays) {
                arrWithBrand.push(item);
              }
            });
          });
        }
        this.filterDataProduct = arrWithBrand.slice();
      }
    }

    productsCounter.textContent = `${arrSearch.length}`;

    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    localStorage.setItem('countProd', `${productsCounter.textContent}`);
    localStorage.setItem('arrFiltCategory', `${JSON.stringify(this.arrFiltCategory)}`);
    this.localStorage();
  }

  searchProducts(e: Event) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const productsCounter = <HTMLElement>document.querySelector('.sort__counter-display');
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    // const arrCurrent = this.filterDataProduct.slice(0);
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
    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    localStorage.setItem('countProd', `${productsCounter.textContent}`);
    localStorage.setItem('searchValue', `${target.value}`);
    this.localStorage();
  }

  addProduct(e: Event) {
    const basketChecker = <HTMLElement>document.querySelector('.basket__checker');
    const target = <HTMLElement>e.target;
    this.filterDataProduct.forEach((item) => {
      if (String(item.id) === target.dataset.id) {
        if (target.classList.contains('card__button-add_active')) {
          item.amount = 1;
          item.inBasket = true;
          item.totalPrice = Number(
            ((item.price - (item.price * item.discountPercentage) / 100) * item.amount).toFixed(2)
          );
          this.arrProductsBasket.push(item);
        } else {
          this.arrProductsBasket.forEach((itemBasket, index) => {
            if (itemBasket.id === item.id) {
              item.inBasket = false;
              this.arrProductsBasket.splice(index, 1);
            }
          });
        }
      }
      basketChecker.textContent = `${this.arrProductsBasket.length}`;
      localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
      localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    });
  }

  addDetailPage(data: number) {
    const basketChecker = <HTMLElement>document.querySelector('.basket__checker');
    basketChecker.textContent = `${this.arrProductsBasket.length}`;
    this.filterDataProduct.forEach((item) => {
      if (item.id === data) {
        this.card.darwCardDetailPage(item);
      }
    });
  }

  showResultBasket() {
    const basketChecker = <HTMLElement>document.querySelector('.basket__checker');
    const resultCounter = <HTMLElement>document.querySelector('.result__counter');
    const resultPriceCounter = <HTMLElement>document.querySelector('.result__price-counter');
    const resultPromo = <HTMLInputElement>document.querySelector('.result__promo');
    const resultPricePromoCounter = <HTMLElement>document.querySelector('.result__price-counter_promo');
    basketChecker.textContent = `${this.arrProductsBasket.length}`;
    let countAmount = 0;
    let countTotalPrice = 0;
    this.arrProductsBasket.forEach((item) => {
      countAmount = countAmount + item.amount!;
    });
    this.arrProductsBasket.forEach((item) => {
      countTotalPrice = countTotalPrice + item.totalPrice! * item.amount!;
    });
    resultCounter.textContent = String(countAmount);
    resultPriceCounter.textContent = `${countTotalPrice.toFixed(2)} $`;

    if (resultPromo.value === 'RS' || resultPromo.value === 'RSSchool') {
      resultPricePromoCounter.textContent = `${(Number(countTotalPrice.toFixed(2)) * 0.9).toFixed(2)} $`;
    } else if (
      resultPromo.value === 'RS, RSSchool' ||
      resultPromo.value === 'RS,RSSchool' ||
      resultPromo.value === 'RS RSSchool'
    ) {
      resultPricePromoCounter.textContent = `${(Number(countTotalPrice.toFixed(2)) * 0.8).toFixed(2)} $`;
    } else {
      resultPriceCounter.textContent = `${countTotalPrice.toFixed(2)} $`;
    }

    this.showPromoCodeBasket(countTotalPrice);
  }

  showPromoCodeBasket(countTotalPrice: number) {
    const resultPromo = <HTMLInputElement>document.querySelector('.result__promo');
    const resultPriceCounter = <HTMLElement>document.querySelector('.result__price-counter');
    const resultPrice = <HTMLElement>document.querySelector('.result__price');
    const resultPricePromo = <HTMLElement>document.querySelector('.result__price_promo');
    const resultPricePromoCounter = <HTMLElement>document.querySelector('.result__price-counter_promo');
    const resulPromoPercentr = <HTMLElement>document.querySelector('.result__percent_promo');
    resultPromo.addEventListener('input', () => {
      if (resultPromo.value === 'RS' || resultPromo.value === 'RSSchool') {
        resultPrice.classList.add('promo_disabled');
        resultPricePromo.classList.add('promo_active');
        resulPromoPercentr.classList.add('promo_active');
        resulPromoPercentr.textContent = '-10%';
        resultPricePromoCounter.textContent = `${(Number(countTotalPrice.toFixed(2)) * 0.9).toFixed(2)} $`;
      } else if (
        resultPromo.value === 'RS, RSSchool' ||
        resultPromo.value === 'RS,RSSchool' ||
        resultPromo.value === 'RS RSSchool'
      ) {
        resultPrice.classList.add('promo_disabled');
        resultPricePromo.classList.add('promo_active');
        resulPromoPercentr.classList.add('promo_active');
        resulPromoPercentr.textContent = '-20%';
        resultPricePromoCounter.textContent = `${(Number(countTotalPrice.toFixed(2)) * 0.8).toFixed(2)} $`;
      } else {
        resultPrice.classList.remove('promo_disabled');
        resultPricePromo.classList.remove('promo_active');
        resulPromoPercentr.classList.remove('promo_active');
        resultPriceCounter.textContent = `${countTotalPrice.toFixed(2)} $`;
      }
    });
  }

  basketCardChangeInfo() {
    const basketItems = document.querySelectorAll<HTMLElement>('.card_basket');
    basketItems.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        const basketItemCounter = <HTMLElement>item.querySelector('.card__item-counter');
        const basketItemTotalPrice = <HTMLElement>item.querySelector('.card__item-total-price');
        const basketItemPlusButton = <HTMLElement>item.querySelector('.card__item-plus');
        const target = <HTMLElement>event.target;
        const arrItem = this.arrProductsBasket[index];
        if (target.classList.contains('card__item-plus')) {
          if (Number(basketItemCounter.textContent) < arrItem.stock) {
            arrItem.amount = arrItem.amount! + 1;
            basketItemCounter.textContent = `${arrItem.amount}`;
            basketItemTotalPrice.textContent = `${(
              (arrItem.price - (arrItem.price * arrItem.discountPercentage) / 100) *
              Number(basketItemCounter.textContent)
            ).toFixed(2)} $`;
          } else {
            target.classList.add('card__btn-control_disabled');
          }
          localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
          this.showResultBasket();
        } else if (target.classList.contains('card__item-minus')) {
          if (Number(basketItemCounter.textContent) > 1) {
            basketItemPlusButton.classList.remove('card__btn-control_disabled');
            arrItem.amount = arrItem.amount! - 1;
            basketItemCounter.textContent = `${arrItem.amount}`;
            basketItemTotalPrice.textContent = `${(
              (arrItem.price - (arrItem.price * arrItem.discountPercentage) / 100) *
              Number(basketItemCounter.textContent)
            ).toFixed(2)} $`;
            localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
          } else {
            const cardButPlus = <HTMLElement>item.querySelector('.card__item-minus');
            this.arrProductsBasket.splice(index, 1);
            this.filterDataProduct.forEach((itemfilt) => {
              if (Number(cardButPlus.dataset.id) === itemfilt.id) {
                itemfilt.inBasket = false;
                localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
                localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
              }
            });
            const basketProductsContainer = <HTMLElement>document.querySelector('.basket__prod-container');
            basketProductsContainer.replaceChildren();
            this.viewCardBasket(this.arrProductsBasket);
            this.basketCardChangeInfo();
          }
          this.showResultBasket();
        }
      });
    });
  }

  localStorage() {
    const arrBasket = JSON.parse(localStorage.getItem('arrBasket')!);
    const filtData = JSON.parse(localStorage.getItem('filtData')!);

    //get data
    if (arrBasket) {
      this.arrProductsBasket = arrBasket;
    }
    if (filtData) {
      this.filterDataProduct = filtData;
    }

    //products sort
    const sortProd = localStorage.getItem('sort');
    const sortSelect = document.querySelectorAll<HTMLInputElement>('.select__item');
    sortSelect.forEach((item) => {
      if (item.value === `${sortProd}`) {
        item.setAttribute('selected', '');
        this.sortWays(sortProd);
        // localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
      }
    });

    //search
    const prodSearch = <HTMLInputElement>document.querySelector('.products__search');
    const productsCounter = <HTMLElement>document.querySelector('.sort__counter-display');
    prodSearch.value = localStorage.getItem('searchValue')!;
    productsCounter.textContent = localStorage.getItem('countProd')!;

    //products view
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
  }
}
