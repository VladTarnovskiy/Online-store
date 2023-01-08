// import Component from '../../../../templates/components';
import { listCategories, valueEachCategory, listOfBrands, valueEachBrand } from './getListsOfPropData';
import { showListOfFilter } from './filterList';

class Filters {
  draw(): void {
    const container = <HTMLElement>document.querySelector('.filters');
    const buttonsBlock: HTMLDivElement = document.createElement('div');
    buttonsBlock.className = 'filters-buttons';
    container.append(buttonsBlock);

    const resetButton: HTMLButtonElement = document.createElement('button');
    resetButton.className = 'button button_filters button_filters-reset';
    resetButton.textContent = 'Reset filters';
    buttonsBlock.append(resetButton);

    const copyButton: HTMLButtonElement = document.createElement('button');
    copyButton.className = 'button button_filters button_copy-url';
    copyButton.textContent = 'Copy settings';

    copyButton.addEventListener('click', () => {
      copyButton.textContent = 'Copied!';
      copyButton.classList.add('active');
      setTimeout(() => {
        copyButton.textContent = 'Copy settings';
        copyButton.classList.remove('active');
      }, 1500);
    });
    buttonsBlock.append(copyButton);

    const categoryWrapper: HTMLDivElement = document.createElement('div');
    categoryWrapper.className = 'category';
    container.append(categoryWrapper);

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
    container.append(brandWrapper);

    const brandTitle: HTMLHeadingElement = document.createElement('h2');
    brandTitle.className = 'brand__title';
    brandTitle.textContent = 'Brand';
    brandWrapper.append(brandTitle);

    const brandBlock: HTMLDivElement = document.createElement('div');
    brandBlock.className = 'brand__block';
    brandWrapper.append(brandBlock);

    showListOfFilter('filter-block', brandBlock, listOfBrands, 'brand', valueEachBrand);

    const priceWrapper: HTMLDivElement = document.createElement('div');
    priceWrapper.className = 'price';
    container.append(priceWrapper);

    const priceTitle: HTMLHeadingElement = document.createElement('h2');
    priceTitle.className = 'price__title';
    priceTitle.textContent = 'Price';
    priceWrapper.append(priceTitle);

    const priceBlock: HTMLDivElement = document.createElement('div');
    priceBlock.className = 'price__block';
    priceWrapper.append(priceBlock);

    const sliderBlockOfPrice: HTMLDivElement = document.createElement('div');
    sliderBlockOfPrice.className = 'slider-price';
    priceBlock.append(sliderBlockOfPrice);

    const progressLineOfPrice: HTMLDivElement = document.createElement('div');
    progressLineOfPrice.className = 'progress-line-price';
    sliderBlockOfPrice.append(progressLineOfPrice);

    const leftRangeOfPrice: HTMLInputElement = document.createElement('input');
    leftRangeOfPrice.setAttribute('type', 'range');
    leftRangeOfPrice.setAttribute('min', '0');
    leftRangeOfPrice.setAttribute('max', '2000');
    leftRangeOfPrice.setAttribute('value', '0');
    leftRangeOfPrice.className = 'slider__range slider__range_left-price';
    sliderBlockOfPrice.append(leftRangeOfPrice);

    const rightRangeOfPrice: HTMLInputElement = document.createElement('input');
    rightRangeOfPrice.setAttribute('type', 'range');
    rightRangeOfPrice.setAttribute('min', '0');
    rightRangeOfPrice.setAttribute('max', '2000');
    rightRangeOfPrice.setAttribute('value', '2000');
    rightRangeOfPrice.className = 'slider__range slider__range_right-price';
    sliderBlockOfPrice.append(rightRangeOfPrice);

    const priceTextBlockOfPrice: HTMLDivElement = document.createElement('div');
    priceTextBlockOfPrice.className = 'slider-text';
    priceBlock.append(priceTextBlockOfPrice);

    const minPriceTextBlockOfPrice: HTMLSpanElement = document.createElement('span');
    minPriceTextBlockOfPrice.className = 'slider-text__min-price';
    minPriceTextBlockOfPrice.textContent = `${leftRangeOfPrice.value}`;
    priceTextBlockOfPrice.append(minPriceTextBlockOfPrice);

    const maxPriceTextBlockOfPrice: HTMLSpanElement = document.createElement('span');
    maxPriceTextBlockOfPrice.className = 'slider-text__max-price';
    maxPriceTextBlockOfPrice.textContent = `${rightRangeOfPrice.value}`;
    priceTextBlockOfPrice.append(maxPriceTextBlockOfPrice);

    const inputRangeOfPrice: HTMLInputElement[] = [leftRangeOfPrice, rightRangeOfPrice];
    const gap = 100;

    inputRangeOfPrice.forEach((value: HTMLInputElement): void => {
      value.addEventListener('input', (e: Event): void => {
        const minValue: number = parseInt(inputRangeOfPrice[0].value);
        const maxValue: number = parseInt(inputRangeOfPrice[1].value);

        if (maxValue - minValue < gap) {
          if ((e.target as Element).className === 'slider__range slider__range_left-price') {
            inputRangeOfPrice[0].value = `${maxValue - gap}`;
          } else {
            inputRangeOfPrice[1].value = `${minValue + gap}`;
          }
        } else {
          progressLineOfPrice.style.left = `${(minValue / +inputRangeOfPrice[0].max) * 100}%`;
          progressLineOfPrice.style.right = `${100 - (maxValue / +inputRangeOfPrice[1].max) * 100}%`;
          minPriceTextBlockOfPrice.textContent = `${minValue}`;
          maxPriceTextBlockOfPrice.textContent = `${maxValue}`;
        }
      });
    });

    const stockWrapper: HTMLDivElement = document.createElement('div');
    stockWrapper.className = 'stock';
    container.append(stockWrapper);

    const stockTitle: HTMLHeadingElement = document.createElement('h2');
    stockTitle.className = 'stock__title';
    stockTitle.textContent = 'Stock';
    stockWrapper.append(stockTitle);

    const stockBlock: HTMLDivElement = document.createElement('div');
    stockBlock.className = 'stock__block';
    stockWrapper.append(stockBlock);

    const sliderBlockOfStock: HTMLDivElement = document.createElement('div');
    sliderBlockOfStock.className = 'slider-stock';
    stockBlock.append(sliderBlockOfStock);

    const progressLineOfStock: HTMLDivElement = document.createElement('div');
    progressLineOfStock.className = 'progress-line-stock';
    sliderBlockOfStock.append(progressLineOfStock);

    const leftRangeOfStock: HTMLInputElement = document.createElement('input');
    leftRangeOfStock.setAttribute('type', 'range');
    leftRangeOfStock.setAttribute('min', '0');
    leftRangeOfStock.setAttribute('max', '150');
    leftRangeOfStock.setAttribute('value', '0');
    leftRangeOfStock.className = 'slider__range slider__range_left-stock';
    sliderBlockOfStock.append(leftRangeOfStock);

    const rightRangeOfStock: HTMLInputElement = document.createElement('input');
    rightRangeOfStock.setAttribute('type', 'range');
    rightRangeOfStock.setAttribute('min', '0');
    rightRangeOfStock.setAttribute('max', '150');
    rightRangeOfStock.setAttribute('value', '150');
    rightRangeOfStock.className = 'slider__range slider__range_right-stock';
    sliderBlockOfStock.append(rightRangeOfStock);

    const priceTextBlockOfStock: HTMLDivElement = document.createElement('div');
    priceTextBlockOfStock.className = 'slider-text';
    stockBlock.append(priceTextBlockOfStock);

    const minPriceTextBlockOfStock: HTMLSpanElement = document.createElement('span');
    minPriceTextBlockOfStock.className = 'slider__text_min-stock';
    minPriceTextBlockOfStock.textContent = `${leftRangeOfStock.value}`;
    priceTextBlockOfStock.append(minPriceTextBlockOfStock);

    const maxPriceTextBlockOfStock: HTMLSpanElement = document.createElement('span');
    maxPriceTextBlockOfStock.className = 'slider__text_max-stock';
    maxPriceTextBlockOfStock.textContent = `${rightRangeOfStock.value}`;
    priceTextBlockOfStock.append(maxPriceTextBlockOfStock);

    const inputRangeOfStock: HTMLInputElement[] = [leftRangeOfStock, rightRangeOfStock];
    const gapOfStock = 8;

    inputRangeOfStock.forEach((value: HTMLInputElement): void => {
      value.addEventListener('input', (e: Event): void => {
        const minValue: number = parseInt(inputRangeOfStock[0].value);
        const maxValue: number = parseInt(inputRangeOfStock[1].value);

        if (maxValue - minValue < gapOfStock) {
          if ((e.target as Element).className === 'slider__range slider__range_left-stock') {
            inputRangeOfStock[0].value = `${maxValue - gapOfStock}`;
          } else {
            inputRangeOfStock[1].value = `${minValue + gapOfStock}`;
          }
        } else {
          progressLineOfStock.style.left = `${(minValue / +inputRangeOfStock[0].max) * 100}%`;
          progressLineOfStock.style.right = `${100 - (maxValue / +inputRangeOfStock[1].max) * 100}%`;
          minPriceTextBlockOfStock.textContent = `${minValue}`;
          maxPriceTextBlockOfStock.textContent = `${maxValue}`;
        }
      });
    });
  }
}
export default Filters;

