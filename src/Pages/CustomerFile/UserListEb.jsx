/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import PropTypes from "prop-types";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import PaginationList from "../../Components/PaginationList";

function UserEb(props) {
  const state = useSelector(state => state)

console.log("props",props)
  const dispatch = useDispatch();

  const [EbrowsPerPage, setEbrowsPerPage] = useState(4);
  const [EbcurrentPage, setEbCurrentPage] = useState(1);
  const [EbFilterddata, setEbFilterddata] = useState([]);
   const [tenantReadingList, setTenantreadingList] = useState([])
  const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;

  const [selectedHostel, setSelectedHostel] = useState("");

  const handleEbPageChange = (EbpageNumber) => {
    setEbCurrentPage(EbpageNumber);

  }


const ebOptions = [
  { value: 4, label: "4" },
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });



// const canReadElectricity = useHasPermission("Electricity", "canRead")
//   const canWriteElectricity = useHasPermission("Electricity", "canWrite");
//   const canUpdateElectricity = useHasPermission("Electricity", "canUpdate");
//   const canDeleteElectricity = useHasPermission("Electricity", "canDelete");



const {
        canWriteModule: canWriteElectricity,
        canReadModule: canReadElectricity,
        // canUpdateModule: canUpdateElectricity,
        canDeleteModule: canDeleteElectricity,
      } = useHasPermission("Electricity");





  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return tenantReadingList;

    const sorted = [...tenantReadingList].sort((a, b) => {
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
  }, [tenantReadingList, sortConfig]);
  
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const handleItemsPerPageChange = (selectedOption) => {
  if (selectedOption?.value) {
    setEbrowsPerPage(selectedOption.value);
    setEbCurrentPage(1);
  }
};



console.log("sortedData",sortedData)




  // useEffect(() => {
  //   if (selectedHostel) {
  //     dispatch({
  //       type: "EB-BILLING-UNIT-LIST",
  //       payload: selectedHostel ,
  //     });
  //   }

  // }, [selectedHostel]);

  // useEffect(() => {
  //   if (selectedHostel) {
  //     dispatch({
  //       type: "HOSTELBASEDEBLIST",
  //       payload: { hostel_id: selectedHostel },
  //     });
  //   }
  // }, [selectedHostel]);



  useEffect(() => {
    setSelectedHostel(state.login.selectedHostel_Id);



  }, [props, state.login.selectedHostel_Id]);




  const totalPagesEb = Math.ceil(EbFilterddata?.length / EbrowsPerPage);


  useEffect(() => {
    setEbFilterddata(state?.UsersList?.customerdetails?.eb_data)
  }, [state?.UsersList?.customerdetails?.eb_data])



 useEffect(() => {
        if (state.login?.selectedHostel_Id && props?.id) {
            dispatch({
                type: 'GETPARTICULARCUSTOMERREADING', 
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    customerId: props?.id
                }
            })
                   }

    }, [])



useEffect(() => {
        if (state.UsersList.getParticularCustomerReadingStatus === 200) {
            // setLoading(false)
                         setTenantreadingList(state.UsersList?.getParticularCustomerReadingList)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_PARTICULAR_CUSTOMER_READING' })
            }, 100)

        }

    }, [state.UsersList.getParticularCustomerReadingStatus])

const formattedTenantReadings = (tenantReadingList?.electricityHistory || []).map((item) => {
 
  const [day, month, year] = item.startDate.split("/");

  const billingMonth = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  
  const formatDate = (dateStr) => {
    const [d, m, y] = dateStr.split("/").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return {
    billingMonth,
    from: formatDate(item.startDate),
    to: formatDate(item.endDate),
    floor: item.floorName || tenantReadingList.floorName,
    room: item.roomName || tenantReadingList.roomName,
    bed: item.bedName || tenantReadingList.bedName,
    totalUnits: item.consumption || 0,
    amount: item.amount || 0,
    profilePic: tenantReadingList.profilePic || null,
    tenantName: `${tenantReadingList.firstName || ""} ${tenantReadingList.lastName || ""}`.trim(),
  };
});


  return (
    <>

      <div>
        <div
          className=" booking-table-userlist  booking-table ms-2"
          style={{ paddingBottom: "20px" }}
        >
          {
          
          !canReadElectricity ? (

 <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                              minHeight:"45vh"
                              }}
            >
              
              <ErrorMessage message={['You do not have access to view Eb Reading']} type="warning"/>

            </div>


          )
          
          
          : 
          
          
          
          
          
          
          formattedTenantReadings?.length > 0 ? (
             <div
                                       className="table-responsive mx-4"
                                       style={{
                                           background: "#fff",
                                           borderRadius: 12,
                                           boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                                           maxHeight: "420px",
                                           overflowY: "auto",
                                       }}
                                   >
                                       <Table bordered={false} className="align-middle mb-0">
                                           <thead
                                               style={{
                                                   backgroundColor: "rgba(231, 241, 255, 1)",
                                                   position: "sticky",
                                                   top: 0,
                                                   zIndex: 2,
                                               }}
                                           >
                                               <tr className="text-uppercase">
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                                       BILLING MONTH
                                                   </th>
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                                       FROM
                                                   </th>
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                                       TO
                                                   </th>
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                                       FLOOR
                                                   </th>
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                                       ROOM
                                                   </th>
           
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                                       BED
                                                   </th>
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                                       TOTAL UNITS
                                                   </th>
                                                   <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                                       AMOUNT
                                                   </th>
                                               </tr>
                                           </thead>
                                           <tbody style={{ fontSize: 14, color: "#000" }}>
                                               <PaginationList>
                                                   {formattedTenantReadings?.map((row, i) => (
                                                       <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px", fontFamily:"Gilroy" }}>
           
                                                           <td style={{ paddingLeft: "40px" }}>{row.billingMonth}</td>
                                                           <td style={{ paddingLeft: "10px" }}>{row.from}</td>
                                                           <td style={{ paddingLeft: "5px" }}>{row.to}</td>
                                                           <td style={{ paddingLeft: "10px", }}>{row.floor}</td>
                                                           <td style={{ paddingLeft: "10px",  }}>{row.room}</td>
                                                           <td style={{ paddingLeft: "10px", }}>{row.bed}</td>
                                                           <td style={{ paddingLeft: "40px", }}>{row.totalUnits}</td>
                                                           <td style={{ paddingLeft: "25px",  }}>{row.amount}</td>
           
           
           
                                                       </tr>
                                                   ))}
                                               </PaginationList>
                                           </tbody>
                                       </Table>
                                   </div>
          ) :
            <div style={{ marginTop: 25 }}>
              <div style={{ textAlign: "center" }}>
                <img src={Emptystate} alt="emptystate" />
              </div>
              <div
                className="pb-1"
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: 16,
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
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                }}
              >
                There are no Electricity added.
              </div>
            </div>}
        </div>
        
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