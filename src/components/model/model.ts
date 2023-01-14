import AppView from '../view/appView';
import { productData } from './data';
import { CardItem } from '../types/types';

export class Model extends AppView {
  initDataProduct: CardItem[] = productData.products;
  filterDataProduct: CardItem[] = productData.products.slice(0);
  arrProductsBasket: CardItem[] = [];
  arrFiltCategory: string[] = [];
  arrWaysBrand: string[] = [];
  arrRange: CardItem[] = [];
  arrSearch: CardItem[] = [];
  arrCategory: CardItem[] = [];
  minPriceData = '';
  maxPriceData = '';
  minStockData = '';
  maxStockData = '';
  pageView = '';

  constructor() {
    super();
  }

  getProducts(e: MouseEvent) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const target = <HTMLElement>e.target;
    if (target.classList.contains('view__block')) {
      productsContainer.replaceChildren();
      this.viewCardBlock(this.filterDataProduct);
      localStorage.setItem('view', 'block');
      this.pageView = 'block';
    } else if (target.classList.contains('view__list')) {
      productsContainer.replaceChildren();
      this.viewCardList(this.filterDataProduct);
      localStorage.setItem('view', 'list');
      this.pageView = 'list';
    }
    if (this.filterDataProduct.length === 0) {
      this.getMessageEmptyProducts(productsContainer);
    }
    this.getDataFromStorage();
    this.urlHashChange();
  }

  sortProducts(value: string) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    productsContainer.replaceChildren();
    this.sortWays(value);
    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    this.urlHashChange();
    this.getDataFromStorage();
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
    const arrCategory: CardItem[] = [];
    const arrWithBrand: CardItem[] = [];
    if (target.name === 'category') {
      if (target.checked) {
        this.arrFiltCategory.push(target.value);
      } else {
        this.arrFiltCategory.splice(this.arrFiltCategory.indexOf(target.value), 1);
      }
    } else if (target.name === 'brand') {
      if (target.checked) {
        this.arrWaysBrand.push(target.value);
      } else {
        this.arrWaysBrand.splice(this.arrWaysBrand.indexOf(target.value), 1);
      }
    }

    //Get data from category
    if (target.checked) {
      this.initDataProduct.forEach((item) => {
        this.arrFiltCategory.forEach((itemWays) => {
          if (item.category === itemWays) {
            arrCategory.push(item);
          }
        });
      });
      arrCategory.forEach((item) => {
        this.arrProductsBasket.forEach((itemBasket) => {
          if (item.id === itemBasket.id) {
            item.inBasket = true;
          }
        });
      });
      this.arrCategory = arrCategory.slice();
    } else {
      if (this.arrFiltCategory.length === 0) {
        this.initDataProduct.forEach((item) => arrCategory.push(item));
      } else {
        this.initDataProduct.forEach((item) => {
          this.arrFiltCategory.forEach((itemWays) => {
            if (item.category === itemWays) {
              arrCategory.push(item);
            }
          });
        });
      }
      arrCategory.forEach((item) => {
        this.arrProductsBasket.forEach((itemBasket) => {
          if (item.id === itemBasket.id) {
            item.inBasket = true;
          }
        });
      });
      this.arrCategory = arrCategory.slice();
    }
    //Get data from brand
    if (this.arrWaysBrand.length > 0) {
      if (this.arrFiltCategory.length === 0) {
        this.initDataProduct.forEach((item) => {
          if (!arrCategory.includes(item)) {
            arrCategory.push(item);
          }
        });
      }

      if (target.checked) {
        arrCategory.forEach((item) => {
          this.arrWaysBrand.forEach((itemWays) => {
            if (item.brand === itemWays) {
              arrWithBrand.push(item);
            }
          });
        });
        arrWithBrand.forEach((item) => {
          this.arrProductsBasket.forEach((itemBasket) => {
            if (item.id === itemBasket.id) {
              item.inBasket = true;
            }
          });
        });
        this.arrCategory = arrWithBrand.slice();
      } else {
        if (this.arrWaysBrand.length === 0) {
          arrWithBrand.forEach((item) => arrCategory.push(item));
        } else {
          arrCategory.forEach((item) => {
            this.arrWaysBrand.forEach((itemWays) => {
              if (item.brand === itemWays) {
                arrWithBrand.push(item);
              }
            });
          });
        }
        arrWithBrand.forEach((item) => {
          this.arrProductsBasket.forEach((itemBasket) => {
            if (item.id === itemBasket.id) {
              item.inBasket = true;
            }
          });
        });
        this.arrCategory = arrWithBrand.slice();
      }
    }

    this.urlHashChange();
    this.commonFiltersData();
    this.autoFilterRangeChange();
    productsCounter.textContent = `${this.filterDataProduct.length}`;

    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    localStorage.setItem('countProd', `${productsCounter.textContent}`);
    localStorage.setItem('arrFiltCategory', `${JSON.stringify(this.arrFiltCategory)}`);
    localStorage.setItem('arrFiltBrand', `${JSON.stringify(this.arrWaysBrand)}`);
    this.getDataFromStorage();
  }

  filterByRange() {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const minPrice = <HTMLInputElement>document.querySelector('.slider__range_left-price');
    const maxPrice = <HTMLInputElement>document.querySelector('.slider__range_right-price');
    const minStock = <HTMLInputElement>document.querySelector('.slider__range_left-stock');
    const maxStock = <HTMLInputElement>document.querySelector('.slider__range_right-stock');
    const arrItems: CardItem[] = [];
    productsContainer.replaceChildren();

    localStorage.setItem('range__left-price', `${minPrice.value}`);
    localStorage.setItem('range__right-price', `${maxPrice.value}`);
    localStorage.setItem('range__left-stock', `${minStock.value}`);
    localStorage.setItem('range__right-stock', `${maxStock.value}`);
    this.minPriceData = minPrice.value;
    this.maxPriceData = maxPrice.value;
    this.minStockData = minStock.value;
    this.maxStockData = maxStock.value;

    this.initDataProduct.forEach((item) => {
      if (
        item.price >= Number(minPrice.value) &&
        item.price <= Number(maxPrice.value) &&
        item.stock >= Number(minStock.value) &&
        item.stock <= Number(maxStock.value)
      ) {
        arrItems.push(item);
      }
    });

    arrItems.forEach((item) => {
      this.arrProductsBasket.forEach((itemBasket) => {
        if (item.id === itemBasket.id) {
          item.inBasket = true;
        }
      });
    });
    this.arrRange = arrItems.slice();
    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    this.urlHashChange();
    this.commonFiltersData();

    this.getDataFromStorage();
  }

  autoFilterRangeChange() {
    const minPrice = <HTMLInputElement>document.querySelector('.slider__range_left-price');
    const maxPrice = <HTMLInputElement>document.querySelector('.slider__range_right-price');
    const minStock = <HTMLInputElement>document.querySelector('.slider__range_left-stock');
    const maxStock = <HTMLInputElement>document.querySelector('.slider__range_right-stock');
    const arrPrice: number[] = [];
    const arrStock: number[] = [];
    this.filterDataProduct.forEach((item) => {
      arrPrice.push(item.price);
      arrStock.push(item.stock);
    });
    minPrice.value = String(Math.min.apply(null, arrPrice));
    maxPrice.value = String(Math.max.apply(null, arrPrice));
    minStock.value = String(Math.min.apply(null, arrStock));
    maxStock.value = String(Math.max.apply(null, arrStock));
    localStorage.setItem('range__left-price', `${minPrice.value}`);
    localStorage.setItem('range__right-price', `${maxPrice.value}`);
    localStorage.setItem('range__left-stock', `${minStock.value}`);
    localStorage.setItem('range__right-stock', `${maxStock.value}`);
  }

  searchProducts(e: Event) {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');
    const productsCounter = <HTMLElement>document.querySelector('.sort__counter-display');
    const target = <HTMLInputElement>e.target;
    productsContainer.replaceChildren();
    const data = Array.from(this.initDataProduct);
    data.forEach((item) => {
      item.inBasket = false;
    });
    const arrSearch: CardItem[] = [];
    if (target.value === '') {
      data.forEach((item) => {
        this.arrProductsBasket.forEach((itemArr) => {
          if (item.id === itemArr.id) {
            item.inBasket = true;
          }
        });
        arrSearch.push(item);
      });
    } else if (target.value !== '') {
      data.forEach((item) => {
        const itemTitle = item.title.toLowerCase().split(' ');
        const itemDescr = item.description.toLowerCase().split(' ');
        const categDescr = item.category.toLowerCase().split(' ');
        const brandDescr = item.brand.toLowerCase().split(' ');
        const categoryDescr = item.brand.toLowerCase().split(' ');
        const arrSearchData = itemTitle.concat(itemDescr, categDescr, brandDescr, categoryDescr);
        const regex = new RegExp(`${target.value.toLowerCase()}`, 'gi');
        if (arrSearchData.join('').match(regex) && !arrSearch.includes(item)) {
          this.arrProductsBasket.forEach((itemArr) => {
            if (item.id === itemArr.id) {
              item.inBasket = true;
            }
          });
          arrSearch.push(item);
        }
      });
    }
    productsCounter.textContent = `${this.arrSearch.length}`;
    this.arrSearch = arrSearch.slice();
    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    localStorage.setItem('countProd', `${productsCounter.textContent}`);
    localStorage.setItem('searchValue', `${target.value}`);
    this.commonFiltersData();
    this.autoFilterRangeChange();
    this.urlHashChange();
    this.getDataFromStorage();
  }

  urlHashChange() {
    //categ and brand
    let filtByBrand = '';
    let filtByCategory = '';
    if (this.arrFiltCategory.length > 0) {
      filtByCategory = 'category=' + this.arrFiltCategory.join('%') + '&';
    } else {
      filtByCategory = '';
    }
    if (this.arrWaysBrand.length > 0) {
      filtByBrand = 'brand=' + this.arrWaysBrand.join('%') + '&';
    } else {
      filtByBrand = '';
    }

    //price and stock
    let filterByRange = '';
    if (this.minPriceData.length > 0) {
      filterByRange =
        'price=' +
        this.minPriceData +
        '|' +
        this.maxPriceData +
        '&' +
        'stock=' +
        this.minStockData +
        '|' +
        this.maxStockData +
        '&';
    } else {
      filterByRange = '';
    }

    //sort
    const sortStorage = localStorage.getItem('sort');
    let sortValue = '';
    if (sortStorage) {
      sortValue = 'sort=' + sortStorage + '&';
    } else {
      sortValue = '';
    }

    //search
    const searchStorage = localStorage.getItem('searchValue');
    let searchValue = '';
    if (searchStorage) {
      searchValue = 'search=' + searchStorage + '&';
    } else {
      searchValue = '';
    }

    //view
    let viewValue = '';
    if (this.pageView.length > 0) {
      viewValue = 'view=' + this.pageView + '&';
    } else {
      viewValue = '';
    }

    const href = '#?' + filtByCategory + filtByBrand + filterByRange + sortValue + searchValue + viewValue;
    localStorage.setItem('url', href);

    window.location.href = href;
  }

  changeAmountOfFilter() {
    const amountCatDisplays = document.querySelectorAll<HTMLElement>('.display_category');
    const amountBrandDisplays = document.querySelectorAll<HTMLElement>('.display_brand');

    amountCatDisplays.forEach((itemDisp) => {
      let count = 0;
      this.filterDataProduct.forEach((itemData) => {
        if (itemDisp.dataset.filterBlock === itemData.category) {
          count++;
        }
        itemDisp.textContent = `(${count})`;
      });
    });

    amountBrandDisplays.forEach((itemDisp) => {
      let count = 0;
      this.filterDataProduct.forEach((itemData) => {
        if (itemDisp.dataset.filterBlock === itemData.brand) {
          count++;
        }

        itemDisp.textContent = `(${count})`;
      });
    });
  }

  commonFiltersData() {
    localStorage.setItem('arrRange', `${JSON.stringify(this.arrRange)}`);
    localStorage.setItem('arrSearch', `${JSON.stringify(this.arrSearch)}`);
    localStorage.setItem('arrCategory', `${JSON.stringify(this.arrCategory)}`);

    if (this.arrCategory.length === 0 && this.arrFiltCategory.length === 0 && this.arrWaysBrand.length === 0) {
      this.initDataProduct.forEach((item) => this.arrCategory.push(item));
      this.arrCategory.forEach((item) => {
        this.arrProductsBasket.forEach((itemBasket) => {
          if (item.id === itemBasket.id) {
            item.inBasket = true;
          }
        });
      });
    }

    const minPrice = <HTMLInputElement>document.querySelector('.slider__range_left-price');
    const maxPrice = <HTMLInputElement>document.querySelector('.slider__range_right-price');
    if (this.arrRange.length === 0 && minPrice.value === '0' && maxPrice.value === '2000') {
      this.initDataProduct.forEach((item) => this.arrRange.push(item));
      this.arrRange.forEach((item) => {
        this.arrProductsBasket.forEach((itemBasket) => {
          if (item.id === itemBasket.id) {
            item.inBasket = true;
          }
        });
      });
    }

    const searchInput = <HTMLInputElement>document.querySelector('.products__search');
    if (this.arrSearch.length === 0 && searchInput.value === '') {
      this.initDataProduct.forEach((item) => this.arrSearch.push(item));
      this.arrSearch.forEach((item) => {
        this.arrProductsBasket.forEach((itemBasket) => {
          if (item.id === itemBasket.id) {
            item.inBasket = true;
          }
        });
      });
    }

    this.arrCategory.forEach((item) => {
      this.arrProductsBasket.forEach((itemBasket) => {
        if (item.id === itemBasket.id) {
          item.inBasket = true;
        }
      });
    });

    const arrCategRange: CardItem[] = [];
    const result: CardItem[] = [];
    this.arrCategory.forEach((itemC) => {
      this.arrRange.forEach((itemR) => {
        if (itemC.id === itemR.id) {
          arrCategRange.push(itemC);
        }
      });
    });

    arrCategRange.forEach((itemC) => {
      this.arrSearch.forEach((itemR) => {
        if (itemC.id === itemR.id) {
          result.push(itemC);
        }
      });
    });
    this.filterDataProduct = result.slice();
    localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    this.changeAmountOfFilter();
  }

  addProduct(e: Event) {
    const target = <HTMLElement>e.target;
    this.filterDataProduct.forEach((item: CardItem): void => {
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
      this.addTotalPrice();

      this.addTotalAmountBasket();
      localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
      localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    });
  }

  addProductDetailPage(e: Event) {
    const addButDetailPage = <HTMLElement>document.querySelector('.card__button_add');
    const target = <HTMLElement>e.target;
    this.filterDataProduct.forEach((item: CardItem): void => {
      if (String(item.id) === target.dataset.id) {
        if (
          target.classList.contains('prod__but-buy') &&
          !addButDetailPage.classList.contains('card__button-add_active')
        ) {
          addButDetailPage.classList.add('card__button-add_active');
          addButDetailPage.textContent = 'In cart';
          item.amount = 1;
          item.inBasket = true;
          item.totalPrice = Number(
            ((item.price - (item.price * item.discountPercentage) / 100) * item.amount).toFixed(2)
          );
          this.arrProductsBasket.push(item);
        }
      }
      this.addTotalPrice();
      this.addTotalAmountBasket();
      localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
      localStorage.setItem('filtData', `${JSON.stringify(this.filterDataProduct)}`);
    });
  }

  addDetailPage(data: number) {
    this.addTotalAmountBasket();
    this.initDataProduct.forEach((item) => {
      if (item.id === data) {
        this.card.darwCardDetailPage(item);
      }
    });
    this.addTotalPrice();
  }

  getPageAfterPay() {
    this.modalWindow.draw();
    const popup = <HTMLElement>document.querySelector('.popup__form');
    const buyButton = <HTMLElement>document.querySelector('.button_popup');
    buyButton.addEventListener('click', () => {
      setTimeout(() => {
        const errorMessages = document.querySelectorAll<HTMLElement>('.error-message');
        if (errorMessages.length === 0) {
          popup.replaceChildren();
          popup.classList.add('valid_message');
          popup.textContent = 'The order has been successfully placed!';
          setTimeout(() => {
            window.location.href = '#?';
            this.arrProductsBasket = [];
            localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
          }, 4000);
        }
      }, 300);
    });
  }

  addTotalPrice() {
    let count = 0;
    this.arrProductsBasket.forEach((item) => {
      if (item.amount) {
        count += item.price * item.amount;
      }
    });
    const totalPriceHeader = <HTMLElement>document.querySelector('.total-price_header');
    totalPriceHeader.textContent = `Total: ${count} $`;
    localStorage.setItem('resultPrice', `${count}`);
  }

  addTotalAmountBasket() {
    let count = 0;
    this.arrProductsBasket.forEach((item) => {
      if (item.amount) {
        count += item.amount;
      }
    });
    const totalCountProd = <HTMLElement>document.querySelector('.basket__checker');
    totalCountProd.textContent = `${count}`;
    localStorage.setItem('totalProdCount', `${count}`);
  }

  showResultBasket() {
    const limitValue = <HTMLElement>document.querySelector('.pagination-limit__value');
    const resultCounter = <HTMLElement>document.querySelector('.result__counter');
    const resultPriceCounter = <HTMLElement>document.querySelector('.result__price-counter');
    const resultPromo = <HTMLInputElement>document.querySelector('.result__promo');
    const resultPricePromoCounter = <HTMLElement>document.querySelector('.result__price-counter_promo');
    this.addTotalAmountBasket();

    limitValue.setAttribute('value', `${this.arrProductsBasket.length}`);

    let countAmount = 0;
    let countTotalPrice = 0;

    this.arrProductsBasket.forEach((item) => {
      if (item.amount) {
        countAmount = countAmount + item.amount;
      }
    });
    this.arrProductsBasket.forEach((item) => {
      if (item.amount && item.price) {
        countTotalPrice = countTotalPrice + item.price * item.amount;
      }
    });
    resultCounter.textContent = String(countAmount);
    resultPriceCounter.textContent = `${countTotalPrice.toFixed(2)} $`;

    const productsContainer = <HTMLElement>document.querySelector('.main');
    if (this.arrProductsBasket.length === 0) {
      productsContainer.replaceChildren();
      this.getMessageEmptyBasket(productsContainer);
    }

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
    localStorage.setItem('resultPrice', `${countTotalPrice}`);

    this.addTotalPrice();

    this.showPromoCodeBasket(countTotalPrice);
  }

  changeProductWithPagination(value: number, numPage: number) {
    const prodContainer = <HTMLElement>document.querySelector('.basket__prod-container');

    const arrWithPagination: CardItem[] = [];
    this.arrProductsBasket.forEach((item, index) => {
      if (value * numPage > index && value * (numPage - 1) <= index) {
        arrWithPagination.push(item);
      }
    });
    prodContainer.replaceChildren();
    this.viewCardBasket(arrWithPagination);
    const prodNums = document.querySelectorAll<HTMLElement>('.card__number');

    this.arrProductsBasket.forEach((item, index) => {
      prodNums.forEach((numItem) => {
        if (Number(numItem.dataset.id) == item.id) {
          numItem.textContent = `${index + 1}`;
        }
      });
    });
    this.basketCardChangeInfo();
  }

  showPromoCodeBasket(countTotalPrice: number) {
    const resultPromo = <HTMLInputElement>document.querySelector('.result__promo');
    const resultPriceCounter = <HTMLElement>document.querySelector('.result__price-counter');
    const resultPrice = <HTMLElement>document.querySelector('.result__price');
    const resultPricePromo = <HTMLElement>document.querySelector('.result__price_promo');
    const resultPricePromoCounter = <HTMLElement>document.querySelector('.result__price-counter_promo');
    const resulPromoPercentr = <HTMLElement>document.querySelector('.result__percent_promo');

    if (resultPromo) {
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
            if (arrItem.amount) {
              arrItem.amount = arrItem.amount + 1;
            }
            basketItemCounter.textContent = `${arrItem.amount}`;
            basketItemTotalPrice.textContent = `${(arrItem.price * Number(basketItemCounter.textContent)).toFixed(
              2
            )} $`;
          } else {
            target.classList.add('card__btn-control_disabled');
          }
          localStorage.setItem('arrBasket', `${JSON.stringify(this.arrProductsBasket)}`);
          this.showResultBasket();
        } else if (target.classList.contains('card__item-minus')) {
          if (Number(basketItemCounter.textContent) > 1) {
            basketItemPlusButton.classList.remove('card__btn-control_disabled');
            if (arrItem.amount) {
              arrItem.amount = arrItem.amount - 1;
            }
            basketItemCounter.textContent = `${arrItem.amount}`;
            basketItemTotalPrice.textContent = `${(arrItem.price * Number(basketItemCounter.textContent)).toFixed(
              2
            )} $`;
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

  getResetFilters() {
    localStorage.setItem('filtData', `${JSON.stringify(this.initDataProduct)}`);
    localStorage.setItem('countProd', `100`);
    localStorage.setItem('arrFiltCategory', `${JSON.stringify([])}`);
    localStorage.setItem('arrFiltBrand', `${JSON.stringify([])}`);

    localStorage.setItem('range__left-price', `0`);
    localStorage.setItem('range__right-price', `2000`);
    localStorage.setItem('range__left-stock', `0`);
    localStorage.setItem('range__right-stock', `150`);

    localStorage.setItem('arrRange', `[]`);
    localStorage.setItem('arrSearch', `[]`);
    localStorage.setItem('arrCategory', `[]`);

    localStorage.setItem('searchValue', ``);
    const filterItems = document.querySelectorAll<HTMLInputElement>('.filter-block__input');
    filterItems.forEach((item) => {
      item.checked = false;
    });

    window.location.href = '#?';
    localStorage.setItem('url', '#?');

    this.getDataFromStorage();
  }

  getDataFromStorage() {
    const arrBasket = JSON.parse(localStorage.getItem('arrBasket') as string);
    const filtData = JSON.parse(localStorage.getItem('filtData') as string);
    const productsCount = <HTMLElement>document.querySelector('.sort__counter-display');

    //get data
    if (arrBasket) {
      this.arrProductsBasket = arrBasket;
    }
    if (filtData) {
      this.filterDataProduct = filtData;
    }

    this.filterDataProduct.forEach((item) => {
      item.inBasket = false;
      this.arrProductsBasket.forEach((itemBasket) => {
        if (item.id === itemBasket.id) {
          item.inBasket = true;
        }
      });
    });

    //products sort
    const sortProd = localStorage.getItem('sort');
    const sortSelect = document.querySelectorAll<HTMLInputElement>('.select__item');
    sortSelect.forEach((item) => {
      if (item.value === `${sortProd}`) {
        item.setAttribute('selected', '');
        this.sortWays(sortProd);
      }
    });

    //filers common
    const arrRange = JSON.parse(localStorage.getItem('arrRange') as string);
    const arrSearch = JSON.parse(localStorage.getItem('arrSearch') as string);
    const arrCategory = JSON.parse(localStorage.getItem('arrCategory') as string);

    if (arrRange) {
      this.arrRange = arrRange;
    }

    if (arrSearch) {
      this.arrSearch = arrSearch;
    }

    if (arrCategory) {
      this.arrCategory = arrCategory;
    }
    //search
    const prodSearch = <HTMLInputElement>document.querySelector('.products__search');
    const productsCounter = <HTMLElement>document.querySelector('.sort__counter-display');
    prodSearch.value = localStorage.getItem('searchValue') as string;
    productsCounter.textContent = localStorage.getItem('countProd') as string;

    //filters
    const filterItems = document.querySelectorAll<HTMLInputElement>('.filter-block__input');
    const arrFiltCategory = JSON.parse(localStorage.getItem('arrFiltCategory') as string);
    const arrFiltBrand = JSON.parse(localStorage.getItem('arrFiltBrand') as string);
    if (arrFiltCategory) {
      this.arrFiltCategory = arrFiltCategory;
    }

    if (arrFiltBrand) {
      this.arrWaysBrand = arrFiltBrand;
    }

    filterItems.forEach((item) => {
      if (arrFiltCategory) {
        arrFiltCategory.forEach((itemCateg: string) => {
          if (item.value === itemCateg) {
            item.checked = true;
          }
        });
      }

      if (arrFiltBrand) {
        arrFiltBrand.forEach((itemCateg: string) => {
          if (item.value === itemCateg) {
            item.checked = true;
          }
        });
      }
    });

    //rangeFilter
    const minPriceValue = localStorage.getItem('range__left-price');
    const maxPriceValue = localStorage.getItem('range__right-price');
    const minStockValue = localStorage.getItem('range__left-stock');
    const maxStockValue = localStorage.getItem('range__right-stock');

    const minPrice = <HTMLInputElement>document.querySelector('.slider__range_left-price');
    const maxPrice = <HTMLInputElement>document.querySelector('.slider__range_right-price');
    const minStock = <HTMLInputElement>document.querySelector('.slider__range_left-stock');
    const maxStock = <HTMLInputElement>document.querySelector('.slider__range_right-stock');

    const minPriceText = <HTMLElement>document.querySelector('.slider-text__min-price');
    const maxPriceText = <HTMLElement>document.querySelector('.slider-text__max-price');
    const minStockText = <HTMLElement>document.querySelector('.slider__text_min-stock');
    const maxStockText = <HTMLElement>document.querySelector('.slider__text_max-stock');

    if (minPriceValue) {
      const progressLineOfPrice = <HTMLInputElement>document.querySelector('.progress-line-price');
      progressLineOfPrice.style.left = `${(Number(minPriceValue) / +minPrice.max) * 100}%`;
      progressLineOfPrice.style.right = `${100 - (Number(maxPriceValue) / +maxPrice.max) * 100}%`;
      minPriceText.textContent = minPriceValue;
      minPrice.value = minPriceValue;
    }
    if (maxPriceValue) {
      maxPriceText.textContent = maxPriceValue;
      maxPrice.value = maxPriceValue;
    }
    if (minStockValue) {
      const progressLineOfStock = <HTMLInputElement>document.querySelector('.progress-line-stock');
      progressLineOfStock.style.left = `${(Number(minStockValue) / +minStock.max) * 100}%`;
      progressLineOfStock.style.right = `${100 - (Number(maxStockValue) / +maxStock.max) * 100}%`;
      minStockText.textContent = minStockValue;
      minStock.value = minStockValue;
    }
    if (maxStockValue) {
      maxStockText.textContent = maxStockValue;
      maxStock.value = maxStockValue;
    }

    //products view
    const viewStorage = localStorage.getItem('view');
    const prodContainer = <HTMLElement>document.querySelector('.product-items');
    const blockBut = <HTMLElement>document.querySelector('.view__block');
    const listBut = <HTMLElement>document.querySelector('.view__list');
    prodContainer.replaceChildren();

    if (this.filterDataProduct.length > 0) {
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
    } else {
      const noneProductInfo = <HTMLElement>document.createElement('div');
      noneProductInfo.className = 'product-none-info';
      noneProductInfo.textContent = 'No products found.';
      prodContainer.appendChild(noneProductInfo);
    }

    const resultPrice = localStorage.getItem('resultPrice');
    if (resultPrice) {
      const totalPriceHeader = <HTMLElement>document.querySelector('.total-price_header');
      totalPriceHeader.textContent = `Total: ${resultPrice} $`;
    }

    const amountProdBasket = localStorage.getItem('totalProdCount');
    if (amountProdBasket) {
      const totalCountProd = <HTMLElement>document.querySelector('.basket__checker');
      totalCountProd.textContent = amountProdBasket;
    }

    productsCount.textContent = `${this.filterDataProduct.length}`;
    this.commonFiltersData();
  }
}
