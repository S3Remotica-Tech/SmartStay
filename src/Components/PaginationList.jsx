/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// function PaginationList({
//   display,
//   onPageChange,
//   itemsPerPage = 10,
//   children,
// }) {
//   // const totalItems = React.Children.count(children);
//   const totalItems = children?.length || 0;
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


//   return (
//     <>



//       {paginatedChildren}


//       {totalPages > 1 && (
//         <div


//   style={{
//     position: "relative", 
//     width: "100%",
//     background: "#FFFF",
//     padding: "0px 16px",
//     display: "flex",
//     justifyContent: "flex-end", 
//     alignItems: "center",
//     gap: 24,
//     zIndex: 10,
//     fontFamily: "Gilroy",
//   }}

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



//           <div >
//             <ul
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "25px",
//                 listStyle: "none",
//                 margin: 0,
//                 padding: 0, fontFamily: "Gilroy"
//                 }}
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
//                   ← 
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
//                   →
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


// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { ArrowRight2, ArrowLeft2 } from "iconsax-react";

// function PaginationList({
//   totalItems = 0,
//   currentPage = 1,
//   itemsPerPage = 10,
//   onPageChange,
//   onPageSizeChange,
// }) {
//   const [options, setOptions] = useState([10, 20, 50]);

//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       onPageChange?.(totalPages);
//     }
//   }, [totalPages]);

//   const handleChangePage = (page) => {
//     const p = Math.max(1, Math.min(page, totalPages));
//     onPageChange?.(p);
//   };


//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1440) {
//         setOptions([20, 40, 60, 80]);
//       } else {
//         setOptions([10, 20, 50]);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (totalItems === 0) return null;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   return (
//     <div className="font-gilroy">
//       <div className="flex items-stretch border border-[#E5E7EB] rounded-md overflow-hidden">

//         <div className="bg-[#ebeef9] flex items-center px-3">
//           <select
//             value={itemsPerPage}
//             onChange={(e) => {
//               const newSize = Number(e.target.value);
//               onPageSizeChange?.(newSize);
//               onPageChange?.(1);
//             }}
//             className="bg-transparent outline-none text-sm cursor-pointer h-full"
//           >
//             {options.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt} / page
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center">

//           <button
//             onClick={() => handleChangePage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`w-7 h-7 flex items-center justify-center rounded-full
//     ${currentPage === totalPages
//                 ? "cursor-not-allowed"
//                 : "hover:bg-blue-100"}
//   `}
//           >
//             <ArrowLeft2 size="16" color="#1E45E1" />
//           </button>

//           <span className="text-sm text-[#374151] whitespace-nowrap px-2">
//             {startIndex + 1} – {Math.min(endIndex, totalItems)}
//           </span>

//           <button
//             onClick={() => handleChangePage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             // className="w-7 h-7 flex items-center justify-center hover:bg-blue-100 disabled:opacity-40"
//             className={`w-7 h-7 flex items-center justify-center rounded-full
//     ${currentPage === totalPages
//                 ? "cursor-not-allowed"
//                 : "hover:bg-blue-100"}
//   `}
//           >
//             <ArrowRight2 size="16" color="#1E45E1" />
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// PaginationList.propTypes = {
//   totalItems: PropTypes.number,
//   currentPage: PropTypes.number,
//   itemsPerPage: PropTypes.number,
//   onPageChange: PropTypes.func,
//   onPageSizeChange: PropTypes.func,
// };

// export default PaginationList;


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

  // const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
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
  const endIndex = startIndex + itemsPerPage;

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

        <div className="flex items-center">

          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-7 h-7 flex items-center justify-center rounded-full
              ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue-100"}`}
          >
            <ArrowLeft2 size="16" color="#1E45E1" />
          </button>

          <span className="text-sm text-[#374151] whitespace-nowrap px-2">
            {startIndex + 1} – {Math.min(endIndex, totalItems)}
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