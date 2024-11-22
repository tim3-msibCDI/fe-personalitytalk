const Pagination = ({ currentPage, totalPages, onPageChange, nextPageUrl, prevPageUrl }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex items-center justify-center mt-4 space-x-2 text-m py-5">
        {/* Tombol Previous */}
        <button
          onClick={() => prevPageUrl && onPageChange(currentPage - 1)}
          disabled={!prevPageUrl}
          className={`w-8 h-8 rounded ${
            !prevPageUrl
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
          onClick={() => nextPageUrl && onPageChange(currentPage + 1)}
          disabled={!nextPageUrl}
          className={`w-8 h-8 rounded ${
            !nextPageUrl
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
  