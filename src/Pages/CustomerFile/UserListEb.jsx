/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import PropTypes from "prop-types";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
// import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import PaginationList from "../../Components/PaginationList";

function UserEb(props) {
  const state = useSelector(state => state)


  const dispatch = useDispatch();

  // const [EbrowsPerPage, setEbrowsPerPage] = useState(4);
  // const [EbcurrentPage, setEbCurrentPage] = useState(1);
  // const [EbFilterddata, setEbFilterddata] = useState([]);
  const [tenantReadingList, setTenantreadingList] = useState([])
  // const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  // const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;

  // const [selectedHostel, setSelectedHostel] = useState("");

  // const handleEbPageChange = (EbpageNumber) => {
  //   setEbCurrentPage(EbpageNumber);

  // }


  // const ebOptions = [
  //   { value: 4, label: "4" },
  //   { value: 10, label: "10" },
  //   { value: 50, label: "50" },
  //   { value: 100, label: "100" },
  // ];

  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });



  // const canReadElectricity = useHasPermission("Electricity", "canRead")
  //   const canWriteElectricity = useHasPermission("Electricity", "canWrite");
  //   const canUpdateElectricity = useHasPermission("Electricity", "canUpdate");
  //   const canDeleteElectricity = useHasPermission("Electricity", "canDelete");



  const {
    // canWriteModule: canWriteElectricity,
    canReadModule: canReadElectricity,
    // canUpdateModule: canUpdateElectricity,
    // canDeleteModule: canDeleteElectricity,
  } = useHasPermission("Electricity");













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

    const [, month, year] = item.startDate.split("/");

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

      <div className="mt-2">
        <div className="mt-2 pb-5">
          {
            !canReadElectricity ? (

              <div className="flex flex-col items-center justify-center min-h-[45vh]">
                <ErrorMessage message={['You do not have access to view Eb Reading']} type="warning" />
              </div>
            )
              :

              formattedTenantReadings?.length > 0 ? (
                <div className="mx-3 bg-white shadow-md max-h-[320px] overflow-y-auto">
                  <Table bordered={false} className="align-middle mb-0">
                    <thead className="bg-[rgba(231,241,255,1)] sticky top-0 z-2">
                      <tr className="text-left">
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">BILLING MONTH</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">FROM</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">TO</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">FLOOR</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">ROOM</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">BED</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">TOTAL UNITS</th>
                        <th className="font-gilroy text-gray-500 font-bold text-[13px]">AMOUNT</th>
                      </tr>

                    </thead>
                    <tbody className="text-xs align-middle font-gilroy">
                      <PaginationList>
                        {formattedTenantReadings?.map((row, i) => (
                          <tr key={i}
                            className="border-b border-[#F9FAFF] font-gilroy text-[14px] font-medium"
                          >

                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.billingMonth}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.from}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.to}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.floor}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.room}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.bed}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.totalUnits}</td>
                            <td className="p-2 text-[13px] font-medium text-gray-400 font-gilroy">{row.amount}</td>
                          </tr>
                        ))}
                      </PaginationList>
                    </tbody>
                  </Table>
                </div>
              ) :
                <div className="mt-4 flex justify-center">
                  <div>

                    <div className="text-center">
                      <img src={Emptystate} alt="emptystate" />
                    </div>

                    <div className="pb-1 text-center font-bold font-gilroy text-[16px] text-[#4B4B4B]">
                      No Electricity available
                    </div>
                    <div className="pb-1 text-center font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                      There are no Electricity added.
                    </div>
                  </div>
                </div>
          }
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
  id: PropTypes.func.isRequired
};
export default UserEb;