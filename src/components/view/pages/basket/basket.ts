import Result from './result/result';
import Products from './products/products';

export class BasketView {
    products: Products;
    result: Result;
    constructor() {
        this.products = new Products();
        this.result = new Result();
    }

    basketGridContainer () {
        const sortSection = <HTMLElement>document.createElement('div');
        sortSection.className = 'filters';

        const productsSection = <HTMLElement>document.createElement('div');
        productsSection.className = 'products';
        productsSection.textContent = 'Basket don"t realize yet';

        const main = <HTMLElement>document.querySelector('main');
        main.appendChild(sortSection);
        main.appendChild(productsSection);
    }

    draw(): void {
        this.basketGridContainer();
    }
}

export default BasketView;