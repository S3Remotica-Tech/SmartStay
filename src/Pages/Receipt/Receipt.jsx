/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ReceiptList from "../../Pages/Receipt/ReceiptList";
import { Container, Row, Col, InputGroup, Table, Button, FormControl, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
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
import AddReceiptForm from "../Receipt/AddReceipt";
import { toast } from "react-toastify";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";
import { CloseCircle, } from "iconsax-react";
import '../OthersComponent/BillPdfModal.css';
// import AxiosConfig from "../../WebService/AxiosConfig";
// import Swal from 'sweetalert2';
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
// import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";

function Receipt() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const pdfOpenedRef = useRef(false);
    const [receiptformShow, setReceiptFormShow] = useState(false);
    const [search, setSearch] = useState(false);
    const [receiptdata, setReceiptData] = useState([]);
    const [receiptLoader, setReceiptLoader] = useState(false);

    const {
        canWriteModule: canWriteReceipt,
        canReadModule: canReadReceipt,
    } = useHasPermission("Receipt");


    useEffect(() => {
        if (!canReadReceipt) {
            setReceiptLoader(false);
        }
    }, [canReadReceipt]);

    useEffect(() => {
        if (state.UsersList?.accessRestrictionError) {
            setReceiptLoader(false);
            setTimeout(() => {
                dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
            }, 1000)
        }

    }, [state.UsersList?.accessRestrictionError])

    useEffect(() => {
        if (state.InvoiceList.updateTenantRecurringStatusCode) {

            dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })

            setTimeout(() => {
                dispatch({ type: 'REMOVE_UPDATE_TENANT_RECURRING' })
            }, 100)
        }

    }, [state.InvoiceList.updateTenantRecurringStatusCode])






    const handleReceiptShow = () => {
        if (!state.login.selectedHostel_Id) {
            toast.error('Please add a hostel before adding receipt information.', {
                hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
            });
            return;
        }
    };


    const [pdfLoading, setPdfLoading] = useState(false)

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
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 100)
        }

    }, [state.createAccount?.networkError])

    const handleReceiptDetail = (item) => {
        console.log("item", item)

        if (item.transactionId) {

            dispatch({
                type: "RECEIPTPDF",
                payload: {
                    transactionId: item.transactionId,
                    hostelId: state.login?.selectedHostel_Id

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
        dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
        setReceiptFormShow(false);

        setEditvalue("");
        setReceiptEdit(false);

    };





    const sortedDataReceipt = React.useMemo(() => {
        return Array.isArray(receiptdata) ? receiptdata : [];
    }, [receiptdata]);







    const handleDisplayReceiptDownload = () => {

        setSearch(false)
    };

    useEffect(() => {
        if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
            setTimeout(() => {
                dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
            }, 500);
        }

    }, [state.InvoiceList.statusCodeNewReceiptStatusCode])



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

        if (state.login.selectedHostel_Id) {
            setReceiptLoader(true);
            dispatch({ type: "RECEIPTSLIST", payload: state.login.selectedHostel_Id });
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
    }, [state.InvoiceList.ReceiptList])








    useEffect(() => {
        if (
            state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
            state.InvoiceList.ReceiptDeletesuccessStatuscode === 204 ||
            state.InvoiceList.ReceiptEditsuccessStatuscode === 200
        ) {
            handleBackBill()

            dispatch({ type: "RECEIPTSLIST", payload: state.login.selectedHostel_Id });

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
  const [pageSize, setPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10
  );

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

  const paginatedData = sortedDataReceipt.slice(startIndex, endIndex);



    return (
        <div className="relative sticky top-0 bg-white overflow-hidden"
        >
            {pdfLoading && (
                <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
                    <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {!canReadReceipt ? (
                <>
                    <div className="flex flex-col items-center justify-center mt-[90px]">
                        <img
                            src={Emptystate}
                            alt="Empty State"

                        />
                        <ErrorMessage message={['You do not have access to view Receipt']} type="warning" />

                    </div>
                </>
            ) : (
                <>


                    {receiptLoader &&
                        <div className="absolute top-[200px] left-[200px] right-0 bottom-0 flex items-center justify-center h-[50vh] bg-transparent opacity-75 z-10">
                            <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
                        </div>

                    }

                    <div className="w-full p-0">
                        <div className="w-full">
                            <div className="sticky top-0 bg-white z-10 flex justify-between items-center flex-wrap h-auto border-b border-transparent shadow-none">
                                <div className="flex lg:justify-start justify-center items-center flex-wrap">
                                    <label className="text-lg text-black font-semibold font-gilroy">
                                        Receipt
                                    </label>
                                </div>


                                <div className="flex flex-wrap items-center justify-between gap-2 p-2">

                                    <div className="border border-[#CBD5E1] rounded-full p-1.5 h-fit flex items-center justify-center">
                                        <FiSearch
                                            className={`h-5 w-5 transition-opacity duration-300 ${canReadReceipt
                                                ? "cursor-pointer opacity-100 pointer-events-auto"
                                                : "cursor-not-allowed opacity-40 pointer-events-none"
                                                }`}
                                            onClick={handleSearch}
                                        />
                                    </div>

                                    {search && (
                                        <div className="relative flex flex-wrap cursor-pointer mt-0">
                                            <InputGroup className="flex-nowrap max-w-full font-gilroy">
                                                <FormControl
                                                    size="lg"
                                                    placeholder="Search..."
                                                    className="w-full max-w-[235px] shadow-none border border-r-0 border-gray-300 text-[15px] font-medium text-[#222222] font-gilroy"
                                                />
                                                <InputGroup.Text className="bg-white cursor-pointer">
                                                    <CloseCircle size={24} color="#222" />
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </div>
                                    )}

                                    <div className="me-2 mt-0 cursor-pointer">
                                        <img
                                            src={excelimg}
                                            alt="excel"
                                            width={38}
                                            height={38}
                                            className={`transition-opacity duration-300 ${canReadReceipt
                                                ? "opacity-100 pointer-events-auto"
                                                : "opacity-40 pointer-events-none"
                                                }`}
                                        />
                                    </div>

                                    <Button
                                        disabled={!canWriteReceipt}
                                        onClick={handleReceiptShow}
                                        className="!font-gilroy text-[14px] !bg-[#1E45E1] text-white !font-semibold rounded-lg py-2 px-2 mt-0 min-w-[150px] text-center whitespace-nowrap"
                                    >
                                        + Create Receipt
                                    </Button>
                                </div>
                            </div>

                            {sortedDataReceipt && sortedDataReceipt.length > 0 && (
                                <div className="relative h-[calc(100vh-80px)] flex flex-col mb-2 bg-red-200">
                                    <div className="flex justify-end items-center mb-2 mr-2">
                                        <PaginationList
                                            totalItems={sortedDataReceipt.length}
                                            itemsPerPage={pageSize}
                                            currentPage={page}
                                            onPageChange={(p) => setPage(p)}
                                            onPageSizeChange={(size) => setPageSize(size)}
                                        />
                                    </div>
                                    <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll mt-2">
                                        <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">
                                            <thead className="bg-blue-100 sticky top-0 z-20">
                                                <tr className="h-9">
                                                    <th className="w-[250px] px-2 whitespace-nowrap">Receipt No</th>
                                                    <th className="w-[250px] px-3">Name</th>
                                                    <th className="w-[230px] px-2 whitespace-nowrap">Reference_Id</th>
                                                    <th className="w-[230px] px-2 whitespace-nowrap">Invoice Number</th>
                                                    <th className="w-[230px] px-2">Type</th>
                                                    <th className="w-[230px] px-2 whitespace-nowrap">Payment Date</th>
                                                    <th className="w-[230px] px-2">Amount</th>
                                                    <th className="w-[230px] px-2 whitespace-nowrap">Payment Mode</th>
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
                            )}

                            {!receiptLoader && sortedDataReceipt?.length === 0 && (
                                <div className="flex justify-center">
                                    <div>
                                        <div className="text-center mt-24 2xl:mt-52">
                                            <img src={Emptystate} alt="emptystate" />
                                        </div>
                                        <div className="pb-1 text-center text-[18px] font-gilroy font-semibold text-[#4B4B4B]">
                                            No Receipt available
                                        </div>
                                        <div className="pb-1 text-center text-[14px] font-gilroy font-medium text-[#4B4B4B]">
                                            There are no receipt added
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* {receiptformShow && (
                                <AddReceiptForm
                                    onhandleback={handleBackBill}
                                    editvalue={editvalue}
                                    receiptedit={receiptedit}
                                />
                            )} */}
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default Receipt