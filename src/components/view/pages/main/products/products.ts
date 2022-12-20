class Products {
    draw(): void {
        const products = <HTMLElement>document.querySelector('.products')

        const sort = <HTMLElement>document.createElement('div');
        sort.className = 'sort';

        const productItems = <HTMLElement>document.createElement('div');
        productItems.className = 'productItems';

        products.appendChild(sort);
        products.appendChild(productItems);
    }
}
export default Products;