import Card from './card/card';
import Filters from './filters/filters';
import Products from './products/products';
// import Sort from './sort/sort';

class Main {
    card: Card;
    products: Products;
    filters: Filters;
    // sort: Sort;

    constructor() {
        this.card = new Card();
        this.products = new Products();
        this.filters = new Filters('aside', 'filters');
        // this.sort = new Sort();
    }

    mainGridContainer () {
        const productsSection = <HTMLElement>document.createElement('div');
        productsSection.className = 'products';
        const main = <HTMLElement>document.querySelector('main');
        main.append(this.filters.render());
        // main.appendChild(sortSection);
        main.appendChild(productsSection);
    }

    draw(): void {
        this.mainGridContainer()
        this.products.draw()
        this.card.draw()
        // this.sort.draw()
    }
    //else need create gride to this elements
}

export default Main;