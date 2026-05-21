type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div className="flex justify-center items-center gap-1 sm:gap-2 mt-auto w-full flex-wrap">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 sm:px-4 text-xs sm:text-sm font-medium text-[#14213D] hover:text-[#FCAA31] transition mr-1 sm:mr-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev.
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-medium transition ${
              currentPage === page
                ? "bg-[#14213D] text-white shadow-sm"
                : "border-2 border-[#14213D] text-gray-600 hover:bg-[#14213D] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium text-[#14213D] hover:text-[#FCAA31] transition ml-1 sm:ml-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
