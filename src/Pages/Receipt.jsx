/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Download from '../Assets/Images/New_images/download.png';
import PropTypes from "prop-types";

const Receipt = (props) => {



  const state = useSelector((state) => state);
 
  const dispatch = useDispatch();

      const [receiptdeletePermission, setReceiptDeletePermission] = useState("");
      const [receiptEditPermission, setReceiptEditPermission] = useState("")
      const [deleteShow, setDeleteShow] = useState(false)
      const [deleteitem, setDeleteItem] = useState('')
      const [showDots, setShowDots] = useState('')
      const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const handleDeleteForm = (item) => {
    setDeleteShow(true)
    setDeleteItem(item)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }


useEffect(() => {
    const isAdmin = props.billrolePermission[0]?.user_details?.user_type === "admin";
    if (isAdmin) {
      if (state?.login?.planStatus === 0) {
       setReceiptDeletePermission("Permission Denied");
        setReceiptEditPermission("Permission Denied");
      } else if (state?.login?.planStatus === 1) {
        setReceiptDeletePermission("");
        setReceiptEditPermission("");
      }
    }

  }, [state?.login?.planStatus, state.login?.selectedHostel_Id, props.billrolePermission])


 useEffect(() => {
  const receiptPermission = props.billrolePermission[0]?.role_permissions?.find(
      (perm) => perm.permission_name === "Receipt"
    );
  const isOwner = props.billrolePermission[0]?.user_details?.user_type === "staff";
  const planActive = state?.login?.planStatus === 1;

  if (!receiptPermission || !isOwner) return;

 
  if (receiptPermission.per_delete === 1 && planActive) {
    setReceiptDeletePermission("");
  } else {
    setReceiptDeletePermission("Permission Denied");
  }

 
  if (receiptPermission.per_edit === 1 && planActive) {
    setReceiptEditPermission("");
  } else {
    setReceiptEditPermission("Permission Denied");
  }
}, [props.billrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);



   
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
        payload: { id: deleteitem.id },
      });
    }

  }


  const handleEdit = (item) => {
    props.onhandleEdit(item)  
  }




  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item)
  }


  let Dated = new Date(props.item.payment_date);

  let day = Dated.getDate();
  let month = Dated.getMonth() + 1; 
  let year = Dated.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;


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

    props.DisplayInvoice(true, item)
    dispatch({type:"RECEIPTPDF_NEWCHANGES",id:item?.id})
  }

  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }

  }, [state.InvoiceList.statusCodeNewReceiptStatusCode])

  

  useEffect(() => {
    if (state.InvoiceList.ReceiptDeletesuccessStatuscode === 200) {
      setDeleteShow(false)

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
      }, 1000);
    }
  }, [state.InvoiceList.ReceiptDeletesuccessStatuscode,]);




  return (

    <>

      <tr key={props.item.id} style={{
        color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal",
        lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap"
      }} className='m-2' >


       

        <td className="table-cells ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", flexWrap: "wrap", whiteSpace: "nowrap", borderBottom: "1px solid #E8E8E8" }}>
          <div className="d-flex  align-items-center">

            <div className="Invoice_Name" style={{
              fontFamily: 'Gilroy', fontSize: '13px', marginLeft: '17px', color: "#1E45E1",
              fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer", textAlign: "start",paddingTop:"10px"
            }}
              onClick={() => handleDownload(props.item)}

            >{props.item.Name}</div><br />

          </div>
        </td>
         
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
           <div style={{marginLeft:7}}>{props.item.reference_id}</div></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
          <div className="ps-0" style={{marginLeft:6}}>{!props.item.invoice_number || props.item.invoice_number === "0" ? "-" : props.item.invoice_number}</div>
        </td>


        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
          <div style={{marginLeft:6}}>{props.item.type}</div>
        </td>

        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-2" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }}>
          <span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" , marginLeft:3 }}>{formattedDate}</span></td>
        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-4" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} > ₹{props.item.amount_received.toLocaleString('en-IN')}</td>
        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-2" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }}>
          <span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" , marginLeft:2}}>{props.item.paymentMode ? props.item.paymentMode : "-"}</span></td>


        <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer", backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
              onClick={(e) => handleShowDots(e)}
            >
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
                    border: "1px solid #EBEBEB",
                    borderRadius: 10,
                                        display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    zIndex: showDots ? 1000 : "auto",
                  }}
                >

                  <div
                    className="d-flex justify-content-start align-items-center gap-2 "
                    style={{
                      cursor: receiptEditPermission ? "not-allowed" : "pointer",
                      opacity: receiptEditPermission ? 0.5 : 1,
                      borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        backgroundColor: "#F9F9F9",
                        padding: "8px 12px",
                         width:"100%"
                    }}
                    onClick={() => {
                      if (!receiptEditPermission) {
                        handleEdit(props.item);
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!receiptEditPermission)
                        e.currentTarget.style.backgroundColor = "#EDF2FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <img
                      src={Edit}
                      alt="Edit"
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
                        color:  "#222222",
                        cursor: receiptEditPermission ? "not-allowed" : "pointer",
                      }}
                    >
                      Edit
                    </label>
                  </div>


                  <div
                    className="d-flex justify-content-start align-items-center gap-2 "
                    style={{
                      cursor: receiptdeletePermission ? "not-allowed" : "pointer",
                        opacity: receiptdeletePermission  ? 0.5 : 1,
                                        padding: "8px 12px",
                       width:"100%"
                    }}
                    onClick={() => {
                      if (!receiptdeletePermission) {
                        handleDeleteForm(props.item);
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!receiptdeletePermission)
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
                        color:"#FF0000",
                        cursor: receiptdeletePermission ? "not-allowed" : "pointer",
                      }}
                    >
                      Delete
                    </label>
                  </div>


                  <div
                    className="d-flex justify-content-start align-items-center gap-2 "
                    style={{
                      opacity: props.receiptaddPermission  ? 0.5 : 1,
                      cursor: props.receiptaddPermission ? "not-allowed" : "pointer",
                      padding: "8px 12px",
                      width:"100%"
                    }}
                    onClick={() => {
                      if(!props.receiptaddPermission) {handleInvoicepdf(props.item)}}}
                    onMouseEnter={(e) => {
                      if(!props.receiptaddPermission) e.currentTarget.style.backgroundColor = "#EDF2FF";
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
                        cursor: props.receiptaddPermission ? "not-allowed" : "pointer",
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
receiptaddPermission:  PropTypes.func.isRequired,
  onhandleEdit: PropTypes.func.isRequired,
  DisplayInvoice: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired,
  OnHandleshowInvoicePdf: PropTypes.func.isRequired,
};
export default Receipt;