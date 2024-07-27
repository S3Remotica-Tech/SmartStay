

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Card from 'react-bootstrap/Card';
// import Rent from "../Assets/Reports/buildings.png"
// import Revenue from "../Assets/Reports/chart.png";
// import Profit from "../Assets/Reports/arrow-3.png";
// import Purchase from "../Assets/Reports/document-text.png";
// import Vendor from "../Assets/Reports/shop.png";
// import Sales from "../Assets/Reports/profile.png";
// import Room from "../Assets/Reports/house.png";
// import Bed from "../Assets/Reports/category.png";
// import Invoice from "../Assets/Reports/diagram.png";
// import ExpenseCate from "../Assets/Reports/category-2.png";
// import ExpenseAsset from "../Assets/Reports/asset.png";
// import ExpenCate from "../Assets/Reports/category-2.png";
// import Investment from "../Assets/Reports/coin.png";
// import InvesGraph from "../Assets/Reports/graph.png";
// import Aging from "../Assets/Reports/chart-2.png";
// import Image from 'react-bootstrap/Image'; 
// import CatoryActive from "../Assets/Images/New_images/category-active.png";
// import HostelRentProjection from '../Reports/HostelRentProjection';
// import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
// import { CiSearch } from "react-icons/ci";
// import Notify from '../Assets/Images/New_images/notify.png';
// import Profile from '../Assets/Images/New_images/profile.png';





// function Reports() {



//   const dispatch = useDispatch()
//   const state= useSelector(state => state.createAccount)

//   console.log("state", state)

//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [showReport, setShowReport] = useState(true)
//   const [profile, setProfile] = useState(state.accountList[0].user_details.profile)
//   const [searchQuery, setSearchQuery] = useState("");


// const [reports, setReports] = useState([
// {id:1, ReportsName:"Hostel Wise Rent Projection", images:Rent},
// {id:2, ReportsName:"Projection vs Actual Revenue", images:Revenue},
// {id:3, ReportsName:"Profit and Loss", images:Profit},
// {id:4, ReportsName:"Purchase summary", images:Purchase},
// {id:5, ReportsName:"Purchase by Vendor", images:Vendor},
// {id:6, ReportsName:"Sales by customer", images:Sales},
// {id:7, ReportsName:"Sales by Room", images:Room},
// {id:8, ReportsName:"Sales by bed", images:Bed},
// {id:9, ReportsName:"Invoice Aging summary", images:Invoice},
// {id:10, ReportsName:"Expenses by category", images:ExpenseCate},
// {id:11, ReportsName:"Expenses for asset", images:ExpenseAsset},
// {id:12, ReportsName:"Expenses with subcategory", images:ExpenCate},
// {id:13, ReportsName:"Investment against asset", images:Investment},
// {id:14, ReportsName:"Expenses against asset", images:InvesGraph},
// {id:15, ReportsName:"Aging against asset", images:Aging},
// ])

// const handleMouseEnter = (id) => {
//   setHoveredCard(id);
// };

// const handleMouseLeave = () => {
//   setHoveredCard(null);
// };

// const handlePageClick = (id) => {
//   setSelectedReport(id);
//   setShowReport(false)
// };

// const handleBack = (isVisible) => {
//   setSelectedReport(isVisible)
//   setShowReport(true)
// }

// console.log("profile",profile)


// useEffect(() => {
//   if (state.statusCodeForAccountList == 200) {

//     const loginProfile = state.accountList[0].user_details.profile


//     setProfile(loginProfile)


//   }

// }, [state.statusCodeForAccountList])


// const handleSearch = (e) => {
//   setSearchQuery(e.target.value);
// };

// const filteredReports = reports.filter(report =>
//   report.ReportsName.toLowerCase().includes(searchQuery.toLowerCase())
// );
//   return (

//     <div style={{ width: "100%" }}>
//       {/* <div className='d-flex justify-content-end align-items-center m-4'>
// <div>
// <InputGroup>
// <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
// <CiSearch style={{ fontSize: 20 }} />
// </InputGroup.Text>
// <FormControl size="lg" 
//  value={searchQuery}
//  onChange={handleSearch}

