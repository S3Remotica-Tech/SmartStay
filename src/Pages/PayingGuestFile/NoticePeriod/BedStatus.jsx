// /* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";
// import { Dropdown } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FiCalendar, FiRepeat, FiLogOut } from "react-icons/fi";

// const CustomToggle = React.forwardRef(({ onClick }, ref) => (
//     <div
//         ref={ref}
//         onClick={(e) => {
//             e.preventDefault();
//             onClick(e);
//         }}
//         className="rounded-circle d-flex align-items-center justify-content-center"
//         style={{
//             width: "30px",
//             height: "30px",
//             backgroundColor: "#F5F5F5",
//             cursor: "pointer",
//         }}
//     >
//         <BsThreeDotsVertical size={16} />
//     </div>
// ));

// const BedStatusCard = () => {
//     return (
//         <div
//             className="card shadow-sm rounded-4 p-4"
//             style={{ width: "320px", border: "1px solid #eee" }}
//         >
//             <div className="d-flex justify-content-between align-items-start pb-2 mb-2 border-bottom">
//                 <div >
//                     <p className="fw-semibold mb-1" style={{ fontSize: "15px" }}>
//                         Bed Status
//                     </p>
//                     <span className="text-primary" style={{ fontSize: "13px" }}>
//                         Room No G3 &nbsp; | &nbsp; Bed 9
//                     </span>
//                 </div>


//                 <Dropdown align="end">
//                     <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />
//                     <Dropdown.Menu>
//                         <Dropdown.Item className="d-flex align-items-center gap-2" style={{ fontSize: "13px" }}>
//                             <FiRepeat size={16} color="#1E45E1" /> Re Check-in Bed
//                         </Dropdown.Item>

//                         <Dropdown.Item className="d-flex align-items-center gap-2" style={{ fontSize: "13px" }}>
//                             <FiCalendar size={16} color="#1E45E1" /> New Booking
//                         </Dropdown.Item>

//                         <Dropdown.Item className="d-flex align-items-center gap-2" style={{ fontSize: "13px", color: "#D11A2A" }}>
//                             <FiLogOut size={16} color="#D11A2A" /> Checkout
//                         </Dropdown.Item>
//                     </Dropdown.Menu>
//                 </Dropdown>

//             </div>

//             <div className="mt-3">
//                 <p className="mb-1 fw-medium" style={{ fontSize: "13px" }}>
//                     Occupied by
//                 </p>
//                 <div className="d-flex align-items-center gap-3">
//                     <img
//                         src="https://randomuser.me/api/portraits/men/32.jpg"
//                         alt="Profile"
//                         className="rounded-circle"
//                         width="35"
//                         height="35"
//                     />
//                     <p
//                         className="mb-0 fw-semibold text-primary"
//                         style={{
//                             fontSize: "14px",
//                             textDecoration: "underline",
//                             cursor: "pointer",
//                         }}
//                     >
//                         Rajesh
//                     </p>
//                 </div>
//             </div>


//             <div
//                 className="mt-3 text-center fw-medium"
//                 style={{
//                     color: "red",
//                     border: "1px solid red",
//                     borderRadius: "30px",
//                     padding: "4px 12px",
//                     fontSize: "13px",
//                 }}
//             >
//                 Notice Period
//             </div>
//         </div>
//     );
// };

// BedStatusCard.propTypes = {
//     onClick: PropTypes.func.isRequired,
// };
// export default BedStatusCard;



/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiCalendar, FiRepeat, FiLogOut } from "react-icons/fi";

// ✅ Added display name
const CustomToggle = React.forwardRef(function CustomToggle({ onClick }, ref) {
    return (
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#F5F5F5",
                cursor: "pointer",
            }}
        >
            <BsThreeDotsVertical size={16} />
        </div>
    );
});

CustomToggle.propTypes = {
    onClick: PropTypes.func.isRequired, // ✅ prop validation for CustomToggle
};

const BedStatusCard = () => {
    return (
        <div
            className="card shadow-sm rounded-4 p-4"
            style={{ width: "320px", border: "1px solid #eee" }}
        >
            <div className="d-flex justify-content-between align-items-start pb-2 mb-2 border-bottom">
                <div>
                    <p className="fw-semibold mb-1" style={{ fontSize: "15px" }}>
                        Bed Status
                    </p>
                    <span className="text-primary" style={{ fontSize: "13px" }}>
                        Room No G3 &nbsp; | &nbsp; Bed 9
                    </span>
                </div>

                <Dropdown align="end">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />
                    <Dropdown.Menu>
                        <Dropdown.Item
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: "13px" }}
                        >
                            <FiRepeat size={16} color="#1E45E1" /> Re Check-in Bed
                        </Dropdown.Item>

                        <Dropdown.Item
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: "13px" }}
                        >
                            <FiCalendar size={16} color="#1E45E1" /> New Booking
                        </Dropdown.Item>

                        <Dropdown.Item
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: "13px", color: "#D11A2A" }}
                        >
                            <FiLogOut size={16} color="#D11A2A" /> Checkout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="mt-3">
                <p className="mb-1 fw-medium" style={{ fontSize: "13px" }}>
                    Occupied by
                </p>
                <div className="d-flex align-items-center gap-3">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Profile"
                        className="rounded-circle"
                        width="35"
                        height="35"
                    />
                    <p
                        className="mb-0 fw-semibold text-primary"
                        style={{
                            fontSize: "14px",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        Rajesh
                    </p>
                </div>
            </div>

            <div
                className="mt-3 text-center fw-medium"
                style={{
                    color: "red",
                    border: "1px solid red",
                    borderRadius: "30px",
                    padding: "4px 12px",
                    fontSize: "13px",
                }}
            >
                Notice Period
            </div>
        </div>
    );
};

export default BedStatusCard;
