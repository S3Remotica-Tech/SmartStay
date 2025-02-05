import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import User from '../Assets/Images/New_images/profile-picture.png';
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Download from '../Assets/Images/New_images/download.png';

const Receipt = (props) => {

      const state = useSelector((state) => state);
    
      const dispatch = useDispatch();

      const [receiptdeletePermission, setReceiptDeletePermission] = useState("");

  const [receiptEditPermission, setReceiptEditPermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteitem, setDeleteItem] = useState('')

   const [hostelId, setHostelId] = useState("");

   useEffect(() => {
      if (state.login.selectedHostel_Id) {
        setHostelId(state.login.selectedHostel_Id);
      }
    }, [state.login.selectedHostel_Id]);

  const handleDeleteForm = (item) => {
    setDeleteShow(true)
    setDeleteItem(item)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }


  useEffect(() => {
    if (
      props.billrolePermission[0]?.is_owner == 1 ||
      props.billrolePermission[0]?.role_permissions[11]?.per_delete == 1
    ) {
        setReceiptDeletePermission("");
    } else {
        setReceiptDeletePermission("Permission Denied");
    }
  }, [props.billrolePermission]);

  useEffect(() => {
    if (
      props.billrolePermission[0]?.is_owner == 1 ||
      props.billrolePermission[0]?.role_permissions[11]?.per_edit == 1
    ) {
        setReceiptEditPermission("");
    } else {
        setReceiptEditPermission("Permission Denied");
    }
  }, [props.billrolePermission]);

  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
   
  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, width, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }

  

  const handleDelete = () => {

    if (deleteitem) {
        dispatch({
          type: "DELETE_RECEIPT",
          payload: { id: deleteitem.id},
        });
      }

  }


  const handleEdit = (item) => {
    props.onhandleEdit(item)
    
  }

  const handleShowform = (props) => {
    props.OnHandleshowform(props)
  }


  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item)
  }


  let Dated = new Date(props.item.payment_date);

  let day = Dated.getDate();
  let month = Dated.getMonth() + 1; // Months are zero-based
  let year = Dated.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;



  let dueDated = new Date(props.item.DueDate);

  let daydue = dueDated.getDate();
  let monthdue = dueDated.getMonth() + 1; // Months are zero-based
  let yeardue = dueDated.getFullYear();

  let formattedDueDate = `${daydue}/${monthdue}/${yeardue}`;

  let nextinvoiceDated = new Date(props.item.next_invoice_date);

  let nextinvoiceday = nextinvoiceDated.getDate();
  let nextinvoicemonth = nextinvoiceDated.getMonth() + 1; // Months are zero-based
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

  const [downLoadInvoiceTable, setDownloadInvoiceTable] = useState(false)

  const handleDownload = (item) => {

    props.DisplayInvoice(true, item)

    setDownloadInvoiceTable(true)

  }

  
  
  //   const handleDownload = (item) => {
  // console.log(item);
  
  //     // props.RecuringInvoice(true, item)
  
  //     setDownloadInvoiceTable(true)
  
  //   }
  // const [downLoadInvoiceTable, setDownloadInvoiceTable] = useState(false)
  // const [selectedItem, setSelectedItem] = useState(null); 

  // const handleDownload = (item) => {
  //   console.log(item); 
  //   setSelectedItem(item); 
  //   setDownloadInvoiceTable(true); 
  // };


  // React.useEffect(() => {
  //   if (selectedItem) {
  //     console.log("Selected Item:", selectedItem);
  //   }
  // }, [selectedItem]);

   useEffect(() => {
      if (
        state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||  state.InvoiceList.ReceiptEditsuccessStatuscode === 200 ||
        state.InvoiceList.ReceiptDeletesuccessStatuscode === 200
      ) 
      setDeleteShow(false)

      {
        dispatch({
          type: "RECEIPTSLIST",
          payload: { hostel_id: hostelId },
        });
  
        setTimeout(() => {
          dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_ADD" });
        }, 1000);

        setTimeout(() => {
          dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_EDIT" });
        }, 1000);
  
        setTimeout(() => {
          dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
        }, 1000);
      }
    }, [
      state.InvoiceList.ReceiptAddsuccessStatuscode, state.InvoiceList.ReceiptEditsuccessStatuscode ,
      state.InvoiceList.ReceiptDeletesuccessStatuscode,
  
    ]);

    

    
  return (

    <>

      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


      {/* <td className="table-cells" style={{ border: "none", flexWrap: "wrap" }}>
  <div className="d-flex align-items-center">
    <div
      className="Invoice_Name"
      style={{
        fontFamily: "Gilroy",
        fontSize: "16px",
        marginLeft: "8px",
        color: "#1E45E1",
        fontStyle: "normal",
        lineHeight: "normal",
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "start", 
        verticalAlign: "middle",
      }}
      onClick={() => handleDownload(props.item)}
    >
      {props.item.Name}
    </div>
    <br />
  </div>
</td> */}

<td className="table-cells" style={{ border: "none", flexWrap: "wrap", }}>
          <div className="d-flex  align-items-center">
            {/* <div className="d-flex  align-items-center">
                            <span >
                              <img
                                src={
                                    props.item.user_profile && props.item.user_profile !== "0"
                                        ? props.item.user_profile
                                        : User
                                }
                                style={{ height: 40, width: 40 }}
                            />
                            </span></div> */}
            <div className="Invoice_Name" style={{
              fontFamily: 'Gilroy', fontSize: '16px', marginLeft: '8px', color: "#1E45E1",
              fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer", textAlign: "start",paddingTop:"10px"
            }}
              onClick={() => handleDownload(props.item)}

            >{props.item.Name}</div><br />

          </div>
        </td>
         
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.reference_id}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}> {props.item.invoice_number}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} > ₹{props.item.amount_received.toLocaleString('en-IN')}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{props.item.payment_mode}</span></td>


        <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer",backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
             onClick={(e)=>handleShowDots(e)}
             >
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

              {showDots && <>
                <div ref={popupRef} style={{ cursor: "pointer", 
                  backgroundColor: "#fff", 

                  position: "fixed",
                  top: popupPosition.top,
                  left: popupPosition.left,

                  // position: "absolute", right: 50, top: 20, 
                  
                  width: 123, height: "90px", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                  <div style={{ backgroundColor: "#fff" }} className=''>

                    {/* <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                                                style={{ backgroundColor: "#fff" }}>
                                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Edit</label>
                                            </div> */}
                    <div
                      className={"mb-2 mt-2 d-flex justify-content-start align-items-center gap-2 "}
                      style={{
                        backgroundColor: receiptEditPermission ? "#f9f9f9" : "#fff",
                        cursor: receiptEditPermission ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!receiptEditPermission) {
                          handleEdit(props.item);
                        }
                      }}
                    >
                      <img
                        src={Edit}
                        style={{
                          height: 16,
                          width: 16,
                          filter: receiptEditPermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
                        }}
                        alt="Edit"
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: receiptEditPermission ? "#ccc" : "#222222", // Change text color if disabled
                          cursor: receiptEditPermission ? "not-allowed" : "pointer",
                        }}
                      >
                        Edit
                      </label>
                    </div>

                    <div
                      className={`mb-2 d-flex justify-content-start align-items-center gap-2 ${receiptdeletePermission ? 'disabled' : ''}`}
                      style={{
                        backgroundColor: receiptdeletePermission ? "#f9f9f9" : "#fff",
                        cursor: receiptdeletePermission ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!receiptdeletePermission) {
                          handleDeleteForm(props.item);
                        }
                      }}
                    >
                      <img
                        src={Delete}
                        style={{
                          height: 16,
                          width: 16,
                          filter: receiptdeletePermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
                        }}
                        alt="Delete"
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: receiptdeletePermission ? "#ccc" : "#FF0000", // Change text color if disabled
                          cursor: receiptdeletePermission ? "not-allowed" : "pointer",
                        }}
                      >
                        Delete
                      </label>
                    </div>

                    <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                      onClick={() => handleInvoicepdf(props.item)}

                      style={{ backgroundColor: "#fff" }}
                    >
                      <img src={Download} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Download</label>
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
        style={{
          width: 388,
          height: 250,
          marginLeft: "500px",
          marginTop: "200px",
        }}
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}
          >
            Delete Receipt?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Are you sure you want to delete this Receipt?
        </Modal.Body>

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              marginRight: 10,
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
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
    {/* {
      downLoadInvoiceTable == true ?(
<> */}
{/* <InvoiceCard/> */}
{/* <RecuringBillPDF/> */}
{/* <p>{selectedItem.Invoices}</p> */}
{/* </>
      ):null
    } */}

    </>
  )
}
export default Receipt;