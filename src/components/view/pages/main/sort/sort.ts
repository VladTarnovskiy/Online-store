class Sort {
  draw(): void {
    //sort ways
    const container = <HTMLElement>document.querySelector('.sort');

    const sortContainer = <HTMLElement>document.createElement('div');
    sortContainer.className = 'sort__container';

    const sortTitle = <HTMLElement>document.createElement('div');
    sortTitle.className = 'sort__title';
    sortTitle.textContent = 'Sorting';

    const selectSort = <HTMLElement>document.createElement('select');
    selectSort.className = 'sort__select';
    selectSort.setAttribute('name', 'products-sort');
    selectSort.setAttribute('title', 'products-sort');

    const selectItemDefault = <HTMLElement>document.createElement('option');
    selectItemDefault.className = 'select__item';
    selectItemDefault.setAttribute('value', 'default');
    selectItemDefault.setAttribute('disabled', '');
    selectItemDefault.setAttribute('selected', '');
    selectItemDefault.textContent = 'choose method';

    const selectItemOne = <HTMLElement>document.createElement('option');
    selectItemOne.className = 'select__item';
    selectItemOne.setAttribute('value', 'priceInc');
    selectItemOne.textContent = 'price increase';

    const selectItemTwo = <HTMLElement>document.createElement('option');
    selectItemTwo.className = 'select__item';
    selectItemTwo.setAttribute('value', 'priceDec');
    selectItemTwo.textContent = 'price decrease';

    const selectItemThree = <HTMLElement>document.createElement('option');
    selectItemThree.className = 'select__item';
    selectItemThree.setAttribute('value', 'rateInc');
    selectItemThree.textContent = 'rate increase';

    const selectItemFour = <HTMLElement>document.createElement('option');
    selectItemFour.className = 'select__item';
    selectItemFour.setAttribute('value', 'rateDec');
    selectItemFour.textContent = 'rate decrease';

    selectSort.appendChild(selectItemDefault);
    selectSort.appendChild(selectItemOne);
    selectSort.appendChild(selectItemTwo);
    selectSort.appendChild(selectItemThree);
    selectSort.appendChild(selectItemFour);

    sortContainer.appendChild(sortTitle);
    sortContainer.appendChild(selectSort);

    container.appendChild(sortContainer);

    //amount found products

    const productsCounter = <HTMLElement>document.createElement('div');
    productsCounter.className = 'sort__counter';
    productsCounter.textContent = 'Products found: ';

    const productsCounterDisplay = <HTMLElement>document.createElement('span');
    productsCounterDisplay.className = 'sort__counter-display';
    productsCounterDisplay.textContent = '100';

    productsCounter.appendChild(productsCounterDisplay);

    container.appendChild(productsCounter);

    //search element
    const productsSearch = <HTMLElement>document.createElement('input');
    productsSearch.className = 'products__search';
    productsSearch.setAttribute('type', 'search');
    productsSearch.setAttribute('placeholder', 'Product search');
    container.appendChild(productsSearch);

    //view change
    const viewContainer = <HTMLElement>document.createElement('div');
    viewContainer.className = 'view__container';

    const viewList = <HTMLElement>document.createElement('div');
    viewList.className = 'view__item view__list';
    viewList.addEventListener('click', () => {
      const prodContainer = <HTMLElement>document.querySelector('.product-items');
      prodContainer.classList.add('product-items_list');
    });

    const viewBlocks = <HTMLElement>document.createElement('div');
    viewBlocks.className = 'view__item view__block view__item_active';
    viewBlocks.addEventListener('click', () => {
      const prodContainer = <HTMLElement>document.querySelector('.product-items');
      prodContainer.classList.remove('product-items_list');
    });

    viewContainer.appendChild(viewList);
    viewContainer.appendChild(viewBlocks);
    container.appendChild(viewContainer);

    document.querySelectorAll<HTMLElement>('.view__item').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll<HTMLElement>('.view__item').forEach((item) => {
          item.classList.remove('view__item_active');
        });
        item.classList.add('view__item_active');
      });
    });
  }
}
export default Sort;
