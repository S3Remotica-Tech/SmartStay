// /* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";
// import { Dropdown } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FiCalendar, FiRepeat } from "react-icons/fi";




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

// const OccupiedBedStatus = () => {
//     return (
//         <div
//             className="card shadow-sm rounded-4 p-4"
//             style={{ width: "400px", border: "1px solid #eee" }}
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
//                             <FiRepeat size={16} color="#1E45E1" />
//                             Re-Assign Bed
//                         </Dropdown.Item>

//                         <Dropdown.Item className="d-flex align-items-center gap-2" style={{ fontSize: "13px" }}>
//                             <FiCalendar size={16} color="#1E45E1" /> Move to Notice Period
//                         </Dropdown.Item>


//                     </Dropdown.Menu>
//                 </Dropdown>

//             </div>

//             <div className="d-flex align-items-center gap-3">
//                 <img
//                     src="https://randomuser.me/api/portraits/men/32.jpg"
//                     alt="Profile"
//                     className="rounded-circle"
//                     width="35"
//                     height="35"
//                 />
//                 <div>
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
//                     <p className="mb-0" style={{ fontSize: "13px", color: "#222" }}>
//                         +91 98765 43210
//                     </p>
//                 </div>
//             </div>



//             <div
//                 className="mt-3 text-center fw-medium"
//                 style={{
//                     color: "#00A32E",
//                     border: "1px solid #00A32E",
//                     borderRadius: "30px",
//                     padding: "4px 12px",
//                     fontSize: "13px",
//                 }}
//             >
//                 Occupied
//             </div>
//         </div>
//     );
// };
// OccupiedBedStatus.propTypes = {
//     onClick: PropTypes.func.isRequired,
// };
// export default OccupiedBedStatus;


/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiCalendar, FiRepeat } from "react-icons/fi";

// ✅ Named function to avoid display-name error
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

// ✅ Proper prop validation for CustomToggle
CustomToggle.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const OccupiedBedStatus = () => {
    return (
        <div
            className="card shadow-sm rounded-4 p-4"
            style={{ width: "400px", border: "1px solid #eee" }}
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
                            <FiRepeat size={16} color="#1E45E1" />
                            Re-Assign Bed
                        </Dropdown.Item>

                        <Dropdown.Item
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: "13px" }}
                        >
                            <FiCalendar size={16} color="#1E45E1" /> Move to Notice Period
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="d-flex align-items-center gap-3">
                <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Profile"
                    className="rounded-circle"
                    width="35"
                    height="35"
                />
                <div>
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
                    <p className="mb-0" style={{ fontSize: "13px", color: "#222" }}>
                        +91 98765 43210
                    </p>
                </div>
            </div>

            <div
                className="mt-3 text-center fw-medium"
                style={{
                    color: "#00A32E",
                    border: "1px solid #00A32E",
                    borderRadius: "30px",
                    padding: "4px 12px",
                    fontSize: "13px",
                }}
            >
                Occupied
            </div>
        </div>
    );
};

export default OccupiedBedStatus;
