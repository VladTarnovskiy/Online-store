import { CardItem } from '../types/types';

class Card {
  drawBlock(data: CardItem): void {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');

    const card = <HTMLElement>document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${data.thumbnail}')`;

    const cardTitle = <HTMLElement>document.createElement('div');
    cardTitle.className = 'card__title';
    const textTitle = <HTMLElement>document.createElement('div');
    textTitle.textContent = data.title;
    cardTitle.appendChild(textTitle);

    const cardDescription = <HTMLElement>document.createElement('ul');
    cardDescription.className = 'card__description';

    const cardPropOne = <HTMLElement>document.createElement('li');
    cardPropOne.className = 'card__property';
    cardPropOne.textContent = 'Category: ';

    const cardPropOneValue = <HTMLElement>document.createElement('span');
    cardPropOneValue.className = 'card__value card__value_category';
    cardPropOneValue.textContent = data.category;
    cardPropOne.appendChild(cardPropOneValue);

    const cardPropTwo = <HTMLElement>document.createElement('li');
    cardPropTwo.className = 'card__property';
    cardPropTwo.textContent = 'Brand: ';

    const cardPropTwoValue = <HTMLElement>document.createElement('span');
    cardPropTwoValue.className = 'card__value card__value_brand';
    cardPropTwoValue.textContent = data.brand;
    cardPropTwo.appendChild(cardPropTwoValue);

    const cardPropThree = <HTMLElement>document.createElement('li');
    cardPropThree.className = 'card__property';
    cardPropThree.textContent = 'Price: ';

    const cardPropThreeValue = <HTMLElement>document.createElement('span');
    cardPropThreeValue.className = 'card__value card__value_price';
    cardPropThreeValue.textContent = String(data.price);
    const cardPropThreeValueDollar = <HTMLElement>document.createElement('span');
    cardPropThreeValueDollar.textContent = ' $';
    cardPropThreeValue.appendChild(cardPropThreeValueDollar);
    cardPropThree.appendChild(cardPropThreeValue);

    const cardPropFour = <HTMLElement>document.createElement('li');
    cardPropFour.className = 'card__property';
    cardPropFour.textContent = 'Discount: ';

    const cardPropFourValue = <HTMLElement>document.createElement('span');
    cardPropFourValue.className = 'card__value card__value_discount';
    cardPropFourValue.textContent = `${String(data.discountPercentage)} %`;
    cardPropFour.appendChild(cardPropFourValue);

    const cardPropFive = <HTMLElement>document.createElement('li');
    cardPropFive.className = 'card__property';
    cardPropFive.textContent = 'Raiting: ';

    const cardPropFiveValue = <HTMLElement>document.createElement('span');
    cardPropFiveValue.className = 'card__value card__value_raiting';
    cardPropFiveValue.textContent = String(data.rating);

    const propRateStar = <HTMLElement>document.createElement('div');
    propRateStar.className = 'card__rate-icon';

    cardPropFiveValue.appendChild(propRateStar);
    cardPropFive.appendChild(cardPropFiveValue);

    const cardPropSix = <HTMLElement>document.createElement('li');
    cardPropSix.className = 'card__property';
    cardPropSix.textContent = 'Stock: ';

    const cardPropSixValue = <HTMLElement>document.createElement('span');
    cardPropSixValue.className = 'card__value card__value_stock';
    cardPropSixValue.textContent = String(data.stock);
    cardPropSix.appendChild(cardPropSixValue);

    cardDescription.appendChild(cardPropOne);
    cardDescription.appendChild(cardPropTwo);
    cardDescription.appendChild(cardPropThree);
    cardDescription.appendChild(cardPropFour);
    cardDescription.appendChild(cardPropFive);
    cardDescription.appendChild(cardPropSix);

    const cardButtons = <HTMLElement>document.createElement('div');
    cardButtons.className = 'card__buttons';

    const cardButtonAdd = <HTMLElement>document.createElement('div');
    if (data.inBasket === true) {
      cardButtonAdd.className = 'card__button card__button_add card__button-add_active';
      cardButtonAdd.textContent = 'In cart';
    } else {
      cardButtonAdd.className = 'card__button card__button_add';
      cardButtonAdd.textContent = 'Add to cart';
    }
    // cardButtonAdd.className = 'card__button card__button_add';
    // cardButtonAdd.textContent = 'Add to cart';
    cardButtonAdd.setAttribute('data-id', `${data.id}`);
    // cardButtonAdd.textContent = 'Add to cart';
    cardButtonAdd.addEventListener('click', () => {
      cardButtonAdd.classList.toggle('card__button-add_active');
      if (cardButtonAdd.classList.contains('card__button-add_active')) {
        cardButtonAdd.textContent = 'In cart';
      } else {
        cardButtonAdd.textContent = 'Add to cart';
      }
    });

    const cardButtonDetails = <HTMLElement>document.createElement('div');
    cardButtonDetails.className = 'card__button card__button_detail';
    cardButtonDetails.setAttribute('data-id', `${data.id}`);
    cardButtonDetails.textContent = 'Details';

    cardButtons.appendChild(cardButtonAdd);
    cardButtons.appendChild(cardButtonDetails);

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardButtons);

