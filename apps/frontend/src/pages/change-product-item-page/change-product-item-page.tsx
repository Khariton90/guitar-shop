import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppRoute } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { getOneProduct } from "../../store/api-actions";

export function ChangeProductItemPage(): JSX.Element {
  const productItem = useAppSelector(({ cartReducer }) => cartReducer.productCard);
  const dispatch = useAppDispatch();
  const param = useParams();

  useEffect(() => {
    if (!productItem && param.id) {
      dispatch(getOneProduct(param.id))
    }
  }, [dispatch, param.id, productItem]);

  const changeProductRoute = `/product/change/${param.id}`;

  if (!productItem) {
    return <>
    </>
  }

  

  return (
    <main className="page-content">
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">{productItem.title}</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Товары</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={changeProductRoute}>{productItem.title}</Link>
            </li>
          </ul>
          <form className="edit-item__form" action="#" method="get">
            <div className="edit-item__form-left">
              <div className="edit-item-image edit-item__form-image">
                <div className="edit-item-image__image-wrap">
                  <img className="edit-item-image__image" 
                  src={productItem.image}
                  srcSet={productItem.image} width="133" height="332" alt="СURT Z30 Plus" />
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button className="button button--small button--black-border edit-item-image__btn">Заменить
                  </button>
                  <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                </div>
              </div>
              <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
                <input type="radio" id="guitar" name="item-type" value="guitar" />
                <label htmlFor="guitar">Акустическая гитара</label>
                <input type="radio" id="el-guitar" name="item-type" value="el-guitar" defaultChecked />
                <label htmlFor="el-guitar">Электрогитара</label>
                <input type="radio" id="ukulele" name="item-type" value="ukulele" />
                <label htmlFor="ukulele">Укулеле</label>
              </div>
              <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                <input type="radio" id="string-qty-4" name="string-qty" value="4" defaultChecked />
                <label htmlFor="string-qty-4">4</label>
                <input type="radio" id="string-qty-6" name="string-qty" value="6" />
                <label htmlFor="string-qty-6">6</label>
                <input type="radio" id="string-qty-7" name="string-qty" value="7" />
                <label htmlFor="string-qty-7">7</label>
                <input type="radio" id="string-qty-12" name="string-qty" value="12" />
                <label htmlFor="string-qty-12">12</label>
              </div>
            </div>
            <div className="edit-item__form-right">
              <div className="custom-input edit-item__form-input">
                <label><span>Дата добавления товара</span>
                  <input type="text" name="date" value="19.09.2022" placeholder="Дата в формате 00.00.0000" readOnly />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input edit-item__form-input">
                <label><span>Наименование товара</span>
                  <input type="text" name="title" value="СURT Z30 Plus" placeholder="Наименование" />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input edit-item__form-input edit-item__form-input--price">
                <label><span>Цена товара</span>
                  <input type="text" name="price" value="27 000" placeholder="Цена в формате 00 000" />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input edit-item__form-input">
                <label><span>Артикул товара</span>
                  <input type="text" name="sku" defaultValue={productItem.article} placeholder="Артикул товара" />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-textarea edit-item__form-textarea">
                <label><span>Описание товара</span>
                  <textarea name="description" placeholder="" defaultValue={productItem.description}></textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>
            <div className="edit-item__form-buttons-wrap">
              <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
              <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}