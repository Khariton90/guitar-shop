import { useEffect , MouseEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchComments } from "../../store/api-actions";
import CommentItem from "../comment-item/comment-item";

type CommentsProps = {
  id: string | undefined;
  onShowModal: () => void;
}

function Comments({ id, onShowModal }: CommentsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(({dataReducer}) => dataReducer.comments);

  const handleScroll = (evt: MouseEvent) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (id && !comments.length) {
      dispatch(fetchComments(id))
    }
  }, [comments, dispatch, id])

  if (!comments.length) {
    return <div>Загрузка...</div>
  }

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button className="button button--red-border button--big reviews__sumbit-button" onClick={onShowModal}>Оставить отзыв</button>
      { comments.map((comment) => <CommentItem {...comment} key={comment.id}/>) }
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header" onClick={handleScroll}>Наверх</a>
    </section>
  )
}

export default memo(Comments);