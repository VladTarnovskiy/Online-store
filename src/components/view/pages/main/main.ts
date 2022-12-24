// import Filters from './filters/filters';
import PageGrid from '../../grid/page-grid';
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
  // filters: Filters;

  constructor() {
    this.products = new Products();
    // this.filters = new Filters();
    this.sort = new Sort();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
  }

  mainGridContainer() {
    const sortSection = <HTMLElement>document.createElement('aside');
    sortSection.className = 'filters';

    const productsSection = <HTMLElement>document.createElement('div');
    productsSection.className = 'products';

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(sortSection);
    main.appendChild(productsSection);
  }

  draw(): void {
    // this.filters.draw()
    this.PageGrid.drawGrid();
    this.mainGridContainer();
    this.header.draw();
    this.footer.draw();
    this.products.draw();
    this.sort.draw();
  }
}

export default Main;
