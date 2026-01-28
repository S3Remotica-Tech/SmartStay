/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
// import { FaCheck } from "react-icons/fa";
// import { useSelector } from 'react-redux';
import { useHasPermission } from '../../Utils/Permission';



const RecurringBillList = (props) => {
  // const state = useSelector((state) => state);
  // const [recurringBillDeletePermission, setRecurringBillDeletePermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)
  // const dispatch = useDispatch()

  const handleDeleteForm = () => {
    setDeleteShow(true)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }






  // useEffect(() => {
  //   const userType = props.billrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setRecurringBillDeletePermission("Permission Denied");
  //     } else if (state?.login?.planStatus === 1) {
  //       setRecurringBillDeletePermission("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state.login?.selectedHostel_Id, props.billrolePermission])



  // useEffect(() => {
  //   const billPermission = props.billrolePermission[0]?.role_permissions?.find(
  //     (perm) => perm.permission_name === "Recuring Bills"
  //   );

  //   const isOwner = props.billrolePermission[0]?.user_details?.user_type === "staff";
  //   const planActive = state?.login?.planStatus === 1;

  //   if (!billPermission || !isOwner) return;

  //   if (billPermission.per_delete === 1 && planActive) {
  //     setRecurringBillDeletePermission("");
  //   } else {
  //     setRecurringBillDeletePermission("Permission Denied");
  //   }
  // }, [props.billrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);



  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }


  const handleDelete = () => {

    props.handleDeleteRecurringbills(props.item);

  }






  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const {
    canDeleteModule: canDeleteRecurring,
    canUpdateModule: canUpdateRecurring
  } = useHasPermission("Recurring bills");


  
  return (

    <>

      <tr key={props.item.customerId}
        style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


        <td className="table-cells" style={{ border: "none", flexWrap: "wrap", textAlign: "center", whiteSpace: "nowrap", borderBottom: "1px solid #E8E8E8" }}>
          <div className="d-flex  align-items-center">

            <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '13px',  fontStyle: 'normal', lineHeight: 'normal', fontWeight: 500, cursor: "pointer" }}

            >{props.item?.fullName}</div><br />

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="">
          {props?.item?.lastInvoiceNumber || "-"}
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="">
          {props.item?.lastInvoiceDate || "-"}
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="">
          {props.item?.nextInvoiceDate || "-"}
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="">

          ₹{(props?.item?.invoiceAmount || 0).toLocaleString('en-IN')}


        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="">
          <Form.Check
            type="switch"
            id="recurring-switch" style={{}}
            checked={props.checked}
            disabled={!canUpdateRecurring}
            onChange={canUpdateRecurring ? props.onToggle : undefined}
            // label={
            //   <span
            //     style={{
            //       fontWeight: 500,
            //       color: !canUpdateRecurring ? "#9E9E9E" : "#1E1E1E",
            //       marginLeft: 8,
            //     }}
            //   >
            //     {props.checked ? "On" : "Off"}
            //   </span>
            // }
          />


        </td>
        <td style={{ textAlign: 'start', border: "none", borderBottom: "1px solid #E8E8E8"  }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
            <div style={{ cursor: "pointer", 
            // backgroundColor: showDots ? "#E7F1FF" : "white",
              //  height: 40, width: 40, 
               borderRadius: 100,
                // border: "1px solid #EFEFEF", 
                display: "flex", alignItems: "center", position: "relative",justifyContent: "" }} onClick={(e) => handleShowDots(e)}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, transform:"rotate(90deg)",color:showDots ? "#1E45E1" : "#6B7280",  }} />

              {showDots && <>
                <div
                  ref={popupRef}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#F9F9F9",
                    position: "fixed",
                    top: popupPosition.top,
                    left: popupPosition.left,
                    width: 130,
                    height: "auto",
                    border: "1px solid #EBEBEB",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",

                    zIndex: showDots ? 1000 : "auto",
                  }}
                >
                  <div style={{
                    width: "100%", borderRadius: 10,
                  }}>
                    <div
                      className={`d-flex justify-content-start align-items-center gap-2 ${canDeleteRecurring ? "disabled" : ""
                        }`}
                      style={{
                        cursor: !canDeleteRecurring ? "not-allowed" : "pointer",
                        borderRadius: 10,
                        padding: 10,
                        opacity: !canDeleteRecurring ? 0.5 : 1,

                      }}
                      onClick={() => {
                        if (canDeleteRecurring) {
                          handleDeleteForm();
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (!canDeleteRecurring)
                          e.currentTarget.style.backgroundColor = "#FFF0F0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <img
                        src={Delete}
                        alt="Delete"
                        style={{
                          height: 16,
                          width: 16,

                        }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: "#FF0000",
                          cursor: !canDeleteRecurring ? "not-allowed" : "pointer",
                        }}
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                </div>

              </>}


            </div>
         </div>
        </td>







      </tr>

      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            className="w-100 text-center"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",

              fontWeight: 600,
              color: "#222222",

            }}
          >
            Delete Recurring Bill?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",

            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this Recurring Bill?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{

            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            className="me-2"
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button disabled
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleDelete}
          >
                              Coming Soon
            {/* Delete */} 
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}
RecurringBillList.propTypes = {
  item: PropTypes.func.isRequired,
  billrolePermission: PropTypes.func.isRequired,
  handleDeleteRecurringbills: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired
};
export default RecurringBillList;