// class Filters extends Component {
//     constructor(tagName: string, className: string) {
//       super(tagName, className);
//     }

//     draw(): void {
//       const buttonsBlock: HTMLDivElement = document.createElement('div');
//       buttonsBlock.className = 'filters-buttons';
//       this.container.append(buttonsBlock);

//       const resetButton: HTMLButtonElement = document.createElement('button');
//       resetButton.className = 'button button_filters';
//       resetButton.textContent = 'Reset filters';
//       buttonsBlock.append(resetButton);

//       const copyButton: HTMLButtonElement = document.createElement('button');
//       copyButton.className = 'button button_filters';
//       copyButton.textContent = 'Copy settings';
//       buttonsBlock.append(copyButton);

//       const categoryWrapper: HTMLDivElement = document.createElement('div');
//       categoryWrapper.className = 'category';
//       this.container.append(categoryWrapper);

//       const categoryTitle: HTMLHeadingElement = document.createElement('h2');
//       categoryTitle.className = 'category__title';
//       categoryTitle.textContent = 'Category';
//       categoryWrapper.append(categoryTitle);

//       const categoryBlock: HTMLDivElement = document.createElement('div');
//       categoryBlock.className = 'category__block';
//       categoryWrapper.append(categoryBlock);

//       showListOfFilter('filter-block', categoryBlock, listCategories, 'category', valueEachCategory);

