import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Pagination, Table, DropdownButton, Dropdown, Form } from 'react-bootstrap';
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

function Expenses() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("state expense//////////////////////////", state)

  const [getData, setGetData] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showModal, setShowModal] = useState(null)
  const [showFilter, setShowFilter] = useState(false)

  const [formattedDates, setFormattedDates] = useState('(01 Jan - 30 Jan)');

  // console.log(formattedDates, "formattedDates")

  const handleShow = () => {
    setShowModal(true)
    setCurrentItem('');

  }

  const handleClose = () => {
    setShowModal(false);

  }

  // console.log("getData", getData)

  useEffect(() => {
    dispatch({ type: 'ASSETLIST' })
    dispatch({ type: 'CATEGORYLIST'})
    dispatch({ type: 'EXPENSELIST'})
  }, [])


  useEffect(() => {
    if (state.ExpenseList.getExpenseStatusCode == 200) {
      setTimeout(()=>{
        setGetData(state.ExpenseList.expenseList)
      },100)
           setTimeout(() => {
        dispatch({ type: 'CLEAR_EXPENSE_SATUS_CODE' })
      }, 4000)
    }

  }, [state.ExpenseList.getExpenseStatusCode])

useEffect(()=>{
  if(state.ExpenseList.StatusCodeForAddExpenseSuccess == 200 || state.ExpenseList.deleteExpenseStatusCode){
    dispatch({ type: 'EXPENSELIST'})
setTimeout(()=>{
  dispatch({ type: 'CLEAR_DELETE_EXPENSE'})
},2000)
setTimeout(()=>{
  dispatch({ type: 'CLEAR_ADD_EXPENSE_SATUS_CODE'})
},2000)

     }
},[state.ExpenseList.StatusCodeForAddExpenseSuccess,state.ExpenseList.deleteExpenseStatusCode])


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
  const filteredData = filterByPriceRange(getData);
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems)
  // console.log("filteredData",filteredData)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  const [dates, setDates] = useState([]);
const [currentItem , setCurrentItem] = useState('')

  console.log("dates", dates)

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
  console.log("item for",item)
    setCurrentItem(item);
}



const handleDeleteExpense = (id) =>{
  if(id){
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
  







  return (
    <>
      <div style={{ width: "100%" }} >
        <div className='m-4'>


          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label style={{ fontSize: 24, color: "#000000", fontWeight: 600 }}>Expenses</label>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              {/* <div style={{ margin: 20 ,}}>
              <label htmlFor="date-input" style={{border:"1px solid #D9D9D9", borderRadius:8, padding:10, fontSize:14, fontWeight:500, color:"#222222"}}>
                 <img src={Calendars} style={{height:24, width:24}} /> Week {formattedDates}
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
                  style={{ padding: 10, fontSize: 16, width: "100%", borderRadius: 8, border: "1px solid #D9D9D9",display: "none"}}
                  onClose={() => { }}
                />

              </div> */}

<div style={{ margin: 20, position: 'relative' }}>
    <label
      htmlFor="date-input"
      style={{
        border: "1px solid #D9D9D9",
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
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
        top:100,
        left:100, 
        zIndex: 1000, 
        display: "none"
      }}
      onClose={() => { }}
    />
  </div>

              <div className='me-3'>
                <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px", cursor: "pointer" }} onClick={handleFilterByPrice} />


              </div>
              {
                showFilter &&

                <div className='me-3'>
                  <Form.Select aria-label="Select Price Range"
                    value={selectedPriceRange}
                    onChange={handlePriceRangeChange}
                    className='' id="vendor-select">
                    <option value="All">All</option>
                    <option value="0-100">0-100</option>
                    <option value="100-500">100-500</option>
                    <option value="500-1000">500-1000</option>
                    <option value="1000+">1000+</option>
                  </Form.Select>
                </div>
              }
              <div>
                <Button onClick={handleShow} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: "fit-content", padding: "18px, 20px, 18px, 20px" }}> + Add an expense</Button>
              </div>
            </div>
          </div>



          <div style={{ border: "1px solid #DCDCDC", borderRadius: "24px", overflow: "hidden" }}>
            <Table responsive>
              <thead style={{ fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>
                <tr>
                  <th style={{ color: "black", fontWeight: 500, verticalAlign: 'middle', textAlign: "center" }}>
                    <input type='checkbox' style={customCheckboxStyle} />
                  </th>


                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Name</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Category</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Asset</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Expense Date</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Amount</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}>Mode of Payment</th>
                  <th style={{ textAlign: "center", fontFamily: "Gilroy, sans-serif", color: "#939393", fontSize: 14, fontStyle: "normal", fontWeight: 500 }}></th>
                </tr>
              </thead>
              <tbody>
                {currentItems && currentItems.map((item) => (
                  <ExpensesListTable item={item}  OnEditExpense={handleEditExpen} handleDelete={handleDeleteExpense}/>
                ))}
              </tbody>
            </Table>



            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
              {
                getData && getData.length === 0 || filteredData.length === 0 && <h5 style={{ fontSize: 12, color: "red" }}>No Asset Found</h5>
              }


            </div>

          </div>
          {/*  Pagination code */}

          <Pagination className="mt-4 d-flex justify-content-end">
            {[...Array(Math.ceil(getData.length / itemsPerPage)).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      {showModal && <AddExpenses show={showModal} handleClose={handleClose} currentItem={currentItem} />}
    </>
  )
}

export default Expenses;