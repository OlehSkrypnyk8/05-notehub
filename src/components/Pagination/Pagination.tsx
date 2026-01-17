import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  readonly totalPages: number;
  readonly onPageChange: (selectedPage: number) => void;
}

function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
export default Pagination;
