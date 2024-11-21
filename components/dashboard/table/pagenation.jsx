const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex items-center justify-center mt-4 space-x-2 text-m py-5">
        {/* Tombol Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded ${
            currentPage === 1
              ? "bg-orange-200 text-orange-400"
              : "bg-primary text-white hover:bg-orange-600"
          }`}
        >
          &#x25C0;
        </button>
  
        {/* Nomor Halaman */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-white text-orange-500 border border-primary hover:bg-orange-100"
            }`}
          >
            {page}
          </button>
        ))}
  
        {/* Tombol Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 rounded ${
            currentPage === totalPages
              ? "bg-orange-200 text-orange-400"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          &#x25B6;
        </button>
      </div>
    );
  };
  
  export default Pagination;