    productsContainer.appendChild(card);
  }

  drawList(data: CardItem): void {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');

    const card = <HTMLElement>document.createElement('div');
    card.className = 'card card_list';

    const wrapperImg = <HTMLElement>document.createElement('div');
    wrapperImg.className = 'wrapper__img';
    card.appendChild(wrapperImg);

    const cardImg = <HTMLElement>document.createElement('img');
    cardImg.className = 'card__img';
    cardImg.setAttribute('src', `${data.thumbnail}`);
    wrapperImg.appendChild(cardImg);

    const descriptWrapper = <HTMLElement>document.createElement('div');
    descriptWrapper.className = 'card__descript-wrap';
    card.appendChild(descriptWrapper);

    const cardTitle = <HTMLElement>document.createElement('div');
    cardTitle.className = 'card__title';
    const textTitle = <HTMLElement>document.createElement('div');
    textTitle.textContent = data.title;
    cardTitle.appendChild(textTitle);
    descriptWrapper.appendChild(cardTitle);

    const carddescript = <HTMLElement>document.createElement('div');
    carddescript.className = 'card__descript';
    carddescript.textContent = data.description;
    descriptWrapper.appendChild(carddescript);

    const cardPropThreeValue = <HTMLElement>document.createElement('span');
    cardPropThreeValue.className = 'card__value card__value_price';
    cardPropThreeValue.textContent = String(data.price);
    const cardPropThreeValueDollar = <HTMLElement>document.createElement('span');
    cardPropThreeValueDollar.textContent = ' $';
    cardPropThreeValue.appendChild(cardPropThreeValueDollar);
    descriptWrapper.appendChild(cardPropThreeValue);

    const cardPropRate = <HTMLElement>document.createElement('div');
    cardPropRate.className = 'card__rate';

    const propRateText = <HTMLElement>document.createElement('div');
    propRateText.className = 'card__rate-text';
    propRateText.textContent = `${String(data.rating)} / 5`;

    const propRateStar = <HTMLElement>document.createElement('div');
    propRateStar.className = 'card__rate-icon';
    cardPropRate.appendChild(propRateText);
    cardPropRate.appendChild(propRateStar);

    descriptWrapper.appendChild(cardPropRate);

    const cardButtons = <HTMLElement>document.createElement('div');
    cardButtons.className = 'card__buttons';

    const cardButtonAdd = <HTMLElement>document.createElement('div');
    // cardButtonAdd.className = 'card__button card__button_add';
    cardButtonAdd.setAttribute('data-id', `${data.id}`);
    if (data.inBasket === true) {
      cardButtonAdd.className = 'card__button card__button_add card__button-add_active';
      cardButtonAdd.textContent = 'In cart';
    } else {
      cardButtonAdd.className = 'card__button card__button_add';
      cardButtonAdd.textContent = 'Add to cart';
    }
    cardButtonAdd.addEventListener('click', () => {
      cardButtonAdd.classList.toggle('card__button-add_active');
      if (cardButtonAdd.classList.contains('card__button-add_active')) {
        cardButtonAdd.textContent = 'In cart';
      } else {
        cardButtonAdd.textContent = 'Add to cart';
      }
    });

    const cardButtonDetails = <HTMLElement>document.createElement('div');
    cardButtonDetails.className = 'card__button card__button_detail';
    cardButtonDetails.setAttribute('data-id', `${data.id}`);
    cardButtonDetails.textContent = 'Details';

    cardButtons.appendChild(cardButtonAdd);
    cardButtons.appendChild(cardButtonDetails);

    descriptWrapper.appendChild(cardButtons);

    productsContainer.appendChild(card);
  }

  drawCardBasket(data: CardItem): void {
    const productsContainer = <HTMLElement>document.querySelector('.basket__prod-container');

    const card = <HTMLElement>document.createElement('div');
    card.className = 'card card_basket';

    const wrapperImg = <HTMLElement>document.createElement('div');
    wrapperImg.className = 'wrapper__img';
    card.appendChild(wrapperImg);

    const cardImg = <HTMLElement>document.createElement('img');
    cardImg.className = 'card__img';
    cardImg.setAttribute('src', `${data.thumbnail}`);
    wrapperImg.appendChild(cardImg);

    const descriptWrapper = <HTMLElement>document.createElement('div');
    descriptWrapper.className = 'card__descript-wrap';
    card.appendChild(descriptWrapper);

    const cardTitle = <HTMLElement>document.createElement('div');
    cardTitle.className = 'card__title';
    const textTitle = <HTMLElement>document.createElement('div');
    textTitle.textContent = `${data.title}`;
    cardTitle.appendChild(textTitle);
    descriptWrapper.appendChild(cardTitle);

    const carddescript = <HTMLElement>document.createElement('div');
    carddescript.className = 'card__descript';
    carddescript.textContent = `${data.description}`;
    descriptWrapper.appendChild(carddescript);

    const cardPropThreeValue = <HTMLElement>document.createElement('span');
    cardPropThreeValue.className = 'card__value card__value_price';
    cardPropThreeValue.textContent = String(`${data.price}`);
    const cardPropThreeValueDollar = <HTMLElement>document.createElement('span');
    cardPropThreeValueDollar.textContent = '$';
    cardPropThreeValue.appendChild(cardPropThreeValueDollar);
    descriptWrapper.appendChild(cardPropThreeValue);

    const cardPropRate = <HTMLElement>document.createElement('div');
    cardPropRate.className = 'card__rate';

    const cardBasketDec = <HTMLElement>document.createElement('div');
    cardBasketDec.className = 'card__basket-description';

    const cardDescRate = <HTMLElement>document.createElement('div');
    cardDescRate.className = 'card__rate';
    cardDescRate.textContent = `Raiting: ${String(`${data.rating}`)} `;

    const propRateStar = <HTMLElement>document.createElement('div');
    propRateStar.className = 'card__rate-icon';
    cardDescRate.appendChild(propRateStar);

    const cardDescDisc = <HTMLElement>document.createElement('div');
    cardDescDisc.className = 'card_desc-item card__basket-disc';
    cardDescDisc.textContent = `Discount: ${data.discountPercentage} %`;

    cardBasketDec.appendChild(cardDescRate);
    cardBasketDec.appendChild(cardDescDisc);

    //controller item
    const itemController = <HTMLElement>document.createElement('div');
    itemController.className = 'card__item-controller';
    card.appendChild(itemController);

    const itemStock = <HTMLElement>document.createElement('div');
    itemStock.className = 'card__item-stock';
    itemStock.textContent = 'Stock: ';

    const itemStockValue = <HTMLElement>document.createElement('span');
    itemStockValue.className = 'card__stock-value';
    itemStockValue.textContent = String(`${data.stock}`);

    itemStock.appendChild(itemStockValue);
    itemController.appendChild(itemStock);

    const itemControl = <HTMLElement>document.createElement('div');
    itemControl.className = 'card__item-control';

    const cardButtonPlus = <HTMLElement>document.createElement('div');
    cardButtonPlus.className = 'card__btn-control card__item-plus';
    cardButtonPlus.setAttribute('data-id', `${data.id}`);
    // cardButtonPlus.addEventListener('click', () => {
    //   if (Number(itemCounter.textContent) < data.stock) {
    //     itemCounter.textContent = String(Number(itemCounter.textContent) + 1);
    //     totlalPrice.textContent = `${(
    //       (data.price - (data.price * data.discountPercentage) / 100) *
    //       Number(itemCounter.textContent)
    //     ).toFixed(2)} $`;
    //   }
    // });

    const itemCounter = <HTMLElement>document.createElement('div');
    itemCounter.className = 'card__item-counter';
    itemCounter.textContent = `${data.amount}`;

    const cardButtonMinus = <HTMLElement>document.createElement('div');
    cardButtonMinus.className = 'card__btn-control card__item-minus';
    cardButtonMinus.setAttribute('data-id', `${data.id}`);
    // cardButtonMinus.addEventListener('click', () => {
    //   if (Number(itemCounter.textContent) > 1) {
    //     itemCounter.textContent = String(Number(itemCounter.textContent) - 1);
    //   }
    // });

    itemControl.appendChild(cardButtonPlus);
    itemControl.appendChild(itemCounter);
    itemControl.appendChild(cardButtonMinus);
    itemController.appendChild(itemControl);

    const totlalPrice = <HTMLElement>document.createElement('div');
    totlalPrice.className = 'card__item-total-price';
    totlalPrice.textContent = `${data.totalPrice! * data.amount!} $`;
    itemController.appendChild(totlalPrice);

    descriptWrapper.appendChild(cardBasketDec);

    productsContainer.appendChild(card);
  }

  darwCardDetailPage(card: CardItem): void {
    const container = <HTMLElement>document.querySelector('main');
    const prodWrapper = <HTMLElement>document.createElement('div');
    prodWrapper.className = 'product__wrapper';
    container.appendChild(prodWrapper);
    //product path
    const pathProd = <HTMLElement>document.createElement('div');
    pathProd.className = 'path__prod';

    const pathStore = <HTMLElement>document.createElement('div');
    pathStore.className = 'path__store';
    pathStore.textContent = 'Store';

    const pathDirection = <HTMLElement>document.createElement('div');
    pathDirection.className = 'path__direction';
    pathDirection.textContent = '>>';

    const pathCategory = <HTMLElement>document.createElement('div');
    pathCategory.className = 'path__category';
    pathCategory.textContent = `${card.category}`;

    const pathBrand = <HTMLElement>document.createElement('div');
    pathBrand.className = 'path__brand';
    pathBrand.textContent = `${card.brand}`;

    const pathModel = <HTMLElement>document.createElement('div');
    pathModel.className = 'path__title';
    pathModel.textContent = `${card.title}`;

    pathProd.appendChild(pathStore);
    pathProd.appendChild(pathDirection);
    pathProd.appendChild(pathCategory);
    pathProd.appendChild(pathDirection.cloneNode(true));
    pathProd.appendChild(pathBrand);
    pathProd.appendChild(pathDirection.cloneNode(true));
    pathProd.appendChild(pathModel);

    const prodContainer = <HTMLElement>document.createElement('div');
    prodContainer.className = 'prod';

    const prodTitle = <HTMLElement>document.createElement('div');
    prodTitle.className = 'prod__title';
    prodTitle.textContent = `${card.title}`;
    prodContainer.appendChild(prodTitle);

    const prodDescriptContainer = <HTMLElement>document.createElement('div');
    prodDescriptContainer.className = 'prod__descript-container';
    prodContainer.appendChild(prodDescriptContainer);

    const prodimgContainer = <HTMLElement>document.createElement('div');
    prodimgContainer.className = 'prod__img-container';
    prodDescriptContainer.appendChild(prodimgContainer);

    let count = 1;
    const prodImgDispaly = <HTMLElement>document.createElement('div');
    prodImgDispaly.className = 'prod__img-display';
    prodImgDispaly.style.backgroundImage = `url('${card.images[count]}')`;

    const prodImgButRight = <HTMLElement>document.createElement('button');
    prodImgButRight.className = 'prod__img-but prod__img-but_right';
    prodImgButRight.textContent = '>';
    prodImgButRight.addEventListener('click', () => {
      if (count < card.images.length - 1) {
        count += 1;
        // prodImgButRight.classList.remove('but_disabled');
        // prodImgButLeft.classList.remove('but_disabled');
        prodImgDispaly.style.backgroundImage = `url('${card.images[count]}')`;
      } else {
        // prodImgButRight.classList.add('but_disabled');
        count = 0;
        prodImgDispaly.style.backgroundImage = `url('${card.images[count]}')`;
      }
    });

    const prodImgButLeft = <HTMLElement>document.createElement('button');
    prodImgButLeft.className = 'prod__img-but prod__img-but_left';
    prodImgButLeft.textContent = '<';
    prodImgButLeft.addEventListener('click', () => {
      if (count > 0) {
        count -= 1;
        // prodImgButLeft.classList.remove('but_disabled');
        // prodImgButRight.classList.remove('but_disabled');
        prodImgDispaly.style.backgroundImage = `url('${card.images[count]}')`;
      } else {
        count = card.images.length - 1;
        prodImgDispaly.style.backgroundImage = `url('${card.images[count]}')`;
        // prodImgButLeft.classList.add('but_disabled');
      }
    });

    prodimgContainer.appendChild(prodImgButLeft);
    prodimgContainer.appendChild(prodImgDispaly);
    prodimgContainer.appendChild(prodImgButRight);
    prodDescriptContainer.appendChild(prodimgContainer);

    //descript container
    const prodListDescriptContainer = <HTMLElement>document.createElement('div');
    prodListDescriptContainer.className = 'prod__descript-container';
    prodDescriptContainer.appendChild(prodListDescriptContainer);

    //item decript
    const prodItemOneContainer = <HTMLElement>document.createElement('div');
    prodItemOneContainer.className = 'prod__descript-item-container';

    const prodItemOneTitle = <HTMLElement>document.createElement('div');
    prodItemOneTitle.className = 'prod__descript-item-title';
    prodItemOneTitle.textContent = 'Description:';

    const prodItemOneContent = <HTMLElement>document.createElement('div');
    prodItemOneContent.className = 'prod__descript-item-conent';
    prodItemOneContent.textContent = `${card.description}`;
    prodItemOneContainer.appendChild(prodItemOneTitle);
    prodItemOneContainer.appendChild(prodItemOneContent);

    //item decript
    const prodItemTwoContainer = <HTMLElement>document.createElement('div');
    prodItemTwoContainer.className = 'prod__descript-item-container';

    const prodItemTwoTitle = <HTMLElement>document.createElement('div');
    prodItemTwoTitle.className = 'prod__descript-item-title';
    prodItemTwoTitle.textContent = 'Discount Percentage:';

    const prodItemTwoContent = <HTMLElement>document.createElement('div');
    prodItemTwoContent.className = 'prod__descript-item-conent';
    prodItemTwoContent.textContent = `${card.discountPercentage}`;
    prodItemTwoContainer.appendChild(prodItemTwoTitle);
    prodItemTwoContainer.appendChild(prodItemTwoContent);

    //item decript
    const prodItemThreeContainer = <HTMLElement>document.createElement('div');
    prodItemThreeContainer.className = 'prod__descript-item-container';

    const prodItemThreeTitle = <HTMLElement>document.createElement('div');
    prodItemThreeTitle.className = 'prod__descript-item-title';
    prodItemThreeTitle.textContent = 'Rating:';

    const prodItemThreeContent = <HTMLElement>document.createElement('div');
    prodItemThreeContent.className = 'prod__descript-item-conent';
    prodItemThreeContent.textContent = `${card.rating}`;
    prodItemThreeContainer.appendChild(prodItemThreeTitle);
    prodItemThreeContainer.appendChild(prodItemThreeContent);

    //item decript
    const prodItemFourContainer = <HTMLElement>document.createElement('div');
    prodItemFourContainer.className = 'prod__descript-item-container';

    const prodItemFourTitle = <HTMLElement>document.createElement('div');
    prodItemFourTitle.className = 'prod__descript-item-title';
    prodItemFourTitle.textContent = 'Stock:';

    const prodItemFourContent = <HTMLElement>document.createElement('div');
    prodItemFourContent.className = 'prod__descript-item-conent';
    prodItemFourContent.textContent = `${card.stock}`;
    prodItemFourContainer.appendChild(prodItemFourTitle);
    prodItemFourContainer.appendChild(prodItemFourContent);

    //item decript
    const prodItemFiveContainer = <HTMLElement>document.createElement('div');
    prodItemFiveContainer.className = 'prod__descript-item-container';

    const prodItemFiveTitle = <HTMLElement>document.createElement('div');
    prodItemFiveTitle.className = 'prod__descript-item-title';
    prodItemFiveTitle.textContent = 'Brand:';

    const prodItemFiveContent = <HTMLElement>document.createElement('div');
    prodItemFiveContent.className = 'prod__descript-item-conent';
    prodItemFiveContent.textContent = `${card.brand}`;
    prodItemFiveContainer.appendChild(prodItemFiveTitle);
    prodItemFiveContainer.appendChild(prodItemFiveContent);

    //item decript
    const prodItemSixContainer = <HTMLElement>document.createElement('div');
    prodItemSixContainer.className = 'prod__descript-item-container';

    const prodItemSixTitle = <HTMLElement>document.createElement('div');
    prodItemSixTitle.className = 'prod__descript-item-title';
    prodItemSixTitle.textContent = 'Category:';

    const prodItemSixContent = <HTMLElement>document.createElement('div');
    prodItemSixContent.className = 'prod__descript-item-conent';
    prodItemSixContent.textContent = `${card.category}`;
    prodItemSixContainer.appendChild(prodItemSixTitle);
    prodItemSixContainer.appendChild(prodItemSixContent);

    prodListDescriptContainer.appendChild(prodItemOneContainer);
    prodListDescriptContainer.appendChild(prodItemTwoContainer);
    prodListDescriptContainer.appendChild(prodItemThreeContainer);
    prodListDescriptContainer.appendChild(prodItemFourContainer);
    prodListDescriptContainer.appendChild(prodItemFiveContainer);
    prodListDescriptContainer.appendChild(prodItemSixContainer);

    //button container
    const prodButtonsContainer = <HTMLElement>document.createElement('div');
    prodButtonsContainer.className = 'prod__buttons-container';
    prodDescriptContainer.appendChild(prodButtonsContainer);

    const prodPrice = <HTMLElement>document.createElement('div');
    prodPrice.className = 'prod__price';
    prodPrice.textContent = `${card.price} $`;

    const cardButtonAdd = <HTMLElement>document.createElement('button');
    cardButtonAdd.className = 'prod__but card__button_add';
    cardButtonAdd.setAttribute('data-id', `${card.id}`);
    cardButtonAdd.textContent = 'Add to cart';

    if (card.inBasket === true) {
      cardButtonAdd.className = 'prod__but card__button_add card__button-add_active';
      cardButtonAdd.textContent = 'In cart';
    } else {
      cardButtonAdd.className = 'prod__but card__button_add';
      cardButtonAdd.textContent = 'Add to cart';
    }
    // cardButtonAdd.className = 'card__button card__button_add';
    // cardButtonAdd.textContent = 'Add to cart';
    // cardButtonAdd.setAttribute('data-id', `${data.id}`);
    // cardButtonAdd.textContent = 'Add to cart';
    cardButtonAdd.addEventListener('click', () => {
      cardButtonAdd.classList.toggle('card__button-add_active');
      if (cardButtonAdd.classList.contains('card__button-add_active')) {
        cardButtonAdd.textContent = 'In cart';
      } else {
        cardButtonAdd.textContent = 'Add to cart';
      }
    });

    const prodButBuy = <HTMLElement>document.createElement('button');
    prodButBuy.className = 'prod__but prod__but-buy';
    prodButBuy.textContent = 'Buy now';

    prodButtonsContainer.appendChild(prodPrice);
    prodButtonsContainer.appendChild(cardButtonAdd);
    prodButtonsContainer.appendChild(prodButBuy);

    prodWrapper.appendChild(pathProd);
    prodWrapper.appendChild(prodContainer);
  }
}

export default Card;
