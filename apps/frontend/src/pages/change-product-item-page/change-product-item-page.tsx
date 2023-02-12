import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";
import { ProductDto } from "../../types/product.dto";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeProduct, uploadProductImage } from "../../store/api-actions";
import dayjs from 'dayjs';

export function ChangeProductItemPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productImage = useAppSelector(({ dataReducer }) => dataReducer.productImage);
  const productCart = useAppSelector(({ cartReducer }) => cartReducer.productCard);
  const [selectedFile, setSelectedFile] = useState<Blob | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const [product, setProduct] = useState<ProductDto>({
    id: productCart ? productCart.id : '',
    title: '',
    description: '',
    date: dayjs(new Date()).toISOString(),
    image: productImage,
    type: ProductTypeEnum.Electro,
    article: '',
    strings: StringEnum.Four,
    price: 0,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct((prevProduct) => {
      if (evt.target.name === 'strings' || evt.target.name === 'price') {
        return {
          ...prevProduct,
          [evt.target.name]: parseInt(evt.target.value, 10)
        }
      }

      if (evt.target.name === 'date') {
        return {
          ...prevProduct,
          [evt.target.name]: dayjs(evt.target.value).toISOString()
        }
      }

      return {
        ...prevProduct,
        [evt.target.name]: evt.target.value
      }
    })
  }
  const handleSubmut = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
      dispatch(uploadProductImage(formData));
    }
  }

  const handleSetPreviewImage = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || evt.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    if (evt.target.files) {
      setSelectedFile(evt.target.files[0])
    }
  }

  const handleDeleteImage = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
  }

  useEffect(() => {
    if (productCart) {
      setProduct(productCart);
      setPreview(productCart.image);
    }

    if (productImage) {
      dispatch(changeProduct({ ...product, image: productImage }));
    }

    if (!selectedFile) {
      setPreview(undefined);
      return
    }

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile, product, productImage, dispatch, productCart])

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Товары</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Новый товар</a>
            </li>
          </ul>
          <form className="add-item__form" action="#" method="get" onSubmit={handleSubmut}>
            <div className="add-item__form-left">
              <div className="edit-item-image add-item__form-image">
                <div className="edit-item-image__image-wrap">
                  {preview ? <img src={preview} alt="preview" /> : <img src={product.image} alt="preview" />}
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button className="button button--small button--black-border edit-item-image__btn">Заменить
                    <input type="file" required className="file hidden" accept=".jpg, .jpeg, .png" onChange={handleSetPreviewImage} />
                  </button>
                  <button className="button button--small button--black-border edit-item-image__btn" onClick={handleDeleteImage}>Удалить</button>
                </div>
              </div>
              <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
                <input type="radio" id="guitar" name="type" defaultValue={ProductTypeEnum.Acustic} onChange={(evt) => handleChange(evt)} />
                <label htmlFor="guitar">Акустическая гитара</label>
                <input type="radio" id="el-guitar" name="type" defaultValue={ProductTypeEnum.Electro} defaultChecked onChange={(evt) => handleChange(evt)} />
                <label htmlFor="el-guitar">Электрогитара</label>
                <input type="radio" id="ukulele" name="type" defaultValue={ProductTypeEnum.Ukulele} onChange={(evt) => handleChange(evt)} />
                <label htmlFor="ukulele">Укулеле</label>
              </div>
              <div className="input-radio add-item__form-radio"><span>Количество струн</span>
                <input type="radio" id="string-qty-4" name="strings" value={StringEnum.Four} defaultChecked onChange={(evt) => handleChange(evt)} />
                <label htmlFor="string-qty-4">4</label>
                <input type="radio" id="string-qty-6" name="strings" value={StringEnum.Six} onChange={(evt) => handleChange(evt)} />
                <label htmlFor="string-qty-6">6</label>
                <input type="radio" id="string-qty-7" name="strings" value={StringEnum.Seven} onChange={(evt) => handleChange(evt)} />
                <label htmlFor="string-qty-7">7</label>
                <input type="radio" id="string-qty-12" name="strings" value={StringEnum.Twelve} onChange={(evt) => handleChange(evt)} />
                <label htmlFor="string-qty-12">12</label>
              </div>
            </div>
            <div className="add-item__form-right">
              <div className="custom-input add-item__form-input">
                <label><span>Дата добавления товара</span>
                  <input type="text" name="date" value={dayjs(product.date).format('DD.MM.YYYY')} readOnly />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Введите наименование товара</span>
                  <input type="text" required name="title" placeholder="Наименование"
                    defaultValue={product.title}
                    minLength={10} onChange={(evt) => handleChange(evt)} />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                <label><span>Введите цену товара</span>
                  <input type="number"
                    defaultValue={product.price}
                    required
                    min={100}
                    max={100000} name="price" placeholder="Цена в формате 00 000" onChange={(evt) => handleChange(evt)} />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Введите артикул товара</span>
                  <input type="text" required name="article" defaultValue={product.article} placeholder="Артикул товара" onChange={(evt) => handleChange(evt)} />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-textarea add-item__form-textarea">
                <label><span>Введите описание товара</span>
                  <textarea name="description" placeholder="" defaultValue={product.description} minLength={20} onChange={(evt) => handleChange(evt)}></textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>
            <div className="add-item__form-buttons-wrap">
              <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
              <button className="button button--small add-item__form-button" type="button" onClick={() => navigate(AppRoute.Main)}>Вернуться к списку товаров</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}