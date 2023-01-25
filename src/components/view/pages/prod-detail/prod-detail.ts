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
    this.footer = new Footer();
  }

  draw(): void {
    this.PageGrid.draw();
    this.header.draw();
    this.footer.draw();
  }
}

export default ProductDetail;
