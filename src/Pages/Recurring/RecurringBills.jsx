/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { InputGroup, Table, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
// import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
// import Calendars from "../../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import RecurringBillList from "../../Pages/Recurring/RecurringBillList";
import { CloseCircle, } from "iconsax-react";
import '../OthersComponent/BillPdfModal.css';
// import AxiosConfig from "../../WebService/AxiosConfig";
// import Swal from 'sweetalert2';
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
// import { HiMiniBars3BottomLeft } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
// import withErrorBoundary from "../../Hoc/WithErrorBountry";
// import BillsFilter from '../../Pages/Bills/BillsFilter'
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";

function RecurringBills() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [recurLoader, setRecurLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  //  const dropdownRef = useRef(null);
  const [recurringbills, setRecurringBills] = useState([]);
  //  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [originalRecuiring, setOriginalRecuiring] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [activeStay, setActiveStay] = useState("long_stay");

  const {
    canReadModule: canReadRecurring,
  } = useHasPermission("Recurring bills");









  useEffect(() => {
    if (!canReadRecurring) {
      setRecurLoader(false)
    } 

  }, [canReadRecurring])



  const handleClick = (stayType) => {
    setActiveStay(stayType);
  };


  useEffect(() => {
    const initialState = {};
    recurringbills?.forEach((item) => {
      initialState[item.customerId] = item.currentStatus === true;
    });
    setCheckedRows(initialState);
  }, [recurringbills]);



  const handleToggle = (id) => {

    if (!id) return;

    const updatedValue = !checkedRows[id];
    const stringValue = updatedValue ? "true" : "false";

    setCheckedRows((prev) => ({
      ...prev,
      [id]: updatedValue,
    }));

    dispatch({
      type: "UPDATE_TENANT_RECURRING",
      payload: {
        status: stringValue,
        hostelId: state.login.selectedHostel_Id,
        customerId: id
      },
    });
  };








  useEffect(() => {
    if (state.InvoiceList.updateTenantRecurringStatusCode) {

      dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: 'REMOVE_UPDATE_TENANT_RECURRING' })
      }, 100)
    }

  }, [state.InvoiceList.updateTenantRecurringStatusCode])






  useEffect(() => {
    if (state.InvoiceList.CustomerRecurringEnableDisableStatusCode === 200) {
      dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })
      setLoading(true)
      dispatch({ type: 'REMOVE_CUSTOMER_RECURRING_ENABLE_DISABLE' })


    }

  }, [state.InvoiceList.CustomerRecurringEnableDisableStatusCode])




  useEffect(() => {
    setLoading(false);
    setRecurLoader(false)

  }, [state.InvoiceList.RecurringBills])





  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false)
      // setShowLoader(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])



  // const [dropdownValue, setDropdownValue] = useState("");







  const sortedDataRecure = React.useMemo(() => {
    return Array.isArray(recurringbills) ? recurringbills : [];
  }, [recurringbills]);







  const handleDeleteRecurringbills = (item) => {
    if (item) {
      dispatch({
        type: "DELETE-RECURRING-BILLS",
        payload: { id: item.recuire_id, user_id: item.user_id },
      });
    }
  };


  useEffect(() => {

    if (state.login?.selectedHostel_Id) {
      setRecurLoader(true);
      dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })
    }
  }, [state.login?.selectedHostel_Id, activeStay]);











  useEffect(() => {
    if (state.InvoiceList?.RecurringbillsgetStatuscode === 200) {
      setRecurLoader(false);
      setRecurringBills(state.InvoiceList.RecurringBills?.customers);
      setOriginalRecuiring(state.InvoiceList.RecurringBills)

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.RecurringbillsgetStatuscode]);

  useEffect(() => {
    if (
      state.InvoiceList.RecurringBillAddStatusCode === 200 ||
      state.InvoiceList.deleterecurringbillsStatuscode
    ) {
      dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })
      setRecurringBills(state.InvoiceList.RecurringBills);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_ADD" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.RecurringBillAddStatusCode,
    state.InvoiceList.deleterecurringbillsStatuscode,
  ]);



  useEffect(() => {
    if (recurringbills?.length > 0 && originalRecuiring?.length === 0) {
      setOriginalRecuiring(recurringbills);
    }
  }, [recurringbills]);

  const handleSearch = () => {
    setSearch(!search);
    dispatch({
      type: "SET_INVOICE_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        createdBy: [],
        createdByLabels: [],
        modes: [],
        paymentStatus: [],
        search: "",
      },
    })

  };


  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])






  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target)

  //     ) {
  //       setDropdownVisible(false);

  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const headerStyle = {
    textAlign: "start",
    fontFamily: "Gilroy",
    color: "rgb(147, 147, 147)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.4",
    padding: 8,
    verticalAlign: "middle",
  };


  const labelStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    height: "100%",
    lineHeight: "1.4", marginTop: 5
  };








  return (
    <div className="sticky-top bg-white" style={{ position: "relative" }}>
      <div className=" d-flex justify-content-between align-items-center  flex-wrap h-auto"
        style={{
          position: 'sticky',
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        <div style={{ marginTop: 0 }}>
          <label style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>
            Recurring</label>
        </div>

        <div className=" d-flex justify-content-between gap-2 align-items-center flex-wrap p-2">



          <div style={{
            backgroundColor: "", color: "", border: "1px solid #CBD5E1", borderRadius: "50%",
            padding: "6px 8px", lineHeight: "normal", height: "fit-content"
          }}>
            <FiSearch
              style={{
                height: "20px",
                width: "20px",
                cursor: canReadRecurring ? "pointer" : "not-allowed",
                opacity: canReadRecurring ? 1 : 0.4,
                pointerEvents: canReadRecurring ? "auto" : "none",
                transition: "opacity 0.3s ease"
              }}
              onClick={handleSearch}
            />
          </div>

          {
            search &&

            <div className='me-3  flex flex-wrap ' style={{
              position: 'relative', cursor: "pointer", marginTop: 0
            }}>
              <InputGroup
                style={{
                  maxWidth: "100%",
                  flexWrap: 'nowrap', fontFamily: "Gilroy"
                }}
              >

                <FormControl size="lg"
                  //    value={searchQuery}
                  //    onChange={handleInputChange}

                  style={{
                    width: "100%",
                    maxWidth: "235px",
                    boxShadow: "none",
                    borderColor: "lightgray", fontFamily: "Gilroy",
                    borderRight: "none", fontSize: 15, fontWeight: 500, color: "#222",
                  }}
                  placeholder="Search..."
                />
                <InputGroup.Text style={{ backgroundColor: "#ffffff", cursor: "pointer" }}>
                  <CloseCircle size="24" color="#222"
                  //    onClick={handleCloseSearch}
                  />
                </InputGroup.Text>
              </InputGroup>



            </div>

          }
          <div className='me-2' style={{ marginTop: 0, cursor: "pointer" }}>
            <img src={excelimg} alt='excel' width={38} height={38}

              style={{
                cursor: canReadRecurring ? "pointer" : "not-allowed",
                opacity: canReadRecurring ? 1 : 0.4,
                pointerEvents: canReadRecurring ? "auto" : "none",
                transition: "opacity 0.3s ease"
              }}
            //    onClick={() => { if (canReadRecurring) handleAssetsExcel() }}
            />
          </div>


        </div>
      </div>

      {!canReadRecurring ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 95

            }}
          >

            <img
              src={Emptystate}
              alt="Empty State"

            />



            <ErrorMessage message={['You do not have access to view Recurring']} type="warning" />

          </div>
        </>
      ) : (
        <>


          <div className="d-flex gap-3 align-items-center mt-1  mb-0">
            <button
              onClick={() => handleClick("long_stay")}
              style={{
                backgroundColor: activeStay === "long_stay" ? "#1E45E1" : "#fff",
                color: activeStay === "long_stay" ? "#fff" : "#1E1E1E",
                fontFamily: "Gilroy",
                fontWeight: 600,
                padding: "8px 25px",
                borderRadius: 20,
                border: activeStay === "long_stay" ? "1px solid #1E45E1" : "1px solid #D6D6D6",
                fontSize: 12,
              }}
            >
              Long Stay
            </button>

            <button
              onClick={() => handleClick("short_stay")}
              style={{
                backgroundColor: activeStay === "short_stay" ? "#1E45E1" : "#fff",
                color: activeStay === "short_stay" ? "#fff" : "#1E1E1E",
                fontFamily: "Gilroy",
                fontWeight: 600,
                padding: "8px 25px",
                borderRadius: 20,
                border: activeStay === "short_stay" ? "1px solid #1E45E1" : "1px solid #D6D6D6",
                fontSize: 12,
              }}
            >
              Short Stay
            </button>
          </div>

          {!recurLoader &&
            (!recurringbills || recurringbills.length === 0) &&
            activeStay === 'long_stay' ?
            (
              <div className="mt-2 flex justify-center">
                                  <div>
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img src={Emptystate} alt="emptystate" />
                </div>
                <div
                  className="pb-1"
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 18,
                    color: "rgba(75, 75, 75, 1)",
                  }}
                >
                  No {activeStay} Recuring bills available{" "}
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
                  There are no Recuring bills added{" "}
                </div>
              </div>
                   </div>
            ) : !recurLoader && activeStay === 'short_stay' ?
              <div className="mt-5"
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f2f6fc",
                  borderRadius: "10px",
                  marginRight: "20px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  border: "1px dashed #b0c4de",

                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="Coming Soon"
                    width="80"
                    height="80"
                    style={{ marginBottom: "15px", opacity: 0.7 }}
                  />

                  <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                </div>
              </div>
             :
              ""}



          {!loading && recurLoader &&
            <div
              style={{
                position: 'absolute',
                top: 200,
                right: 0,
                bottom: 0,
                left: 200,
                display: 'flex',
                height: "50vh",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                opacity: 0.75,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  borderTop: '4px solid #1E45E1',
                  borderRight: '4px solid transparent',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>

          }

          {recurringbills && recurringbills.length > 0 && activeStay === 'long_stay' && (
            <div
              className=" booking-table-userlist  booking-table ms-2 me-4 mt-4"
              style={{ paddingBottom: "20px", marginLeft: "-22px" }}
            >

              <div
                className='show-scrolls '
                style={{
                  height: sortedDataRecure?.length >= 12 ? "400px" : "auto",
                  overflowY: "auto",
                  borderTop: "1px solid #E8E8E8",
                  marginBottom: 20,
                  marginTop: "10px",
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
                    fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)",
                    fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                    top: 0,
                    zIndex: 1
                  }}>
                    <tr>
                      <th
                        style={headerStyle}
                      >
                        <label style={labelStyle}>

                          Name</label>
                      </th>
                      <th
                        style={headerStyle}
                      >
                        <label style={labelStyle}>

                          Last Invoice number</label>
                      </th>
                      <th
                        style={headerStyle}
                      >
                        <label style={labelStyle}>

                          Last Invoice Date</label>
                      </th>
                      <th
                        style={headerStyle}
                      >
                        <label style={labelStyle} >

                          Next Invoice Date</label>
                      </th>
                      <th
                        style={headerStyle}
                      >
                        <label style={labelStyle}>

                          Amount</label>
                      </th>
                      <th
                        style={headerStyle}
                      >
                        <label style={labelStyle}>

                          Recurring</label>
                      </th>
                      <th
                        style={headerStyle}
                      ><label style={labelStyle}>Action</label> </th>
                    </tr>
                  </thead>

                  <tbody style={{ fontSize: "10px" }}>
                    <PaginationList>
                      {recurringbills.map((item) => (
                        <RecurringBillList
                          key={item.customerId}
                          item={item}
                          checked={checkedRows[item.customerId] ?? false}
                          onToggle={() => handleToggle(item.customerId)}
                          handleDeleteRecurringbills={handleDeleteRecurringbills}
                        // OnHandleshowform={handleShowForm}
                        />
                      ))}
                    </PaginationList>
                  </tbody>

                </Table>
              </div>
              {/* ) :
                              (
                                <div
                                  style={{
                                    height: "400px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#f2f6fc",
                                    borderRadius: "10px",
                                    marginTop: "20px",
                                    marginRight: "0",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                    border: "1px dashed #b0c4de",
                                  }}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                      alt="Coming Soon"
                                      width="80"
                                      height="80"
                                      style={{ marginBottom: "15px", opacity: 0.7 }}
                                    />
      
                                    <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                                  </div>
                                </div>
      
      
      
                              )} */}
            </div>
          )}







        </>
      )}

    </div>
  )
}

export default RecurringBills
