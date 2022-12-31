import PageGrid from '../../grid/page-grid';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Card from '../../../templates/card';

class ProductDetail {
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;
  card: Card;

  constructor() {
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.card = new Card();
    // this.modalWindow = new ModalWindow();
    this.footer = new Footer();
  }

  // prodGridContainer() {
  //   const pathProd = <HTMLElement>document.createElement('div');
  //   pathProd.className = 'path__prod';

  //   const prodContainer = <HTMLElement>document.createElement('div');
  //   prodContainer.className = 'prod__container';

  //   const main = <HTMLElement>document.querySelector('main');
  //   main.appendChild(pathProd);
  //   main.appendChild(prodContainer);
  // }

  draw(): void {
    this.PageGrid.drawGrid();
    this.header.draw();
    // this.card.darwCardDetailPage();
    // this.prodGridContainer();
    this.footer.draw();
  }
}

export default ProductDetail;
