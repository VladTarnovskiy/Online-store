import Result from './result/result';
import ModalWindow from './modalWindow/modalWindow';
import PageGrid from '../../grid/page-grid';
import Header from '../../header/header';
import Footer from '../../footer/footer';

class BasketView {
  result: Result;
  PageGrid: PageGrid;
  header: Header;
  modalWindow: ModalWindow;
  footer: Footer;

  constructor() {
    this.result = new Result();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.modalWindow = new ModalWindow();
    this.footer = new Footer();
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
    this.result.draw();
    this.modalWindow.draw();
    this.footer.draw();
  }
}

export default BasketView;
