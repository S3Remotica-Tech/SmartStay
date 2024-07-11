import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'iconsax-react';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Calendars from '../Assets/Images/New_images/calendar.png'
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import Filter from '../Assets/Images/New_images/Group 13.png';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function HostelRentProjection(props) {

    const handleback = () => {
        props.isVisible(false)
    }

    const [formattedDates, setFormattedDates] = useState('(01 Jan - 30 Jan)');
    const [dates, setDates] = useState([]);

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



    return (
        <div style={{ width: "100%", fontFamily: "Gilroy,sans-serif" }}>
            <div className='d-flex align-items-center justify-content-between m-4 flex-wrap'>


                <div className='d-flex align-items-center gap-2'>
                    <div>
                        <ArrowLeft size="32" color="#222222" onClick={handleback} />
                    </div>
                    <div>
                        <label style={{ fontSize: 24, fontWeight: 600, fontFamily: "Gilroy,sans-serif", color: "#222222" }}>Hostel Wise Rent Projection</label>
                    </div>
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

                    <div className='me-3'>
                        <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px", cursor: "pointer" }}
                        // onClick={handleFilterByPrice} 
                        />


                    </div>
                    {/* {
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
              } */}
                    <div>
                        <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: "fit-content", padding: "18px, 20px, 18px, 20px" }}> Run Report</Button>
                    </div>
                </div>

            </div>



<div className='m-4'>

            {/* <Table responsive >
                <thead style={{backgroundColor:"rgba(224, 236, 255, 1)", borderRadius:"12px, 12px, 0px, 0px",}}>
                    <tr style={{fontSize:16, fontWeight:600, color:"#222222", textAlign:"start"}}>
                        <th>Account</th>
                        <th>Account code</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{fontSize:16, fontWeight:600, color:"#222222", textAlign:"start"}} >
                        <td>
                            <div>Operating Income</div>
                            <div>Sales</div>
                            <div>Total for operating income</div>
                        </td>
                        <td></td>
                        <td>
                            <div>

                            </div>
                            <div>₹40,000.00</div>
                            <div>₹40,000.00</div>

                        </td>
                    </tr>

                </tbody>
            </Table> */}

<div className="table table-striped" style={{ flex: 1, display: "flex", flexDirection: "column" , }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "row", backgroundColor:"rgba(224, 236, 255, 1)",borderTopLeftRadius:12, borderTopRightRadius:12, padding:5 }} >
          <div style={{ flex: 1 }}> <label style={{fontSize:16, fontWeight:600}}>Account</label>  </div>
          <div style={{ flex: 1 }}> <label style={{fontSize:16, fontWeight:600}}>Account code</label> </div>
          <div style={{ flex: 1 }}> <label style={{fontSize:16, fontWeight:600}}>Total</label> </div>
                
        </div>
      
          <div  style={{ flex: 1, display: "flex", flexDirection: "row" }} 
                  >            <div style={{ flex: 1,  }}> <label style={{fontSize:18, fontWeight:500}}>Operating Income</label>  </div>
            <div style={{ flex: 1 }}> <label>   </label> </div>
            <div style={{ flex: 1 }}> <label></label> </div>
                              </div>

                              <div  style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                                            <div style={{ flex: 1,  }}> <label style={{color:"rgba(30, 69, 225, 1)",fontSize:18, fontWeight:500}}>Sales</label>  </div>
            <div style={{ flex: 1 }}> <label>   </label> </div>
            <div style={{ flex: 1 }}> <label style={{color:"rgba(30, 69, 225, 1)",fontSize:18, fontWeight:500}}>₹40,000.00</label> </div>
                              </div>
                              <div  style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                                            <div style={{ flex: 1,  }}> <label style={{fontSize:18, fontWeight:500}}>Total for operating incomes</label>  </div>
            <div style={{ flex: 1 }}> <label>   </label> </div>
            <div style={{ flex: 1 }}> <label style={{fontSize:18, fontWeight:500}}>₹40,000.00</label> </div>
                              </div>

      <hr style={{border:"1px solid rgba(220, 220, 220, 1)"}}/>

      <div  style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                                            <div style={{ flex: 1,  }}> <label style={{fontSize:18, fontWeight:500}}>Cost of Goods Sold</label>  </div>
            <div style={{ flex: 1 }}> <label>   </label> </div>
            <div style={{ flex: 1 }}> <label></label> </div>
                              </div>
                              <div  style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                                            <div style={{ flex: 1,  }}> <label style={{fontSize:18, fontWeight:500}}>Total cost of goods sold</label>  </div>
            <div style={{ flex: 1 }}> <label>   </label> </div>
            <div style={{ flex: 1 }}> <label style={{fontSize:18, fontWeight:500}}>₹0.00</label> </div>
                              </div>
                              <hr style={{border:"1px solid rgba(220, 220, 220, 1)"}}/>

      </div>



            </div>



        </div>
    )
}

export default HostelRentProjection