import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";
import Skeleton from "react-loading-skeleton";

function UserListCompliants(props){
    const state = useSelector(state => state)
    console.log("state.Compliant",state)
  
  const [loading, setLoading] = useState(false);
 

      const transactionrowsPerPage = 10;
  const [transactioncurrentPage, settransactioncurrentPage] = useState(1);
  const [transactionFilterddata, settransactionFilterddata] = useState([]);
  const indexOfLastRowTransaction = transactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowTransaction = indexOfLastRowTransaction - transactionrowsPerPage;
  const currentRowTransaction = transactionFilterddata?.slice(indexOfFirstRowTransaction, indexOfLastRowTransaction);


  const handleTransactionPageChange = (transactionpageNumber) => {
    settransactioncurrentPage(transactionpageNumber);
  };


  const totalPagesTransaction = Math.ceil(transactionFilterddata?.length / transactionrowsPerPage);

  const renderPageNumbersTransaction = () => {
    const pageNumbersTransaction = [];
    let startPageTransaction = transactioncurrentPage - 1;
    let endPageTransaction = transactioncurrentPage + 1;

    if (transactioncurrentPage === 1) {
      startPageTransaction = 1;
      endPageTransaction = 3;
    }

    if (transactioncurrentPage === totalPagesTransaction) {
      startPageTransaction = totalPagesTransaction - 2;
      endPageTransaction = totalPagesTransaction;
    }

    if (transactioncurrentPage === 2) {
      startPageTransaction = 1;
      endPageTransaction = 3;
    }

    if (transactioncurrentPage === totalPagesTransaction - 1) {
      startPageTransaction = totalPagesTransaction - 2;
      endPageTransaction = totalPagesTransaction;
    }

    for (let i = startPageTransaction; i <= endPageTransaction; i++) {
      if (i > 0 && i <= totalPagesTransaction) {
        pageNumbersTransaction.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === transactioncurrentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === transactioncurrentPage ? 'transparent' : 'transparent',
                border: i === transactioncurrentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handleTransactionPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersTransaction;
  };

  useEffect(() => {
    settransactionFilterddata(state.UsersList.customerdetails.comp_data)
  }, [state.UsersList.customerdetails.comp_data])

    return(
<>
<div style={{padding:"-0px"}}>
                   


<Table
                responsive="md"
                className="Table_Design"
                style={{
                  height: "auto",
                  overflow: "visible",
                  tableLayout: "auto",
                  borderRadius: "24px",
                  border: "1px solid #DCDCDC",
                  

                 
                  
                  
                  

                }}
              >
                <thead
                  style={{
                    backgroundColor: "#E7F1FF",
                  }}
                >
                  <tr>
                    {/* <th
                      style={{
                        textAlign: "center",
                        fontFamily: "Gilroy",
                        color: "rgba(34, 34, 34, 1)",
                        fontSize: 14,
                        fontWeight: 600,
                        borderTopLeftRadius: 24,
                      }}
                    >
                      <img src={squre} height={20} width={20} />
                    </th> */}
                    <th
                       style={{
                        textAlign: "center",
                        fontFamily: "Gilroy",
                        color: "#939393",
                        fontSize: 14,
                        fontWeight: 600,
                        borderTopLeftRadius: 24,
                      }}
                    >
                      Request ID
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#939393",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                     Compliant type
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#939393",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                     Date
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#939393",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Assign to
                    </th>
                 
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#939393",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      status
                    </th>
                   
                    <th
                      style={{
                        textAlign: "center",
                        fontFamily: "Gilroy",
                        color: "rgba(34, 34, 34, 1)",
                        fontSize: 14,
                        fontWeight: 500,
                        borderTopRightRadius: 24,
                      }}
                    >
                      
                    </th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center",verticalAlign:'middle' }}>
                  {
                     currentRowTransaction && currentRowTransaction?.map((user) => {
                     
                        let Dated = new Date(user.complaint_date);
                            console.log("Dated..?", Dated);

                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1; 
                            let year = Dated.getFullYear();
                            let formattedDate = `${day}/${month}/${year}`
                        return (
                          <tr
                            key={user.Requestid}
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              textAlign: "center",
                              marginTop: 20,
                            }}
                          >
                           
                            <td
                              style={{
                               
                                border: "none",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                paddingTop:15
                                
                              }}
                            >
                              {user.Requestid}
                            </td>
                            <td
                              style={{
                               
                                border: "none",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                paddingTop:15
                              }}
                            >
                              {user.complaint_name}
                            </td>
                            <td
                              style={{
                                paddingTop:15,
                                border: "none",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                marginTop:10
                              }}
                            >
                              <span
                                style={{
                                  paddingTop: "3px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  paddingBottom: "3px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  
                                }}
                              >
                                {formattedDate}
                              </span>
                            </td>
                            <td
                              style={{
                               
                                border: "none",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                paddingTop:15
                              }}
                            >
                              {user.Assign}
                            </td>
                            <td
                              style={{
                                paddingTop:15,
                                border: "none",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                marginTop:10
                              }}
                            >
                              <span
                                style={{
                                  paddingTop: "3px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  paddingBottom: "3px",
                                  borderRadius: "60px",
                                  // backgroundColor: "#FFEFCF",
                                  backgroundColor: user.Status == "Pending" ? "#FFEED2" : "#D9FFD9",
                                  textAlign: "start",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  
                                }}
                              >
                                {user.Status}
                              </span>
                            </td>
                        
                            <td style={{ paddingTop:12, border: "none" }}>
                              {/* <MoreCircle  variant="Outline"  size="40" color="#dcdcdc" style={{transform:"rotate(90deg)"}}/>  */}

                             

                              {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                            </td>
                          </tr>
                        );
                      })
                    }
                </tbody>

                {currentRowTransaction?.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                </tr>
              )}
              </Table>


                      {currentRowTransaction?.length > 0 && (
                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: transactioncurrentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: transactioncurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleTransactionPageChange(transactioncurrentPage - 1)}
                                disabled={transactioncurrentPage === 1}
                              >
                               
                                <ArrowLeft2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                              <span
                                onClick={() => handleTransactionPageChange(transactioncurrentPage - 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor:transactioncurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  color: transactioncurrentPage === 1 ? '#ccc' : '#007bff'
                                }}
                              >
                                Previous
                              </span>
                            </li>
                            {transactioncurrentPage > 3 && (
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
                                  onClick={() => handleTransactionPageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {transactioncurrentPage > 3 && <span>...</span>}
                            {renderPageNumbersTransaction()}
                            {transactioncurrentPage < totalPagesTransaction - 2 && <span>...</span>}
                            {transactioncurrentPage < totalPagesTransaction - 2 && (
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
                                  onClick={() => handleTransactionPageChange(totalPagesTransaction)}
                                >
                                  {totalPagesTransaction}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>
                              <span
                                onClick={() => handleTransactionPageChange(transactioncurrentPage + 1)}
                                style={{
                                  marginTop: '20px',
                                  cursor: transactioncurrentPage === totalPagesTransaction ? 'not-allowed' : 'pointer',
                                  color: transactioncurrentPage === totalPagesTransaction ? '#ccc' : '#007bff'
                                }}
                              >
                                Next
                              </span>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: transactioncurrentPage === transactioncurrentPage ? '#ccc' : '#007bff',
                                  cursor: transactioncurrentPage === transactioncurrentPage ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleTransactionPageChange(transactioncurrentPage + 1)}
                                disabled={transactioncurrentPage === totalPagesTransaction}
                              >
                               
                                <ArrowRight2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
</>
    )
}
export default UserListCompliants;