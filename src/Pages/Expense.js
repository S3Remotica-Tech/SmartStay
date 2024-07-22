import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Pagination, Table, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Swal from 'sweetalert2';
import AddExpenses from './AddExpenses';
import Profile from '../Assets/Images/New_images/profile-picture.png'
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import ExpensesListTable from './ExpensesListTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Calendar } from 'react-bootstrap-icons';
import Calendars from '../Assets/Images/New_images/calendar.png'
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import Filter from '../Assets/Images/New_images/Group 13.png';
import './Expenses.css'
import { CiSearch } from "react-icons/ci";
import Notify from '../Assets/Images/New_images/notify.png';
import Profiles from '../Assets/Images/New_images/profile.png';
import { Dropdown, NavDropdown, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { AllInbox } from '@mui/icons-material';


function Expenses() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("state expense//////////////////////////", state)

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

  const [formattedDates, setFormattedDates] = useState('(01 Jan - 30 Jan)');



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
  console.log("startDate", startDate, endDate)


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





  console.log("getData", getData)

  useEffect(() => {
    dispatch({ type: 'ASSETLIST' })
    dispatch({ type: 'CATEGORYLIST' })
    dispatch({ type: 'VENDORLIST' })
    dispatch({ type: 'EXPENSELIST' })
  }, [])



  useEffect(() => {
    if (selectedValue === 'All') {
      dispatch({ type: 'EXPENSELIST' })
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
      dispatch({ type: 'EXPENSELIST', payload: { category: categoryValue } })
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
      dispatch({ type: 'EXPENSELIST', payload: { asset_id: assetValue } })
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
      dispatch({ type: 'EXPENSELIST', payload: { vendor_id: vendorValue } })
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
      dispatch({ type: 'EXPENSELIST', payload: { payment_mode: modeValue } })
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
      dispatch({ type: 'EXPENSELIST', payload: { start_date: startDate, end_date: endDate } })
      setCategoryValue('')
      setAssetValue('')
      setVendorValue('')
      setModeValue('')
      setSelectedValue('')
      setDates('')
      setAmountValue('')
      setMinAmount('')
      setMaxAmount('')
    }else if(minAmount || maxAmount){
      dispatch({ type: 'EXPENSELIST', payload: { min_amount:minAmount, max_amount: maxAmount} })
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
  }, [selectedValue, categoryValue, assetValue, vendorValue, modeValue,dates, minAmount, maxAmount])



console.log("Mathu", selectedValue, categoryValue, assetValue, vendorValue, modeValue,dates, minAmount, maxAmount)




  useEffect(() => {
    if (state.ExpenseList.getExpenseStatusCode === 200) {
      setTimeout(() => {
        setGetData(state.ExpenseList.expenseList)
      }, 1000)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_EXPENSE_SATUS_CODE' })
      }, 4000)
    }

  }, [state.ExpenseList.getExpenseStatusCode])


