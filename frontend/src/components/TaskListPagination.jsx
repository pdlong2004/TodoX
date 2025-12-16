import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

const TaskListPagination = ({
  handleChangePage,
  handleNextPage,
  handlePrevPage,
  page,
  totalPage,
}) => {
  const generatePages = () => {
    const pages = []

    if (totalPage <= 4) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPage)
      } else if (page >= totalPage - 1) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage)
      } else {
        pages.push(1, "...", page, "...", totalPage)
      }
    }

    return pages
  }

  const pagesToShow = generatePages()

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrevPage}
              className={cn(
                "cursor-pointer",
                page === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {/* Page numbers */}
          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => p !== page && handleChangePage(p)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPage ? undefined : handleNextPage}
              className={cn(
                "cursor-pointer",
                page === totalPage && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TaskListPagination
