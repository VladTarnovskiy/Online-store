import data from '../../../../../data.json';
import { DataObject, DataValueEachOfCategory } from '../../../../types/types';

function getListOfCategories(): Set<string> {
  const arrayProducts: DataObject[] = data.products;
  const objectCategory: Set<string> = new Set();
  
  for (let i = 0; i < arrayProducts.length; i++) {
    objectCategory.add(arrayProducts[i].category)
  }

  return objectCategory;
}

export const listCategories: Set<string> = getListOfCategories();

function getListOfValueEachCategory(): DataValueEachOfCategory {
  const listValueOfEachCategory: DataValueEachOfCategory = {};
  const arrayProducts: DataObject[] = data.products;

  listCategories.forEach((key: string): void => {
    listValueOfEachCategory[key] = 0;

    for (let i = 0; i < arrayProducts.length; i++) {
      if (key === arrayProducts[i].category) {
        listValueOfEachCategory[key] += 1;
      }
    }
  });

  return listValueOfEachCategory;
}

export const valueEachCategory: DataValueEachOfCategory = getListOfValueEachCategory();