/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchVector from "../Assets/Images/New_images/SearchVector.svg";

function SidebarQuickActions({ showMenuModal, setShowMenuModal, navigate, hostelId }) {
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    // { name: "Home", path: "/dashboard" },
    // { name: "Paying Guest", path: "/paying-guest" },
    { name: "Tenant", path: "/tenant" },
    { name: "Asset", path: "/asset" },
    { name: "Vendor", path: "/vendor" },
    { name: "Banking", path: "/banking" },
    { name: "Bills", path: "/invoice" },
    // { name: "Bookings", path: "/booking" },
    // { name: "Recurring Bills", path: "/recurring" },
    { name: "Receipt", path: "/receipts" },
    { name: "Electricity", path: "/electricity" },
    { name: "Complaint", path: "/compliance" },
    { name: "Expense", path: "/expense" },
    { name: "Reports", path: "/reports" },
  ];


  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuItemClick = (path) => {
    setShowMenuModal(false);
    navigate(hostelId ? `${path}/${hostelId}` : path);
  };

  return (

    <Offcanvas
      show={showMenuModal}
      onHide={() => {
        setShowMenuModal(false);
        setSearchQuery(""); 
      }}
      placement="end"
      backdrop="static"
      className="!w-[300px] !h-[600px] font-gilroy border-l border-gray-200 rounded-xl bg-white"
    >
      <Offcanvas.Header className="border-b border-gray-200 px-4 py-3 flex items-center gap-2.5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <img src={SearchVector} alt="search" className="w-4 h-4" />
          </span>

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 pt-2.5 border border-gray-200 rounded-lg text-[15px] outline-none"
          />
        </div>

        <span
          onClick={() => {
            setShowMenuModal(false);
            setSearchQuery(""); 
          }}
          className="text-lg text-red-500 cursor-pointer font-semibold"
        >
          ✕
        </span>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-2">
        <div className="flex flex-col">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
                role="button"
                className={`px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md cursor-pointer ${index === 0 ? "bg-indigo-50" : "bg-transparent"
                  } hover:bg-indigo-50`}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-5 text-sm">
              No items found
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>

  );
}

SidebarQuickActions.propTypes = {
  showMenuModal: PropTypes.bool.isRequired,
  setShowMenuModal: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  hostelId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default SidebarQuickActions;