import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Rent from "../Assets/Reports/buildings.png"
import Revenue from "../Assets/Reports/chart.png";
import Profit from "../Assets/Reports/arrow-3.png";
import Purchase from "../Assets/Reports/document-text.png";
import Vendor from "../Assets/Reports/shop.png";
import Sales from "../Assets/Reports/profile.png";
import Room from "../Assets/Reports/house.png";
import Bed from "../Assets/Reports/category.png";
import Invoice from "../Assets/Reports/diagram.png";
import ExpenseCate from "../Assets/Reports/category-2.png";
import ExpenseAsset from "../Assets/Reports/asset.png";
import ExpenCate from "../Assets/Reports/category-2.png";
import Investment from "../Assets/Reports/coin.png";
import InvesGraph from "../Assets/Reports/graph.png";
import Aging from "../Assets/Reports/chart-2.png";
import Image from 'react-bootstrap/Image';
import CatoryActive from "../Assets/Images/New_images/category-active.png";
import HostelRentProjection from '../Reports/HostelRentProjection';
import { FormControl, InputGroup, Pagination, Row, Col } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort ,Edit, Trash} from 'iconsax-react';






function Reports() {



  const dispatch = useDispatch()
  const state = useSelector(state => state.createAccount)

  console.log("state", state)

  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReport, setShowReport] = useState(false)
  const [profile, setProfile] = useState(state.accountList[0]?.user_details.profile)
  const [searchQuery, setSearchQuery] = useState("");


  const [reports, setReports] = useState([
    { id: 1, ReportsName: "Hostel Wise Rent Projection", images: Rent },
    { id: 2, ReportsName: "Projection vs Actual Revenue", images: Revenue },
    { id: 3, ReportsName: "Profit and Loss", images: Profit },
    { id: 4, ReportsName: "Purchase summary", images: Purchase },
    { id: 5, ReportsName: "Purchase by Vendor", images: Vendor },
    { id: 6, ReportsName: "Sales by customer", images: Sales },
    { id: 7, ReportsName: "Sales by Room", images: Room },
    { id: 8, ReportsName: "Sales by bed", images: Bed },
    { id: 9, ReportsName: "Invoice Aging summary", images: Invoice },
    { id: 10, ReportsName: "Expenses by category", images: ExpenseCate },
    { id: 11, ReportsName: "Expenses for asset", images: ExpenseAsset },
    { id: 12, ReportsName: "Expenses with subcategory", images: ExpenCate },
    { id: 13, ReportsName: "Investment against asset", images: Investment },
    { id: 14, ReportsName: "Expenses against asset", images: InvesGraph },
    { id: 15, ReportsName: "Aging against asset", images: Aging },
  ])






  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handlePageClick = (id) => {
    setSelectedReport(id);
    // setShowReport(false)
    setShowReport(true)
  };

  const handleBack = (isVisible) => {
    setSelectedReport(isVisible)
    setShowReport(false)
  }

  console.log("profile", profile)


  useEffect(() => {
    if (state.statusCodeForAccountList == 200) {

      const loginProfile = state.accountList[0].user_details.profile


      setProfile(loginProfile)


    }

  }, [state.statusCodeForAccountList])


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReports = reports.filter(report =>
    report.ReportsName.toLowerCase().includes(searchQuery.toLowerCase())
  );




  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries, appearOnScrool) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });


  const [showDropDown, setShowDropDown] = useState(false)
  const [showFilterData, setShowFilterData] = useState(false)


  const handleShowSearch = () => {
    setShowFilterData(!showFilterData)
  }

  const handleCloseSearch = () => {
    setShowFilterData(false)
    setReports(reports)
    setSearchQuery('');
  }



  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    console.log("searchItem", searchItem)
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredReports = reports.filter(report =>
        report.ReportsName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setReports(filteredReports);
      setShowDropDown(true)
    }
    else {
      setReports(reports)
    }

  };

  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredReports = reports.filter(report =>
        report.ReportsName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setReports(filteredReports);

    }
    else {
      setReports(reports)
    }

    setShowDropDown(false)
  }




  return (

    <div className='container mt-3' style={{ width: "100%" }}>

<div className='container'>
<div className="d-flex justify-content-between mb-2">
              <div>
                <label style={{ color: "#222222", fontWeight: 600, fontSize: 18, fontFamily: "Gilroy" }}>Reports</label>

              </div>


              <div>
                {
                  !showFilterData &&

                  <div className='me-3' onClick={handleShowSearch}>
                    <SearchNormal1
                      size="26"
                      color="#222"
                    />
                  </div>
                }
                {
                  showFilterData &&
                  <div className='me-3 ' style={{ position: 'relative' }}>
                    <InputGroup>

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
                      reports.length > 0 && searchQuery !== '' && showDropDown && (

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
                              reports.map((user, index) => (

                                <li
                                  key={index}
                                  onClick={() => {
                                    handleDropDown(user.ReportsName);

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

                                  <span className='ps-4'>{user.ReportsName}</span>
                                </li>


                              ))
                            }
                          </ul>
                        </div>
                      )
                    }
                  </div>


                }
              </div>


            </div>
            </div>


            {searchQuery && (
        <div  className='container mb-4'   style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
          {reports.length > 0 ? (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
              {reports.length} result{reports.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span>
            </span>
          ) : (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span></span>
          )}
        </div>
      )}


      <Row>

        <Col lg={showReport ? 4 : 12} md={showReport ? 4 : 12} style={{ borderRight: showReport && "1px solid #E7F1FF" }}>

          <div className='container show-scroll' style={{ maxHeight: showReport ? 650 : 'unset', overflowY: showReport ? 'auto' : "unset", backgroundColor: "" }}>

            

            <Row className='mt-3 mb-3 g-2'  >
              {filteredReports && filteredReports.map((report) => (
                <Col key={report.id} className='show-scroll mb-3' lg={showReport ? 12 : 4} md={showReport ? 12 : 4} >

                  <Card className='fade-in ms-0'
                    onMouseEnter={() => handleMouseEnter(report.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handlePageClick(report.id)}
                    style={{ borderRadius: 16, border: "1px solid", borderColor: hoveredCard === report.id ? "#0000FF" : "#DCDCDC" }} >
                    <Card.Body>
                      <div className='d-flex justify-content-start gap-2 align-items-center '>
                        <div>
                          <Image src={hoveredCard === report.id ? CatoryActive : report.images} style={{ height: 24, width: 24 }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 16, fontWeight: 600, color: hoveredCard === report.id ? "#0000FF" : "#222222", fontFamily: "Gilroy" }}>{report.ReportsName}</label>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                </Col>
              ))}
            </Row>
          </div>

        </Col>

             <Col lg={showReport ? 8 : 12} md={showReport ? 8 : 12}>
          {selectedReport === 1 ? <HostelRentProjection isVisible={handleBack} /> : ''}
        </Col>
      </Row>

      </div>




  )
}

export default Reports


