import React, { MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface CountryPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const CountryPagination: React.FC<CountryPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    handlePageChange(page);
  };

  const getPageNumbers = () => {
    let pages = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const pageRange = isMobile ? 0 : 1;

    // Show the first page if we're not already near it
    if (currentPage > 2 + pageRange) {
      pages.push(1);
      pages.push("ellipsis");
    }

    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    // Add current range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - (1 + pageRange)) {
      pages.push("ellipsis");
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // We don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        {/* Previous Page Navigation */}
        <PaginationItem>
          {/* Desktop Previous Button */}
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex h-9 w-9 p-0 border-blue-600/20 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isPrevDisabled}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <PaginationPrevious
            className="sm:hidden hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
            onClick={(e) => handleLinkClick(e, currentPage - 1)}
            aria-disabled={isPrevDisabled}
            aria-label="Go to previous page"
          />
        </PaginationItem>

        <div className="flex items-center">
          {pageNumbers.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem
                key={`ellipsis-${index}`}
                className="hidden sm:flex"
              >
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handleLinkClick(e, page as number)}
                  isActive={currentPage === page}
                  className={`h-9 w-9 p-0 ${
                    currentPage === page
                      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700"
                      : "hover:text-blue-700 dark:hover:text-blue-400"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>

        <div className="sm:hidden text-sm text-muted-foreground px-2">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Next Page Navigation */}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex h-9 w-9 p-0 border-blue-600/20 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isNextDisabled}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <PaginationNext
            className="sm:hidden hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
            onClick={(e) => handleLinkClick(e, currentPage + 1)}
            aria-disabled={isNextDisabled}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CountryPagination;
