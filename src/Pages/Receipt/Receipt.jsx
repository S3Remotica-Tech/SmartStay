/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ReceiptList from "../../Pages/Receipt/ReceiptList";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Table,
  Button,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import AddReceiptForm from "../Receipt/AddReceipt";
import { toast } from "react-toastify";
import { CloseCircle, SearchNormal1, Setting3 } from "iconsax-react";
import "../OthersComponent/BillPdfModal.css";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

function Receipt() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const pdfOpenedRef = useRef(false);
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [receiptLoader, setReceiptLoader] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const tableContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { canWriteModule: canWriteReceipt, canReadModule: canReadReceipt } =
    useHasPermission("Receipt");

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  useEffect(() => {
    if (!canReadReceipt) {
      setReceiptLoader(false);
    }
  }, [canReadReceipt]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setReceiptLoader(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.InvoiceList.updateTenantRecurringStatusCode) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: state.login?.selectedHostel_Id,
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_UPDATE_TENANT_RECURRING" });
      }, 100);
    }
  }, [state.InvoiceList.updateTenantRecurringStatusCode]);

  const handleReceiptShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding receipt information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
  };

  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (state.InvoiceList.pdfErrorMessage) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
      }, 100);
    }
  }, [state.InvoiceList.pdfErrorMessage]);
  useEffect(() => {
    if (state.createAccount?.networkError) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 100);
    }
  }, [state.createAccount?.networkError]);

  const handleReceiptDetail = (item) => {
    if (item.transactionId) {
      dispatch({
        type: "RECEIPTPDF",
        payload: {
          transactionId: item.transactionId,
          hostelId: state.login?.selectedHostel_Id,
        },
      });

      setPdfLoading(true);
    }
  };

  useEffect(() => {
    if (state.InvoiceList.statusCodeForReceiptPDf === 200) {
      if (!state.InvoiceList.ReceiptPDF) return;
      // if (pdfOpenedRef.current) return;
      // pdfOpenedRef.current = true;
      setPdfLoading(false);
      window.open(state.InvoiceList.ReceiptPDF, "_blank");

      dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
    }
  }, [state.InvoiceList.statusCodeForReceiptPDf]);

  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);

  const handleEditReceipt = (item) => {
    setReceiptFormShow(true);
    setEditvalue(item);
    setReceiptEdit(true);
  };

  const handleBackBill = () => {
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setReceiptFormShow(false);

    setEditvalue("");
    setReceiptEdit(false);
  };

  const handleDisplayReceiptDownload = () => {
    setSearch(false);
  };

  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }
  }, [state.InvoiceList.statusCodeNewReceiptStatusCode]);

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
    });
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setReceiptLoader(true);
      dispatch({
        type: "RECEIPTSLIST",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.InvoiceList.ReceiptlistgetStatuscode === 200) {
      setReceiptData(state.InvoiceList.ReceiptList);
      setReceiptLoader(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.ReceiptlistgetStatuscode]);

  useEffect(() => {
    setReceiptLoader(false);
  }, [state.InvoiceList.ReceiptList]);

  useEffect(() => {
    if (
      state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
      state.InvoiceList.ReceiptDeletesuccessStatuscode === 204 ||
      state.InvoiceList.ReceiptEditsuccessStatuscode === 200
    ) {
      handleBackBill();

      dispatch({
        type: "RECEIPTSLIST",
        payload: state.login.selectedHostel_Id,
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_ADD" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_EDIT" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.ReceiptAddsuccessStatuscode,
    state.InvoiceList.ReceiptDeletesuccessStatuscode,
    state.InvoiceList.ReceiptEditsuccessStatuscode,
  ]);

  useEffect(() => {
    return () => {
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
      });
    };
  }, [state.login.selectedHostel_Id]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = receiptData?.slice(startIndex, endIndex);

  return (
    <div className="bg-white font-gilroy">
      <div className="w-full p-0">
        <div className="flex items-center justify-between sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px]">
          <div className="flex lg:justify-start justify-center items-center flex-wrap">
            <label className="text-lg text-black font-semibold font-gilroy">
              Receipt
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              <div className="relative min-w-[180px] max-w-[260px]">
                <div
                  className={`flex items-center rounded-xl border px-3 py-1.5 !bg-white  transition
    ${
      canReadReceipt
        ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
        : "border-gray-200 opacity-60 cursor-not-allowed"
    }`}
                >
                  <input
                    type="text"
                    className="w-full !bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF]  disabled:cursor-not-allowed"
                    placeholder="Search"
                    value={filterInput}
                    onChange={(e) => handlefilterInput(e)}
                    disabled={canReadReceipt}
                  />

                  <SearchNormal1
                    size="18"
                    color={canReadReceipt ? "#6B7280" : "#A0A0A0"}
                    className="mr-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={` flex items-center justify-end gap-2 mr-2 `}>
          <div>
            <Setting3
              onClick={() => setOpen(!open)}
              className="cursor-not-allowed"
              size="22"
              color="#4B4B4B"
            />
          </div>

          <div className="mr-2">
            <PaginationList
              totalItems={receiptData?.length}
              itemsPerPage={pageSize}
              currentPage={page}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(size) => setPageSize(size)}
            />
          </div>
        </div>

        {!canReadReceipt ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <div className="relative">
            {paginatedData && paginatedData.length > 0 ? (
              <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                <div
                  id="tableContainer"
                  ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                >
                  <table className=" w-full font-gilroy">
                    <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                      <tr className="h-9">
                        <th className="w-[250px] px-2 whitespace-nowrap">
                          Receipt No
                        </th>

                        <th className="w-[250px] px-3">Name</th>

                        <th className="w-[230px] px-2 whitespace-nowrap">
                          Reference Id
                        </th>

                        <th className="w-[230px] px-2 whitespace-nowrap">
                          Invoice Number
                        </th>

                        <th className="w-[230px] px-2">Type</th>

                        <th className="w-[230px] px-2 whitespace-nowrap">
                          Payment Date
                        </th>

                        <th className="w-[230px] px-2">Amount</th>

                        <th className="w-[230px] px-2 whitespace-nowrap">
                          Payment Mode
                        </th>

                        <th className="w-[230px] px-2">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedData.map((item) => (
                        <ReceiptList
                          key={item.id}
                          item={item}
                          OnHandleshowInvoicePdf={handleReceiptDetail}
                          onhandleEdit={handleEditReceipt}
                          DisplayInvoice={handleDisplayReceiptDownload}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : !receiptLoader && receiptData?.length === 0 ? (
              <NoDataMessage label="Receipt" />
            ) : null}
          </div>
        )}
      </div>

      {receiptLoader && (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
        </div>
      )}

      {pdfLoading && (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Receipt;
