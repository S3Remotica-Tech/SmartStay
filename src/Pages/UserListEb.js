/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import PropTypes from "prop-types";

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

        <div   style={{
                            // height: "400px",
                            height: currentRowsEb?.length >= 6? "290px" : "auto",
                            overflowY: "auto",
                            borderRadius: "24px",
                            border: "1px solid #DCDCDC",
                            // borderBottom:"none"
                          }}>
          <Table  responsive="md"
                            className="Table_Design"
                            style={{ border: "1px solid #DCDCDC",borderBottom:"1px solid transparent",borderEndStartRadius:0,borderEndEndRadius:0}}  >

            <thead style={{ backgroundColor: "#E7F1FF",
               position:"sticky",
               top:0,
               zIndex:1,
             }}>
              <tr >

                <th style={{ textAlign: "center", color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Floor</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px",paddingLeft:5 }}>Room</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Start Meter</th>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>End Meter</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px",textAlign:"start" }}>Date</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Unit</th>
                {/* <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Units used</th> */}
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px",textAlign:"center" }}>Amount</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}></th>
              </tr>
            </thead>
            <tbody style={{ height: "50px", fontSize: "11px" ,verticalAlign:'middle'}}>
              {currentRowsEb?.map((u) => {
                let Dated = new Date(u.reading_date);

                let day = Dated.getDate();
                let month = Dated.getMonth() + 1; // Months are zero-based
                let year = Dated.getFullYear();

                let formattedDate = `${day}/${month}/${year}`;
                return (
                  <tr key={u.id} style={{ lineHeight: "20px" }}>

                    <td style={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.floor_name}</td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy",}}>{u.Room_Id}</td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>₹{u.start_meter}</td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy"}}>{u.end_meter}</td>
                    <td> <span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.unit}</td>
                    {/* <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.Eb_Unit}</td> */}
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy",textAlign:"center" }}>{u.amount}</td>
                    <td style={{ cursor: "pointer" }}>
                      {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000,
                        }}
                    
                        onClick={(e) => handleShowDots(u.eb_Id,e)}
                      
                      >
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                        {activeId === u.eb_Id && (
                                    <>
                                      <div
                                        ref={popupRef}
                                        style={{
                                          cursor: "pointer",
                                          backgroundColor: "#fff",
                                          position: "fixed",
                                          top: popupPosition.top,
                                          left: popupPosition.left,
                                          // position: "absolute",
                                          // right: 50,
                                          // top: 20,
                                          width: 163,
                                          height: "auto",
                                          border: "1px solid #EBEBEB",
                                          borderRadius: 10,
                                          display: "flex",
                                          justifyContent: "start",
                                          padding: 10,
                                          alignItems: "center",
                                          zIndex: showDots ? 1000 : "auto",
                                        }}
                                      >
                                        <div
                                          style={{ backgroundColor: "#fff" }}
                                          className=""
                                        >
                                          <div
                                            className={"mb-3 d-flex justify-content-start align-items-center gap-2"}
                                            style={{
                                              // backgroundColor: props.ebEditPermission ? "#f9f9f9" : "#fff",
                                              cursor: props.ebEditPermission ? "not-allowed" : "pointer",
                                            }}
                                          
                                            // onClick={() => {
                                            //   if (!props.ebEditPermission) {
                                            //     handleEditRoomReading(u);
                                            //   }
                                            // }}
                                            
                                            
                                          >
                                            <img
                                              src={Edit}
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: props.ebEditPermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
                                              }}
                                              alt="Edit"
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: props.ebEditPermission ? "#ccc" : "#222222",
                                                cursor: props.ebEditPermission ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Edit
                                            </label>
                                          </div>



                                          <div
                                            className={"mb-2 d-flex justify-content-start align-items-center gap-2"}
                                            style={{
                                              // backgroundColor: props.ebDeletePermission ? "#f9f9f9" : "#fff",
                                              cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
                                            }}
                                              // onClick={() => {
                                            //   if (!props.ebDeletePermission) {
                                            //     handleDeleteShow(u);
                                            //   }
                                            // }}
                                          >
                                            <img
                                              src={Delete}
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: props.ebDeletePermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
                                              }}
                                              alt="Delete"
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: props.ebDeletePermission ? "#ccc" : "#FF0000", // Change text color if disabled
                                                cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Delete
                                            </label>
                                          </div>

                                        </div>
                                      </div>
                                    </>
                                  )}
                      </div> */}
                    
                    </td>

                  </tr>
                )

              })}
              {currentRowsEb?.length === 0 && (
                <tr style={{width:"100%"}}>
                <td colSpan="10" style={{ textAlign: "center", color: "red", fontFamily:"Gilroy", fontSize:14 }}>No data found</td>
              </tr>
              )}

            </tbody>
          </Table>

        </div>

        {EbFilterddata?.length >= 6 && (

           <nav
           style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            padding: "10px",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            backgroundColor: "#fff", // Optional: to give a background for better visibility
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: to add some shadow
            borderRadius: "5px", // Optional: to make edges rounded
          }}
                             >
                               {/* Dropdown for Items Per Page */}
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