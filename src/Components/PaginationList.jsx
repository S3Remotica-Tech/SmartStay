

// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// function PaginationList({
//   display,
//   onPageChange,
//   itemsPerPage = 10,
//   children,
// }) {
//   const totalItems = React.Children.count(children);
//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     if (currentPage > totalPages) setCurrentPage(totalPages);
//   }, [totalPages]);

//   const handleChangePage = (page) => {
//     const p = Math.max(1, Math.min(page, totalPages));
//     setCurrentPage(p);
//      onPageChange?.(p);
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

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedChildren = React.Children.toArray(children).slice(
//     startIndex,
//     endIndex
//   );

//   if (totalItems === 0) return null;

//   // console.log("display",display)

//   return (
//     <>



//       {paginatedChildren}


//       {totalPages > 1 && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: 0,
//             left: display ? "50%" : "30%",
//             width: "100%",
//             maxWidth: display ? "500px" : "700px",
//             background: "#FFFF",
//             padding: "0px 16px",
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "center",
//             gap: 24,
//             zIndex: 10,
//             fontFamily: "Gilroy",
//             // boxShadow: !display && "0 -4px 12px rgba(0, 0, 0, 0.05)",
//           }}
//         >

//           <div
//             style={{
//               fontSize: 16,
//               color: "#222222",
//               fontWeight: 500,
//               fontFamily: "Gilroy"
//             }}
//           >
//             Total Records :  {children?.length}
//           </div>



//           <div style={{
//             // position: "absolute",
//             // left: "50%",
//             // transform: "translateX(-50%)",
//           }}>
//             <ul
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "25px",
//                 listStyle: "none",
//                 margin: 0,
//                 padding: 0, fontFamily: "Gilroy"
//                 // justifyContent: "center"
//               }}
//             >

//               <li>
//                 <button
//                   onClick={() => handleChangePage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     fontFamily: "Gilroy",
//                     padding: "6px 14px",
//                     borderRadius: "8px",
//                     border: "1px solid #E5E7EB",
//                     backgroundColor: "#E5F0FF",
//                     color:
//                       currentPage === 1 ? "#111827" : "#1D4ED8",

//                     cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                     fontSize: 14,
//                     fontWeight: 600,
//                     opacity: currentPage === 1 ? "0.5" : "1",
//                   }}
//                 >
//                   ← Previous
//                 </button>
//               </li>


//               {getPages().map((page, index) => (
//                 <li key={index}>
//                   {page === "..." ? (
//                     <span
//                       style={{
//                         padding: "6px 10px",
//                         color: "#9CA3AF",
//                         fontSize: 14, fontFamily: "Gilroy"
//                       }}
//                     >
//                       …
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => handleChangePage(page)}
//                       style={{
//                         width: 32, fontFamily: "Gilroy",
//                         height: 32,
//                         borderRadius: "8px",
//                         border: "none",
//                         fontSize: 14,
//                         fontWeight: 600,
//                         cursor: "pointer",
//                         background:
//                           page === currentPage ? "#1E45E1" : "transparent",
//                         color:
//                           page === currentPage ? "#fff" : "#374151",
//                       }}
//                     >
//                       {page}
//                     </button>
//                   )}
//                 </li>
//               ))}


//               <li>
//                 <button
//                   onClick={() => handleChangePage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     fontFamily: "Gilroy",
//                     padding: "6px 14px",
//                     borderRadius: "8px",
//                     border: "1px solid #E5E7EB",
//                     backgroundColor: "#E5F0FF",
//                     color:
//                       currentPage === totalPages ? "#111827" : "#1D4ED8",
//                     cursor:
//                       currentPage === totalPages
//                         ? "not-allowed"
//                         : "pointer",
//                     fontSize: 14,
//                     fontWeight: 600, opacity: currentPage === totalPages ? "0.5" : "1",
//                   }}
//                 >
//                   Next →
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}

//     </>
//   );
// }

// PaginationList.propTypes = {
//   onPageChange: PropTypes.func,
//   itemsPerPage: PropTypes.number,
//   children: PropTypes.node,
//   display: PropTypes.bool
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedChildren = React.Children.toArray(children).slice(
    startIndex,
    endIndex
  );

  if (totalItems === 0) return null;

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
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            fontFamily: "Gilroy",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                fontSize: 16,
                color: "#222222",
                fontWeight: 500,
              }}
            >
              Total Records : {children?.length}
            </div>

            <div>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  // padding: "8px 12px",   
                  padding: "8px 8px", 
                   width: "80px",
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  cursor: "pointer",
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontFamily: "Gilroy",
            }}
          >
            <li>
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  color: "#111827",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontSize: 18,
                  fontWeight: 600,
                  opacity: currentPage === 1 ? "0.5" : "1",
                }}
              >
                &lt;
              </button>
            </li>

            {getPages().map((page, index) => (
              <li key={index}>
                {page === "..." ? (
                  <span
                    style={{
                      padding: "6px 10px",
                      color: "#9CA3AF",
                      fontSize: 14,
                    }}
                  >
                    …
                  </span>
                ) : (
                  <button
                    onClick={() => handleChangePage(page)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      border: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      background:
                        page === currentPage ? "#1E45E1" : "transparent",
                      color: page === currentPage ? "#fff" : "#374151",
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
                  padding: "6px 14px",
                  borderRadius: "8px",
                  // border: "1px solid #E5E7EB",
                  // backgroundColor: "#E5F0FF",
                  // color:
                  //   currentPage === totalPages ? "#111827" : "#1D4ED8",
                  color: "#111827",
                  cursor:
                    currentPage === totalPages
                      ? "not-allowed"
                      : "pointer",
                  fontSize: 18,
                  fontWeight: 600,
                  opacity: currentPage === totalPages ? "0.5" : "1",
                }}
              >
                &gt;
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

PaginationList.propTypes = {
  onPageChange: PropTypes.func,
  itemsPerPage: PropTypes.number,
  children: PropTypes.node,
  display: PropTypes.bool,
};

export default PaginationList;