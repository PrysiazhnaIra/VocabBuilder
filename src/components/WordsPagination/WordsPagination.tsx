import s from "./WordsPagination.module.css";
import Icon from "../Icon/Icon";
import { usePagination, DOTS } from "../../hooks/usePagination";
import Button from "../Button/Button";

interface WordsPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function WordsPagination({
  totalPages,
  currentPage,
  onPageChange,
}: WordsPaginationProps) {
  const paginationRange = usePagination({
    totalPages,
    siblingCount: 1,
    currentPage,
  });

  if (totalPages <= 1) {
    return null;
  }

  const lastPage = totalPages;

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  const onFirst = () => onPageChange(1);
  const onLast = () => onPageChange(lastPage);

  return (
    <ul className={s.paginationContainer}>
      <li className={s.paginationButton}>
        <Button
          className={`${s.button} ${currentPage === 1 ? s.disabled : ""}`}
          onClick={onFirst}
          disabled={currentPage === 1}
        >
          &laquo;
        </Button>
      </li>

      <li className={s.paginationButton}>
        <button
          className={`${s.button} ${currentPage === 1 ? s.disabled : ""}`}
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>

      {paginationRange.map((pageNumberOrDots, index) => {
        if (pageNumberOrDots === DOTS) {
          return (
            <li key={index} className={s.paginationButton}>
              <Icon
                name="icon-dots"
                width={13}
                height={13}
                className={s.dotsIcon}
              />
            </li>
          );
        }

        const pageNumber = pageNumberOrDots as number;

        return (
          <li key={pageNumber} className={s.paginationButton}>
            <Button
              className={`${s.button} ${pageNumber === currentPage ? s.active : ""}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}

      <li className={s.paginationButton}>
        <button
          className={`${s.button} ${currentPage === lastPage ? s.disabled : ""}`}
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          &gt;
        </button>
      </li>

      <li className={s.paginationButton}>
        <button
          className={`${s.button} ${currentPage === lastPage ? s.disabled : ""}`}
          onClick={onLast}
          disabled={currentPage === lastPage}
        >
          &raquo;
        </button>
      </li>
    </ul>
  );
}
