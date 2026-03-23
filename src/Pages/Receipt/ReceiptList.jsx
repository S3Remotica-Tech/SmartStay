/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../../Assets/Images/Edit-blue.png';
import Delete from '../../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Download from '../../Assets/Images/New_images/download.png';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from '../../Utils/Permission';

const Receipt = (props) => {



  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [receiptdeletePermission, setReceiptDeletePermission] = useState("");
  // const [receiptEditPermission, setReceiptEditPermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteitem, setDeleteItem] = useState('')
  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const {
    // canWriteModule: canWriteReceipt,
    canReadModule: canReadReceipt,
    canDeleteModule: canDeleteReceipt,
    canUpdateModule: canUpdateReceipt,
  } = useHasPermission("Receipt");

  const isValidSubscription = state.UsersList?.hotelDetailsinPg?.isSubscriptionActive

  const isExportAllow = isValidSubscription && canReadReceipt


  const handleDeleteForm = (item) => {
    setDeleteShow(true)
    setDeleteItem(item)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }


  // useEffect(() => {
  //   const userType = props.billrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setReceiptDeletePermission("Permission Denied");
  //       setReceiptEditPermission("Permission Denied");
  //     } else if (state?.login?.planStatus === 1) {
  //       setReceiptDeletePermission("");
  //       setReceiptEditPermission("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state.login?.selectedHostel_Id, props.billrolePermission])




  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }


  const handleDelete = () => {

    if (deleteitem) {
      dispatch({
        type: "DELETE_RECEIPT",
        payload: {
          hostelId: state.login?.selectedHostel_Id, receiptId: deleteitem.transactionId
        },
      });
    }

  }



  const handleEdit = (item) => {
    props.onhandleEdit(item)
  }




  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item)


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


  const handleDownload = (item) => {
    if (item) {
      // props.DisplayInvoice(true, item)
      if (item?.transactionId && state.login.selectedHostel_Id) {
        dispatch({ type: "RECEIPTPDF_NEWCHANGES", payload: { hostelId: state.login.selectedHostel_Id, transactionId: item.transactionId } })
        navigate(`/receipts/details/${item.transactionId}`, {
          state: {
            rowData: item
          },
        });

      }

    }


  }



  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }

  }, [state.InvoiceList.statusCodeNewReceiptStatusCode])



  useEffect(() => {
    if (state.InvoiceList.ReceiptDeletesuccessStatuscode === 204) {
      setDeleteShow(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
      }, 1000);
    }
  }, [state.InvoiceList.ReceiptDeletesuccessStatuscode,]);




  const handleNavigateTenantProfile = (view) => {
    if (view) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: view.customerId } });
      navigate(`/tenant/details/${view.customerId}`, {
        state: {
          customerId: view.customerId,
          IsOverView: true,
          totriggerBillTap: false
        },
      });
    }

  }






  return (

    <>

      <tr
        // key={props.item.id} 
        style={{
          color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal",
          lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap"
        }} className='m-2' >

        <td style={{ cursor: "pointer", border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 600, color: "#1E45E1", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} >
          <div style={{ marginLeft: 7 }} onClick={() => handleDownload(props.item)} className="Invoice_Name">{props.item.transactionNumber ? props.item?.transactionNumber : "-"}</div>
        </td>



        <td className="table-cells " style={{ border: "none", flexWrap: "wrap", whiteSpace: "nowrap", borderBottom: "1px solid #E8E8E8" }}>
          <div className="d-flex  align-items-center">

            <br />
            <div
              className="font-gilroy text-[13px] ml-[17px] text-[#1E45E1] font-semibold cursor-pointer text-start truncate max-w-[150px]"
              title={props.item?.fullName}
              onClick={() => handleNavigateTenantProfile(props.item)}
            >
              {props.item?.fullName}
            </div>

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} >
          <div style={{ marginLeft: 7 }}  >{props.item?.referenceNumber ? props.item?.referenceNumber : "-"}</div>
        </td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} >
          <div className="ps-0" style={{ marginLeft: 6 }}>{!props.item?.invoiceNumber || props.item?.invoiceNumber === "0" ? "-" : props.item.invoiceNumber}</div>
        </td>


        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} >
          <div style={{ marginLeft: 6 }}>{props.item.invoiceType}</div>
        </td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }}>
          {props.item?.paidAt}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} > ₹{props.item?.paidAmount !== null ? props.item.paidAmount.toLocaleString('en-IN') : '0'}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }}>
          {props.item?.bankName ? props.item?.bankName : "-"}</td>


        <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{
              cursor: "pointer",
              // backgroundColor: showDots ? "#E7F1FF" : "white",
              //  height: 40, width: 40, 
              //  borderRadius: 100, 
              //  border: "1px solid #EFEFEF", 
              display: "flex", justifyContent: "center", alignItems: "center", position: "relative"
            }}
              onClick={(e) => handleShowDots(e)}
            >
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, transform: " rotate(90deg)", color: showDots ? "#1E45E1" : "#6B7280", }} />

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
                    border: "1px solid #EBEBEB",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    zIndex: showDots ? 1000 : "auto",
                  }}
                >

                  <button
                    type="button"
                    disabled
                    className="flex justify-start items-center gap-2 w-full px-3 py-2 
             rounded-t-[10px] bg-[#F9F9F9] border-0
             opacity-50 cursor-not-allowed
             disabled:bg-gray-50"
                  >
                    <img
                      src={Edit}
                      alt="Edit"
                      className="h-4 w-4"
                    />
                    <span className="text-[14px] font-medium text-[#222222] font-gilroy">
                      Edit
                    </span>
                  </button>

                  <div
                    className="d-flex justify-content-start align-items-center gap-2"
                    style={{
                      cursor: canDeleteReceipt ? "pointer" : "not-allowed",
                      opacity: canDeleteReceipt ? 1 : 0.5,
                      padding: "8px 12px",
                      width: "100%",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => {
                      if (canDeleteReceipt) {
                        handleDeleteForm(props.item);
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!canDeleteReceipt) {
                        e.currentTarget.style.backgroundColor = "#FFF0F0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <img
                      src={Delete}
                      alt="Delete"
                      style={{ height: 16, width: 16 }}
                    />

                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy, sans-serif",
                        color: "#FF0000",
                        cursor: canDeleteReceipt ? "pointer" : "not-allowed",
                      }}
                    >
                      Delete
                    </span>
                  </div>
                  {/* )} */}

                  <div
                    className="d-flex justify-content-start align-items-center gap-2 "
                    style={{
                      opacity: !isExportAllow ? 0.5 : 1,
                      cursor: !isExportAllow ? "not-allowed" : "pointer",
                      padding: "8px 12px",
                      width: "100%"
                    }}
                    onClick={() => {
                      if (isExportAllow) { handleInvoicepdf(props.item) }
                    }}
                    onMouseEnter={(e) => {
                      if (isExportAllow) e.currentTarget.style.backgroundColor = "#EDF2FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <img src={Download} alt="Download" style={{ height: 16, width: 16 }} />
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy, sans-serif",
                        color: "#222222",
                        cursor: !isExportAllow ? "not-allowed" : "pointer",
                      }}
                    >
                      Download
                    </label>
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
            Delete Receipt?
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
          Are you sure you want to delete this Receipt?
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
Receipt.propTypes = {
  billrolePermission: PropTypes.func.isRequired,
  receiptaddPermission: PropTypes.func.isRequired,
  onhandleEdit: PropTypes.func.isRequired,
  DisplayInvoice: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired,
  OnHandleshowInvoicePdf: PropTypes.func.isRequired,
};
export default Receipt;