type PaginationProps = {

  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;

};

 

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

  if (totalPages <= 1) {

    return null;

  }

 

  function goToPreviousPage() {

    if (currentPage > 1) {

      onPageChange(currentPage - 1);

    }

  }

 

  function goToNextPage() {

    if (currentPage < totalPages) {

      onPageChange(currentPage + 1);

    }

  }

 

  return (

    <div className="pagination">

      <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>

        ←

      </button>

 

      <span>

        Strana {currentPage} od {totalPages}

      </span>

 

      <button

        type="button"

        onClick={goToNextPage}

        disabled={currentPage === totalPages}

      >

        →

      </button>

    </div>

  );

}

 

export default Pagination;