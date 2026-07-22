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
  const [open, setOpen] = useState(false);

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

  const displayPage = isTenantPagination ? currentPage : currentPage + 1;

  const safePage = totalRecords === 0 ? 0 : displayPage;

  const startIndex = totalRecords === 0 ? 0 : (displayPage - 1) * size;
  const endIndex = totalRecords === 0 ? 0 : displayPage * size;
  const uiPage = isTenantPagination ? currentPage : currentPage + 1;

  return (
    <>
      <div className="font-gilroy">
        <div className="flex items-stretch border border-[#E5E7EB] rounded-md ">
          <Select
            menuPlacement="auto"
            menuPosition="absolute"
            value={sizeOptions
              .map((opt) => ({ value: opt, label: `${opt} / page` }))
              .find((o) => o.value === size)}
            onChange={(selected) => {
              const newSize = selected.value;
              onSizeChange?.(newSize);
              onPageChange?.(1);
            }}
            options={sizeOptions.map((opt) => ({
              value: opt,
              label: `${opt} / page`,
            }))}
            isSearchable={false}
            className="w-full text-sm"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#ebeef9",
                border: "none",
                boxShadow: "none",
                minHeight: "100%",
                cursor: "pointer",
                paddingLeft: "20px",
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0px",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: "4px",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              menu: (base) => ({
                ...base,
                left: 0,
                // width: "150px",
                marginTop: 4,
                zIndex: 9999,
              }),
              option: (base, state) => ({
                ...base,
                fontSize: "14px",
                backgroundColor: state.isSelected
                  ? "#E0E7FF"
                  : state.isFocused
                    ? "#F3F4F6"
                    : "#fff",
                color: "#111827",
                cursor: "pointer",
              }),
            }}
          />

          <div className="flex items-center px-2 py-0.5">
            <button
              onClick={() => handleChangePage(uiPage - 1)}
              disabled={uiPage === 1}
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
                ? "0-0"
                : `${uiPage} - ${Math.min(size, totalRecords - startIndex)}`}
            </span>
            <button
              onClick={() => handleChangePage(uiPage + 1)}
              disabled={uiPage === totalPages || totalPages === 0}
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
