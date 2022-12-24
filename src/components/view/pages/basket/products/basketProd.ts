import type { Data } from '../../../../types/types';

class BasketProd {
  draw(): void {
    const container = <HTMLElement>document.querySelector('.main');
    container.id = 'basket';

    //result
    const basketResult = <HTMLElement>document.querySelector('.basket__result');

    const basketTitle = <HTMLElement>document.createElement('div');
    basketTitle.className = 'result__title';
    basketTitle.textContent = 'Summary';

    const amountProd = <HTMLElement>document.createElement('div');
    amountProd.className = 'result__amount';
    amountProd.textContent = 'Products: ';

    const amountProdCounter = <HTMLElement>document.createElement('span');
    amountProdCounter.className = 'result__counter';
    amountProdCounter.textContent = '';
    amountProd.appendChild(amountProdCounter);

    const totalPrice = <HTMLElement>document.createElement('div');
    totalPrice.className = 'result__price';
    totalPrice.textContent = 'Total: ';

    const totalPriceCounter = <HTMLElement>document.createElement('span');
    totalPriceCounter.className = 'result__price-counter';
    totalPriceCounter.textContent = ' $';
    totalPrice.appendChild(totalPriceCounter);

    const promocodeInput = <HTMLElement>document.createElement('input');
    promocodeInput.className = 'result_promo';
    promocodeInput.setAttribute('type', 'text');
    promocodeInput.setAttribute('placeholder', 'Enter promo code');

    const promoHint = <HTMLElement>document.createElement('div');
    promoHint.className = 'result__promo-hint';
    promoHint.textContent = "Promo: 'RS', 'RSSchool'";

    const resultButton = <HTMLElement>document.createElement('div');
    resultButton.className = 'result__button';
    resultButton.textContent = 'Place order';

    basketResult.appendChild(basketTitle);
    basketResult.appendChild(amountProd);
    basketResult.appendChild(totalPrice);
    basketResult.appendChild(promocodeInput);
    basketResult.appendChild(promoHint);
    basketResult.appendChild(resultButton);
  }
}
export default BasketProd;
