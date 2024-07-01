import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Pagination, Table, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import Filter from '../Assets/Images/New_images/Group 13.png';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import AddExpenses from './AddExpenses';
import Profile from '../Assets/Images/New_images/profile-picture.png'




function Expenses() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("state asset //////////////////////////", state)

  const [getData, setGetData] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [show, setShow] = useState(null)
  const [showFilter, setShowFilter] = useState(false)


  const handleShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false);

  }

  console.log("getData", getData)

  useEffect(() => {
    dispatch({ type: 'ASSETLIST' })
             }, [])


  useEffect(() => {
    if (state.AssetList.getAssetStatusCode === 200) {
      setGetData(state.AssetList.assetList)
      setTimeout(()=>{
    dispatch({ type:  'CLEAR_GET_ASSET_STATUS_CODE'})
      },2000)
    }

  }, [state.AssetList.getAssetStatusCode])

 


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

  console.log("selectedPriceRange", selectedPriceRange)

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

  console.log("currentItems",currentItems)
  // console.log("filteredData",filteredData)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  <th style={{ color: "black", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center"}}>
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
                  <tr style={{ fontFamily: "Gilroy, sans-serif"}} key={item.id}>

                    <td style={{ color: "black", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center"}}>
                      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "between", flex:"wrap", gap:2, width:"100%" }}>
                       <img src={Profile}  style={{height:40, width:40}}/>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#222222" }}>{item.asset_name}</div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 14, display: "flex", justifyContent: "center", width: "fit-content" }}>{item.brand_name}</div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" }}>{item.serial_number}</td>
                   
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 10, fontSize: 14, width: "fit-content" }} >
                          {moment(item.purchase_date).format('DD MMM YYYY').toUpperCase()}
                        </div >
                      </div>

                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" }}>{item.product_count}</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#D9E9FF", fontWeight: 500, padding: 8, borderRadius: 10, fontSize: 14, width: "fit-content" }} >
                          {moment(item.purchase_date).format('DD MMM YYYY').toUpperCase()}
                        </div >
                      </div>

                    </td>
                   
                   
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className=''>
                    <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>
                      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />
                      </div>
                      </div>
                    </td>
                  </tr>
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
      {show && <AddExpenses show={show} handleClose={handleClose} />}
    </>
  )
}

export default Expenses;