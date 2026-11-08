import type { ComponentType } from "react";
import css from "./Pagination.module.css";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

function Pagination({ totalPage, currentPage, onPageChange }: PaginationProps) {
  return (
    <>
      <ReactPaginate
        pageCount={totalPage}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
}

export default Pagination;
