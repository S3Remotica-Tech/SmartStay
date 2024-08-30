import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";


function UserListInvoice (props){
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.id) {
          dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: props.id } })
          // setAmnityuserdetail(state.UsersList?.customerdetail.all_amenities)
        }
        console.log("userIduserId", props.id)
      }, [props.id]);

      const invoicerowsPerPage = 10;
  const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
  const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
  const currentRowinvoice = invoiceFilterddata?.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice);

  const handleInvoicePageChange = (InvoicepageNumber) => {
    setinvoicecurrentPage(InvoicepageNumber);
  };

  const totalPagesinvoice = Math.ceil(invoiceFilterddata?.length / invoicerowsPerPage);

  const renderPageNumbersInvoice = () => {
    const pageNumbersInvoice = [];
    let startPageInvoice = invoicecurrentPage - 1;
    let endPageInvoice = invoicecurrentPage + 1;

    if (invoicecurrentPage === 1) {
      startPageInvoice = 1;
      endPageInvoice = 3;
    }

    if (invoicecurrentPage === totalPagesinvoice) {
      startPageInvoice = totalPagesinvoice - 2;
      endPageInvoice = totalPagesinvoice;
    }

    if (invoicecurrentPage === 2) {
      startPageInvoice = 1;
      endPageInvoice = 3;
    }

    if (invoicecurrentPage === totalPagesinvoice - 1) {
      startPageInvoice = totalPagesinvoice - 2;
      endPageInvoice = totalPagesinvoice;
    }

    for (let i = startPageInvoice; i <= endPageInvoice; i++) {
      if (i > 0 && i <= totalPagesinvoice) {
        pageNumbersInvoice.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === invoicecurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === invoicecurrentPage ? 'transparent' : 'transparent',
                border: i === invoicecurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleInvoicePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersInvoice;
  };
  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details)
  }, [state.UsersList.customerdetails.invoice_details])

return(
    <>
    <div>

      <Table className="ebtable mt-3" responsive >
        <thead style={{ color: "gray", fontSize: "11px", marginLeft: 10, backgroundColor: "#E7F1FF" }}>
          <tr className="" style={{ height: "30px" }}>
            <th style={{ textAlign: "center", color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Invoice number</th>
            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Created</th>
            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Due Date</th>

            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Due</th>

            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ height: "50px", fontSize: "11px" }}>
          {currentRowinvoice?.map((view) => {
            let Dated = new Date(view.Date);
            console.log("Dated..?", Dated);

            let day = Dated.getDate();
            let month = Dated.getMonth() + 1; // Months are zero-based
            let year = Dated.getFullYear();

            let formattedDate = `${day}/${month}/${year}`;
            console.log("Formatted Date:", formattedDate);


            let dueDated = new Date(view.DueDate);
            console.log("dueDated..?", dueDated);

            let daydue = dueDated.getDate();
            let monthdue = dueDated.getMonth() + 1; // Months are zero-based
            let yeardue = dueDated.getFullYear();

            let DueformattedDate = `${daydue}/${monthdue}/${yeardue}`;
            console.log("DueformattedDate:", DueformattedDate);

            return (
              <tr key={view.id}>
                <td style={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{view.Invoices}</td>

                <td ><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                <td ><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{DueformattedDate}</span></td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{view.Amount}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{view.BalanceDue}</td>
                <td><span style={{
                  color: "black",
                  backgroundColor: view.Status === 'Success' ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                  paddingLeft: "10px", paddingRight: "10px",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "10px"
                }}>{view.Status === 'Success' ? 'Paid' : 'UnPaid'}</span></td>
                {/* <td style={view.Status === "Paid" ? { color: "green", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"} : { color: "red", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"}}>{view.Status == Paid ? 'Paid' : 'UnPaid'}</td> */}
                <td>  <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                  <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                </div>
                  {/* <img src={dottt} style={{ height: 40, width: 40, cursor:"pointer" }} /> */}
                </td>

              </tr>

            )

          })}
          {currentRowinvoice?.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
            </tr>
          )}

        </tbody>
      </Table>
    </div>

    {currentRowinvoice?.length > 0 && (
      <nav>
        <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
          <li style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: invoicecurrentPage === 1 ? '#ccc' : '#007bff',
                cursor: invoicecurrentPage === 1 ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: "none"
              }}
              onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
              disabled={invoicecurrentPage === 1}
            >                                <ArrowLeft2
                size="16"
                color="#1E45E1"
              />
              {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
            </button>
            <span
              onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
              style={{
                marginTop: '20px',
                cursor: invoicecurrentPage === 1 ? 'not-allowed' : 'pointer',
                color: invoicecurrentPage === 1 ? '#ccc' : '#007bff'
              }}
            >
              Previous
            </span>
          </li>
          {invoicecurrentPage > 3 && (
            <li style={{ margin: '0 5px' }}>
              <button
                style={{
                  padding: '5px 10px',
                  textDecoration: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  display: 'inline-block',
                  minWidth: '30px',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: "none"

                }}
                onClick={() => handleInvoicePageChange(1)}
              >
                1
              </button>
            </li>
          )}
          {invoicecurrentPage > 3 && <span>...</span>}
          {renderPageNumbersInvoice()}
          {invoicecurrentPage < totalPagesinvoice - 2 && <span>...</span>}
          {invoicecurrentPage <totalPagesinvoice - 2 && (
            <li style={{ margin: '0 5px' }}>
              <button
                style={{
                  padding: '5px 10px',
                  textDecoration: 'none',

                  cursor: 'pointer',
                  borderRadius: '5px',
                  display: 'inline-block',
                  minWidth: '30px',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: "none"

                }}
                onClick={() => handleInvoicePageChange(totalPagesinvoice)}
              >
                {totalPagesinvoice}
              </button>
            </li>
          )}
          <li style={{ margin: '0 5px' }}>
            <span
              onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
              style={{
                marginTop: '20px',
                cursor: invoicecurrentPage === totalPagesinvoice ? 'not-allowed' : 'pointer',
                color: invoicecurrentPage === totalPagesinvoice ? '#ccc' : '#007bff'
              }}
            >
              Next
            </span>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: invoicecurrentPage ===invoicecurrentPage ? '#ccc' : '#007bff',
                cursor: invoicecurrentPage === invoicecurrentPage ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: "none"
              }}
              onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
              disabled={invoicecurrentPage === totalPagesinvoice}
            >
              {/* <img src={rightarrow} width="10" height="10" alt="Next" /> */}
              <ArrowRight2
                size="16"
                color="#1E45E1"
              />
            </button>
          </li>
        </ul>
      </nav>
    )}
  </>
)


}
export default UserListInvoice;