import { ProductDto } from './types/product.dto';
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

export const priceFormat = (price: number | string) => {
  return Number(price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB'});
}

export const isFilteredCard = (product: ProductDto, form: FilterForm) => {
  const { price } = product;

  const min = form.priceMin ? form.priceMin : Price.Min;
  const max = form.priceMax ? form.priceMax : Price.Max;

  if (form.priceMin && form.priceMax) {
    return price >= +min && price <= +max;
  }

  return true;
};
