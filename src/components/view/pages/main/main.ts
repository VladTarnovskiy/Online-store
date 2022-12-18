import Card from './card/card';
import Filters from './filters/filters';
import Sort from './sort/sort';

export class Main {
    card: Card;
    filters: Filters;
    sort: Sort;
    constructor() {
        this.card = new Card();
        this.filters = new Filters();
        this.sort = new Sort();
    }

    draw(): void {
        this.card.draw(data)
        this.filters.draw()
        this.sort.draw()
    }
    //else need create gride to this elements
}

export default Main;