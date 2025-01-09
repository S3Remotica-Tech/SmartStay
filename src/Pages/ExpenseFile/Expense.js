import React, { useEffect, useState, useRef } from 'react';
import { FormControl, InputGroup, Pagination, Table, Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Swal from 'sweetalert2';
import AddExpenses from './AddExpenses';
import Profile from '../../Assets/Images/New_images/profile-picture.png'
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../../Assets/Images/New_images/trash.png';
import ExpensesListTable from './ExpensesListTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Calendar } from 'react-bootstrap-icons';
import Calendars from '../../Assets/Images/New_images/calendar.png'
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import Filter from '../../Assets/Images/New_images/Group 13.png';
import './Expenses.css'
import { CiSearch } from "react-icons/ci";
import Notify from '../../Assets/Images/New_images/notify.png';
import Profiles from '../../Assets/Images/New_images/profile.png';
import { Dropdown, NavDropdown, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { AllInbox, TextDecreaseRounded } from '@mui/icons-material';
import { TruckRemove } from 'iconsax-react';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import Spinner from 'react-bootstrap/Spinner';
import { MdError } from "react-icons/md";
import excelimg from "../../Assets/Images/New_images/excel (5).png";
import { ArrowLeft2, ArrowRight2, MoreCircle, } from "iconsax-react";



function Expenses({ allPageHostel_Id }) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();


  const [getData, setGetData] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showModal, setShowModal] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [categoryValue, setCategoryValue] = useState('')
  const [assetValue, setAssetValue] = useState('')
  const [vendorValue, setVendorValue] = useState('')
  const [modeValue, setModeValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  const [amountValue, setAmountValue] = useState('')
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  const [expencerolePermission, setExpenceRolePermission] = useState("");

  const [expencepermissionError, setExpencePermissionError] = useState("");
  const [expenceAddPermission, setExpenceAddPermission] = useState("")
  const [expenceDeletePermission, setExpenceDeletePermission] = useState("")
  const [expenceEditPermission, setExpenceEditPermission] = useState("")
  const [excelDownload, setExcelDownload] = useState("")
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);



  useEffect(() => {
    if (state.UsersList?.exportExpenceDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportExpenceDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportExpenceDetails?.response?.fileUrl]);

  const handleExpenceExcel = () => {
    dispatch({ type: "EXPORTEXPENCESDETAILS", payload: { type: "expenses", hostel_id: state.login.selectedHostel_Id } });
    setIsDownloadTriggered(true)
  };
  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {

      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        setExcelDownload("");
        setIsDownloadTriggered(false)

      }, 500);
    }
  }, [excelDownload && isDownloadTriggered]);
  useEffect(() => {
    if (state.UsersList?.statusCodeForExportExpence === 200) {

      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_EXPENSE_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportExpence])


  useEffect(() => {
    setExpenceRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_view == 1
    ) {
      setExpencePermissionError("");
    } else {
      setExpencePermissionError("Permission Denied");
    }
  }, [expencerolePermission]);



  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_create == 1
    ) {
      setExpenceAddPermission("");
    } else {
      setExpenceAddPermission("Permission Denied");
    }
  }, [expencerolePermission]);


  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_delete == 1
    ) {
      setExpenceDeletePermission("");
    } else {
      setExpenceDeletePermission("Permission Denied");
    }
  }, [expencerolePermission]);
  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_edit == 1
    ) {
      setExpenceEditPermission("");
    } else {
      setExpenceEditPermission("Permission Denied");
    }
  }, [expencerolePermission]);

  const [flatpickrInstance, setFlatpickrInstance] = useState(null);

  const [formattedDates, setFormattedDates] = useState('');

  useEffect(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formattedStart = format(startOfMonth, 'dd MMM');
    const formattedEnd = format(endOfMonth, 'dd MMM');

    setFormattedDates(`(${formattedStart} - ${formattedEnd})`);
  }, []);





  const handleShow = () => {
    setShowModal(true)
    setCurrentItem('');

  }

  const handleClose = () => {
    setShowModal(false);

  }


  const handleAmountValueChange = (e) => {
    setSelectedValue(null);
    const value = e.target.getAttribute('value');
    setAmountValue(value);
    setShowFilter(false);
    const amountRange = value;
    const [minAmount, maxAmount] = amountRange.split('-').map(Number);
    setMinAmount(minAmount);
    setMaxAmount(maxAmount);
  };


  const [currentItem, setCurrentItem] = useState('')


  const [dates, setDates] = useState([]);
  const startDate = formatDate(dates[0] ? dates[0] : '')
  const endDate = formatDate(dates[1] ? dates[1] : '')


  function formatDate(dateString) {

    const date = new Date(dateString);
    if (isNaN(date)) {
      return '';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }






  useEffect(() => {
    dispatch({ type: 'ASSETLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
    dispatch({ type: 'EXPENCES-CATEGORY-LIST', payload: { hostel_id: state.login.selectedHostel_Id } })
    dispatch({ type: 'VENDORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
    dispatch({ type: 'EXPENSELIST', payload: { hostel_id: state.login.selectedHostel_Id } })
    setLoading(true)
  }, [state.login.selectedHostel_Id])



  useEffect(() => {

    // if(!startDate && !endDate){
    //   Swal.fire({
    //     icon: 'warning',
    //     text: `Please Select Start date and End Date`,
    //     confirmButtonText: 'Ok'
    //   })

    //   return
    // }

    // if(!startDate){
    //   Swal.fire({
    //     icon: 'warning',
    //     text: `Please Select Start date`,
    //     confirmButtonText: 'Ok'
    //   })

    //   return
    // }
    // if( !endDate){
    //   Swal.fire({
    //     icon: 'warning',
    //     text: `Please Select  End Date`,
    //     confirmButtonText: 'Ok'
    //   })

    //   return
    // }





    if (selectedValue === 'All') {
      dispatch({ type: 'EXPENSELIST', payload: { hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    } else if (categoryValue) {
      dispatch({ type: 'EXPENSELIST', payload: { category: categoryValue, hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    } else if (assetValue) {
      dispatch({ type: 'EXPENSELIST', payload: { asset_id: assetValue, hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    } else if (vendorValue) {
      dispatch({ type: 'EXPENSELIST', payload: { vendor_id: vendorValue, hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    } else if (modeValue) {
      dispatch({ type: 'EXPENSELIST', payload: { payment_mode: modeValue, hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    } else if (startDate && endDate) {
      dispatch({ type: 'EXPENSELIST', payload: { start_date: startDate, end_date: endDate, hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    } else if (minAmount || maxAmount) {
      dispatch({ type: 'EXPENSELIST', payload: { min_amount: minAmount, max_amount: maxAmount, hostel_id: state.login.selectedHostel_Id } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    }

  }, [selectedValue, categoryValue, assetValue, vendorValue, modeValue, dates, minAmount, maxAmount, formattedDates])




  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (state.ExpenseList.getExpenseStatusCode === 200) {
      setTimeout(() => {
        setGetData(state.ExpenseList.expenseList)

        setLoading(false)


      }, 500)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_EXPENSE_SATUS_CODE' })
      }, 4000)
    }
    else {
      setLoading(false)
    }

  }, [state.ExpenseList.getExpenseStatusCode])


  useEffect(() => {
    if (state.ExpenseList.nodataGetExpenseStatusCode === 201) {
      setTimeout(() => {
        setGetData([])
        setLoading(false)
      }, 100)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOEXPENSEdATA' })
      }, 200)
    }

  }, [state.ExpenseList.nodataGetExpenseStatusCode])










  useEffect(() => {
    if (state.ExpenseList.StatusCodeForAddExpenseSuccess == 200 || state.ExpenseList.deleteExpenseStatusCode == 200) {
      dispatch({ type: 'EXPENSELIST', payload: { hostel_id: state.login.selectedHostel_Id } })
      setShowModal(false);
      setShowExpenseDelete(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_EXPENSE' })
      }, 2000)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_EXPENSE_SATUS_CODE' })
      }, 2000)

    }
  }, [state.ExpenseList.StatusCodeForAddExpenseSuccess, state.ExpenseList.deleteExpenseStatusCode])


  const customCheckboxStyle = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid #DCDCDC',
    borderRadius: '4px',
    display: 'inline-block',
    position: 'relative',
  };


  const filterByPriceRange = (data) => {
    switch (selectedPriceRange) {
      case '0-100':
        return data.filter(item => item.price <= 100);
      case '100-500':
        return data.filter(item => item.price > 100 && item.price <= 500);
      case '500-1000':
        return data.filter(item => item.price > 500 && item.price <= 1000);
      case '1000+':
        return data.filter(item => item.price > 1000);
      case 'All':
        return data
      default:
        return data;
    }
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterByPrice = () => {
    setShowFilter(!showFilter)
  }



  //  pagination 



  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let filteredData = [];

  filteredData = filterByPriceRange(getData) || [];
  const currentItems = (filteredData && filteredData.length > 0)
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredData && filteredData.length > 0) && filteredData.length / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const renderPagination = () => {
  //   const pageNumbers = [];
  //   let startPage = Math.max(1, currentPage - 2);
  //   let endPage = Math.min(totalPages, currentPage + 2);

  //   if (startPage > 1) {
  //     pageNumbers.push(
  //       <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
  //         1
  //       </Pagination.Item>
  //     );
  //     if (startPage > 2) {
  //       pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
  //     }
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(
  //       <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
  //         {i}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (endPage < totalPages) {
  //     if (endPage < totalPages - 1) {
  //       pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
  //     }
  //     pageNumbers.push(
  //       <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //   }

  //   return pageNumbers;
  // };






  const formatDates = (selectedDates) => {
    if (selectedDates.length === 0) {
      setFormattedDates('');
      return;
    }

    const sortedDates = selectedDates.sort((a, b) => new Date(a) - new Date(b));
    const startDate = moment(sortedDates[0]);
    const endDate = moment(sortedDates[sortedDates.length - 1]);

    const formattedDateRange = `(${startDate.format('D MMMM')} - ${endDate.format('D MMMM')})`;
    setFormattedDates(formattedDateRange);
  };

  const handleEditExpen = (item) => {
    setShowModal(true)
    setCurrentItem(item);
  }



  // const handleDeleteExpense = (id) => {
  //   if (id) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Do you want to delete the expense?',
  //       confirmButtonText: 'Yes',
  //       cancelButtonText: 'No',
  //       showCancelButton: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         dispatch({
  //           type: 'DELETEEXPENSE',
  //           payload: {
  //             id: id,
  //           },
  //         });
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Expense deleted Successfully',
  //         })
  //       }

  //     });

  //     setCurrentPage(1)
  //   }

  // }

  const [showExpenseDelete, setShowExpenseDelete] = useState(false)
  const [deleteExpenseRowData, setDeleteExpenseRowData] = useState('')


  const handleDeleteExpense = (id) => {
    if (!id) return;
    setShowExpenseDelete(true)
    setDeleteExpenseRowData(id)

  };


  const handleCloseForDeleteExpense = () => {
    setShowExpenseDelete(false)
  }


  const ConfirmDeleteExpense = () => {
    if (deleteExpenseRowData) {
      dispatch({
        type: 'DELETEEXPENSE',
        payload: {
          id: deleteExpenseRowData,
        },
      });
      setCurrentPage(1);
    }
  }

  const stateAccount = useSelector(state => state.createAccount)


  const [profile, setProfile] = useState(stateAccount.accountList[0]?.user_details.profile)


  useEffect(() => {
    if (stateAccount.statusCodeForAccountList == 200) {
      const loginProfile = stateAccount.accountList[0].user_details.profile

      setProfile(loginProfile)
    }

  }, [stateAccount.statusCodeForAccountList])


  const [showCategory, setShowCategory] = useState(false);
  const [showAsset, setShowAsset] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const [showPaymentMode, setShowPaymentMode] = useState(false);
  const [showAmount, setShowAmount] = useState(false)


  const handleCatogoryChange = (e) => {
    setSelectedValue(null)
    setCategoryValue(e.target.getAttribute('value'));
    setShowFilter(false)
  }

  const handleAssetChange = (e) => {
    setSelectedValue(null)
    setAssetValue(e.target.getAttribute('value'));
    setShowFilter(false)
  }

  const handleVendorChange = (e) => {
    setSelectedValue(null)
    setVendorValue(e.target.getAttribute('value'));
    setShowFilter(false)
  }

  const handleModeValueChange = (e) => {
    setSelectedValue(null)
    setModeValue(e.target.getAttribute('value'));
    setShowFilter(false)
  }
  const handleExpenseAll = (event) => {
    const value = event.target.getAttribute('value');
    setSelectedValue(value);
    setShowFilter(false)
  };








  const skeletonStyle = {
    backgroundColor: '#dcdcdc',
    borderRadius: '10px',
    height: '20px',
    marginBottom: '10px',
  };




  const [showFilterExpense, setShowFilterExpense] = useState(false)


  const handleShowSearch = () => {
    setShowFilterExpense(!showFilterExpense)
  }

  const handleCloseSearch = () => {
    setShowFilterExpense(false)
    setGetData(state.ExpenseList.expenseList)
    setSearchQuery('');
  }

  const [searchQuery, setSearchQuery] = useState("");

  const [showDropDown, setShowDropDown] = useState(false)



  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredItems = state.ExpenseList.expenseList && state.ExpenseList.expenseList.filter((user) =>
        user.category_Name && user.category_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setGetData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setGetData(state.ExpenseList.expenseList)
    }
    setCurrentPage(1);
  };



  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredItems = state.ExpenseList.expenseList && state.ExpenseList.expenseList.filter((user) =>
        user.category_Name && user.category_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setGetData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setGetData(state.ExpenseList.expenseList)
    }
    setCurrentPage(1);
    setShowDropDown(false)
  }



  // ////////////////////////////////////////////////




  return (
    <>


      {
        expencepermissionError ? (
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
              {/* Image */}
              <img
                src={EmptyState}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              {expencepermissionError && (
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <MdError size={20} />
                  <span>{expencepermissionError}</span>
                </div>
              )}
            </div>
          </>
        ) : <div className='container' style={{ width: "100%" }} >

          <div >


            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap"
              style={{
                position: 'sticky',
                top: 25,
                backgroundColor: 'white',
                zIndex: 10,
                padding: '10px',
              }}
            >
              <div className='d-flex align-items-center flex-wrap'>
                <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Expenses</label>



                <div style={{ margin: 20, position: 'relative' }}>
                  <label
                    htmlFor="date-input"
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      color: "#222222",
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                    // onClick={() => document.getElementById('date-input')._flatpickr.open()}
                    onClick={() => flatpickrInstance && flatpickrInstance.open()}
                  >
                    <img src={Calendars} style={{ height: 24, width: 24, marginRight: 10 }} />
                    Week {formattedDates}
                  </label>
                  <Flatpickr
                    id="date-input"
                    className='Expense-calendar'
                    value={dates}
                    onChange={(selectedDates) => {
                      if (selectedDates) {
                        setDates(selectedDates);
                        formatDates(selectedDates);
                        if (selectedDates.length === 2 && flatpickrInstance) {
                          flatpickrInstance.close();
                        }
                      }
                    }}
                    options={{ mode: 'range', dateFormat: 'd-M', }}
                    onReady={(selectedDates, dateStr, instance) => setFlatpickrInstance(instance)}
                    placeholder="Select Date"
                    style={{
                      padding: 10,
                      fontSize: 14,
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid #D9D9D9",
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1000,
                      display: "none"
                    }}
                    onClose={() => { }}
                  />
                </div>

              </div>
              <div className="d-flex  flex-wrap justify-content-between align-items-center">


                {
                  !showFilterExpense &&

                  <div className='me-3' onClick={handleShowSearch}>
                    <SearchNormal1
                      size="26"
                      color="#222"
                    />
                  </div>
                }
                {
                  showFilterExpense &&
                  <div className='me-3 ' style={{ position: 'relative' }}>
                    <InputGroup style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      width: '100%',
                    }}>

                      <FormControl size="lg"
                        value={searchQuery}
                        onChange={handleInputChange}

                        style={{
                          width: 235, boxShadow: "none", borderColor: "lightgray", borderRight: "none", fontSize: 15, fontWeight: 500, color: "#222",
                          //  '::placeholder': { color: "#222", fontWeight: 500 } 
                        }}
                        placeholder="Search..."
                      />
                      <InputGroup.Text style={{ backgroundColor: "#ffffff", }}>
                        <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                      </InputGroup.Text>
                    </InputGroup>



                    {
                      getData.length > 0 && searchQuery !== '' && showDropDown && (

                        <div style={{ border: '1px solid #d9d9d9 ', position: "absolute", top: 50, left: 0, zIndex: 1000, padding: 10, borderRadius: 8, backgroundColor: "#fff" }}>
                          <ul className='show-scroll' style={{
                            // position: 'absolute',
                            // top: '50px',
                            // left: 0,
                            width: 260,
                            backgroundColor: '#fff',
                            // border: '1px solid #D9D9D9',
                            borderRadius: '4px',
                            maxHeight: 174,
                            minHeight: 100,
                            overflowY: 'auto',
                            padding: '5px 10px',
                            margin: '0',
                            listStyleType: 'none',

                            borderRadius: 8,
                            boxSizing: 'border-box'
                          }}>
                            {
                              getData.map((user, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    handleDropDown(user.category_Name);

                                  }}
                                  style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #dcdcdc',
                                    fontSize: '14px',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,

                                  }}
                                >
                                  {user.category_Name}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      )
                    }

                  </div>


                }

                <div className='me-3' style={{ position: 'relative' }}>
                  <Sort
                    Size="24"
                    color="#222"
                    style={{ cursor: "pointer" }}
                    variant="Outline"
                    onClick={handleFilterByPrice}
                  />

                  {showFilter &&
                    <ListGroup style={{ position: 'absolute', top: 45, right: 0, fontFamily: "Gilroy", cursor: "pointer" }}>
                      <ListGroup.Item value="All" onClick={handleExpenseAll}>All</ListGroup.Item>


                      <ListGroup.Item
                        active={showCategory}
                        onMouseEnter={() => setShowCategory(true)}
                        onMouseLeave={() => setShowCategory(false)}
                      >Category

                        {showCategory && (<>

                          <ListGroup style={{ position: 'absolute', right: 250, top: 0, borderRadius: 2 }}
                            value={categoryValue} onClick={handleCatogoryChange}
                          >
                            {state.ExpenseList.categoryList && state.ExpenseList.categoryList.map((view) => (
                              <ListGroup.Item
                                className='sub_item' key={view.category_Id} value={view.category_Id}>
                                {view.category_Name}
                              </ListGroup.Item >
                            ))}

                          </ListGroup>
                        </>
                        )}

                      </ListGroup.Item>



                      <ListGroup.Item
                        active={showAsset}
                        onMouseEnter={() => setShowAsset(true)}
                        onMouseLeave={() => setShowAsset(false)}
                      >Asset

                        {showAsset && (
                          <ListGroup style={{ position: 'absolute', right: 250, top: 0, borderRadius: 2 }}
                            value={assetValue}
                            onClick={handleAssetChange}
                          >
                            {state.AssetList.assetList &&
                              [...new Map(state.AssetList.assetList.map(item => [item.asset_name, item])).values()].map((view) => (
                                <ListGroup.Item className='sub_item' key={view.asset_id} value={view.asset_id}>
                                  {view.asset_name}
                                </ListGroup.Item >

                              ))
                            }
                            {/* {state.AssetList.assetList && state.AssetList.assetList.map((view) => (
                          <ListGroup.Item className='sub_item' key={view.asset_id} value={view.asset_id}>
                            {view.asset_name}
                          </ListGroup.Item >
                        ))} */}

                          </ListGroup>
                        )}



                      </ListGroup.Item>


                      <ListGroup.Item
                        active={showVendor}
                        onMouseEnter={() => setShowVendor(true)}
                        onMouseLeave={() => setShowVendor(false)}
                      >Vendor

                        {showVendor && (
                          <ListGroup style={{ position: 'absolute', right: 250, top: 0, borderRadius: 2 }}
                            value={vendorValue}
                            onClick={handleVendorChange}
                          >
                            {state.ComplianceList.VendorList && state.ComplianceList.VendorList.map((view) => (
                              <ListGroup.Item className='sub_item' key={view.id} value={view.id}>
                                {view.Vendor_Name}
                              </ListGroup.Item >

                            ))}

                          </ListGroup>
                        )}

                      </ListGroup.Item>


                      <ListGroup.Item
                        active={showPaymentMode}
                        onMouseEnter={() => setShowPaymentMode(true)}
                        onMouseLeave={() => setShowPaymentMode(false)}
                      >Payment Mode

                        {showPaymentMode && (
                          <ListGroup style={{ position: 'absolute', right: 250, top: 0, borderRadius: 2 }}
                            value={modeValue}
                            onClick={handleModeValueChange}

                          >
                            <ListGroup.Item className='sub_item' value="UPI/BHIM" >
                              UPI/BHIM
                            </ListGroup.Item >
                            <ListGroup.Item className='sub_item' value="CASH">
                              CASH
                            </ListGroup.Item >
                            <ListGroup.Item className='sub_item' value="Net Banking" >
                              Net Banking
                            </ListGroup.Item >
                          </ListGroup>
                        )}


                      </ListGroup.Item>

                      <ListGroup.Item
                        active={showAmount}
                        onMouseEnter={() => setShowAmount(true)}
                        onMouseLeave={() => setShowAmount(false)}
                      >Amount

                        {showAmount && (
                          <ListGroup style={{ position: 'absolute', right: 250, top: 0, borderRadius: 2 }}
                            value={amountValue}
                            onClick={handleAmountValueChange}

                          >
                            <ListGroup.Item className='sub_item' value="0-1000" >
                              0-1000
                            </ListGroup.Item >
                            <ListGroup.Item className='sub_item' value="1000-5000">
                              1000-5000
                            </ListGroup.Item >
                            <ListGroup.Item className='sub_item' value="5000-10000" >
                              5000-10000
                            </ListGroup.Item >
                            <ListGroup.Item className='sub_item' value="10000" >
                              10000 Above
                            </ListGroup.Item >
                          </ListGroup>
                        )}


                      </ListGroup.Item>

                    </ListGroup>

                  }


                </div>

                <div style={{ paddingRight: "10px" }}>
                  <img src={excelimg} width={38} height={38}
                    onClick={handleExpenceExcel}
                  />
                </div>


                <div>
                  <Button disabled={expenceAddPermission} onClick={handleShow} style={{
                    fontSize: 14, backgroundColor: "#1E45E1", color: "white", fontWeight: 600,
                    borderRadius: 12, padding: "12px 16px 12px 16px", fontFamily: "Gilroy"
                  }}> + Expense</Button>
                </div>
              </div>
            </div>

          </div>



          {searchQuery && (
            <div className='container mb-4' style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
              {getData.length > 0 ? (
                <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
                  {getData.length} result{getData.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span>
                </span>
              ) : (
                <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span></span>
              )}
            </div>
          )}


          {loading &&
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
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



          {currentItems && currentItems.length > 0 && (
            <div className='p-3'>
              <div style={{
                // height: "400px",
                height: currentItems.length >= 6 ? "380px" : "auto",
                overflowY: "auto",
                borderRadius: "24px",
                border: "1px solid #DCDCDC",
                // borderBottom:"none"
              }} >
                <Table responsive="md"
                  className="Table_Design"
                  style={{ border: "1px solid #DCDCDC", borderBottom: "1px solid transparent", borderEndStartRadius: 0, borderEndEndRadius: 0 }}
                >
                  <thead style={{
                    fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500, backgroundColor: "rgba(231, 241, 255, 1)", position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}>
                    <tr>
                      {/* <th style={{ color: "", fontWeight: 500, verticalAlign: 'middle', textAlign: "center",  borderTopLeftRadius: 24  }}>
                <input type='checkbox' style={customCheckboxStyle} />
              </th> */}
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 700 }}>Date</th>

                      {/* <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Vendor Name</th> */}
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Category</th>
                      {/* <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Asset</th> */}
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Description</th>
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Unit Count</th>
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Per Unit Price</th>

                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Total Amount</th>
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Mode of Payment</th>
                      <th style={{ borderTopRightRadius: 24, textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}></th>
                    </tr>
                  </thead>
                  {/* <tbody>
            {
              loading ? <>
                <tr>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                  <td style={{border:"none"}}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                </tr>

              </>

                :
                currentItems && currentItems.map((item) => (
                  <ExpensesListTable key={item.id} item={item} OnEditExpense={handleEditExpen} handleDelete={handleDeleteExpense} />
                ))}

<tr className="d-flex justify-content-center align-items-center" style={{ height: 'auto', width: "100%" }}>
<td style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '100%' ,border:"none"}}>
  {
    !loading && currentItems.length === 0 ? (
      <h5 style={{ fontSize: 14, color: "red" ,textAlign:"center"}}>No Expense Found</h5>
    ) : null
  }
</td>
</tr>





          </tbody> */}
                  <tbody>
                    {
                      loading ? (
                        <>
                          <tr>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td style={{ border: "none" }}><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                          </tr>
                        </>
                      ) : currentItems && currentItems.length > 0 && (
                        currentItems.map((item) => (
                          <ExpensesListTable key={item.id} item={item} OnEditExpense={handleEditExpen} handleDelete={handleDeleteExpense} expenceEditPermission={expenceEditPermission} expenceDeletePermission={expenceDeletePermission} />
                        ))
                      )

                      // : (
                      //   <tr style={{ border: "none" }}>
                      //     <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "red", border: "none" }}>
                      //       <h5 style={{ fontSize: 14 }}>No Expense Found</h5>
                      //     </td>
                      //   </tr>
                      // )
                    }
                  </tbody>

                </Table>





              </div>
            </div>
          )}




          {
            !loading && currentItems && currentItems.length === 0 &&

            <div className='d-flex align-items-center justify-content-center animated-text mt-5' style={{ width: "100%", height: 350, margin: "0px auto" }}>

              <div>
                <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                <div className="pb-1 mt-3" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No expenses available</div>
                <div className="pb-1 mt-2" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There are no expenses available.</div>
                <div className='d-flex justify-content-center pb-1 mt-3'>                   <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", fontWeight: 600, borderRadius: 12, padding: "20px 40px", fontFamily: "Gilroy" }}
                  disabled={expenceAddPermission} onClick={handleShow}
                > + Expense</Button>
                </div>
              </div>
              <div>

              </div>
            </div>


          }











          {/*  Pagination code */}
          {currentItems.length > 0 &&
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                padding: "10px",
                position: "fixed",
                bottom: "10px",
                right: "10px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              {/* Dropdown for Items Per Page */}
              <div>
                <select
                  value={itemsPerPage}
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
                      color: currentPage === 1 ? "#ccc" : "#1E45E1",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      borderRadius: "50%",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                  </button>
                </li>

                {/* Current Page Indicator */}
                <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                  {currentPage} of {totalPages}
                </li>

                {/* Next Button */}
                <li style={{ margin: "0 10px" }}>
                  <button
                    style={{
                      padding: "5px",
                      textDecoration: "none",
                      color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      borderRadius: "50%",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ArrowRight2
                      size="16"
                      color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                    />
                  </button>
                </li>
              </ul>
            </nav>
          }

        </div>
      }

      {showModal && <AddExpenses hostelId={allPageHostel_Id} show={showModal} handleClose={handleClose} currentItem={currentItem} />}



      <Modal show={showExpenseDelete} onHide={handleCloseForDeleteExpense} centered backdrop="static">
        <Modal.Header style={{ display: "flex", justifyContent: "center" }} >
          <Modal.Title style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center", }}>Delete expense?</Modal.Title>
          {/* <CloseCircle size="24" color="#000"  onClick={handleCloseForDeleteVendor}/> */}
        </Modal.Header>




        <Modal.Body style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", textAlign: "center" }}>
          Are you sure you want to delete this expense?
        </Modal.Body>


        <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
          <Button onClick={handleCloseForDeleteExpense} style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "#FFF", color: "rgba(36, 0, 255, 1)", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
            Cancel
          </Button>

          <Button style={{ borderRadius: 8, padding: "16px 45px ", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "rgba(36, 0, 255, 1)", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }} onClick={ConfirmDeleteExpense}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>

















    </>
  )
}

export default Expenses;