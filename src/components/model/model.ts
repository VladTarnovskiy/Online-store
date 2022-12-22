import AppView from "../view/appView";
import {productData} from "./data";
import {Filters} from "./datafilters"

import {CardItem} from "../types/types";
import {Data} from "../types/types"

export class Model{
    initDataProduct: Data = productData;
    filterDataProduct = this.initDataProduct;
    view: AppView;
    filters: Filters

    constructor() {
        this.view = new AppView ();
        this.filters = new Filters ();
      }

     getProductsdef() {
            this.view.viewCardBlock(this.filterDataProduct.products)
     }

     getProducts(e: MouseEvent) {
        const productsContainer = <HTMLElement>document.querySelector('.product-items');
        const target = <HTMLElement>e.target;
        if (target.classList.contains('view__block')){
            productsContainer.replaceChildren();
            this.view.viewCardBlock(this.filterDataProduct.products)
        } else if (target.classList.contains('view__list')){
            productsContainer.replaceChildren();
            this.view.viewCardList(this.filterDataProduct.products)
        }
        
     }
}