import dayjs from "dayjs";
import { memo } from "react";

type CommentItemProps = {
  author: string,
  comment: string,
  date: Date,
  dignities: string,
  disadvantage: string,
  id: string,
  rating: string,
}

function CommentItem(commentItem: CommentItemProps): JSX.Element {

  const { author, comment, date, dignities, disadvantage } = commentItem;
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{author}</h4>
        <span className="review__date">{dayjs(date).format('DD MMMM')}</span>
      </div>
      <div className="rate review__rating-panel">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg> 
        <p className="visually-hidden">Оценка: Хорошо</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{dignities}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  )
}

export default memo(CommentItem);