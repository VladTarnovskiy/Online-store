import AppView from "../view/appView";
import {productData} from "./data";

import {Filters} from "./datafilters"

import {CardItem} from "../types/types";
import {Data} from "../types/types"

export class Model{
    initDataProduct: CardItem[] = productData.products;
    filterDataProduct = this.initDataProduct;
    view: AppView;
    filters: Filters;

    constructor() {
        this.view = new AppView ();
        this.filters = new Filters ();
      }

     getProductsdef() {
            this.view.viewCardBlock(this.initDataProduct)
     }

     getProducts(e: MouseEvent) {
        const productsContainer = <HTMLElement>document.querySelector('.product-items');
        const target = <HTMLElement>e.target;
        if (target.classList.contains('view__block')){
            productsContainer.replaceChildren();
            this.view.viewCardBlock(this.filterDataProduct)
            localStorage.setItem('view', 'block')
        } else if (target.classList.contains('view__list')){
            productsContainer.replaceChildren();
            this.view.viewCardList(this.filterDataProduct)
            localStorage.setItem('view', 'list')
        }
     }

     sortProducts(e: Event) {
        const productsContainer = <HTMLElement>document.querySelector('.product-items');
        const target = <HTMLInputElement>e.target;
        productsContainer.replaceChildren();
        switch (target.value) {
            case 'default':
                this.filterDataProduct = this.initDataProduct;
                break;
            case 'priceInc':
                this.filterDataProduct.sort((a,b) => {return a.price - b.price;})
                break;
            case 'priceDec':
                this.filterDataProduct.sort((a,b) => {return b.price - a.price;})
                break;
            case 'rateInc':
                this.filterDataProduct.sort((a,b) => {return a.rating - b.rating;})
                break
            case 'rateDec':
                this.filterDataProduct.sort((a,b) => {return b.rating - a.rating;})
                break;
            }

            const viewStorage = localStorage.getItem('view');
            if(viewStorage === 'block'){
                this.view.viewCardBlock(this.filterDataProduct)
            } else {
                this.view.viewCardList(this.filterDataProduct)
            }
     }
}