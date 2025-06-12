/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Download from '../Assets/Images/New_images/download.png';
import PropTypes from "prop-types";

const Receipt = (props) => {
  console.log("propsR",props);
  

      const state = useSelector((state) => state);
    console.log("Receipt",state)
      const dispatch = useDispatch();

      const [receiptdeletePermission, setReceiptDeletePermission] = useState("");

  const [receiptEditPermission, setReceiptEditPermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteitem, setDeleteItem] = useState('')

  //  const [hostelId, setHostelId] = useState("");

  //  useEffect(() => {
  //     if (state.login.selectedHostel_Id) {
  //       setHostelId(state.login.selectedHostel_Id);
  //     }
  //   }, [state.login.selectedHostel_Id]);

  const handleDeleteForm = (item) => {
    setDeleteShow(true)
    setDeleteItem(item)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }


  useEffect(() => {
    if (
      props.billrolePermission[0]?.is_owner === 1 ||
      props.billrolePermission[0]?.role_permissions[11]?.per_delete === 1
    ) {
        setReceiptDeletePermission("");
    } else {
        setReceiptDeletePermission("Permission Denied");
    }
  }, [props.billrolePermission]);

  useEffect(() => {
    if (
      props.billrolePermission[0]?.is_owner === 1 ||
      props.billrolePermission[0]?.role_permissions[11]?.per_edit === 1
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
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

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
    console.log("handleEdit",item)
    props.onhandleEdit(item)
    
  }

  


  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item)
  }


  let Dated = new Date(props.item.payment_date);

  let day = Dated.getDate();
  let month = Dated.getMonth() + 1; // Months are zero-based
  let year = Dated.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  // let nextinvoiceDated = new Date(props.item.next_invoice_date);

  // let nextinvoiceday = nextinvoiceDated.getDate();
  // let nextinvoicemonth = nextinvoiceDated.getMonth() + 1; // Months are zero-based
  // let nextinvoiceyear = nextinvoiceDated.getFullYear();

  // let formattedNextInvoiceDate = `${nextinvoiceday}/${nextinvoicemonth}/${nextinvoiceyear}`;


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
    // dispatch({ type: "RECEIPTPDF_NEWCHANGES", params: { receipt_id: item?.id } });
    // setDownloadInvoiceTable(true)

  }

  useEffect(()=>{
    if(state.InvoiceList.statusCodeNewReceiptStatusCode === 200){
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      },500);
    }
    
  },[state.InvoiceList.statusCodeNewReceiptStatusCode])
  
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
      if (state.InvoiceList.ReceiptDeletesuccessStatuscode === 200) {
        setDeleteShow(false)
  
        setTimeout(() => {
          dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
        }, 1000);
      }
    }, [ state.InvoiceList.ReceiptDeletesuccessStatuscode,]);

    console.log("props.item",props.item)

    
  return (

    <>

      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", 
        lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


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

<td className="table-cells ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", flexWrap: "wrap",whiteSpace:"nowrap",borderBottom: "1px solid #E8E8E8" }}>
          <div className="d-flex  align-items-center">
        
            <div className="Invoice_Name" style={{
              fontFamily: 'Gilroy', fontSize: '13px', marginLeft: '15px', color: "#1E45E1",
              fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer", textAlign: "start",paddingTop:"10px"
            }}
              onClick={() => handleDownload(props.item)}

            >{props.item.Name}</div><br />

          </div>
        </td>
         
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-4">{props.item.reference_id}</td>
        {/* <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }}> {props.item.invoice_number}</td> */}
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-4">{!props.item.invoice_number || props.item.invoice_number === "0" ? "-" : props.item.invoice_number}
        </td>


        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-4">{props.item.type}
        </td>

        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDate}</span></td>
        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-4" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} > ₹{props.item.amount_received.toLocaleString('en-IN')}</td>
        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{props.item.payment_mode}</span></td>


        <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none",borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer",backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
             onClick={(e)=>handleShowDots(e)}
             >
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

              {showDots && <>
                <div ref={popupRef} style={{ cursor: "pointer", 
                  backgroundColor: "#F9F9F9", 

                  position: "fixed",
                  top: popupPosition.top,
                  left: popupPosition.left,

                  // position: "absolute", right: 50, top: 20, 
                  
                  width: 123, height: "90px", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                  <div style={{ }} className=''>

                    {/* <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                                                style={{ backgroundColor: "#fff" }}>
                                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Edit</label>
                                            </div> */}
                    <div
                      className={"mb-2 mt-2 d-flex justify-content-start align-items-center gap-2 "}
                      style={{
                        // backgroundColor: receiptEditPermission ? "#f9f9f9" : "#fff",
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
                        // backgroundColor: receiptdeletePermission ? "#f9f9f9" : "#fff",
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

                      // style={{ backgroundColor: "#fff" }}
                    >
                      <img src={Download} alt="download" style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Download</label>
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
Receipt.propTypes = {
  billrolePermission: PropTypes.func.isRequired,
  onhandleEdit: PropTypes.func.isRequired,
  DisplayInvoice: PropTypes.func.isRequired,
    item: PropTypes.func.isRequired,
    OnHandleshowInvoicePdf: PropTypes.func.isRequired,
  };
export default Receipt;