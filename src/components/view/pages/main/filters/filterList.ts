import { DataValueEachOfCategory } from '../../../../types/types';

export function showListOfFilter(
  className: string,
  parentElement: HTMLDivElement,
  listFilter: Set<string>,
  nameFilter: string,
  valueEachItemList: DataValueEachOfCategory
) {
  const list: HTMLUListElement = document.createElement('ul');
  list.className = `${className}`;
  parentElement.append(list);

  listFilter.forEach((prop: string) => {
    const li: HTMLLIElement = document.createElement('li');
    li.className = `${className}__item`;
    list.append(li);

    const labelElement: HTMLLabelElement = document.createElement('label');
    labelElement.className = `${className}__label`;
    li.append(labelElement);

    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('name', `${nameFilter}`);
    inputElement.setAttribute('value', `${prop}`);
    inputElement.className = `${className}__input`;
    labelElement.append(inputElement);

    const textElement: HTMLSpanElement = document.createElement('span');
    textElement.className = `${className}__text`;
    textElement.textContent = `${prop}`;
    labelElement.append(textElement);

    const valueElement: HTMLSpanElement = document.createElement('span');
    valueElement.className = `${className}__value`;
    valueElement.textContent = `(${valueEachItemList[prop]})`;
    li.append(valueElement);
  });
}
