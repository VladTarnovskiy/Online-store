import Component from '../../../../templates/components';
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

        showListOfFilter('filter-category', categoryBlock, 'category');

    }

    render(): HTMLElement {
        this.draw();
        return this.container;
    }
}
export default Filters;