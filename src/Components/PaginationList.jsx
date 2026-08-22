/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowRight2, ArrowLeft2 } from "iconsax-react";

function PaginationList({
  totalItems = 0,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
  onPageSizeChange,
}) {
  const [options, setOptions] = useState([10, 20, 50]);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange?.(totalPages);
    }
  }, [totalPages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setOptions([20, 40, 60, 80]);
      } else {
        setOptions([10, 20, 50]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChangePage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    onPageChange?.(p);
  };

  const minItemsToShowPagination = 10;
  if (totalItems <= minItemsToShowPagination) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  return (
    <div className="font-gilroy">
      <div className="flex items-stretch border border-[#E5E7EB] rounded-md overflow-hidden">
        <div className="bg-[#ebeef9] flex items-center px-3">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              onPageSizeChange?.(newSize);
              onPageChange?.(1);
            }}
            className="bg-transparent outline-none text-sm cursor-pointer h-full"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center ">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-7 h-7 flex items-center justify-center rounded-full
              ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue-100"}`}
          >
            <ArrowLeft2 size="16" color="#1E45E1" />
          </button>
          <span className="text-sm text-[#374151] whitespace-nowrap px-2">
            {totalItems === 0
              ? "0-0"
              : `${currentPage} - ${Math.min(
                  itemsPerPage,
                  totalItems - startIndex,
                )}`}
          </span>

          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-7 h-7 flex items-center justify-center rounded-full
              ${currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-blue-100"}`}
          >
            <ArrowRight2 size="16" color="#1E45E1" />
          </button>
        </div>
      </div>
    </div>
  );
}

PaginationList.propTypes = {
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

export default PaginationList;
