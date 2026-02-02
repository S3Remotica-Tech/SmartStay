/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';
import { FormControl, InputGroup, Table, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import AddAsset from './AddAsset'
// import AssetListTable from '../../Pages/AssetFile/AssetListTable'
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import {  CloseCircle,Filter } from 'iconsax-react';
// import { MdError } from "react-icons/md";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
// import { toast } from 'react-toastify';
// import { DatePicker } from "antd";
// import dayjs from "dayjs";
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Select from "react-select";
// import PaginationList from '../../Components/PaginationList';
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
// import withErrorBoundary from "../../Hoc/WithErrorBountry";
import BookingInvoice from '../Bookings/BookingInvoice'
import { FiSearch } from "react-icons/fi";
import ApplyBookingModal from './ApplyInvoices';
import ComingSoon from '../../Utils/ComingSoon';

function Booking() {

  const [showBookingPdf, setShowBookingPdf] = useState(false)
  const [search, setSearch] = useState(false);
  const [statusfilter, setStatusfilter] = useState("");
  // const [showBillsFilter, setShowBillsFilter] = useState(false);
  const [applyInvoice, setApplyInvoice] = useState(false);
  const {
    // canWriteModule: canWriteBooking,
    canReadModule: canReadBooking,
    // canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Booking");




// useEffect(() => {
//     if (!canReadBooking) {
//       // setLoading(false);
//     } 
//   }, [canReadBooking]);








  const sortedData = []

useEffect(()=>{
setShowBookingPdf(false)
},[])



  const handleSearch = () => {
    setSearch(!search);
  }


  const selectOptions = [
    { label: "All", value: "ALL" },
  ];

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);

  };


  const CustomStyles = {
    control: (base) => ({
      ...base,
      height: "auto",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "14px",
      color: "#4B4B4B",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        border: "1px solid #D9D9D9",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      maxHeight: "60px",
      overflowY: "auto",
      flexWrap: "wrap",
    }), multiValue: (base) => ({
      ...base,
      backgroundColor: "#FFF",
      borderRadius: "6px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      fontSize: "12px",
      fontWeight: 600,
      color: "#000000",
    }),

    multiValueRemove: (base) => ({
      ...base,
      cursor: "pointer",
      borderRadius: 10,
      color: "#FF0000",
      ":hover": {
        color: "#FF0000",
      },
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      fontFamily: "Gilroy, sans-serif", fontSize: "14px",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: "#1E45E1",
      color: "#FFF",
      maxHeight: "120px",
      padding: 0,
      scrollbarWidth: "thin",
      overflowY: "auto",
      fontFamily: "Gilroy, sans-serif", fontSize: "14px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#555",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "" : "white",
      color: state.isFocused ? "#FFF" : "#000000",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#555",
      cursor: "pointer"
    }),
    indicatorSeparator: () => ({
      display: "none",
    }), clearIndicator: () => ({
      display: "none",
    }),
  }

  const handleStatusFilter = (selectedOption) => {
    setStatusfilter(selectedOption);
  };


  const handleShowFilterBills = () => {
    // setShowBillsFilter(true)

  }

  // const handleCloseFilterBills = () => {
  //     // setShowBillsFilter(false)

  // }


  const handleApplyInvoices = () => {
    setApplyInvoice(true)
  }
  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false)
  }

  return (
    <div className="sticky-top bg-white" style={{ position: "relative" }}>

      {applyInvoice && <ApplyBookingModal show={applyInvoice} handleClose={handleCloseApplyInvoices} />}


      <div className=" d-flex justify-content-between align-items-center  flex-wrap h-auto "
        style={{
          position: 'sticky',
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        <div style={{ marginTop: 0 }}>
          <label style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>
            Booking</label>
        </div>

        <div className=" d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div style={{
            backgroundColor: "", color: "", border: "1px solid #CBD5E1", borderRadius: "50%",
            padding: "6px 8px", lineHeight: "normal", height: "fit-content"
          }}>
            <FiSearch
              style={{
                height: "20px",
                width: "20px",
                cursor: canReadBooking ? "pointer" : "not-allowed",
                opacity: canReadBooking ? 1 : 0.4,
                pointerEvents: canReadBooking ? "auto" : "none",
                transition: "opacity 0.3s ease"
              }}
              onClick={handleSearch}
            />
          </div>


          <Button
            onClick={handleApplyInvoices}

            style={{
              fontFamily: "Gilroy",
              fontSize: "14px",
              backgroundColor: "#1E45E1",
              color: "white",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "8px 8px",
              marginTop: 0,
              whiteSpace: "nowrap",
              minWidth: "150px",
              textAlign: "center",
            }}
          >
            Apply Invoices
          </Button>


          {
            search &&


            <div className='me-3 flex flex-wrap ' style={{
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
                cursor: canReadBooking ? "pointer" : "not-allowed",
                opacity: canReadBooking ? 1 : 0.4,
                pointerEvents: canReadBooking ? "auto" : "none",
                transition: "opacity 0.3s ease"
              }}
            //    onClick={() => { if (canReadBooking) handleAssetsExcel() }}
            />
          </div>


        </div>
      </div>




      <div className="d-flex gap-3 align-items-center ms-auto">
        {!showBookingPdf && (
          <>
            <div
              className=""
              style={{
                border: "1px solid #D4D4D4",
                borderRadius: 8,
                width: 150,
                zIndex: 9999,
              }}
            >
              <Select
                options={selectOptions}
                styles={CustomStyles}
                disabled={!canReadBooking}
                onChange={(e) => handleStatusFilter(e)}
                value={statusfilter}
                aria-label="Select"
                className=""
                id="statusselect"


              />



            </div>



            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <Select
                options={monthOptions}
                value={selectedMonth}
                onChange={handleMonthChange}
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No options"}
                styles={CustomStyles}

              />





            </div>

            <div
              className=" d-flex"
              style={{
                border: "1px solid #CBD5E1",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: 10, cursor: canReadBooking ? "pointer" : "not-allowed",
              }}
              onClick={() => canReadBooking && handleShowFilterBills()}
            >
              <Filter size={18} style={{
                cursor: canReadBooking ? "pointer" : "not-allowed",
                opacity: canReadBooking ? 1 : 0.4,
                pointerEvents: canReadBooking ? "auto" : "none",
                transition: "opacity 0.3s ease"
              }} />
            </div>
          </>
        )}

      </div>


      {
        !canReadBooking ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <img
                src={EmptyState}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              <ErrorMessage message={['You do not have access to view Booking']} type="warning" />

            </div>
          </>
        ) :
          <Row className="p-0" style={{ width: "100%", }}>
            <Col className="p-0"
              lg={showBookingPdf ? 4 : 12}
              md={showBookingPdf ? 4 : 12}
              sm={showBookingPdf ? 12 : 12}
              xs={showBookingPdf ? 12 : 12}
            >
              <div className='show-scrolls' style={{
                overflow: "auto",
                marginBottom: 20,
                marginTop: "20px",
                paddingRight: 0,
                paddingLeft: 0,

              }}>
                {
                  showBookingPdf ? <div
                    className="show-scroll p-2"
                    style={{ maxHeight: 500, overflowY: "auto" }}
                  >
                    {/* {bills &&
                                      bills?.map((item) => (
                                        <>

                                          <div key={item.invoiceId}
                                            className="mb-3  shadow-sm rounded"
                                            style={{
                                              padding: "12px 16px", cursor: "pointer",
                                              backgroundColor: String(selectedInvoiceId) === String(item.invoiceId) ? "#F8F9FF" : "#FFFFFF"
                                            }}
                                          >
                                            <div className="d-flex align-items-start justify-content-between">
                                              <div>
                                                <span>
                                                  {
                                                    item.profilePic && item.profilePic !== "0" ? (
                                                      <img
                                                        src={item.profilePic}
                                                        alt="User"
                                                        style={{
                                                          height: 40,
                                                          width: 40,
                                                          borderRadius: "50%",
                                                          objectFit: "cover",
                                                        }}
                                                      />
                                                    ) : (
                                                      <div
                                                        style={{
                                                          height: 40,
                                                          width: 40,
                                                          borderRadius: "50%",
                                                          backgroundColor: "#1E45E1",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent: "center",
                                                          color: "white",
                                                          fontWeight: 600,
                                                          fontSize: 14,
                                                          textTransform: "uppercase",
                                                        }}
                                                      >
                                                        {item.initials}
                                                      </div>
                                                    )
                                                  }
                                                </span>
                                              </div>

                                              <div className="flex-grow-1 ms-3">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                  <div
                                                    className="Invoice_Name"
                                                    style={{
                                                      fontFamily: "Gilroy",
                                                      fontSize: "14px",
                                                      wordWrap: "break-word",
                                                      color: hoveredInvoiceId === item.invoiceId ? "#1E45E1" : "#222222",
                                                      textDecoration: "underline",
                                                      fontStyle: "normal",
                                                      lineHeight: "normal",
                                                      fontWeight: 600,
                                                      cursor: "pointer",
                                                    }}
                                                    onMouseEnter={() => setHoveredInvoiceId(item.invoiceId)}
                                                    onMouseLeave={() => setHoveredInvoiceId(null)}
                                                    onClick={() => {
                                                      setSelectedInvoiceId(item.invoiceId);
                                                      handleDisplayInvoiceDownload(true, item);
                                                    }}
                                                  >
                                                    {item.fullName}
                                                  </div>
                                                  <div
                                                    style={{
                                                      fontFamily: "Gilroy",
                                                      fontSize: "12px",
                                                      wordWrap: "break-word",
                                                      color: "#222",
                                                      fontStyle: "normal",
                                                      lineHeight: "normal",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    {item.baseAmount}
                                                  </div>
                                                </div>

                                                <div className="d-flex justify-content-between gap-3 mb-2">
                                                  <div
                                                    style={{
                                                      fontFamily: "Gilroy",
                                                      fontSize: "12px",
                                                      wordWrap: "break-word",
                                                      color: "#222",
                                                      fontStyle: "normal",
                                                      lineHeight: "normal",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    {item.invoiceNumber === null ||
                                                      item.invoiceNumber === ""
                                                      ? "0.00"
                                                      : item.invoiceNumber}
                                                  </div>
                                                  <div
                                                    style={{
                                                      fontFamily: "Gilroy",
                                                      fontSize: "12px",
                                                      wordWrap: "break-word",
                                                      color: "#222",
                                                      fontStyle: "normal",
                                                      lineHeight: "normal",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    {item.invoiceDate}
                                                  </div>
                                                </div>

                                                <div className="mb-2">

                                                  {(item?.paymentStatus === "Pending" ||
                                                    item?.paymentStatus === "Partial Payment") && (
                                                      <span
                                                        style={{
                                                          backgroundColor: "#FFD9D9",
                                                          color: "#000",
                                                          borderRadius: "12px",
                                                          fontFamily: "Gilroy",
                                                          padding: "8px 10px", fontSize: 12
                                                        }}
                                                      >
                                                        {item?.paymentStatus}
                                                      </span>
                                                    )}


                                                  {item?.paymentStatus === "Paid" && (
                                                    <span
                                                      style={{
                                                        cursor: "pointer",
                                                        backgroundColor: "#D9FFD9",
                                                        fontFamily: "Gilroy",
                                                        color: "#000",
                                                        borderRadius: "14px",
                                                        padding: "8px 12px", fontSize: 12
                                                      }}
                                                    >
                                                      {item?.paymentStatus}
                                                    </span>
                                                  )}


                                                  {(item?.paymentStatus === "Refunded" || item?.paymentStatus === "Partially Refunded") && (
                                                    <span
                                                      style={{
                                                        backgroundColor: "#FFF3CD",
                                                        color: "#8B8000",
                                                        borderRadius: "14px",
                                                        fontFamily: "Gilroy",
                                                        padding: "8px 12px", fontSize: 12
                                                      }}
                                                    >
                                                      {item?.paymentStatus}
                                                    </span>
                                                  )}


                                                  {item?.paymentStatus === "Pending Refund" && (
                                                    <span
                                                      style={{
                                                        backgroundColor: "#FFE6B3",
                                                        color: "#b45309",
                                                        borderRadius: "14px",
                                                        fontFamily: "Gilroy",
                                                        padding: "8px 12px", fontSize: 12
                                                      }}
                                                    >
                                                      {item?.paymentStatus}
                                                    </span>
                                                  )}
                                                  {item?.isCancelled && (
                                                    <span
                                                      style={{
                                                        backgroundColor: "#FFE6B3",
                                                        color: "#b45309",
                                                        borderRadius: "14px",
                                                        fontFamily: "Gilroy",
                                                        padding: "8px 12px", fontSize: 12
                                                      }}
                                                    >
                                                      Cancelled
                                                    </span>
                                                  )
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                        </>
                                      ))} */}
                  </div>

                    :
                    <>
                      {/* {sortedData && sortedData.length > 0 && ( */}

<ComingSoon />

                      {/* <div
                        className='show-scrolls ms-2'
                        style={{
                        }}>

                        <Table
                          responsive="md"
                        >

                          <thead style={{
                            fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                            top: 0,
                            zIndex: 1
                          }}>
                            <tr>
                              <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>
                                <div className='d-flex gap-1 align-items-center '>

                                  INV NO </div>  </th>

                              <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }} >
                                <div className='d-flex gap-1 align-items-center '>

                                  BOOKING DATE </div></th>

                              <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>
                                <div className='d-flex gap-1 align-items-center '>

                                  TENANT NAME</div> </th>

                              <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>
                                <div className='d-flex gap-1 align-items-center'>

                                  MOBILE NO </div></th>

                              <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>
                                <div className='d-flex gap-1 align-items-center'>

                                  AMOUNT</div></th>

                              <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>
                                <div className='d-flex gap-1 align-items-center '>

                                  STATUS</div></th>

                              <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>
                                <div className='d-flex gap-1 align-items-center '>

                                  ACTION</div></th>

                            </tr>
                          </thead>



                          <tbody>
                            {

                              sortedData && sortedData.length > 0 && (
                                <div>

                                </div>

                              )


                            }
                          </tbody>


                        </Table>
                      </div> */}


                      {/* )} */}
                    </>
                }
              </div>


            </Col>

            {showBookingPdf && (
              <>
                <Col className="p-0"
                  lg={showBookingPdf ? 8 : 12}
                  md={showBookingPdf ? 8 : 12}
                  sm={showBookingPdf ? 12 : 12}
                  xs={showBookingPdf ? 12 : 12}
                  style={{
                    borderLeft: showBookingPdf
                      ? "1px solid #ccc"
                      : "none",
                  }}
                >
                  <BookingInvoice
                  //   show={showPdfReceiptModal}
                  //   handleClosed={handleClosePdfReceipt}
                  //   rowData={rowData}
                  />


                </Col>
              </>
            )}


          </Row>
      }


    </div>
  )
}

export default Booking