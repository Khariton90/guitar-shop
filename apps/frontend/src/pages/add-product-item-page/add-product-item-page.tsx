import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";
import { ProductDto } from "../../types/product.dto";
import dayjs from 'dayjs';

export function AddProductItemPage(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<Blob | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  const [product, setProduct] = useState<ProductDto>({
    id: '',
    title: '',
    description: '',
    date: dayjs(new Date()).toISOString(),
    image: '',
    type: ProductTypeEnum.Electro,
    article: '',
    strings: StringEnum.Four,
    price: 100,
  });


  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [evt.target.name]: evt.target.value
    }))
  }
  const handleSubmut = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return
    }

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }

  }, [selectedFile])

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
                  {selectedFile && <img src={preview} alt="" />}
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button className="button button--small button--black-border edit-item-image__btn">Добавить
                    <input type="file" className="file hidden" accept=".jpg, .jpeg, .png" onChange={handleSetPreviewImage} />
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
            <div className="add-item__form-right">
              <div className="custom-input add-item__form-input">
                <label><span>Дата добавления товара</span>
                  <input type="text" name="date" value="" placeholder="Дата в формате 00.00.0000" readOnly />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Введите наименование товара</span>
                  <input type="text" name="title" value="" placeholder="Наименование" />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                <label><span>Введите цену товара</span>
                  <input type="text" name="price" value="" placeholder="Цена в формате 00 000" />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Введите артикул товара</span>
                  <input type="text" name="article" placeholder="Артикул товара" />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-textarea add-item__form-textarea">
                <label><span>Введите описание товара</span>
                  <textarea name="description" placeholder=""></textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>
            <div className="add-item__form-buttons-wrap">
              <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
              <button className="button button--small add-item__form-button" type="button">Вернуться к списку товаров</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}