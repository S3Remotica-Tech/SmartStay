import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchVector from "../Assets/Images/New_images/SearchVector.svg";

function SidebarQuickActions({ showMenuModal, setShowMenuModal, navigate, hostelId }) {
  const [searchQuery, setSearchQuery] = useState("");

 const menuItems = [
  { name: "Home", path: "/dashboard" },
  { name: "Paying Guest", path: "/paying-guest" },
  { name: "Tenant", path: "/tenant" },
  { name: "Asset", path: "/asset" },
  { name: "Vendor", path: "/vendor" },
  { name: "Banking", path: "/banking" },
  { name: "Bills", path: "/bills" },
  { name: "Bookings", path: "/bookings" },
  { name: "Recurring Bills", path: "/recurring-bills" },
  { name: "Receipt", path: "/receipt" },
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
  onHide={() => setShowMenuModal(false)}
  placement="end"
  backdrop="static"
  style={{
    width: 300,
    fontFamily: "Gilroy",
    borderLeft: "1px solid #E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  }}
>
 

  <Offcanvas.Header
  style={{
    borderBottom: "1px solid #E5E7EB",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  }}
>

  <div
    style={{
      position: "relative",
      flex: 1,
    }}
  >
  
    <span
      style={{
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: 14,
        color: "#9CA3AF",
        pointerEvents: "none",
      }}
    >
      <img src={SearchVector}style={{ width: 16, height: 16 }} />
    </span>

    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 12px 8px 34px", 
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        fontSize: 15,
        outline: "none",
        paddingTop: "10px"
      }}
    />
  </div>

  {/* Close Icon - outside right */}
  <span
    onClick={() => setShowMenuModal(false)}
    style={{
      fontSize: 18,
      color: "#EF4444", // red
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    ✕
  </span>
</Offcanvas.Header>


  {/* Body */}
  <Offcanvas.Body style={{ padding: "8px 8px" }}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuItemClick(item.path)}
            role="button"
            style={{
              padding: "10px 12px",
              fontSize: 14,
              fontWeight: 500,
              color: "#111827",
              borderRadius: 6,
              cursor: "pointer",
              backgroundColor: index === 0 ? "#EEF2FF" : "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#EEF2FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                index === 0 ? "#EEF2FF" : "transparent";
            }}
          >
            {item.name}
          </div>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#9CA3AF",
            padding: "20px 0",
            fontSize: 14,
          }}
        >
          No items found
        </div>
      )}
    </div>
  </Offcanvas.Body>
</Offcanvas>

  );
}

export default SidebarQuickActions;
