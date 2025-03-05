import React, { useState} from 'react';
import { ArrowLeft } from 'iconsax-react';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Calendars from '../Assets/Images/New_images/calendar.png'
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";

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
        <div className='container' style={{ width: "100%", fontFamily: "Gilroy" }}>
            <div className='d-flex align-items-center justify-content-between flex-wrap'>


                <div className='d-flex align-items-center gap-2'>
                    <div>
                        <ArrowLeft size="24" color="#222222" onClick={handleback} />
                    </div>
                    <div>
                        <label style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", color: "#222222" }}>Hostel Wise Rent Projection</label>
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
                                fontFamily: "Gilroy",
                                alignItems: "center",
                                cursor: "pointer"
                            }}
                            onClick={() => document.getElementById('date-input')._flatpickr.open()}
                        >
                            <img src={Calendars} alt='calendar' style={{ height: 24, width: 24, marginRight: 10 }} />
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
                                fontSize: 14,
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

                    {/* <div className='me-3'>
                        <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px", cursor: "pointer" }}
                        // onClick={handleFilterByPrice} 
                        />


                    </div> */}
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
                        <Button style={{ fontSize: 14, backgroundColor: "#1E45E1", color: "white", fontWeight: 600, borderRadius: 12, padding: "16px 24px", fontFamily: "Gilroy" }}> Run Report</Button>
                    </div>
                </div>

            </div>


            <div className="table table-striped" style={{ flex: 1, display: "flex", flexDirection: "column", }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "row", backgroundColor: "rgba(224, 236, 255, 1)", borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 5 }} >
                    <div style={{ flex: 1 }}> <label style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Account</label>  </div>
                    <div style={{ flex: 1 }}> <label style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Account code</label> </div>
                    <div style={{ flex: 1 }}> <label style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Total</label> </div>

                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "row" }}
                >            <div style={{ flex: 1, }}> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Operating Income</label>  </div>
                    <div style={{ flex: 1 }}> <label>   </label> </div>
                    <div style={{ flex: 1 }}> <label></label> </div>
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, }}> <label style={{ color: "rgba(30, 69, 225, 1)", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Sales</label>  </div>
                    <div style={{ flex: 1 }}> <label>   </label> </div>
                    <div style={{ flex: 1 }}> <label style={{ color: "rgba(30, 69, 225, 1)", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>₹40,000.00</label> </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, }}> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Total for operating incomes</label>  </div>
                    <div style={{ flex: 1 }}> <label>   </label> </div>
                    <div style={{ flex: 1 }}> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>₹40,000.00</label> </div>
                </div>

                <hr style={{ border: "1px solid rgba(220, 220, 220, 1)" }} />

                <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, }}> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Cost of Goods Sold</label>  </div>
                    <div style={{ flex: 1 }}> <label>   </label> </div>
                    <div style={{ flex: 1 }}> <label></label> </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, }}> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Total cost of goods sold</label>  </div>
                    <div style={{ flex: 1 }}> <label>   </label> </div>
                    <div style={{ flex: 1 }}> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>₹0.00</label> </div>
                </div>
                <hr style={{ border: "1px solid rgba(220, 220, 220, 1)" }} />

            </div>

        </div>
    )
}
HostelRentProjection.propTypes = {
    isVisible: PropTypes.func.isRequired,
  };
export default HostelRentProjection