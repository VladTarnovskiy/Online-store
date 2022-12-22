import Component from '../../../../templates/components';

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
    }

    render(): HTMLElement {
        this.draw();
        return this.container;
    }
}
export default Filters;