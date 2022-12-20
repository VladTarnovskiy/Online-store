import AppView from '../view/appView';
import Card from '../view/pages/main/card/card';
import {productData} from '../model/data'
import CardItem from '../types/types';

export const enum PageIds {
  MainPage = 'main-page',
  SettingsPage = 'basket-page',
  StatisticsPage = 'erorr-page',
}

class AppController extends AppView {
  private static container: HTMLElement = document.body;
  // private static defaultPageId: string = 'main-page';

    cards: Card;
    productsData: unknown;
    // filters: Filters;
    
    constructor() {
      super()
        // this.card = new Card();
        // this.filters = new Filters();
        this.cards = new Card();
        this.productsData = productData.products;
    }

  //start routing
  // static renderNewPage(idPage: string) {
  //   const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
  //   if (currentPageHTML) {
  //     currentPageHTML.remove();
  //   }
  //   // let page: Page | null = null;

  //   if (idPage === PageIds.MainPage) {
  //     page = new MainPage(idPage);
  //   } else if (idPage === PageIds.SettingsPage) {
  //     page = new SettingsPage(idPage);
  //   } else if (idPage === PageIds.StatisticsPage) {
  //     page = new StatisticsPage(idPage);
  //   } else {
  //     page = new ErrorPage(idPage, ErrorTypes.Error_404);
  //   }

  //   if (page) {
  //     const pageHTML = page.render();
  //     pageHTML.id = App.defaultPageId;
  //     App.container.append(pageHTML);
  //   }
  // }

  // private enableRouteChange() {
  //   window.addEventListener('hashchange', () => {
  //     const hash = window.location.hash.slice(1);
  //     App.renderNewPage(hash);
  //   });
  // }

  //endrouting
  viewCard() {
    // const production = document.querySelector('.productItems')
    productData.products.forEach((item) => {
      this.cards.draw(item)
    })
  }

  run() {
    // App.container.append(this....render());
    
    this.drawMain()
    this.viewCard()
    // App.renderNewPage('main-page');
    // this.enableRouteChange();
  }

//методы если кликать по кноскам сортировки вызывается нужный метод класса DataFilters и возвратить обновленный масив данных


}

export default AppController;