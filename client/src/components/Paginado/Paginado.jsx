function Paginado({
  currentPage,
  setCurrentPage,
  totalPages,
  handlePageClick,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  function handleClickPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleClickNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      <div>
        <button onClick={handleClickPrevPage} disabled={currentPage === 1}>
          &lt; Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            id={number}
            onClick={handlePageClick}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleClickNextPage}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
export default Paginado;