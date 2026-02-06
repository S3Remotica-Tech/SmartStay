// new api pagination 
/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function ApiPagination({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
  onSizeChange,
}) {





  const sizeOptions = [
    { value: 1, label: "1" },
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];
  const [pageSize, setPageSize] = useState(sizeOptions[0]);

  const handleChangePage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    onPageChange(p - 1);
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
  onPageChange(0);

  if (typeof onSizeChange === "function") {
    onSizeChange(option?.value);
  }
};

  useEffect(() => {
    onSizeChange(pageSize?.value);
  }, []);







  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-1">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          Total Records :  <span className="text-[#1E45E1] font-semibold">{totalRecords}</span>
        </div>


       <div className="flex items-center gap-2">
<div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Size</span>
          <Select
            value={pageSize}
            options={sizeOptions}
            onChange={handleSizeChange}
            isSearchable={false}
            menuPlacement="top"
            className="w-24 text-sm"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "32px",
                height: "32px",
                borderColor: "#D1D5DB",
                boxShadow: "none",
                cursor: "pointer",
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 8px",
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: "32px",
              }),
              option: (base, state) => ({
                ...base,
                fontSize: "13px",
                cursor: "pointer",
                backgroundColor: state.isFocused ? "#E5F0FF" : "#fff",
                color: "#111827",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#555",
                cursor: "pointer"
              }),
              indicatorSeparator: () => ({
                display: "none",
              }), clearIndicator: () => ({
                display: "none",
              }),
            }}
          />
        </div>
         <ul className="flex items-center gap-2 m-0">
          
            <li>
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                  rounded-md  px-3 py-1.5 text-sm font-medium
                  ${
                    currentPage === 1
                      ? " text-gray-400 cursor-not-allowed opacity-50"
                      : " bg-white text-[#1E45E1] hover:bg-[#DCE9FF]"
                  }
                `}
              >
              <ArrowLeft2 size="18"/>
              </button>
            </li>

           
            {getPages().map((page, i) =>
              page === "..." ? (
                <li key={i} className="px-2 text-gray-400">
                  …
                </li>
              ) : (
                <li key={i}>
                  <button
                    onClick={() => handleChangePage(page)}
                    className={`h-8 w-8 rounded-md text-sm font-semibold
                      ${
                        page === currentPage
                          ? "bg-[#1E45E1] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {page}
                  </button>
                </li>
              )
            )}

           
           <li>
  <button
    onClick={() => handleChangePage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`
      rounded-md  px-3 py-1.5 text-sm font-medium
      ${
        currentPage === totalPages
          ? " text-[#9CA3AF] cursor-not-allowed opacity-50"
          : " text-[#1E45E1] bg-white hover:bg-[#E7F1FF]"
      }
    `}
  >
   <ArrowRight2 size="18" />
  </button>
</li>

          </ul>
       
        </div>
      </div>
    </div>
  );
}

export default ApiPagination;




