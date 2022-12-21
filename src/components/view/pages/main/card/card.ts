import {CardItem} from '../../../../types/types';

class Card {
    drawBlock(data: CardItem): void {
    const productsContainer = <HTMLElement>document.querySelector('.product-items');

    const card = <HTMLElement>document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${data.thumbnail}')`
    
        const cardTitle = <HTMLElement>document.createElement('div');
        cardTitle.className = 'card__title';
        const textTitle = <HTMLElement>document.createElement('div');
        textTitle.textContent = data.title;
        cardTitle.appendChild(textTitle);

        const cardDescription = <HTMLElement>document.createElement('ul');
        cardDescription.className = 'card__description';

            const cardPropOne = <HTMLElement>document.createElement('li');
            cardPropOne.className = 'card__property';
            cardPropOne.textContent = 'Category: '

                const cardPropOneValue = <HTMLElement>document.createElement('span');
                cardPropOneValue.className = 'card__value card__value_category';
                cardPropOneValue.textContent = data.category;
                cardPropOne.appendChild(cardPropOneValue);
            
            const cardPropTwo = <HTMLElement>document.createElement('li');
            cardPropTwo.className = 'card__property';
            cardPropTwo.textContent = 'Brand: '

                const cardPropTwoValue = <HTMLElement>document.createElement('span');
                cardPropTwoValue.className = 'card__value card__value_brand';
                cardPropTwoValue.textContent = data.brand;
                cardPropTwo.appendChild(cardPropTwoValue);
        
            const cardPropThree = <HTMLElement>document.createElement('li');
            cardPropThree.className = 'card__property';
            cardPropThree.textContent = 'Price: '

                const cardPropThreeValue = <HTMLElement>document.createElement('span');
                cardPropThreeValue.className = 'card__value card__value_price';
                cardPropThreeValue.textContent = String(data.price);
                const cardPropThreeValueDollar = <HTMLElement>document.createElement('span');
                cardPropThreeValueDollar.textContent = ' $';
                cardPropThreeValue.appendChild(cardPropThreeValueDollar);
                cardPropThree.appendChild(cardPropThreeValue);

            const cardPropFour = <HTMLElement>document.createElement('li');
            cardPropFour.className = 'card__property';
            cardPropFour.textContent = 'Discount: '

                const cardPropFourValue = <HTMLElement>document.createElement('span');
                cardPropFourValue.className = 'card__value card__value_discount';
                cardPropFourValue.textContent = String(data.discountPercentage);
                cardPropFour.appendChild(cardPropFourValue);

            const cardPropFive = <HTMLElement>document.createElement('li');
            cardPropFive.className = 'card__property';
            cardPropFive.textContent = 'Raiting: '

                const cardPropFiveValue = <HTMLElement>document.createElement('span');
                cardPropFiveValue.className = 'card__value card__value_raiting';
                cardPropFiveValue.textContent = String(data.rating);
                cardPropFive.appendChild(cardPropFiveValue);

            const cardPropSix = <HTMLElement>document.createElement('li');
            cardPropSix.className = 'card__property';
            cardPropSix.textContent = 'Stock: '

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
        cardButtonAdd.className = 'card__button card__button_add';
        cardButtonAdd.textContent = 'Add to basket';

        const cardButtonDetails = <HTMLElement>document.createElement('div');
        cardButtonDetails.className = 'card__button card__button_detail';
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
        card.className = 'card';
        card.style.backgroundImage = `url('${data.thumbnail}')`
        
            const cardTitle = <HTMLElement>document.createElement('div');
            cardTitle.className = 'card__title';
            const textTitle = <HTMLElement>document.createElement('div');
            textTitle.textContent = data.title;
            cardTitle.appendChild(textTitle);
    
            const cardDescription = <HTMLElement>document.createElement('ul');
            cardDescription.className = 'card__description';
    
                const cardPropOne = <HTMLElement>document.createElement('li');
                cardPropOne.className = 'card__property';
                cardPropOne.textContent = 'Category: '
    
                    const cardPropOneValue = <HTMLElement>document.createElement('span');
                    cardPropOneValue.className = 'card__value card__value_category';
                    cardPropOneValue.textContent = data.category;
                    cardPropOne.appendChild(cardPropOneValue);
                
                const cardPropTwo = <HTMLElement>document.createElement('li');
                cardPropTwo.className = 'card__property';
                cardPropTwo.textContent = 'Brand: '
    
                    const cardPropTwoValue = <HTMLElement>document.createElement('span');
                    cardPropTwoValue.className = 'card__value card__value_brand';
                    cardPropTwoValue.textContent = data.brand;
                    cardPropTwo.appendChild(cardPropTwoValue);
            
                const cardPropThree = <HTMLElement>document.createElement('li');
                cardPropThree.className = 'card__property';
                cardPropThree.textContent = 'Price: '
    
                    const cardPropThreeValue = <HTMLElement>document.createElement('span');
                    cardPropThreeValue.className = 'card__value card__value_price';
                    cardPropThreeValue.textContent = String(data.price);
                    const cardPropThreeValueDollar = <HTMLElement>document.createElement('span');
                    cardPropThreeValueDollar.textContent = ' $';
                    cardPropThreeValue.appendChild(cardPropThreeValueDollar);
                    cardPropThree.appendChild(cardPropThreeValue);
    
                const cardPropFour = <HTMLElement>document.createElement('li');
                cardPropFour.className = 'card__property';
                cardPropFour.textContent = 'Discount: '
    
                    const cardPropFourValue = <HTMLElement>document.createElement('span');
                    cardPropFourValue.className = 'card__value card__value_discount';
                    cardPropFourValue.textContent = String(data.discountPercentage);
                    cardPropFour.appendChild(cardPropFourValue);
    
                const cardPropFive = <HTMLElement>document.createElement('li');
                cardPropFive.className = 'card__property';
                cardPropFive.textContent = 'Raiting: '
    
                    const cardPropFiveValue = <HTMLElement>document.createElement('span');
                    cardPropFiveValue.className = 'card__value card__value_raiting';
                    cardPropFiveValue.textContent = String(data.rating);
                    cardPropFive.appendChild(cardPropFiveValue);
    
                const cardPropSix = <HTMLElement>document.createElement('li');
                cardPropSix.className = 'card__property';
                cardPropSix.textContent = 'Stock: '
    
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
            cardButtonAdd.className = 'card__button card__button_add';
            cardButtonAdd.textContent = 'Add to basket';
    
            const cardButtonDetails = <HTMLElement>document.createElement('div');
            cardButtonDetails.className = 'card__button card__button_detail';
            cardButtonDetails.textContent = 'Details';
    
            cardButtons.appendChild(cardButtonAdd);
            cardButtons.appendChild(cardButtonDetails);
    
            card.appendChild(cardTitle);
            card.appendChild(cardDescription);
            card.appendChild(cardButtons);
    
            productsContainer.appendChild(card);
        }
}

export default Card;

