import Header from './header/header';
import Footer from './footer/footer';
import Main from './pages/main/main';
import PageGrid from './grid/page-grid';
// import Basket from './pages/basket/basket';
// import Error from './pages/error/error';

export class AppView {
    PageGrid: PageGrid;
    header: Header;
    footer: Footer;
    main: Main;
    // basket: Basket;
    // error: Error;
    constructor() {
        this.PageGrid = new PageGrid();
        this.header = new Header();
        this.footer = new Footer();
        this.main = new Main();
        // this.basket = new Basket();
        // this.error = new Error();
    }

    drawGridMainPage(): void {
        //здесь нужно базовую сделать сетку страницы
        //Желатель вынести в отдельный класс гриды
    }

    drawGridBasketPage(): void {
        //здесь нужно базовую сделать сетку страницы
        //Желатель вынести в отдельный класс гриды
    }

    drawMain(): void{
        this.PageGrid.draw();
        this.header.draw();
        this.main.draw();
        this.footer.draw();
    }

    // drawBasket(data: Data): void{
    //     this.drawGridBasketPage()
    //     this.header.draw();
    //     this.basket.draw(data);
    //     this.footer.draw();
    // }

    // drawError(data: Data): void{
    //     this.error.draw();
    // }
}

export default AppView;
