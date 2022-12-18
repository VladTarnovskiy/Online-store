import Result from './result/result';
import Products from './products/products';

export class BasketView {
    products: Products;
    result: Result;
    constructor() {
        this.products = new Products();
        this.result = new Result();
    }

    draw(data: Data): void {
        
    }
}

export default BasketView;