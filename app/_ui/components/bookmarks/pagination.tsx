"use client";

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_ui/components/pagination";
import usePagination from "@/app/_hooks/use-pagination";

export function TablePagination({ pageCount }: { pageCount: number }) {
  const { currentPage, createPageUrl } = usePagination();

  return (
    <div className="py-4">
      <Pagination>
        <p className="text-sm">
          Page {currentPage} of {pageCount}
        </p>
        <PaginationContent>
          <PaginationItem className="hidden sm:block">
            <PaginationFirst href={createPageUrl(1)} isDisabled={currentPage <= 1} />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              isDisabled={currentPage >= pageCount}
            />
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLast href={createPageUrl(pageCount)} isDisabled={currentPage >= pageCount} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
