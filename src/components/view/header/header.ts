// import Logo from '../../../assets/logo-x.png'

class Header {
    draw(): void {
        const header = <HTMLElement>document.querySelector('.header');

        const headerTitlewrap = <HTMLElement>document.createElement('div');
        headerTitlewrap.className = 'header__title-wrap';

        const basket = <HTMLElement>document.createElement('a');
        basket.className = 'basket';

        const headerLogo = <HTMLElement>document.createElement('div');
        headerLogo.className = 'header__logo';

        const imgLogo = <HTMLElement>document.createElement('div');
        imgLogo.className = 'header__logo-img'
        imgLogo.setAttribute('href', '#main-page')

        const headerTitle = <HTMLElement>document.createElement('h1');
        headerTitle.className = 'header__title';
        headerTitle.textContent = 'Online store';

        const basketImg = <HTMLElement>document.createElement('div');
        basketImg.className = 'basket__img';

        const basketChecker = <HTMLElement>document.createElement('div');
        basketChecker.className = 'basket__checker';
        basketChecker.textContent = '0';

        headerLogo.appendChild(imgLogo);
        headerTitlewrap.appendChild(headerLogo);
        headerTitlewrap.appendChild(headerTitle);
        basket.appendChild(basketImg);
        basket.appendChild(basketChecker);
        header.appendChild(headerTitlewrap);
        header.appendChild(basket);
    }
}
export default Header;
