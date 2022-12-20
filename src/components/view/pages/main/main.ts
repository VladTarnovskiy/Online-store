// import Card from './card/card';
// import Filters from './filters/filters';
import Products from './products/products';
import Sort from './sort/sort';

export class Main {
    // card: Card;
    products: Products;
    sort: Sort;
    // filters: Filters;
    
    constructor() {
        // this.card = new Card();
        this.products = new Products();
        // this.filters = new Filters();
        this.sort = new Sort();
    }

    mainGridContainer () {
        const sortSection = <HTMLElement>document.createElement('aside');
        sortSection.className = 'filters';

        const productsSection = <HTMLElement>document.createElement('div');
        productsSection.className = 'products';

        const main = <HTMLElement>document.querySelector('main');
        main.appendChild(sortSection);
        main.appendChild(productsSection);
    }

    draw(): void {
        this.mainGridContainer()
        // this.filters.draw()
        this.products.draw()
        // this.card.draw()
        this.sort.draw()
    }
}

export default Main;