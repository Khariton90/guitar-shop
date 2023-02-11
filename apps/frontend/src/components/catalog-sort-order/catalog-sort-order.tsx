import { ProductSort } from "../../types/product-sort.type"
import cn from 'classnames';
import { SortDirection } from "@guitar-shop/shared-types";

type CatalogSortOrderProps = {
  type: keyof ProductSort & string,
  onSetQuery: (key: keyof ProductSort & string, value: number) => void;
}

export function CatalogSortOrder({ type, onSetQuery }: CatalogSortOrderProps): JSX.Element {
  return (
    <div className="catalog-sort__order">
      <button className={cn("catalog-sort__order-button catalog-sort__order-button--up")}
        aria-label="По возрастанию" onClick={() => onSetQuery(type, SortDirection.Asc)}></button>
      <button className={cn("catalog-sort__order-button catalog-sort__order-button--down")}
        aria-label="По убыванию" onClick={() => onSetQuery(type, SortDirection.Desc)}></button>
    </div>
  )
}