//       const brandWrapper: HTMLDivElement = document.createElement('div');
//       brandWrapper.className = 'brand';
//       this.container.append(brandWrapper);

//       const brandTitle: HTMLHeadingElement = document.createElement('h2');
//       brandTitle.className = 'brand__title';
//       brandTitle.textContent = 'Brand';
//       brandWrapper.append(brandTitle);

//       const brandBlock: HTMLDivElement = document.createElement('div');
//       brandBlock.className = 'brand__block';
//       brandWrapper.append(brandBlock);

//       showListOfFilter('filter-block', brandBlock, listOfBrands, 'brand', valueEachBrand);

//       const priceWrapper: HTMLDivElement = document.createElement('div');
//       priceWrapper.className = 'price';
//       this.container.append(priceWrapper);

//       const priceTitle: HTMLHeadingElement = document.createElement('h2');
//       priceTitle.className = 'price__title';
//       priceTitle.textContent = 'Price';
//       priceWrapper.append(priceTitle);

//       const priceBlock: HTMLDivElement = document.createElement('div');
//       priceBlock.className = 'price__block';
//       priceWrapper.append(priceBlock);

//       const sliderBlockOfPrice: HTMLDivElement = document.createElement('div');
//       sliderBlockOfPrice.className = 'slider-price';
//       priceBlock.append(sliderBlockOfPrice);