useEffect(()=>{
  if(state.ExpenseList.nodataGetExpenseStatusCode === 201){
    setTimeout(() => {
      setGetData([])
    }, 100)

    setTimeout(()=>{
      dispatch({ type: 'CLEAR_NOEXPENSEdATA' })
    },200)
  }

},[state.ExpenseList.nodataGetExpenseStatusCode])










  useEffect(() => {
    if (state.ExpenseList.StatusCodeForAddExpenseSuccess == 200 || state.ExpenseList.deleteExpenseStatusCode) {
      dispatch({ type: 'EXPENSELIST' })
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

  // console.log("selectedPriceRange", selectedPriceRange)

  const filterByPriceRange = (data) => {
    console.log("data", data)
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
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let filteredData =  [];
 
   filteredData = filterByPriceRange(getData) || [];;
  const currentItems = (filteredData && filteredData.length > 0) 
  ? filteredData.slice(indexOfFirstItem, indexOfLastItem) 
  : [];
  // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredData && filteredData.length > 0) && filteredData.length / itemsPerPage);

  // console.log("currentItems", currentItems)
  // console.log("filteredData",filteredData)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      pageNumbers.push(
        <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };






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
    console.log("item for", item)
    setCurrentItem(item);
  }



  const handleDeleteExpense = (id) => {
    if (id) {
      Swal.fire({
        icon: 'warning',
        title: 'Do you want to delete the expense?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: 'DELETEEXPENSE',
            payload: {
              id: id,
            },
          });
          Swal.fire({
            icon: 'success',
            title: 'Expense deleted Successfully',
          })
        }

      });

      setCurrentPage(1)
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
const [showAmount, setShowAmount]  = useState(false)


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


  // console.log("mode", modeValue, vendorValue, assetValue, categoryValue)

  console.log("selectedValue,", selectedValue)

















  return (
    <>
      <div style={{ width: "100%" }} >
        <div className='m-4'>

          {/* <div className='d-flex justify-content-end align-items-center m-4'>

            <div>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
                  <CiSearch style={{ fontSize: 20 }} />
                </InputGroup.Text>
                <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
                  placeholder="Search..."
                />
              </InputGroup>
            </div>
            <div className="mr-3">
              <img src={Notify} alt="notification" />
            </div>

            <div className="mr-3">
              <Image src={profile ? profile : Profiles} roundedCircle style={{ height: "60px", width: "60px" }} />
            </div>
          </div> */}


          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label style={{ fontSize: 24, color: "#000000", fontWeight: 600, fontFamily:"Gilroy" }}>Expenses</label>
            </div>

            <div className="d-flex justify-content-between align-items-center">






              <div style={{ margin: 20, position: 'relative' }}>
                <label
                  htmlFor="date-input"
                  style={{
                    border: "1px solid #D9D9D9",
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 14,
                    fontFamily:"Gilroy",
                    fontWeight: 500,
                    color: "#222222",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                  onClick={() => document.getElementById('date-input')._flatpickr.open()}
                >
                  <img src={Calendars} style={{ height: 24, width: 24, marginRight: 10 }} />
                  Week {formattedDates}
                </label>
                <Flatpickr
                  id="date-input"
                  value={dates}
                  onChange={(selectedDates) => {
                    if (selectedDates) {
                      setDates(selectedDates);
                      formatDates(selectedDates);
                    }
                  }}
                  options={{ mode: 'multiple', dateFormat: 'd-M' }}
                  placeholder="Select Date"
                  style={{
                    padding: 10,
                    fontSize: 16,
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid #D9D9D9",
                    position: 'absolute',
                    top: 100,
                    left: 100,
                    zIndex: 1000,
                    display: "none"
                  }}
                  onClose={() => { }}
                />
              </div>

              <div className='me-3' style={{ position: 'relative' }}>
                <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px", cursor: "pointer" }} onClick={handleFilterByPrice} />

                {showFilter &&
                  <ListGroup style={{ position: 'absolute', top: 45, right: 0 , fontFamily:"Gilroy"}}>
                    <ListGroup.Item value="All"  onClick={handleExpenseAll}>All</ListGroup.Item>

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
                              className='sub_item' key={view.id} value={view.id}>
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
                          {state.AssetList.assetList && state.AssetList.assetList.map((view) => (
                            <ListGroup.Item className='sub_item' key={view.id} value={view.id}>
                              {view.asset_name}
                            </ListGroup.Item >
                          ))}

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




              <div>
                <Button onClick={handleShow} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: "fit-content", padding: "18px, 20px, 18px, 20px", fontFamily:"Montserrat" }}> + Add an expense</Button>
              </div>
            </div>
          </div>



          <div style={{ border: "1px solid #DCDCDC", borderRadius: "24px", overflow: "hidden" }}>
            <Table responsive>
              <thead style={{ fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>
                <tr>
                  <th style={{ color: "", fontWeight: 500, verticalAlign: 'middle', textAlign: "center" }}>
                    <input type='checkbox' style={customCheckboxStyle} />
                  </th>


                  <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Name</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Category</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Asset</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Expense Date</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Amount</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Mode of Payment</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}></th>
                </tr>
              </thead>
              <tbody>
                {currentItems && currentItems.map((item) => (
                  <ExpensesListTable item={item} OnEditExpense={handleEditExpen} handleDelete={handleDeleteExpense} />
                ))}
              </tbody>
            </Table>



            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
              {
                getData  && getData.length === 0 || filteredData.length === 0 && <h5 style={{ fontSize: 12, color: "red" }}>No Expense Found</h5>
              
              }


            </div>

          </div>
          {/*  Pagination code */}
{currentItems.length > 0 && 
          <Pagination className="mt-4 d-flex justify-content-end align-items-center">
        <Pagination.Prev style={{ visibility:"visible"}}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
       {/* <span style={{fontSize:8, color:"#1E45E1"}}>Previous</span> */}
        {renderPagination()}
        {/* <span style={{fontSize:8, color:"#1E45E1"}}>Next</span> */}
        <Pagination.Next style={{ visibility:"visible"}}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
}
        </div>
      </div>
      {showModal && <AddExpenses show={showModal} handleClose={handleClose} currentItem={currentItem} />}
    </>
  )
}

export default Expenses;