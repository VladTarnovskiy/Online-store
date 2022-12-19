import AppController from '../controller/controller';
// import { AppView } from '../view/appView';

class App {
    controller: AppController;
    // view: AppView;
    constructor() {
        this.controller = new AppController();
        // this.view = new AppView();
    }

    run():void {
        this.controller.run();
        //прописать что запускается первым по цепочке
    }
}

export default App;
