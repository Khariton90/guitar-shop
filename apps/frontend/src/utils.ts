import { StringEnum } from './../../../libs/shared-types/src/lib/string.enum';
import { ProductDto } from './types/product.dto';

export const DEFAULT = 'DEFAULT';

type FilterForm = {
  priceMin: string,
  priceMax: string,
  acoustic: string,
  electric: string,
  ukulele: string,
  fourStrings: string,
  sixStrings: string, 
  sevenStrings: string,
  twelveStrings: string,
}

export enum Price {
  Min = 100,
  Max = 1000000
}

export enum GuitarTypes {
  Electric = "electric",
  Ukulele = "ukulele",
  Acoustic = "acoustic"
}

export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export const priceFormat = (price: number | string) => {
  return Number(price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB'});
}

const isFilteredPrice = (price: number, min: number | string, max: number | string ) => {
  if ((max === DEFAULT && min === DEFAULT)) {
    return true;
  }

  if (max !== DEFAULT && min !== DEFAULT) {
    return price >= +min && price <= +max;
  }

  return price >= +min || price <= +max;
}

const isFilteredType = (type: string, acoustic: string, electric: string, ukulele: string) => {
  if (acoustic !== DEFAULT || electric !== DEFAULT || ukulele !== DEFAULT) {
    return [acoustic, electric, ukulele].includes(type);
  }

  return true;
}

const isFilteredString = (type: StringEnum, ...formArgs: Array<number | string>) => {
  const filter = formArgs.filter((item: string | number) => item !== DEFAULT);

  if (filter.length) {
    return formArgs.includes(type);
  }

  return true;
};

export const isFilteredCard = (product: ProductDto, form: FilterForm) => {
  const { price, type, strings } = product;
  const { priceMin, priceMax, acoustic, electric, ukulele, fourStrings, sixStrings, sevenStrings, twelveStrings } = form;
  
  if (!isFilteredPrice(price, priceMin, priceMax)) {
    return false;
  }

  if (!isFilteredType(type, acoustic, electric, ukulele)) {
    return false;
  }

  if (!isFilteredString(strings, fourStrings, sixStrings, sevenStrings, twelveStrings)) {
    return false;
  }

  return true;

};
