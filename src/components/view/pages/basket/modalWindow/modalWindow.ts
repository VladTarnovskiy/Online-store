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
      cardNumber.setAttribute('type', 'text');
      cardNumber.setAttribute('maxlength', '16');
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
      validDateInput.setAttribute('type', 'text');
      validDateInput.setAttribute('maxlength', '4');
      validDateLabel.append(validDateInput);

      const validCodeLabel: HTMLLabelElement = document.createElement('label');
      validCodeLabel.className = 'credit-card__valid-label';
      validCodeLabel.textContent = 'CVV:'
      cardValidBlock.append(validCodeLabel);

      const validCodeInput: HTMLInputElement = document.createElement('input');
      validCodeInput.className = 'popup__input credit-card__valid';
      validCodeInput.setAttribute('placeholder', 'Code');
      validCodeInput.setAttribute('type', 'text');
      validCodeInput.setAttribute('maxlength', '3');
      validCodeLabel.append(validCodeInput);

      const popupButton: HTMLButtonElement = document.createElement('button');
      popupButton.className = 'button button_popup';
      popupButton.setAttribute('type', 'submit');
      popupButton.textContent = 'Confirm';
      popupForm.append(popupButton);

      const inputList: HTMLInputElement[] = [nameCustomer, phoneNumberCustomer, addressCustomer, emailCustomer, cardNumber, validDateInput, validCodeInput];
      popupForm.onsubmit = formSent;

      async function formSent(e: Event) {
        e.preventDefault();

        validation();
      }

      function validation() {

        inputList.forEach((input: HTMLInputElement): void => {
          inputRemoveError(input);
          if (input === phoneNumberCustomer) {
            if (!validatePhone(input.value)) {
              inputAddError(input);
            }
          } else if (input === addressCustomer) {
            if (!validateAddress(input.value)) {
              inputAddError(input);
            }
          } else if (input === nameCustomer) {
            if (!validateName(input.value)) {
              inputAddError(input);
            }
          } else if (input === emailCustomer) {
            if (!validateEmail(input.value)) {
              inputAddError(input);
            }
          } else if (input === cardNumber) {
            if (!validateCard(input.value)) {
              inputAddError(input);
            } else if (+input.value[0] === 4) {
              cardNumberImage.style.backgroundImage = 'url("assets/visa.png")';
            } else if (+input.value[0] === 5) {
              cardNumberImage.style.backgroundImage = 'url("assets/master-card.png")';
            }
          } else if (input === validDateInput) {
            if (!validateDateCard(input.value)) {
              inputAddError(input);
            } else if (+(String(input.value).slice(0, 2)) > 12 || String(input.value).slice(0, 2) === '00') {
              inputAddError(input);
            }
          } else if (input === validCodeInput) {
            if (!(/^[0-9]{3}$/.test(String(input.value).toLowerCase()))) {
              inputAddError(input);
            }
          } else {
            if (input.value === '') {
              inputAddError(input);
            }
          }
        });
      }

      function inputAddError(el: HTMLInputElement) {
        el.classList.add('error');
      }

      function inputRemoveError(el: HTMLInputElement) {
        el.classList.remove('error');
      }

      function validateName(val: string) {
        const reg: RegExp = /^[а-яА-ЯёЁa-zA-Z]{3,} [а-яА-ЯёЁa-zA-Z]{3,}( [а-яА-ЯёЁa-zA-Z]{3,})?$/;
        return reg.test(String(val).toLowerCase());
      }

      function validatePhone(val: string) {
        const reg: RegExp = /^(\+)+((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){7,12}\d$/;
        return reg.test(String(val).toLowerCase());
      }

      function validateAddress(val: string) {
        const reg: RegExp = /^[a-яА-ЯёЁa-zA-Z]{5,} [а-яА-ЯёЁa-zA-Z]{5,} [а-яА-ЯёЁa-zA-Z]{5,}( [а-яА-ЯёЁa-zA-Z]{5,})?$/;
        return reg.test(String(val).toLowerCase());
      }

      function validateEmail(val: string) {
        const reg: RegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        return reg.test(String(val).toLowerCase());
      }

      function validateCard(val: string) {
        const reg: RegExp = /^[0-9]{16}$/;
        return reg.test(String(val).toLowerCase());
      }

      function validateDateCard(val: string) {
        const reg: RegExp = /^[0-9]{4}$/;
        return reg.test(String(val).toLowerCase());
      }
    });
  }
}
export default ModalWindow;
