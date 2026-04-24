// new api pagination
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";

function ApiPagination({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
  onSizeChange,
  isTenantPagination,
  size,
}) {
  const sizeOptions = [10, 20, 50, 100];
  const [pageSize, setPageSize] = useState(sizeOptions[0]);

  const handleChangePage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    if (isTenantPagination) {
      onPageChange(p);
    } else {
      onPageChange(p - 1);
    }
  };

  const getPages = () => {
    const pages = [];
    const delta = 1;

    pages.push(1);

    if (currentPage - delta > 2) pages.push("...");

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + delta < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handleSizeChange = (option) => {
    setPageSize(option);
    onPageChange(1);

    if (typeof onSizeChange === "function") {
      onSizeChange(option?.value);
    }
  };

  const selectedSizeOption =
    sizeOptions.find((opt) => opt.value === size) || sizeOptions[0];

  const startIndex = (currentPage - 1) * size;
  const endIndex = currentPage * size;

  return (
    <>
      <div className="font-gilroy">
        <div className="flex items-stretch border border-[#E5E7EB] rounded-md overflow-hidden">
          <div className="bg-[#ebeef9] flex items-center px-3">
            <select
              value={size}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                onSizeChange?.(newSize);
                onPageChange?.(1);
              }}
              className="bg-transparent outline-none text-sm cursor-pointer h-full"
            >
              {sizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / page
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center px-2">
            <button
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-7 h-7 flex items-center justify-center rounded-full
              ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-100"
              }`}
            >
              <ArrowLeft2 size="16" color="#1E45E1" />
            </button>

            <span className="text-sm text-[#374151] whitespace-nowrap px-2">
              {totalRecords === 0
                ? "0"
                : `${startIndex + 1} – ${Math.min(endIndex, totalRecords)}`}
            </span>

            <button
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`w-7 h-7 flex items-center justify-center rounded-full
              ${
                currentPage === totalPages || totalPages === 0
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-100"
              }`}
            >
              <ArrowRight2 size="16" color="#1E45E1" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
ApiPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func,
  size: PropTypes.number,
  isTenantPagination: PropTypes.bool,
};
export default ApiPagination;
