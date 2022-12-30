class ModalWindow {
  draw(): void {
    const modalButton = <HTMLElement>document.querySelector('.result__button');
    const main = <HTMLElement>document.querySelector('main');

    modalButton.addEventListener('click', () => {
      const popup: HTMLDivElement = document.createElement('div');
      popup.className = 'popup';
      main.append(popup);

      const popupWrapper: HTMLDivElement = document.createElement('div');
      popupWrapper.className = 'popup__wrapper';
      popup.append(popupWrapper);

      popupWrapper.addEventListener('click', (e: Event): void => {
        if (!(e.target as Element).closest('.popup__form')) {
          popup.remove();
        }
      })

      const popupForm: HTMLFormElement = document.createElement('form');
      popupForm.className = 'popup__form';
      popupWrapper.append(popupForm);

      const popupTitle: HTMLHeadingElement = document.createElement('h3');
      popupTitle.className = 'popup__title';
      popupTitle.textContent = 'Personal details';
      popupForm.append(popupTitle);

      const popupData: HTMLDivElement = document.createElement('div');
      popupData.className = 'popup__data';
      popupForm.append(popupData);

      const nameCustomer: HTMLInputElement = document.createElement('input');
      nameCustomer.className = 'popup__input';
      nameCustomer.setAttribute('placeholder', 'Name, Surname');
      nameCustomer.setAttribute('type', 'text');
      popupData.append(nameCustomer);

      const phoneNumberCustomer: HTMLInputElement = document.createElement('input');
      phoneNumberCustomer.className = 'popup__input';
      phoneNumberCustomer.setAttribute('placeholder', 'Phone number');
      phoneNumberCustomer.setAttribute('type', 'tel');
      popupData.append(phoneNumberCustomer);

      const addressCustomer: HTMLInputElement = document.createElement('input');
      addressCustomer.className = 'popup__input';
      addressCustomer.setAttribute('placeholder', 'Delivery address');
      addressCustomer.setAttribute('type', 'text');
      popupData.append(addressCustomer);

      const emailCustomer: HTMLInputElement = document.createElement('input');
      emailCustomer.className = 'popup__input';
      emailCustomer.setAttribute('placeholder', 'E-mail');
      emailCustomer.setAttribute('type', 'email');
      popupData.append(emailCustomer);

      const creditCardTitle: HTMLHeadingElement = document.createElement('h3');
      creditCardTitle.className = 'popup__title';
      creditCardTitle.textContent = 'Credit card details';
      popupForm.append(creditCardTitle);

      const creditCardWrapper: HTMLDivElement = document.createElement('div');
      creditCardWrapper.className = 'popup__credit-card credit-card';
      popupForm.append(creditCardWrapper);

      const cardNumberBlock: HTMLDivElement = document.createElement('div');
      cardNumberBlock.className = 'credit-card__number-block';
      creditCardWrapper.append(cardNumberBlock);

      const cardNumberImage: HTMLDivElement = document.createElement('div');
      cardNumberImage.className = 'credit-card__image';
      cardNumberBlock.append(cardNumberImage);

      const cardNumber: HTMLInputElement = document.createElement('input');
      cardNumber.className = 'popup__input credit-card__number';
      cardNumber.setAttribute('placeholder', 'Card number');
      cardNumber.setAttribute('type', 'number');
      cardNumberBlock.append(cardNumber);

      const cardValidBlock: HTMLDivElement = document.createElement('div');
      cardValidBlock.className = 'credit-card__valid-block';
      creditCardWrapper.append(cardValidBlock);

      const validDateLabel: HTMLLabelElement = document.createElement('label');
      validDateLabel.className = 'credit-card__valid-label';
      validDateLabel.textContent = 'Valid thru:'
      cardValidBlock.append(validDateLabel);

      const validDateInput: HTMLInputElement = document.createElement('input');
      validDateInput.className = 'popup__input credit-card__valid';
      validDateInput.setAttribute('placeholder', 'Date');
      validDateInput.setAttribute('type', 'number');
      validDateLabel.append(validDateInput);

      const validCodeLabel: HTMLLabelElement = document.createElement('label');
      validCodeLabel.className = 'credit-card__valid-label';
      validCodeLabel.textContent = 'CVV:'
      cardValidBlock.append(validCodeLabel);

      const validCodeInput: HTMLInputElement = document.createElement('input');
      validCodeInput.className = 'popup__input credit-card__valid';
      validCodeInput.setAttribute('placeholder', 'Code');
      validCodeInput.setAttribute('type', 'number');
      validCodeLabel.append(validCodeInput);

      const popupButton: HTMLButtonElement = document.createElement('button');
      popupButton.className = 'button button_popup';
      popupButton.setAttribute('type', 'submit');
      popupButton.textContent = 'Confirm';
      popupForm.append(popupButton);
    });
  }
}
export default ModalWindow;
