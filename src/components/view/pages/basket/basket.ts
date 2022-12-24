import Result from './result/result';
import BasketProd from './products/basketProd';

import PageGrid from '../../grid/page-grid';
import Header from '../../header/header';
import Footer from '../../footer/footer';

class BasketView {
  basketProducts: BasketProd;
  result: Result;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;
  constructor() {
    this.basketProducts = new BasketProd();
    this.result = new Result();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
  }

  basketGridContainer() {
    const basketProd = <HTMLElement>document.createElement('div');
    basketProd.className = 'basket__prod';

    const basketSummary = <HTMLElement>document.createElement('aside');
    basketSummary.className = 'basket__result';

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(basketProd);
    main.appendChild(basketSummary);
  }

  draw(): void {
    this.PageGrid.drawGrid();
    this.header.draw();
    this.basketGridContainer();
    this.basketProducts.draw();
    this.footer.draw();
  }
}

export default BasketView;
