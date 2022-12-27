// import data from '../../../../../data.json';
import { productData } from '../../../../model/data';

import { DataObject, DataValueEachOfCategory } from '../../../../types/types';

function getListOfCategories(): Set<string> {
  const arrayProducts: DataObject[] = productData.products;
  const objectCategory: Set<string> = new Set();

  for (let i = 0; i < arrayProducts.length; i++) {
    objectCategory.add(arrayProducts[i].category);
  }

  return objectCategory;
}

export const listCategories: Set<string> = getListOfCategories();

function getListOfValueEachCategory(): DataValueEachOfCategory {
  const listValueOfEachCategory: DataValueEachOfCategory = {};
  const arrayProducts: DataObject[] = productData.products;

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

function getListOfBrands(): Set<string> {
  const arrayProducts: DataObject[] = productData.products;
  const objectBrand: Set<string> = new Set();

  for (let i = 0; i < arrayProducts.length; i++) {
    objectBrand.add(arrayProducts[i].brand);
  }

  return objectBrand;
}

export const listOfBrands: Set<string> = getListOfBrands();

function getListOfValueEachBrand(): DataValueEachOfCategory {
  const listValueOfEachBrand: DataValueEachOfCategory = {};
  const arrayProducts: DataObject[] = productData.products;

  listOfBrands.forEach((key: string): void => {
    listValueOfEachBrand[key] = 0;

    for (let i = 0; i < arrayProducts.length; i++) {
      if (key === arrayProducts[i].brand) {
        listValueOfEachBrand[key] += 1;
      }
    }
  });

  return listValueOfEachBrand;
}

export const valueEachBrand: DataValueEachOfCategory = getListOfValueEachBrand();