// style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
// placeholder="Search..."
// />
// </InputGroup>
// </div>
// <div className="mr-3">
// <img src={Notify} alt="notification" />
// </div>

// <div className="mr-3">
// <Image src={profile ? profile : Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
// </div>
// </div> */}
// {showReport &&
//     <div className='m-4'>

//       <div className="ms-3">
//         <label style={{ color: "#222222", fontWeight: 600, fontSize: 24, fontFamily: "Gilroy" }}>Reports</label>
//       </div>
//       <div className='row mt-3 mb-3 g-0 '>
//         {filteredReports && filteredReports.map((report) => (
//           <div key={report.id} className='col-lg-4 col-md-6 col-xs-12 col-sm-12 mb-3'>
//             <Card  
//              onMouseEnter={() => handleMouseEnter(report.id)}
//              onMouseLeave={handleMouseLeave}
//              onClick={() => handlePageClick(report.id)}
//             style={{borderRadius:16, border:"1px solid", borderColor: hoveredCard === report.id ? "#0000FF" : "#DCDCDC"}} >
//               <Card.Body>
//                 <div className='d-flex justify-content-start gap-2 align-items-center '>
//                   <div>
//                     <Image src={hoveredCard === report.id ? CatoryActive : report.images} style={{height:24, width:24}}/>
//                   </div>
//                   <div>
//                     <label style={{fontSize:16, fontWeight:600, color:hoveredCard === report.id ? "#0000FF" : "#222222", fontFamily:"Gilroy"}}>{report.ReportsName}</label>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
// }

//     {selectedReport === 1 && <HostelRentProjection  isVisible={handleBack}/>}








//   </div>


//   )
// }

// export default Reports



import React, { useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';


function VerticalTabs() {
  const [key, setKey] = useState('0');

  const tabs = [
    { eventKey: '0', title: 'Item One', content: 'Item One Content' },
    { eventKey: '1', title: 'Item Two', content: 'Item Two Content' },
    { eventKey: '2', title: 'Item Three', content: 'Item Three Content' },
    { eventKey: '3', title: 'Item Four', content: 'Item Four Content' },
    { eventKey: '4', title: 'Item Five', content: 'Item Five Content' },
    { eventKey: '5', title: 'Item Six', content: 'Item Six Content' },
    { eventKey: '6', title: 'Item Seven', content: 'Item Seven Content' },
  ];

  const handlePrev = () => {
    const currentIndex = parseInt(key, 10);
    if (currentIndex > 0) setKey((currentIndex - 1).toString());
  };

  const handleNext = () => {
    const currentIndex = parseInt(key, 10);
    if (currentIndex < tabs.length - 1) setKey((currentIndex + 1).toString());
  };

  return (
    <Tab.Container activeKey={key} onSelect={(k) => setKey(k)} id="vertical-tabs-example">
      <Row className="flex-nowrap">
        <Col sm={3} className='d-flex justify-content-center'>
          <div>
            <div className='d-flex justify-content-center'>
            <div className="" onClick={handlePrev} disabled={key === '0'} style={{ border: "1px solid #DCDCDC", width: "fit-content", borderRadius: 50 }}>
              <ArrowUp2
                size="32"
                color="#EBEBEB"
                variant="Bold"
              />
            </div>
            </div>
           

            <Nav variant="" className="flex-column">
              {tabs.map((tab) => (
                <Nav.Item key={tab.eventKey} className='mb-3 mt-2 p-4' style={{border:"1px solid #dcdcdc", borderRadius:10}}>
                  <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div className='d-flex justify-content-center'>
            <div className="" onClick={handlePrev} disabled={key === '0'} style={{ border: "1px solid #DCDCDC", width: "fit-content", borderRadius: 50 }}>
              <ArrowDown2
                size="32"
                color="#EBEBEB"
                variant="Bold"
              />
            </div>
</div>
          </div>

        </Col>
        <Col sm={9}>
          <Tab.Content>
            {tabs.map((tab) => (
              <Tab.Pane eventKey={tab.eventKey} key={tab.eventKey}>
                <h4>{tab.content}</h4>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-3">


      </div>
    </Tab.Container>
  );
}

export default VerticalTabs;