//       const progressLineOfPrice: HTMLDivElement = document.createElement('div');
//       progressLineOfPrice.className = 'progress-line-price';
//       sliderBlockOfPrice.append(progressLineOfPrice);

//       const leftRangeOfPrice: HTMLInputElement = document.createElement('input');
//       leftRangeOfPrice.setAttribute('type', 'range');
//       leftRangeOfPrice.setAttribute('min', '0');
//       leftRangeOfPrice.setAttribute('max', '2000');
//       leftRangeOfPrice.setAttribute('value', '0');
//       leftRangeOfPrice.className = 'slider__range slider__range_left-price';
//       sliderBlockOfPrice.append(leftRangeOfPrice);

//       const rightRangeOfPrice: HTMLInputElement = document.createElement('input');
//       rightRangeOfPrice.setAttribute('type', 'range');
//       rightRangeOfPrice.setAttribute('min', '0');
//       rightRangeOfPrice.setAttribute('max', '2000');
//       rightRangeOfPrice.setAttribute('value', '2000');
//       rightRangeOfPrice.className = 'slider__range slider__range_right-price';
//       sliderBlockOfPrice.append(rightRangeOfPrice);

//       const priceTextBlockOfPrice: HTMLDivElement = document.createElement('div');
//       priceTextBlockOfPrice.className = 'slider-text';
//       priceBlock.append(priceTextBlockOfPrice);

//       const minPriceTextBlockOfPrice: HTMLSpanElement = document.createElement('span');
//       minPriceTextBlockOfPrice.className = 'slider-text__min-price';
//       minPriceTextBlockOfPrice.textContent = `${leftRangeOfPrice.value}`;
//       priceTextBlockOfPrice.append(minPriceTextBlockOfPrice);

//       const maxPriceTextBlockOfPrice: HTMLSpanElement = document.createElement('span');
//       maxPriceTextBlockOfPrice.className = 'slider-text__max-price';
//       maxPriceTextBlockOfPrice.textContent = `${rightRangeOfPrice.value}`;
//       priceTextBlockOfPrice.append(maxPriceTextBlockOfPrice);

//       const inputRangeOfPrice: HTMLInputElement[] = [leftRangeOfPrice, rightRangeOfPrice];
//       const gap = 100;

//       inputRangeOfPrice.forEach((value: HTMLInputElement): void => {
//         value.addEventListener('input', (e: Event): void => {
//           const minValue: number = parseInt(inputRangeOfPrice[0].value);
//           const maxValue: number = parseInt(inputRangeOfPrice[1].value);

//           if (maxValue - minValue < gap) {
//             if ((e.target as Element).className === 'slider__range slider__range_left-price') {
//               inputRangeOfPrice[0].value = `${maxValue - gap}`;
//             } else {
//               inputRangeOfPrice[1].value = `${minValue + gap}`;
//             }
//           } else {
//             progressLineOfPrice.style.left = `${(minValue / +inputRangeOfPrice[0].max) * 100}%`;
//             progressLineOfPrice.style.right = `${100 - (maxValue / +inputRangeOfPrice[1].max) * 100}%`;
//             minPriceTextBlockOfPrice.textContent = `${minValue}`;
//             maxPriceTextBlockOfPrice.textContent = `${maxValue}`;
//           }
//         });
//       });

