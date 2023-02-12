import cn from 'classnames';
import { ProductSort } from "../../types/product-sort.type";
import { getThreePagination } from "../../utils";
import { PAGINATION_BUTTON_COUNT, PRODUCTS_LIMIT } from "../../consts";

type PageContentPaginationProps = {
  total: number,
  onSetQuery: (key: keyof ProductSort & string, value: number) => void;
  query: ProductSort
}

export function PageContentPagination({ total, onSetQuery, query }: PageContentPaginationProps): JSX.Element {

  const arrayOfDigits = getThreePagination(total);
  const loadMoreBtn = Math.ceil(total / PRODUCTS_LIMIT) > PAGINATION_BUTTON_COUNT;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          arrayOfDigits.map((el) => <li key={el} className={cn("pagination__page", { " pagination__page--active": query.page === el })}
            onClick={() => onSetQuery("page", el)}>
            <span className="link pagination__page-link">{el}</span>
          </li>)
        }
        {
          loadMoreBtn ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href="2">Далее</a>
            </li> : null
        }

      </ul>
    </div>
  )
}