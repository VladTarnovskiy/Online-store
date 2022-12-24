import Result from './result/result';
import PageGrid from '../../grid/page-grid';
import Header from '../../header/header';
import Footer from '../../footer/footer';

import Card from '../../../templates/card';

class BasketView {
  result: Result;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;
  card: Card;

  constructor() {
    this.result = new Result();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
    this.card = new Card();
  }

  basketGridContainer() {
    const basketProd = <HTMLElement>document.createElement('div');
    basketProd.className = 'basket__prod';

    const basketProdTille = <HTMLElement>document.createElement('div');
    basketProdTille.className = 'basket__prod-title';
    basketProdTille.textContent = 'Products in cart';

    const basketProdContainer = <HTMLElement>document.createElement('div');
    basketProdContainer.className = 'basket__prod-container';

    basketProd.appendChild(basketProdTille);
    basketProd.appendChild(basketProdContainer);

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
    this.card.drawCardBasket();
    this.result.draw();
    this.footer.draw();
  }
}

export default BasketView;
