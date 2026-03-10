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
import closecircle from "../../Assets/Images/New_images/close-circle.png";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
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
  const [filterInput, setFilterInput] = useState("");
  const [activeStay, setActiveStay] = useState("long_stay");

  const {
    canReadModule: canReadRecurring,
  } = useHasPermission("Recurring bills");









  useEffect(() => {
    if (!canReadRecurring) {
      setRecurLoader(false)
    }

  }, [canReadRecurring])

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setRecurLoader(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])

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


  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
  };

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };




  return (
    <div className="relative bg-white">
      <div className="sticky top-0 z-10 bg-white flex justify-between items-center flex-wrap h-auto"
      >
        <div className="mt-0">
          <label className="text-lg text-gray-900 font-semibold font-gilroy">
            Recurring</label>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2 mt-2 mb-1">
          <div className="flex items-center ">
            {search ? (
              <>
                <div className="relative min-w-[160px] max-w-[250px] z-[3000]"
                >
                  <div
                    className="input-group p-0 mr-5"
                  >
                    <span className="input-group-text bg-white" >
                      <img
                        src={searchteam}
                        alt="search"
                        className="h-5 w-5 transition-opacity duration-300 cursor-pointer opacity-100 pointer-events-auto"

                      />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 border border-l-0 border-r-0 border-[#CFD5DB] shadow-none outline-none px-2.5 py-2 font-gilroy"
                      placeholder="Search"
                      value={filterInput}
                      onChange={(e) => handlefilterInput(e)}
                    // disabled={!canReadInvoice}
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <img
                        src={closecircle}
                        alt="close"
                        onClick={() => handleCloseSearch()}
                        className="h-5 w-5 cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-2 border border-[#CBD5E1] rounded-full px-2 py-1.5 leading-normal h-fit">
                  <FiSearch
                    className="h-6 w-5 transition-opacity duration-300 cursor-pointer opacity-100 pointer-events-auto"
                    onClick={handleSearch}
                  />
                </div>
              </>
            )}

          </div>

          {/* <div style={{
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

          } */}

          <div className="mt-0 mr-2 cursor-pointer"
          >
            <img src={excelimg} alt='excel' width={38} height={38}
              className={`transition-opacity duration-300 ${canReadRecurring
                ? "cursor-pointer opacity-100 pointer-events-auto"
                : "cursor-not-allowed opacity-40 pointer-events-none"
                }`}

            //    onClick={() => { if (canReadRecurring) handleAssetsExcel() }}
            />
          </div>


        </div>
      </div>

      {!canReadRecurring ? (
        <>
          <div className="flex flex-col items-center justify-center mt-[95px]">

            <img
              src={Emptystate}
              alt="Empty State"

            />

            <ErrorMessage message={['You do not have access to view Recurring']} type="warning" />

          </div>
        </>
      ) : (
        <>


          <div className="flex items-center gap-3 mt-1 mb-0">
            <button
              onClick={() => handleClick("long_stay")}
              className={`px-[25px] py-2 rounded-[20px] text-[12px] font-semibold font-gilroy ${activeStay === "long_stay"
                ? "bg-[#1E45E1] text-white border border-[#1E45E1]"
                : "bg-white text-[#1E1E1E] border border-[#D6D6D6]"
                }`}
            >
              Long Stay
            </button>

            <button
              onClick={() => handleClick("short_stay")}
              className={`px-[25px] py-2 rounded-[20px] text-[12px] font-semibold font-gilroy ${activeStay === "short_stay"
                ? "bg-[#1E45E1] text-white border border-[#1E45E1]"
                : "bg-white text-[#1E1E1E] border border-[#D6D6D6]"
                }`}
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
                  <div className="text-center">
                    {" "}
                    <img src={Emptystate} alt="emptystate" />
                  </div>
                  <div className="pb-1 text-center font-semibold text-[18px] text-[#4B4B4B] font-gilroy">
                    No {activeStay} Recuring bills available{" "}
                  </div>
                  <div
                    className="pb-1 text-center font-medium text-[14px] text-[#4B4B4B] font-gilroy"
                  >
                    There are no Recuring bills added{" "}
                  </div>
                </div>
              </div>
            ) : !recurLoader && activeStay === 'short_stay' ?
              <div className="mt-5 h-[400px] flex justify-center items-center bg-[#f2f6fc] rounded-[10px] mr-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-dashed border-[#b0c4de]"

              >
                <div className="text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="Coming Soon"
                    width="80"
                    height="80"
                    style={{ marginBottom: "15px", opacity: 0.7 }}
                  />

                  <p className="text-[#7a7a7a] text-[14px] font-gilroy">Coming Soon. Stay tuned!</p>
                </div>
              </div>
              :
              ""}



          {!loading && recurLoader &&

            <div className="absolute top-[200px] left-[200px] right-0 bottom-0 flex items-center justify-center h-[50vh] bg-transparent opacity-75 z-10">
              <div
                className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"
              ></div>
            </div>


          }

          {recurringbills && recurringbills.length > 0 && activeStay === 'long_stay' && (
            <div
              className=" booking-table-userlist  booking-table ml-2 mr-4 mt-4 pb-5"

            >

              <div

                className={`show-scrolls  overflow-y-auto border-t border-[#E8E8E8] mb-5 mt-2 px-0 ${sortedDataRecure?.length >= 12 ? "h-[445px]" : "h-auto"
                  }`}
              >
                <Table
                responsive="md"
                className="min-w-full border-collapse sticky top-0 z-1 font-gilroy text-[14px] font-medium text-[#222222] not-italic rounded-none"

                >
                  <thead className="bg-blue-100 sticky top-0 z-10 text-gray-800 font-medium text-sm"
>
                    <tr>
                      <th>
                       Name
                      </th>
                      <th> 
                        Last Invoice number
                      </th>
                      <th>
                       Last Invoice Date
                      </th>
                      <th>
                       Next Invoice Date
                      </th>
                      <th>
                        Amount
                      </th>
                      {/* <th
                      >
                       Recurring
                      </th> */}
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
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
