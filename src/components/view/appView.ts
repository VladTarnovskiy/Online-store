import AppController  from  '../controller/controller';
import {productData} from "../model/data";

import Header from './header/header';
import Footer from './footer/footer';
import Main from './pages/main/main';
import Basket from './pages/basket/basket';
// import Error from './pages/error/error';
import PageGrid from './grid/page-grid';
import Card from '../templates/card';
import {Data} from "../types/types";


export class AppView {
    PageGrid: PageGrid;
    header: Header;
    footer: Footer;
    main: Main;
    card: Card;
    basket: Basket;
    // error: Error;

    constructor() {
        this.PageGrid = new PageGrid();
        this.header = new Header();
        this.footer = new Footer();
        this.main = new Main();
        this.card = new Card();
        this.basket = new Basket();
        // this.error = new Error();
    }

    drawGridMainPage(): void {
        //здесь нужно базовую сделать сетку страницы
        //Желатель вынести в отдельный класс гриды
    }

    // drawGridBasketPage(): void {
    //     const viewContainer = <HTMLElement>document.querySelector('body')
    //     viewContainer.replaceChildren()
    // }

    drawMain(): void{
        this.PageGrid.draw();
        this.header.draw();
        this.main.draw();
        this.footer.draw();
        
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    viewCardBlock(data:any) {
        data.forEach((item) => {
          this.card.drawBlock(item);
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    viewCardList(data:any) {
        data.forEach((item) => {
          this.card.drawList(item);
        })
    }

    drawBasket(): void{
        this.PageGrid.draw()
        this.header.draw();
        this.basket.draw();
        this.footer.draw();
    }

    // drawError(data: Data): void{
    //     this.error.draw();
    // }
}

export default AppView;
