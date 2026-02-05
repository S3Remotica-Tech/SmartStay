
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import Select from "react-select";

// function PaginationList({
//   currentPage,
//   totalPages,
//   totalRecords,
//   onPageChange,
//   onSizeChange,
// }) {





//   const sizeOptions = [
//     { value: 10, label: "10" },
//     { value: 25, label: "25" },
//     { value: 50, label: "50" },
//     { value: 100, label: "100" },
//   ];
//   const [pageSize, setPageSize] = useState(sizeOptions[0]);

//   const handleChangePage = (page) => {
//     const p = Math.max(1, Math.min(page, totalPages));
//     onPageChange(p - 1);
//   };

//   const getPages = () => {
//     const pages = [];
//     const delta = 1;

//     pages.push(1);

//     if (currentPage - delta > 2) pages.push("...");

//     for (
//       let i = Math.max(2, currentPage - delta);
//       i <= Math.min(totalPages - 1, currentPage + delta);
//       i++
//     ) {
//       pages.push(i);
//     }

//     if (currentPage + delta < totalPages - 1) pages.push("...");

//     if (totalPages > 1) pages.push(totalPages);

//     return pages;
//   };
//   const handleSizeChange = (option) => {
//     setPageSize(option);
//     onPageChange(0);
//     onSizeChange(option.value);
//   };
//   useEffect(() => {
//     onSizeChange(pageSize.value);
//   }, []);







//   return (
//     <div className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-1 shadow">
//       <div className="flex items-center justify-between">


//         <div className="text-sm font-medium text-gray-700">
//           Total Records : {totalRecords}
//         </div>


//        <div className="flex items-center gap-2">
// <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600">Size</span>
//           <Select
//             value={pageSize}
//             options={sizeOptions}
//             onChange={handleSizeChange}
//             isSearchable={false}
//             menuPlacement="top"
//             className="w-24 text-sm"
//             classNamePrefix="react-select"
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 minHeight: "32px",
//                 height: "32px",
//                 borderColor: "#D1D5DB",
//                 boxShadow: "none",
//                 cursor: "pointer",
//               }),
//               valueContainer: (base) => ({
//                 ...base,
//                 padding: "0 8px",
//               }),
//               indicatorsContainer: (base) => ({
//                 ...base,
//                 height: "32px",
//               }),
//               option: (base, state) => ({
//                 ...base,
//                 fontSize: "13px",
//                 cursor: "pointer",
//                 backgroundColor: state.isFocused ? "#E5F0FF" : "#fff",
//                 color: "#111827",
//               }),
//               dropdownIndicator: (base) => ({
//                 ...base,
//                 color: "#555",
//                 cursor: "pointer"
//               }),
//               indicatorSeparator: () => ({
//                 display: "none",
//               }), clearIndicator: () => ({
//                 display: "none",
//               }),
//             }}
//           />
//         </div>
//         <ul className="flex items-center gap-2 m-0">
 

//           <li>
//             <button
//               onClick={() => handleChangePage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium
//                          disabled:cursor-not-allowed disabled:opacity-50
//                          hover:bg-gray-100"
//             >
//               ← Prev
//             </button>
//           </li>

//           {getPages().map((page, i) =>
//             page === "..." ? (
//               <li key={i} className="px-2 text-gray-400">
//                 …
//               </li>
//             ) : (
//               <li key={i}>
//                 <button
//                   onClick={() => handleChangePage(page)}
//                   className={`h-8 w-8 rounded-md text-sm font-semibold
//                     ${page === currentPage
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                 >
//                   {page}
//                 </button>
//               </li>
//             )
//           )}


//           <li>
//             <button
//               onClick={() => handleChangePage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium
//                          disabled:cursor-not-allowed disabled:opacity-50
//                          hover:bg-gray-100"
//             >
//               Next →
//             </button>
//           </li>
//         </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaginationList;



































































/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function PaginationList({
  display,
  onPageChange,
  itemsPerPage = 10,
  children,
}) {
  const totalItems = React.Children.count(children);
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  const handleChangePage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
     onPageChange?.(p);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedChildren = React.Children.toArray(children).slice(
    startIndex,
    endIndex
  );

  if (totalItems === 0) return null;

  // console.log("display",display)

  return (
    <>



      {paginatedChildren}


      {totalPages > 1 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: display ? "50%" : "30%",
            width: "100%",
            maxWidth: display ? "500px" : "700px",
            background: "#FFFF",
            padding: "0px 16px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 24,
            zIndex: 10,
            fontFamily: "Gilroy",
            // boxShadow: !display && "0 -4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >

          <div
            style={{
              fontSize: 16,
              color: "#222222",
              fontWeight: 500,
              fontFamily: "Gilroy"
            }}
          >
            Total Records :  {children?.length}
          </div>



          <div style={{
            // position: "absolute",
            // left: "50%",
            // transform: "translateX(-50%)",
          }}>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                listStyle: "none",
                margin: 0,
                padding: 0, fontFamily: "Gilroy"
                // justifyContent: "center"
              }}
            >

              <li>
                <button
                  onClick={() => handleChangePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    fontFamily: "Gilroy",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#E5F0FF",
                    color:
                      currentPage === 1 ? "#111827" : "#1D4ED8",

                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    opacity: currentPage === 1 ? "0.5" : "1",
                  }}
                >
                  ← Previous
                </button>
              </li>


              {getPages().map((page, index) => (
                <li key={index}>
                  {page === "..." ? (
                    <span
                      style={{
                        padding: "6px 10px",
                        color: "#9CA3AF",
                        fontSize: 14, fontFamily: "Gilroy"
                      }}
                    >
                      …
                    </span>
                  ) : (
                    <button
                      onClick={() => handleChangePage(page)}
                      style={{
                        width: 32, fontFamily: "Gilroy",
                        height: 32,
                        borderRadius: "8px",
                        border: "none",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        background:
                          page === currentPage ? "#1E45E1" : "transparent",
                        color:
                          page === currentPage ? "#fff" : "#374151",
                      }}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}


              <li>
                <button
                  onClick={() => handleChangePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    fontFamily: "Gilroy",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#E5F0FF",
                    color:
                      currentPage === totalPages ? "#111827" : "#1D4ED8",
                    cursor:
                      currentPage === totalPages
                        ? "not-allowed"
                        : "pointer",
                    fontSize: 14,
                    fontWeight: 600, opacity: currentPage === totalPages ? "0.5" : "1",
                  }}
                >
                  Next →
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

    </>
  );
}

PaginationList.propTypes = {
  onPageChange: PropTypes.func,
  itemsPerPage: PropTypes.number,
  children: PropTypes.node,
  display: PropTypes.bool
};

export default PaginationList;