//       const stockWrapper: HTMLDivElement = document.createElement('div');
//       stockWrapper.className = 'stock';
//       this.container.append(stockWrapper);

//       const stockTitle: HTMLHeadingElement = document.createElement('h2');
//       stockTitle.className = 'stock__title';
//       stockTitle.textContent = 'Stock';
//       stockWrapper.append(stockTitle);

//       const stockBlock: HTMLDivElement = document.createElement('div');
//       stockBlock.className = 'stock__block';
//       stockWrapper.append(stockBlock);

//       const sliderBlockOfStock: HTMLDivElement = document.createElement('div');
//       sliderBlockOfStock.className = 'slider-stock';
//       stockBlock.append(sliderBlockOfStock);

//       const progressLineOfStock: HTMLDivElement = document.createElement('div');
//       progressLineOfStock.className = 'progress-line-stock';
//       sliderBlockOfStock.append(progressLineOfStock);

//       const leftRangeOfStock: HTMLInputElement = document.createElement('input');
//       leftRangeOfStock.setAttribute('type', 'range');
//       leftRangeOfStock.setAttribute('min', '0');
//       leftRangeOfStock.setAttribute('max', '150');
//       leftRangeOfStock.setAttribute('value', '0');
//       leftRangeOfStock.className = 'slider__range slider__range_left-stock';
//       sliderBlockOfStock.append(leftRangeOfStock);

//       const rightRangeOfStock: HTMLInputElement = document.createElement('input');
//       rightRangeOfStock.setAttribute('type', 'range');
//       rightRangeOfStock.setAttribute('min', '0');
//       rightRangeOfStock.setAttribute('max', '150');
//       rightRangeOfStock.setAttribute('value', '150');
//       rightRangeOfStock.className = 'slider__range slider__range_right-stock';
//       sliderBlockOfStock.append(rightRangeOfStock);

//       const priceTextBlockOfStock: HTMLDivElement = document.createElement('div');
//       priceTextBlockOfStock.className = 'slider-text';
//       stockBlock.append(priceTextBlockOfStock);

//       const minPriceTextBlockOfStock: HTMLSpanElement = document.createElement('span');
//       minPriceTextBlockOfStock.textContent = `${leftRangeOfStock.value}`;
//       priceTextBlockOfStock.append(minPriceTextBlockOfStock);

//       const maxPriceTextBlockOfStock: HTMLSpanElement = document.createElement('span');
//       maxPriceTextBlockOfStock.textContent = `${rightRangeOfStock.value}`;
//       priceTextBlockOfStock.append(maxPriceTextBlockOfStock);

//       const inputRangeOfStock: HTMLInputElement[] = [leftRangeOfStock, rightRangeOfStock];
//       const gapOfStock = 8;

//       inputRangeOfStock.forEach((value: HTMLInputElement): void => {
//         value.addEventListener('input', (e: Event): void => {
//           const minValue: number = parseInt(inputRangeOfStock[0].value);
//           const maxValue: number = parseInt(inputRangeOfStock[1].value);

//           if (maxValue - minValue < gapOfStock) {
//             if ((e.target as Element).className === 'slider__range slider__range_left-stock') {
//               inputRangeOfStock[0].value = `${maxValue - gapOfStock}`;
//             } else {
//               inputRangeOfStock[1].value = `${minValue + gapOfStock}`;
//             }
//           } else {
//             progressLineOfStock.style.left = `${(minValue / +inputRangeOfStock[0].max) * 100}%`;
//             progressLineOfStock.style.right = `${100 - (maxValue / +inputRangeOfStock[1].max) * 100}%`;
//             minPriceTextBlockOfStock.textContent = `${minValue}`;
//             maxPriceTextBlockOfStock.textContent = `${maxValue}`;
//           }
//         });
//       });
//     }

//     render(): HTMLElement {
//       this.draw();
//       return this.container;
//     }
//   }
//   export default Filters;
