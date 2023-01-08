import PageGrid from '../../grid/page-grid';

import Filters from './filters/filters';
import Products from './products/products';
import Sort from './sort/sort';
import Header from '../../header/header';
import Footer from '../../footer/footer';
// import Error from './pages/error/error';

export class Main {
  products: Products;
  sort: Sort;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;
  filters: Filters;

  constructor() {
    this.products = new Products();
    // this.filters = new Filters('aside', 'filters');
    this.filters = new Filters();
    this.sort = new Sort();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
  }

  mainGridContainer() {
    const filtersSection = <HTMLElement>document.createElement('aside');
    filtersSection.className = 'filters';

    const productsSection = <HTMLElement>document.createElement('div');
    productsSection.className = 'products';

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(filtersSection);
    // main.append(this.filters.render());
    main.appendChild(productsSection);
  }

  draw(): void {
    this.PageGrid.draw();
    this.mainGridContainer();
    this.header.draw();
    this.footer.draw();
    this.products.draw();
    this.sort.draw();
    this.filters.draw();
  }

  //else need create gride to this elements
}

export default Main;
