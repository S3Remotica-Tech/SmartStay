/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import PropTypes from "prop-types";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import Select from "react-select";
function UserEb(props) {
  const state = useSelector(state => state)


  const dispatch = useDispatch();

  const [EbrowsPerPage, setEbrowsPerPage] = useState(4);
  const [EbcurrentPage, setEbCurrentPage] = useState(1);
  const [EbFilterddata, setEbFilterddata] = useState([]);
  const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;
  const currentRowsEb = EbFilterddata?.slice(indexOfFirstRowEb, indexOfLastRowEb);
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

  const handleItemsPerPageChange = (selectedOption) => {
  if (selectedOption?.value) {
    setEbrowsPerPage(selectedOption.value);
    setEbCurrentPage(1);
  }
};








  useEffect(() => {
    if (selectedHostel) {
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



  useEffect(() => {
    setSelectedHostel(state.login.selectedHostel_Id);



  }, [props, state.login.selectedHostel_Id]);




  const totalPagesEb = Math.ceil(EbFilterddata?.length / EbrowsPerPage);


  useEffect(() => {
    setEbFilterddata(state?.UsersList?.customerdetails?.eb_data)
  }, [state?.UsersList?.customerdetails?.eb_data])
  return (
    <>

      <div>
        <div
          className=" booking-table-userlist  booking-table ms-2"
          style={{ paddingBottom: "20px" }}
        >
          {sortedData?.length > 0 ? (
            <div

              className='show-scrolls'
              style={{

                height: sortedData?.length >= 6 | sortedData?.length >= 6 ? "240px" : "auto",
                overflow: "auto",
                borderTop: "1px solid #E8E8E8",
                marginBottom: 20,
                marginTop: "20px",
                paddingRight: 0,
                paddingLeft: 0
              }}
            >
              <Table
                responsive="md"
                style={{
                  fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                  top: 0,
                  zIndex: 1,
                  borderRadius: 0
                }}
              >
                <thead style={{
                  fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 500, position: "sticky",
                  top: 0,
                  zIndex: 1
                }}>
                  <tr >

                    <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
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
                    <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px", paddingLeft: 5 }}> <div className="d-flex gap-1 align-items-center justify-content-start">
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
                          onClick={() => handleSort("Room_Name", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Room_Name", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Room
                    </div></th>
                    <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px", whiteSpace: "nowrap" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
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

                    <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px", whiteSpace: "nowrap" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
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
                    <th style={{ color: "#939393", fontWeight: 500, fontSize: "12px", fontFamily: "Gilroy", padding: "10px", textAlign: "start" }}> <div className="d-flex gap-1 align-items-center justify-content-start">
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
                <tbody style={{ height: "50px", fontSize: "11px", verticalAlign: 'middle' }}>
                  {sortedData?.map((u) => {
                    let Dated = new Date(u.reading_date);

                    let day = Dated.getDate();
                    let month = Dated.getMonth() + 1;
                    let year = Dated.getFullYear();

                    let formattedDate = `${day}/${month}/${year}`;
                    return (
                      <tr key={u.id} style={{ lineHeight: "20px" }}>

                        <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8", paddingTop: 10 }}
                          className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"  >
                          <div className="ps-1">{u.floor_name}</div>
                        </td>
                        <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-4 ps-sm-2 ps-md-3 ps-lg-3" >
                          <div className="ps-1">{u.Room_Name}</div>
                        </td>
                        <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 " >₹{u.start_meter}</td>
                        <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 " >{u.end_meter}</td>
                        <td style={{ borderBottom: "1px solid #E8E8E8" }}> <span style={{ backgroundColor: "#EBEBEB", paddingTop: "3px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "3px", borderRadius: "10px", lineHeight: "1.5em", margin: "0", fontSize: "11px", fontWeight: 500, fontFamily: "Gilroy" }} className="ps-4 ps-sm-2 ps-md-3 ps-lg-3" >{formattedDate}</span></td>
                        <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 " >{u.unit}</td>
                        <td style={{ fontWeight: 500, fontSize: "13px", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 " >{u.amount}</td>


                      </tr>
                    )

                  })}


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
        {EbFilterddata?.length > 4 && (

          <nav className="position-fixed bottom-0 end-0 left-0 mb-3 me-3 d-flex justify-content-end align-items-center"
   style={{backgroundColor:"white", zIndex:1000}}
          >
           <div>
  <Select
    value={ebOptions.find((opt) => opt.value === EbrowsPerPage)}
    onChange={handleItemsPerPageChange}
    options={ebOptions}
    placeholder="Items per page"
    classNamePrefix="custom"
    menuPlacement="auto"
    noOptionsMessage={() => "No options"}
    styles={{
      control: (base) => ({
        ...base,
        height: "40px",
        borderRadius: "6px",
        fontSize: "14px",
        color: "#1E45E1",
        fontFamily: "Gilroy",
        fontWeight: 600,
        border: "1px solid #1E45E1",
        boxShadow: "0 0 0 1px #1E45E1",
        cursor: "pointer",
        width: 90,
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
        fontFamily: "Gilroy",
      }),
      menuList: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        maxHeight: "200px",
        padding: 0,
        scrollbarWidth: "thin",
        overflowY: "auto",
        fontFamily: "Gilroy",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#555",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#1E45E1",
        cursor: "pointer",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      option: (base, state) => ({
        ...base,
        cursor: "pointer",
        backgroundColor: state.isFocused ? "#1E45E1" : "white",
        color: state.isFocused ? "#fff" : "#000",
      }),
    }}
  />
</div>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
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

              <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                {EbcurrentPage} of {totalPagesEb}
              </li>

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