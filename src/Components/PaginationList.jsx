
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import PropTypes from "prop-types";

function PaginationList({
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [
    // { value: , label: "5" },
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ],
  children,
}) {
  const totalItems = React.Children.count(children);

  const DEFAULT_PAGE = 1;
  const DEFAULT_ITEMS_PER_PAGE = 10;


  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages]);

  

  const handleChangePage = (pageNumber) => {
    const p = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(p);
    if (typeof onPageChange === "function") onPageChange(p);
  };

  const handleChangeItemsPerPage = (selectedOption) => {
    const value = Number(selectedOption?.value) || DEFAULT_ITEMS_PER_PAGE;
    setItemsPerPage(value);
    setCurrentPage(1);
    if (typeof onItemsPerPageChange === "function") onItemsPerPageChange(value);
    if (typeof onPageChange === "function") onPageChange(1);
  };


const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const paginatedChildren = React.Children.toArray(children).slice(
  startIndex,
  endIndex
);



if (totalItems === 0) return null; 



  return (
    <>
      {paginatedChildren}
      {totalItems > 9 && (

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          padding: "0px",
          borderRadius: "5px",
          position: "fixed",
          zIndex: 1000,
          width: "83%",
          bottom: 0,
          left: "17%",
          right: "16px",
          backgroundColor: "#fff",
        }}
      >
        <div>
          <Select
            options={pageSizeOptions}
            value={
              itemsPerPage
                ? { value: itemsPerPage, label: `${itemsPerPage} ` }
                : null
            }
            onChange={handleChangeItemsPerPage}
            placeholder="Rows per page"
            classNamePrefix="custom"
            menuPlacement="auto"
            noOptionsMessage={() => "No options"}
            styles={{
              control: (base) => ({
                ...base,
                height: "32px",
                minHeight: "32px",
                border: "1px solid #1E45E1",
                borderRadius: "5px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "Gilroy",
                boxShadow: "0 0 0 1px #1E45E1",
                cursor: "pointer",
                width: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 6px",
              }),
              valueContainer: (base) => ({
                ...base,
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }),
              singleValue: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }),
              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#f8f9fa",
                border: "1px solid #ced4da",
                fontFamily: "Gilroy",
              }),
              menuList: (base) => ({
                ...base,
                backgroundColor: "#f8f9fa",
                maxHeight: "200px",
                padding: 0,
                scrollbarWidth: "thin",
                overflowY: "auto",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#555",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#1E45E1",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              option: (base, state) => ({
                ...base,
                cursor: "pointer",
                backgroundColor: state.isFocused ? "#1E45E1" : "white",
                color: state.isFocused ? "#fff" : "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px 0",
              }),
            }}
          />
        </div>

        <ul
          className="selectoption"
          style={{
            display: "flex",
            alignItems: "center",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ margin: "0 10px" }}>
            <button
              style={{
                padding: "5px",
                color: currentPage === 1 ? "#ccc" : "#1E45E1",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                borderRadius: "50%",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft2
                size="16"
                color={currentPage === 1 ? "#ccc" : "#1E45E1"}
              />
            </button>
          </li>

          <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
            {currentPage} of {totalPages}
          </li>

          <li style={{ margin: "0 10px" }}>
            <button
              style={{
                padding: "5px",
                color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                borderRadius: "50%",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRight2
                size="16"
                color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
              />
            </button>
          </li>
        </ul>
      </nav>
      ) }
    </>
  );
}

PaginationList.propTypes = {
  onPageChange: PropTypes.func,
  onItemsPerPageChange: PropTypes.func,
  pageSizeOptions: PropTypes.array,
  children: PropTypes.node,
};

export default PaginationList;