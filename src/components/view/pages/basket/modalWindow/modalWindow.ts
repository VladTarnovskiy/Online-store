class ModalWindow {
  draw(): void {
    const main = <HTMLElement>document.querySelector('main');

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
    });

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

    const nameCustomerBlock: HTMLDivElement = document.createElement('div');
    nameCustomerBlock.className = 'popup__input-block';
    const nameCustomer: HTMLInputElement = document.createElement('input');
    nameCustomer.className = 'popup__input';
    nameCustomer.setAttribute('placeholder', 'Name, Surname');
    nameCustomer.setAttribute('type', 'text');
    popupData.append(nameCustomerBlock);
    nameCustomerBlock.append(nameCustomer);
    nameCustomer.addEventListener('blur', validateName);

    const phoneNumberCustomerBlock: HTMLDivElement = document.createElement('div');
    phoneNumberCustomerBlock.className = 'popup__input-block';
    const phoneNumberCustomer: HTMLInputElement = document.createElement('input');
    phoneNumberCustomer.className = 'popup__input';
    phoneNumberCustomer.setAttribute('placeholder', 'Phone number');
    phoneNumberCustomer.setAttribute('type', 'tel');
    popupData.append(phoneNumberCustomerBlock);
    phoneNumberCustomerBlock.append(phoneNumberCustomer);
    phoneNumberCustomer.addEventListener('blur', validatePhone);

    const addressCustomerBlock: HTMLDivElement = document.createElement('div');
    addressCustomerBlock.className = 'popup__input-block';
    const addressCustomer: HTMLInputElement = document.createElement('input');
    addressCustomer.className = 'popup__input';
    addressCustomer.setAttribute('placeholder', 'Delivery address');
    addressCustomer.setAttribute('type', 'text');
    popupData.append(addressCustomerBlock);
    addressCustomerBlock.append(addressCustomer);
    addressCustomer.addEventListener('blur', validateAddress);

    const emailCustomerBlock: HTMLDivElement = document.createElement('div');
    emailCustomerBlock.className = 'popup__input-block';
    const emailCustomer: HTMLInputElement = document.createElement('input');
    emailCustomer.className = 'popup__input';
    emailCustomer.setAttribute('placeholder', 'E-mail');
    emailCustomer.setAttribute('type', 'email');
    popupData.append(emailCustomerBlock);
    emailCustomerBlock.append(emailCustomer);
    emailCustomer.addEventListener('blur', validateEmail);

    const creditCardTitle: HTMLHeadingElement = document.createElement('h3');
    creditCardTitle.className = 'popup__title';
    creditCardTitle.textContent = 'Credit card details';
    popupForm.append(creditCardTitle);

    const creditCardWrapper: HTMLDivElement = document.createElement('div');
    creditCardWrapper.className = 'popup__credit-card credit-card';
    popupForm.append(creditCardWrapper);

    const cardNumberWrapper: HTMLDivElement = document.createElement('div');
    cardNumberWrapper.className = 'credit-card__number-block';
    creditCardWrapper.append(cardNumberWrapper);

    const cardNumberImage: HTMLDivElement = document.createElement('div');
    cardNumberImage.className = 'credit-card__image';
    cardNumberWrapper.append(cardNumberImage);

    const cardNumberBlock: HTMLDivElement = document.createElement('div');
    cardNumberBlock.className = 'popup__input-block';
    const cardNumber: HTMLInputElement = document.createElement('input');
    cardNumber.className = 'popup__input credit-card__number';
    cardNumber.setAttribute('placeholder', 'Card number');
    cardNumber.setAttribute('type', 'text');
    cardNumber.setAttribute('maxlength', '19');
    cardNumberWrapper.append(cardNumberBlock);
    cardNumberBlock.append(cardNumber);
    cardNumber.addEventListener('blur', validateCard);
    cardNumber.addEventListener('keyup', handleCardChange);

    const cardValidBlock: HTMLDivElement = document.createElement('div');
    cardValidBlock.className = 'credit-card__valid-block';
    creditCardWrapper.append(cardValidBlock);

    const validDateLabel: HTMLLabelElement = document.createElement('label');
    validDateLabel.className = 'credit-card__valid-label';
    validDateLabel.textContent = 'Valid thru:';
    cardValidBlock.append(validDateLabel);

    const validDateInputBlock: HTMLDivElement = document.createElement('div');
    validDateInputBlock.className = 'popup__input-block popup__input-block_valid';
    const validDateInput: HTMLInputElement = document.createElement('input');
    validDateInput.className = 'popup__input credit-card__valid';
    validDateInput.setAttribute('placeholder', 'Date');
    validDateInput.setAttribute('type', 'text');
    validDateInput.setAttribute('maxlength', '5');
    validDateLabel.append(validDateInputBlock);
    validDateInputBlock.append(validDateInput);
    validDateInput.addEventListener('blur', validateDateCard);
    validDateInput.addEventListener('keyup', handleDateCard);

    const validCodeLabel: HTMLLabelElement = document.createElement('label');
    validCodeLabel.className = 'credit-card__valid-label';
    validCodeLabel.textContent = 'CVV:';
    cardValidBlock.append(validCodeLabel);

    const validCodeInputBlock: HTMLDivElement = document.createElement('div');
    validCodeInputBlock.className = 'popup__input-block popup__input-block_valid';
    const validCodeInput: HTMLInputElement = document.createElement('input');
    validCodeInput.className = 'popup__input credit-card__valid';
    validCodeInput.setAttribute('placeholder', 'Code');
    validCodeInput.setAttribute('type', 'text');
    validCodeInput.setAttribute('maxlength', '3');
    validCodeLabel.append(validCodeInputBlock);
    validCodeInputBlock.append(validCodeInput);
    validCodeInput.addEventListener('blur', validateCVV);

    const popupButton: HTMLButtonElement = document.createElement('button');
    popupButton.className = 'button button_popup';
    popupButton.setAttribute('type', 'submit');
    popupButton.textContent = 'Confirm';
    popupForm.append(popupButton);

    const inputList: HTMLInputElement[] = [
      nameCustomer,
      phoneNumberCustomer,
      addressCustomer,
      emailCustomer,
      cardNumber,
      validDateInput,
      validCodeInput,
    ];

    popupForm.onsubmit = formSent;

    async function formSent(e: Event) {
      e.preventDefault();

      validation();
    }

    function validation() {
      inputList.forEach((input: HTMLInputElement): void => {
        const parentChildNodes = input.parentElement?.childNodes;
        const errorElement = parentChildNodes ? parentChildNodes[1] : null;

        if (input.value === '') {
          const elError: HTMLParagraphElement = document.createElement('p');
          elError.className = 'error-message';
          elError.textContent = 'Error! Invalid field value';

          if (!errorElement) {
            input.after(elError);
          }

          inputAddError(input);
        } else {
          if (errorElement) {
            errorElement.remove();
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

    function toggleError(isValid: boolean, el: HTMLInputElement): void {
      if (!isValid) {
        inputAddError(el);
      } else {
        inputRemoveError(el);
      }

      addErrorMessage(isValid, el);
    }

    function addErrorMessage(booleanValue: boolean, item: HTMLInputElement): void {
      const parentChildNodes = item.parentElement?.childNodes;
      const errorElement = parentChildNodes ? parentChildNodes[1] : null;

      if (!booleanValue) {
        const elError: HTMLParagraphElement = document.createElement('p');
        elError.className = 'error-message';
        elError.textContent = 'Error! Invalid field value';

        if (!errorElement) {
          item.after(elError);
        }
      } else {
        if (errorElement) {
          errorElement.remove();
        }
      }
    }

    function validateName(this: HTMLInputElement): void {
      const reg = /^[а-яА-ЯёЁa-zA-Z]{3,} [а-яА-ЯёЁa-zA-Z]{3,}( [а-яА-ЯёЁa-zA-Z]{3,})?$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);
    }

    function validatePhone(this: HTMLInputElement): void {
      const reg = /^(\+)+((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){7,12}\d$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);
    }

    function validateAddress(this: HTMLInputElement): void {
      const reg = /^[a-яА-ЯёЁa-zA-Z]{5,} [а-яА-ЯёЁa-zA-Z]{5,} [а-яА-ЯёЁa-zA-Z0-9]{5,}( [а-яА-ЯёЁa-zA-Z0-9]{5,})?$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);
    }

    function validateEmail(this: HTMLInputElement): void {
      const reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);
    }

    function validateCard(this: HTMLInputElement): void {
      const reg = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);
    }

    function validateDateCard(this: HTMLInputElement): void {
      const reg = /^[0-9]{2}\/[0-9]{2}$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);

      if (+this.value.slice(0, 2) > 12 || this.value.slice(0, 2) === '00') {
        inputAddError(this);
      }
    }

    function validateCVV(this: HTMLInputElement): void {
      const reg = /^[0-9]{3}$/;
      const result = reg.test(String(this.value).toLowerCase());

      toggleError(result, this);
    }

    function handleCardChange(this: HTMLInputElement): void {
      renderCardLogo(this);

      if (this.value.length > 0) {
        const clearString = this.value.split(' ').join('');
        const res = clearString.match(new RegExp('.{1,4}', 'g'))?.join(' ');

        if (res) {
          this.value = res;
        }
      }
    }

    function renderCardLogo(el: HTMLInputElement): void {
      if (+el.value[0] === 3) {
        cardNumberImage.style.backgroundImage =
          'url("https://logodownload.org/wp-content/uploads/2014/04/amex-american-express-logo-4.png")';
      } else if (+el.value[0] === 4) {
        cardNumberImage.style.backgroundImage =
          'url("https://w7.pngwing.com/pngs/618/512/png-transparent-visa-logo-mastercard-credit-card-payment-visa-blue-company-text.png")';
      } else if (+el.value[0] === 5) {
        cardNumberImage.style.backgroundImage =
          'url("https://w7.pngwing.com/pngs/23/320/png-transparent-mastercard-credit-card-visa-payment-service-mastercard-company-orange-logo.png")';
      } else {
        cardNumberImage.style.backgroundImage = 'url(../assets/no-logo.png)';
      }
    }

    function handleDateCard(this: HTMLInputElement): void {
      if (this.value.length > 0) {
        const clearString = this.value.split('/').join('');
        const res = clearString.match(new RegExp('.{1,2}', 'g'))?.join('/');

        if (res) {
          this.value = res;
        }
      }
    }
  }
}

export default ModalWindow;
