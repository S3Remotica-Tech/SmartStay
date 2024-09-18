import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";

function UserListTransaction(props){
    const state = useSelector(state => state)
  const dispatch = useDispatch();
    useEffect(() => {
        if (props.id) {
          dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: props.id } })
          // setAmnityuserdetail(state.UsersList?.customerdetail.all_amenities)
        }
        console.log("userIduserId", props.id)
      }, [props.id]);

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
    settransactionFilterddata(state.UsersList.customerdetails.transactions)
  }, [state.UsersList.customerdetails.transactions])
    return(
<>
<div>
                      <Table className="ebtable mt-3" responsive >
                        <thead style={{ color: "gray", fontSize: "11px", backgroundColor: "#E7F1FF" }}>
                          <tr className="" style={{ height: "30px" }}>

                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }}>Transaction ID</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Category</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Date</th>

                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Amount</th>
                            <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingTop: "10px", paddingBottom: "10px" }}>Mode of Payment </th>
                            <th ></th>

                          </tr>
                        </thead>
                        <tbody style={{ height: "50px", fontSize: "11px" }}>
                          {currentRowTransaction?.map((v) => {
                            let Dated = new Date(v.created_at);
                            console.log("Dated..?", Dated);

                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1; // Months are zero-based
                            let year = Dated.getFullYear();

                            let formattedDate = `${day}/${month}/${year}`;
                            console.log("Formatted Date:", formattedDate);
                            return (
                              <tr key={v.id}>

                                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "center" }}>{v.user_id}</td>
                                <td ><span style={{ backgroundColor: "#FFEFCF", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>{v.type}</span></td>
                                <td><span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                                {/* <td>₹{view.BalanceDue}</td> */}
                                <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>₹{v.amount}</td>
                                <td><span style={{ backgroundColor: "#D9E9FF", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy" }}>{v.payment_type}</span></td>
                                <td>
                                  <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                  </div>
                                  {/* <img src={dottt} style={{ height: 40, width: 40,cursor:"pointer"}} /> */}
                                </td>


                              </tr>
                            )

                          })}
                          {currentRowTransaction?.length === 0 && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                            </tr>
                          )}

                        </tbody>
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
                                {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
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
                    </div>
</>
    )
}
export default UserListTransaction;