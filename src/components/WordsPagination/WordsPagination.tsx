import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 480 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopRange = usePagination({
    totalPages,
    siblingCount: 1,
    currentPage,
  });

  const buildMobileRange = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    const range: (number | string)[] = [1];

    if (currentPage <= 2) {
      range.push(2);
    } else if (currentPage >= totalPages - 1) {
      range.push(totalPages - 1);
    } else {
      range.push(currentPage);
    }

    range.push(DOTS);
    range.push(totalPages);

    return range;
  };

  const paginationRange = isMobile ? buildMobileRange() : desktopRange;

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
        <Button
          className={`${s.button} ${currentPage === 1 ? s.disabled : ""}`}
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
      </li>

      {paginationRange.map((pageNumberOrDots, index) => {
        if (pageNumberOrDots === DOTS) {
          return (
            <li key={`dots-${index}`} className={s.paginationButton}>
              <span className={`${s.button} ${s.dots}`}>
                <Icon
                  name="icon-dots"
                  width={13}
                  height={13}
                  className={s.dotsIcon}
                />
              </span>
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
        <Button
          className={`${s.button} ${currentPage === lastPage ? s.disabled : ""}`}
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          &gt;
        </Button>
      </li>

      <li className={s.paginationButton}>
        <Button
          className={`${s.button} ${currentPage === lastPage ? s.disabled : ""}`}
          onClick={onLast}
          disabled={currentPage === lastPage}
        >
          &raquo;
        </Button>
      </li>
    </ul>
  );
}
