import { StringEnum } from "@guitar-shop/shared-types";
import { ChangeEvent } from "react";
import { FilterForm } from "../../types/filter-form.type";
import { DEFAULT } from "../../utils";

type CatalogFilterBlockProps = {
  onChangeField: (evt: ChangeEvent<HTMLInputElement>) => void,
  onSetChangeForm: (form: FilterForm) => void,
  submitForm: FilterForm
}

export function CatalogFilterBlock({ onChangeField, submitForm, onSetChangeForm}: CatalogFilterBlockProps): JSX.Element {
  return (
    <>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic"
            defaultValue={"acoustic"}
            name="acoustic"
            checked={submitForm.acoustic !== DEFAULT}
            onChange={onChangeField} />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric"
            defaultValue={"electric"}
            name="electric"
            checked={submitForm.electric !== DEFAULT}
            onChange={onChangeField} />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele"
            defaultValue={"ukulele"}
            name="ukulele"
            checked={submitForm.ukulele !== DEFAULT}
            onChange={onChangeField} />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings"
            defaultValue={StringEnum.Four}
            name="fourStrings"
            checked={submitForm.fourStrings !== DEFAULT}
            onChange={onChangeField} />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings"
            defaultValue={StringEnum.Six}
            name="sixStrings"
            checked={submitForm.sixStrings !== DEFAULT}
            onChange={onChangeField} />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings"
            defaultValue={StringEnum.Seven}
            checked={submitForm.sevenStrings !== DEFAULT}
            name="sevenStrings" onChange={onChangeField} />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings"
            defaultValue={StringEnum.Twelve}
            checked={submitForm.twelveStrings !== DEFAULT}
            name="twelveStrings" onChange={onChangeField} />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={() => onSetChangeForm({
          priceMin: DEFAULT,
          priceMax: DEFAULT,
          acoustic: DEFAULT,
          electric: DEFAULT,
          ukulele: DEFAULT,
          fourStrings: DEFAULT,
          sixStrings: DEFAULT,
          sevenStrings: DEFAULT,
          twelveStrings: DEFAULT,
        })}>Очистить
      </button>
    </>
  )
}