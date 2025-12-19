
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
// import PropTypes from "prop-types";

// function PaginationList({
//   onPageChange,
//   onItemsPerPageChange,
//   pageSizeOptions = [
//     // { value: , label: "5" },
//     { value: 10, label: "10" },
//     { value: 50, label: "50" },
//     { value: 100, label: "100" },
//   ],
//   children,
// }) {
//   const totalItems = React.Children.count(children);

//   const DEFAULT_PAGE = 1;
//   const DEFAULT_ITEMS_PER_PAGE = 10;


//   const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
//   const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);


//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

//   useEffect(() => {
//     if (currentPage > totalPages) setCurrentPage(totalPages);
//     if (currentPage < 1) setCurrentPage(1);
//   }, [totalPages]);



//   const handleChangePage = (pageNumber) => {
//     const p = Math.max(1, Math.min(pageNumber, totalPages));
//     setCurrentPage(p);
//     if (typeof onPageChange === "function") onPageChange(p);
//   };

//   const handleChangeItemsPerPage = (selectedOption) => {
//     const value = Number(selectedOption?.value) || DEFAULT_ITEMS_PER_PAGE;
//     setItemsPerPage(value);
//     setCurrentPage(1);
//     if (typeof onItemsPerPageChange === "function") onItemsPerPageChange(value);
//     if (typeof onPageChange === "function") onPageChange(1);
//   };


// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

// const paginatedChildren = React.Children.toArray(children).slice(
//   startIndex,
//   endIndex
// );



// if (totalItems === 0) return null; 



//   return (
//     <>
//       {paginatedChildren}
//       {totalItems > 9 && (

//       <nav
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "end",
//           padding: "0px",
//           borderRadius: "5px",
//           position: "fixed",
//           zIndex: 1000,
//           width: "83%",
//           bottom: 0,
//           left: "17%",
//           right: "16px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <div>
//           <Select
//             options={pageSizeOptions}
//             value={
//               itemsPerPage
//                 ? { value: itemsPerPage, label: `${itemsPerPage} ` }
//                 : null
//             }
//             onChange={handleChangeItemsPerPage}
//             placeholder="Rows per page"
//             classNamePrefix="custom"
//             menuPlacement="auto"
//             noOptionsMessage={() => "No options"}
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 height: "32px",
//                 minHeight: "32px",
//                 border: "1px solid #1E45E1",
//                 borderRadius: "5px",
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 fontFamily: "Gilroy",
//                 boxShadow: "0 0 0 1px #1E45E1",
//                 cursor: "pointer",
//                 width: 80,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "0 6px",
//               }),
//               valueContainer: (base) => ({
//                 ...base,
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 padding: 0,
//               }),
//               singleValue: (base) => ({
//                 ...base,
//                 margin: 0,
//                 padding: 0,
//                 lineHeight: "normal",
//                 display: "flex",
//                 alignItems: "center",
//               }),
//               input: (base) => ({
//                 ...base,
//                 margin: 0,
//                 padding: 0,
//               }),
//               menu: (base) => ({
//                 ...base,
//                 backgroundColor: "#f8f9fa",
//                 border: "1px solid #ced4da",
//                 fontFamily: "Gilroy",
//               }),
//               menuList: (base) => ({
//                 ...base,
//                 backgroundColor: "#f8f9fa",
//                 maxHeight: "200px",
//                 padding: 0,
//                 scrollbarWidth: "thin",
//                 overflowY: "auto",
//               }),
//               placeholder: (base) => ({
//                 ...base,
//                 color: "#555",
//               }),
//               dropdownIndicator: (base) => ({
//                 ...base,
//                 color: "#1E45E1",
//                 cursor: "pointer",
//                 padding: 0,
//                 display: "flex",
//                 alignItems: "center",
//               }),
//               indicatorSeparator: () => ({
//                 display: "none",
//               }),
//               option: (base, state) => ({
//                 ...base,
//                 cursor: "pointer",
//                 backgroundColor: state.isFocused ? "#1E45E1" : "white",
//                 color: state.isFocused ? "#fff" : "#000",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: "6px 0",
//               }),
//             }}
//           />
//         </div>

//         <ul
//           className="selectoption"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             listStyleType: "none",
//             margin: 0,
//             padding: 0,
//           }}
//         >
//           <li style={{ margin: "0 10px" }}>
//             <button
//               style={{
//                 padding: "5px",
//                 color: currentPage === 1 ? "#ccc" : "#1E45E1",
//                 cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                 borderRadius: "50%",
//                 minWidth: "30px",
//                 textAlign: "center",
//                 backgroundColor: "transparent",
//                 border: "none",
//               }}
//               onClick={() => handleChangePage(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               <ArrowLeft2
//                 size="16"
//                 color={currentPage === 1 ? "#ccc" : "#1E45E1"}
//               />
//             </button>
//           </li>

//           <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
//             {currentPage} of {totalPages}
//           </li>

//           <li style={{ margin: "0 10px" }}>
//             <button
//               style={{
//                 padding: "5px",
//                 color: currentPage === totalPages ? "#ccc" : "#1E45E1",
//                 cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//                 borderRadius: "50%",
//                 minWidth: "30px",
//                 textAlign: "center",
//                 backgroundColor: "transparent",
//                 border: "none",
//               }}
//               onClick={() => handleChangePage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               <ArrowRight2
//                 size="16"
//                 color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
//               />
//             </button>
//           </li>
//         </ul>
//       </nav>
//       ) }
//     </>
//   );
// }

// PaginationList.propTypes = {
//   onPageChange: PropTypes.func,
//   onItemsPerPageChange: PropTypes.func,
//   pageSizeOptions: PropTypes.array,
//   children: PropTypes.node,
// };

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
    onPageChange && onPageChange(p);
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

  console.log("display",display)

  return (
    <>
      {paginatedChildren}

      {totalPages > 1 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: !display && 0,
             width: display ?  "60%" : "100%",
            background: "#FFFFFF",
            padding: "0px 16px",
            display: "flex",
            justifyContent: "center",
            // borderTop: "1px solid #121a2bff",
            zIndex: 1000,
            boxShadow: !display && "0 -4px 12px rgba(0, 0, 0, 0.05)",
            // marginLeft: 150,
            gap: 25,
            alignItems: "center",
            fontFamily:"Gilroy"
          }}
        >

          <div
            style={{
              fontSize: 16,
              color: "#222222",
              fontWeight: 500,
              fontFamily:"Gilroy"
            }}
          >
            Total Records : 
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
                padding: 0,fontFamily:"Gilroy"
                // justifyContent: "center"
              }}
            >

              <li>
                <button
                  onClick={() => handleChangePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{fontFamily:"Gilroy",
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
                        fontSize: 14,fontFamily:"Gilroy" 
                      }}
                    >
                      …
                    </span>
                  ) : (
                    <button
                      onClick={() => handleChangePage(page)}
                      style={{
                        width: 32,fontFamily:"Gilroy",
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
                  style={{fontFamily:"Gilroy",
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
};

export default PaginationList;
