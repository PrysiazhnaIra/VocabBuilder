import { useMemo } from "react";

export const DOTS = "...";

interface PaginationProps {
  totalPages: number;
  siblingCount: number;
  currentPage: number;
}

export const usePagination = ({
  totalPages,
  siblingCount = 1,
  currentPage,
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalBlocks = siblingCount * 2 + 5;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    const pages: (number | string)[] = [];

    pages.push(1);

    if (startPage > 2) {
      pages.push(DOTS);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      pages.push(DOTS);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};
