import Header from './header/header';
import Footer from './footer/footer';
import Basket from './pages/basket/basket';
import Main from './pages/main/main';
import Error from './pages/error/error';

export class AppView {
    header: Header;
    footer: Footer;
    main: Main;
    basket: Basket;
    error: Error;
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.basket = new Basket();
        this.main = new Main();
        this.error = new Error();
    }

    drawGridMainPage(): void {
        //здесь нужно базовую сделать сетку страницы
        //Желатель вынести в отдельный класс гриды
    }

    drawGridBasketPage(): void {
        //здесь нужно базовую сделать сетку страницы
        //Желатель вынести в отдельный класс гриды
    }

    drawMain(data: Data): void{
        this.drawGridMainPage()
        this.header.draw();
        this.main.draw(data);
        this.footer.draw();
    }

    drawBasket(data: Data): void{
        this.drawGridBasketPage()
        this.header.draw();
        this.basket.draw(data);
        this.footer.draw();
    }

    drawError(data: Data): void{
        this.error.draw();
    }
}

export default AppView;
