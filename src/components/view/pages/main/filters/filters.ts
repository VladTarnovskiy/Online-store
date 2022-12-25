import Component from '../../../../templates/components';
import { listCategories, valueEachCategory, listOfBrands, valueEachBrand } from './getListsOfPropData';
import { showListOfFilter } from './filterList';

class Filters extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    draw(): void {
        const buttonsBlock: HTMLDivElement = document.createElement('div');
        buttonsBlock.className = 'filters-buttons';
        this.container.append(buttonsBlock);

        const resetButton: HTMLButtonElement = document.createElement('button');
        resetButton.className = 'button button_filters';
        resetButton.textContent = 'Reset filters';
        buttonsBlock.append(resetButton);

        const copyButton: HTMLButtonElement = document.createElement('button');
        copyButton.className = 'button button_filters';
        copyButton.textContent = 'Copy settings';
        buttonsBlock.append(copyButton);

        const categoryWrapper: HTMLDivElement = document.createElement('div');
        categoryWrapper.className = 'category';
        this.container.append(categoryWrapper);

        const categoryTitle: HTMLHeadingElement = document.createElement('h2');
        categoryTitle.className = 'category__title';
        categoryTitle.textContent = 'Category';
        categoryWrapper.append(categoryTitle);

        const categoryBlock: HTMLDivElement = document.createElement('div');
        categoryBlock.className = 'category__block';
        categoryWrapper.append(categoryBlock);

        showListOfFilter('filter-block', categoryBlock, listCategories, 'category', valueEachCategory);


        const brandWrapper: HTMLDivElement = document.createElement('div');
        brandWrapper.className = 'brand';
        this.container.append(brandWrapper);

        const brandTitle: HTMLHeadingElement = document.createElement('h2');
        brandTitle.className = 'brand__title';
        brandTitle.textContent = 'Brand';
        brandWrapper.append(brandTitle);

        const brandBlock: HTMLDivElement = document.createElement('div');
        brandBlock.className = 'brand__block';
        brandWrapper.append(brandBlock);

        showListOfFilter('filter-block', brandBlock, listOfBrands, 'brand', valueEachBrand);
    }

    render(): HTMLElement {
        this.draw();
        return this.container;
    }
}
export default Filters;