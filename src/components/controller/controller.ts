import AppView from '../view/appView';
import {Model} from '../model/model';

// export const enum PageIds {
//   MainPage = 'main-page',
//   SettingsPage = 'basket-page',
//   StatisticsPage = 'erorr-page',
// }

export type Callback = (() => void);

class AppController extends AppView {
  private static container: HTMLElement = document.body;
  // private static defaultPageId: string = 'main-page';
  module: Model;
    
  constructor() {
    super()
      this.module = new Model();
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
  
  private prodoctsview() {
    const viewContainer = <HTMLElement>document.querySelector('.view__container')
    viewContainer.addEventListener('click', (event)=>{
      this.module.getProducts(event)
    });
  }

  run() {
    // App.container.append(this....render());
    
    this.drawMain();
    this.module.getProductsdef();
    this.prodoctsview();
    // App.renderNewPage('main-page');
    // this.enableRouteChange();
  }
}

export default AppController;