/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import PropTypes from "prop-types";
import Emptystate from "../Assets/Images/Empty-State.jpg";

function UserEb(props) {
  const state = useSelector(state => state)
  
  
 const dispatch = useDispatch();

  // const EbrowsPerPage = 10;
  const [EbrowsPerPage, setEbrowsPerPage] = useState(6);
  const [EbcurrentPage, setEbCurrentPage] = useState(1);
  const [EbFilterddata, setEbFilterddata] = useState([]);
  const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;
  const currentRowsEb = EbFilterddata?.slice(indexOfFirstRowEb, indexOfLastRowEb);
  const [selectedHostel, setSelectedHostel] = useState("");
// const popupRef = useRef(null);

  const handleEbPageChange = (EbpageNumber) => {
    setEbCurrentPage(EbpageNumber);

  }
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    
      const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return currentRowsEb;
    
        const sorted = [...currentRowsEb].sort((a, b) => {
          const valueA = a[sortConfig.key];
          const valueB = b[sortConfig.key];
    
          if (!isNaN(valueA) && !isNaN(valueB)) {
            return sortConfig.direction === "asc"
              ? valueA - valueB
              : valueB - valueA;
          }
    
          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortConfig.direction === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
    
          return 0;
        });
    
        return sorted;
      }, [currentRowsEb, sortConfig]);
      const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
      };
  
    const handleItemsPerPageChange = (event) => {
      setEbrowsPerPage(Number(event.target.value));
      setEbCurrentPage(1)
    };

   
    

    

    
  
      useEffect(() => {
         if(selectedHostel){
           dispatch({
             type: "EB-BILLING-UNIT-LIST",
             payload: { hostel_id: selectedHostel },
           });
         }
       
       }, [selectedHostel]);

        useEffect(() => {
           if (selectedHostel) {
             dispatch({
               type: "HOSTELBASEDEBLIST",
               payload: { hostel_id: selectedHostel },
             });
           }
         }, [selectedHostel]);
        // useEffect(() => {
        //    const FilterHostelBased = state.Settings.EBBillingUnitlist?.filter(
        //      (item) => item.hostel_id == selectedHostel
        //    );
       
        //    if (Array.isArray(FilterHostelBased) && FilterHostelBased.length > 0) {
        //      setHostelBased(FilterHostelBased[0]?.hostel_based);
        //      setHostelName(FilterHostelBased[0]?.Name);
        //    } else {
        //      console.log("unitAmount is not a valid array or is empty.");
        //    }
        //  }, [state.Settings.EBBillingUnitlist, selectedHostel]);

        // useEffect(() => {
        //   if (selectedHostel) {
        //     console.log("selectedHostel", selectedHostel);
        //     const FilterRoomBased = state.Settings.EBBillingUnitlist?.filter(
        //       (item) => item.hostel_id == selectedHostel
        //     );
        
        //     if (Array.isArray(FilterRoomBased) && FilterRoomBased.length > 0) {
        //       const roomValue = Number(FilterRoomBased[0]?.room_based);
        //       console.log("Setting roomBased to:", roomValue);
        //       setRoomBased(roomValue);
        //     }
        //   }
        // }, [selectedHostel, state.Settings.EBBillingUnitlist]);
        

        //  useEffect(() => {
        //   if (selectedHostel) {
        //     console.log("selectedHostel", selectedHostel);
        //     const FilterHostelBased = state.Settings.EBBillingUnitlist?.filter(
        //       (item) => item.hostel_id == selectedHostel
        //     );
        
        //     if (Array.isArray(FilterHostelBased) && FilterHostelBased.length > 0) {
        //       console.log("hostelBased updated to:", FilterHostelBased[0]?.hostel_based);
        //       setHostelBased(FilterHostelBased[0]?.hostel_based);
        //       setHostelName(FilterHostelBased[0]?.Name);
        //     }
        //   }
        // }, [selectedHostel, state.Settings.EBBillingUnitlist]);
        
        useEffect(() => {
          setSelectedHostel(state.login.selectedHostel_Id);
      
        
      
      }, [props, state.login.selectedHostel_Id]);
      

       
  
  const totalPagesEb = Math.ceil(EbFilterddata?.length / EbrowsPerPage);
  // const renderPageNumbersEb = () => {
  //   const pageNumbersEb = [];
  //   let startPageEb = EbcurrentPage - 1;
  //   let endPageEb = EbcurrentPage + 1;

  //   if (EbcurrentPage === 1) {
  //     startPageEb = 1;
  //     endPageEb = 3;
  //   }

  //   if (EbcurrentPage === totalPagesEb) {
  //     startPageEb = totalPagesEb - 2;
  //     endPageEb = totalPagesEb;
  //   }

  //   if (EbcurrentPage === 2) {
  //     startPageEb = 1;
  //     endPageEb = 3;
  //   }

  //   if (EbcurrentPage === totalPagesEb - 1) {
  //     startPageEb = totalPagesEb - 2;
  //     endPageEb = totalPagesEb;
  //   }

  //   for (let i = startPageEb; i <= endPageEb; i++) {
  //     if (i > 0 && i <= totalPagesEb) {
  //       pageNumbersEb.push(
  //         <li key={i} style={{ margin: '0 5px' }}>
  //           <button
  //             style={{
  //               padding: '5px 10px',
  //               textDecoration: 'none',
  //               color: i === EbcurrentPage ? '#007bff' : '#000000',
  //               cursor: 'pointer',
  //               borderRadius: '5px',
  //               display: 'inline-block',
  //               minWidth: '30px',
  //               textAlign: 'center',
  //               backgroundColor: i === EbcurrentPage ? 'transparent' : 'transparent',
  //               border: i === EbcurrentPage ? '1px solid #ddd' : 'none'
  //             }}
  //             onClick={() => handleEbPageChange(i)}
  //           >
  //             {i}
  //           </button>
  //         </li>
  //       );
  //     }
  //   }

  //   return pageNumbersEb;
  // };

  useEffect(() => {
    setEbFilterddata(state?.UsersList?.customerdetails?.eb_data)
  }, [state?.UsersList?.customerdetails?.eb_data])
  return (
    <>

      <div>
      <div
                                                     className=" booking-table-userlist  booking-table"
                                                     style={{ paddingBottom: "20px" }}
                                                   >
                                                     {sortedData?.length > 0 ? (
                                                      <div
                                                       
                                                        className='show-scrolls'
                                                        style={{
                                                         
                                                          height: sortedData?.length >= 5 || sortedData?.length >= 5 ? "280px" : "auto",
                                                          overflow: "auto",
                                                          borderTop: "1px solid #E8E8E8",
                                                          marginBottom: 20,
                                                          marginTop: "20px",
                                                          paddingRight:0,
                                                          paddingLeft:0
                                                          //  borderBottom:"1px solid #DCDCDC"
                                                        }}
                                                      >
                                                        <Table
                                                          responsive="md"
                                                          // className="Table_Design"
                                                          style={{
                                                            fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                                            top: 0,
                                                            zIndex: 1,
                                                            borderRadius:0
                                                          }}
                                                        >
                                                          <thead style={{
                                                                       fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                                                       top: 0,
                                                                       zIndex: 1
                                                                     }}>
              <tr >

                <th style={{  color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("floor_name", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("floor_name", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                    Floor
                                                  </div></th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px",paddingLeft:5 }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("Room_Id", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("Room_Id", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                    Room
                                                  </div></th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px",whiteSpace:"nowrap" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("start_meter", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("start_meter", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                    Start Meter
                                                  </div></th>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px",whiteSpace:"nowrap" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("end_meter", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("end_meter", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                    End Meter
                                                  </div></th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px",textAlign:"start" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("reading_date", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("reading_date", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                    Date
                                                  </div></th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("unit", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("unit", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                   Unit
                                                  </div></th>
                {/* <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Units used</th> */}
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "2px",
                                                      }}
                                                    >
                                                      <ArrowUp2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("amount", "asc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                      <ArrowDown2
                                                        size="10"
                                                        variant="Bold"
                                                        color="#1E45E1"
                                                        onClick={() => handleSort("amount", "desc")}
                                                        style={{ cursor: "pointer" }}
                                                      />
                                                    </div>
                                                    Amount
                                                  </div></th>
               
              </tr>
            </thead>
            <tbody style={{ height: "50px", fontSize: "11px" ,verticalAlign:'middle'}}>
              {sortedData?.map((u) => {
                let Dated = new Date(u.reading_date);

                let day = Dated.getDate();
                let month = Dated.getMonth() + 1; // Months are zero-based
                let year = Dated.getFullYear();

                let formattedDate = `${day}/${month}/${year}`;
                return (
                  <tr key={u.id} style={{ lineHeight: "20px" }}>

                    <td style={{  fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8",paddingTop:10 }}>{u.floor_name}</td>
                    <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"}}>{u.Room_Id}</td>
                    <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }}>₹{u.start_meter}</td>
                    <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"}}>{u.end_meter}</td>
                    <td style={{borderBottom: "1px solid #E8E8E8"}}> <span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "11px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                    <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }}>{u.unit}</td>
                    {/* <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Eb_Unit}</td> */}
                    <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }}>{u.amount}</td>
                   

                  </tr>
                )

              })}
           

            </tbody>
          </Table>

        </div>
      ):
      <div style={{ marginTop: 30 }}>
                          <div style={{ textAlign: "center" }}>
                            <img src={Emptystate} alt="emptystate" />
                          </div>
                          <div
                            className="pb-1"
                            style={{
                              textAlign: "center",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              fontSize: 20,
                              color: "rgba(75, 75, 75, 1)",
                            }}
                          >
                            No Electricity available
                          </div>
                          <div
                            className="pb-1"
                            style={{
                              textAlign: "center",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              fontSize: 16,
                              color: "rgba(75, 75, 75, 1)",
                            }}
                          >
                            There are no Electricity added.
                          </div>
                        </div>}
      </div>
        {EbFilterddata?.length >= 6 && (

<nav
style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  padding: "10px",
}}
>
<div>
  <select
    value={EbrowsPerPage}
    onChange={handleItemsPerPageChange}
    style={{
      padding: "5px",
      border: "1px solid #1E45E1",
      borderRadius: "5px",
      color: "#1E45E1",
      fontWeight: "bold",
      cursor: "pointer",
      outline: "none",
      boxShadow: "none",
    }}
  >
                                    <option value={6}>6</option>
                                   <option value={10}>10</option>
                                   <option value={50}>50</option>
                                   <option value={100}>100</option>
                                 </select>
                               </div>
                             
                               {/* Pagination Controls */}
                               <ul
                                 style={{
                                   display: "flex",
                                   alignItems: "center",
                                   listStyleType: "none",
                                   margin: 0,
                                   padding: 0,
                                 }}
                               >
                                 {/* Previous Button */}
                                 <li style={{ margin: "0 10px" }}>
                                   <button
                                     style={{
                                       padding: "5px",
                                       textDecoration: "none",
                                       color: EbcurrentPage === 1 ? "#ccc" : "#1E45E1",
                                       cursor: EbcurrentPage === 1 ? "not-allowed" : "pointer",
                                       borderRadius: "50%",
                                       display: "inline-block",
                                       minWidth: "30px",
                                       textAlign: "center",
                                       backgroundColor: "transparent",
                                       border: "none",
                                     }}
                                     onClick={() => handleEbPageChange(EbcurrentPage - 1)}
                                     disabled={EbcurrentPage === 1}
                                   >
                                     <ArrowLeft2 size="16" color={EbcurrentPage === 1 ? "#ccc" : "#1E45E1"} />
                                   </button>
                                 </li>
                             
                                 {/* Current Page Indicator */}
                                 <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                                   {EbcurrentPage} of {totalPagesEb}
                                 </li>
                             
                                 {/* Next Button */}
                                 <li style={{ margin: "0 10px" }}>
                                   <button
                                     style={{
                                       padding: "5px",
                                       textDecoration: "none",
                                       color: EbcurrentPage === totalPagesEb ? "#ccc" : "#1E45E1",
                                       cursor: EbcurrentPage === totalPagesEb ? "not-allowed" : "pointer",
                                       borderRadius: "50%",
                                       display: "inline-block",
                                       minWidth: "30px",
                                       textAlign: "center",
                                       backgroundColor: "transparent",
                                       border: "none",
                                     }}
                                     onClick={() => handleEbPageChange(EbcurrentPage + 1)}
                                     disabled={EbcurrentPage === totalPagesEb}
                                   >
                                     <ArrowRight2
                                       size="16"
                                       color={EbcurrentPage === totalPagesEb ? "#ccc" : "#1E45E1"}
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

UserEb.propTypes = {
  handleEditRoomItem: PropTypes.func.isRequired,
  handleDeleteRoomItem: PropTypes.func.isRequired,
  handleDeleteRoomReading: PropTypes.func.isRequired,
  handleEditHostelItem: PropTypes.func.isRequired,
  handleDeleteHostelItem: PropTypes.func.isRequired,
};
export default UserEb;