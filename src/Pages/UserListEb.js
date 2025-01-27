import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';

function UserEb(props) {
  const state = useSelector(state => state)
 const dispatch = useDispatch();

  // const EbrowsPerPage = 10;
  const [EbrowsPerPage, setEbrowsPerPage] = useState(10);
  const [EbcurrentPage, setEbCurrentPage] = useState(1);
  const [EbFilterddata, setEbFilterddata] = useState([]);
  const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;
  const currentRowsEb = EbFilterddata?.slice(indexOfFirstRowEb, indexOfLastRowEb);
const [activeId, setActiveId] = useState(null);
 const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showDots, setShowDots] = useState("");
const popupRef = useRef(null);

  const handleEbPageChange = (EbpageNumber) => {
    setEbCurrentPage(EbpageNumber);

  }
    const handleItemsPerPageChange = (event) => {
      setEbrowsPerPage(Number(event.target.value));
    };

    // const handleShowDots = (item) => {
    //    console.log("ClickedID:", item); // Debugging
    //    setActiveId((prevId) => (prevId === item.id ? null : item.id)); // Toggle logic
       
    //  };
    const handleShowDots = (eb_Id,event) => {
      setActiveId((prevActiveRow) => (prevActiveRow === eb_Id ? null : eb_Id)); 
  
      const { top, left, width, height } = event.target.getBoundingClientRect();
      const popupTop = top + (height / 2);
      const popupLeft = left - 200;
  
      setPopupPosition({ top: popupTop, left: popupLeft });
  

    };
     const handleClickOutside = (event) => {
       if (popupRef.current && !popupRef.current.contains(event.target)) {
         setActiveId(null);
       }
     };
      useEffect(() => {
         document.addEventListener('mousedown', handleClickOutside);
         return () => {
           document.removeEventListener('mousedown', handleClickOutside);
         };
       }, []); 

       const handleEditRoomReading = (item) => {
        console.log(item,"items");
        
      props.handleEditRoomItem(item)
        
        
        
        dispatch({ type: 'USERREADINGTRUE' });
      
      
      
        
      };
      const handleEditHostelReading = (item) => {
        console.log(item,"items");
        
      props.handleEditHostelItem(item)
        
        
        
        dispatch({ type: 'USERREADINGTRUE' });
      
      
      
        // props.setRoomDetail(false)
      };
  
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
                            height: currentRowsEb.length >= 3 ? "250px" : "auto",
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
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Room</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Start meter</th>

                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>End meter</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Date</th>
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>unit</th>
                {/* <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Units used</th> */}
                <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Amount</th>
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
                    <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{u.amount}</td>
                    <td style={{ cursor: "pointer" }}>
                      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000,  backgroundColor: activeId === u.eb_Id  ? "#E7F1FF"  : "white", }}
                    
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
                                            onClick={() => {
                                              if (!props.ebEditPermission) {
                                                // Check if it's a room or hostel and trigger the correct modal
                                                if (u.type == 1) {
                                                  handleEditRoomReading(u); // Trigger room-based modal
                                                } else{
                                                  handleEditHostelReading(u); // Trigger hostel-based modal
                                                }
                                              }
                                            }}
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
                      </div>
                      {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
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

        {currentRowsEb?.length > 0 && (

           <nav
                               style={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "end", // Align dropdown and pagination
                                 padding: "10px",
                                 // borderTop: "1px solid #ddd",
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
                                    <option value={5}>5</option>
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
export default UserEb;