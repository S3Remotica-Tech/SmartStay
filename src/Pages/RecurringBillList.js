/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
const RecurringBillList = (props) => {

  const [recurringBillDeletePermission, setRecurringBillDeletePermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)


  const handleDeleteForm = () => {
    setDeleteShow(true)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }


  useEffect(() => {
    if (
      props.billrolePermission[0]?.is_owner === 1 ||
      props.billrolePermission[0]?.role_permissions[11]?.per_delete === 1
    ) {
      setRecurringBillDeletePermission("");
    } else {
      setRecurringBillDeletePermission("Permission Denied");
    }
  }, [props.billrolePermission]);
  // useEffect(() => {
  //   if (
  //     props.billrolePermission[0]?.is_owner == 1 ||
  //     props.billrolePermission[0]?.role_permissions[11]?.per_edit == 1
  //   ) {
  //     setRecurringBillEditPermission("");
  //   } else {
  //     setRecurringBillEditPermission("Permission Denied");
  //   }
  // }, [props.billrolePermission]);

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

  //   const [downLoadInvoiceTable, setDownloadInvoiceTable] = useState(false)
  
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

    
  return (

    <>

      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


        <td className="table-cells ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", flexWrap: "wrap",paddingTop:'18px',textAlign:"center",whiteSpace:"nowrap",borderBottom: "1px solid #E8E8E8" }}>
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
              </span>
            </div> */}
            <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '13px', marginLeft: '15px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: 500, cursor: "pointer" }}
            // onClick={()=>handleDownload(props.item)}

            >{props.item.user_name}</div><br />

          </div>
        </td>
        {/* <td style={{   border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}  className=''>#{props.item.Invoices == null || props.item.Invoices == '' ? '0.00' : props.item.Invoices}</td> */}
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "4px 10px" }}>{formattedDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "4px 10px" }}>{formattedDueDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "4px 10px" }}>{formattedNextInvoiceDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"> ₹{props.item.total_amount.toLocaleString('en-IN')}</td>

        <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none",borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer",backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={(e)=>handleShowDots(e)}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

              {showDots && <>
                <div ref={popupRef} style={{ cursor: "pointer", 
                  backgroundColor: "#F9F9F9", 

                  position: "fixed",
                  top: popupPosition.top,
                  left: popupPosition.left,

                  // position: "absolute", right: 50, top: 20, 
                  
                  width: 120, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                  <div style={{  }} className=''>

                    {/* <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                                                style={{ backgroundColor: "#fff" }}>
                                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Edit</label>
                                            </div> */}
                    

                    <div
                      className={`mb-2 d-flex justify-content-start align-items-center gap-2 ${recurringBillDeletePermission ? 'disabled' : ''}`}
                      style={{
                        // backgroundColor: recurringBillDeletePermission ? "#f9f9f9" : "#fff",
                        cursor: recurringBillDeletePermission ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!recurringBillDeletePermission) {
                          handleDeleteForm();
                        }
                      }}
                    >
                      <img
                        src={Delete}
                        className="mt-1"
                        style={{
                          height: 16,
                          width: 16,
                          filter: recurringBillDeletePermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
                        }}
                        alt="Delete"
                      />
                      <label
                        className="mt-1"
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: recurringBillDeletePermission ? "#ccc" : "#FF0000", // Change text color if disabled
                          cursor: recurringBillDeletePermission ? "not-allowed" : "pointer",
                        }}
                      >
                        Delete
                      </label>
                    </div>



                    {/* <div className='mb-2 d-flex justify-content-start align-items-center gap-2'
                                                style={{ backgroundColor: "#fff" }}>
                                                <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000", cursor: 'pointer' }}
                                                   onClick={handleDelete}>
                                                    Delete</label>
                                            </div> */}
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
RecurringBillList.propTypes = {
  item: PropTypes.func.isRequired,
  billrolePermission: PropTypes.func.isRequired,
  handleDeleteRecurringbills: PropTypes.func.isRequired,
};
export default RecurringBillList;