/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

const RecurringBillList = (props) => {
  const state = useSelector((state) => state);
  const [recurringBillDeletePermission, setRecurringBillDeletePermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)


  const handleDeleteForm = () => {
    setDeleteShow(true)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }






  useEffect(() => {
    const userType = props.billrolePermission[0]?.user_details?.user_type;
    const isAdmin = userType === "admin" || userType === "agent";
    if (isAdmin) {
      if (state?.login?.planStatus === 0) {
        setRecurringBillDeletePermission("Permission Denied");
      } else if (state?.login?.planStatus === 1) {
        setRecurringBillDeletePermission("");
      }
    }

  }, [state?.login?.planStatus, state.login?.selectedHostel_Id, props.billrolePermission])



  useEffect(() => {
    const billPermission = props.billrolePermission[0]?.role_permissions?.find(
      (perm) => perm.permission_name === "Recuring Bills"
    );

    const isOwner = props.billrolePermission[0]?.user_details?.user_type === "staff";
    const planActive = state?.login?.planStatus === 1;

    if (!billPermission || !isOwner) return;

    if (billPermission.per_delete === 1 && planActive) {
      setRecurringBillDeletePermission("");
    } else {
      setRecurringBillDeletePermission("Permission Denied");
    }
  }, [props.billrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);



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





  let Dated = new Date(props.item.invoice_date);

  let day = Dated.getDate();
  let month = Dated.getMonth() + 1;
  let year = Dated.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;



  let dueDated = new Date(props.item.DueDate);

  let daydue = dueDated.getDate();
  let monthdue = dueDated.getMonth() + 1;
  let yeardue = dueDated.getFullYear();

  let formattedDueDate = `${daydue}/${monthdue}/${yeardue}`;

  let nextinvoiceDated = new Date(props.item.next_invoice_date);

  let nextinvoiceday = nextinvoiceDated.getDate();
  let nextinvoicemonth = nextinvoiceDated.getMonth() + 1;
  let nextinvoiceyear = nextinvoiceDated.getFullYear();

  let formattedNextInvoiceDate = `${nextinvoiceday}/${nextinvoicemonth}/${nextinvoiceyear}`;


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


console.log("props",props)



  return (

    <>

      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


        <td className="table-cells ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", flexWrap: "wrap", paddingTop: '18px', textAlign: "center", whiteSpace: "nowrap", borderBottom: "1px solid #E8E8E8" }}>
          <div className="d-flex  align-items-center">

            <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '13px', marginLeft: '17px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: 500, cursor: "pointer" }}

            >{props.item.Name}</div><br />

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-2"><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "4px 10px", marginLeft: 6 }}>{formattedDate || "-"}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-2"><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "4px 10px", marginLeft: 4 }}>{formattedDueDate || "-"}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "4px 10px" }}>{formattedNextInvoiceDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
          <div style={{ marginLeft: 6 }}>
  ₹{(props?.item?.total_amount || 0).toLocaleString('en-IN')}
</div>

        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
          <div className="custom-toggle-wrapper" onClick={props.onToggle}>
            <span className={`custom-toggle-label ${props.checked ? "active" : ""}`}>
              {props.checked ? "On" : "Off"}
            </span>
            <div className={`custom-toggle-switch ${props.checked ? "on" : "off"}`}>
              <div className="custom-toggle-thumb">
                {props.checked && <FaCheck size={10} color="#1E1E1E" />}
              </div>
            </div>
          </div>

        </td>
        <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer", backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={(e) => handleShowDots(e)}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

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
                      className={`d-flex justify-content-start align-items-center gap-2 ${recurringBillDeletePermission ? "disabled" : ""
                        }`}
                      style={{
                        cursor: recurringBillDeletePermission ? "not-allowed" : "pointer",
                        borderRadius: 10,
                        padding: 10,
                        opacity: recurringBillDeletePermission ? 0.5 : 1,

                      }}
                      onClick={() => {
                        if (!recurringBillDeletePermission) {
                          handleDeleteForm();
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (!recurringBillDeletePermission)
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
                          cursor: recurringBillDeletePermission ? "not-allowed" : "pointer",
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
          <Button
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
            Delete
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
};
export default RecurringBillList;