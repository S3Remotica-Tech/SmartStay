import React, { useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import Create from '../Assets/Images/Create-button.png';
import { Button, Row, Col } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';





const Compliance = () => {
  const data = [
    { id: 1, Date: '02-01-2023', RequestId: 'C00371', circle: 'RK', NamePhone: 'Ranganath krishna', phone: <span>+91 9025056737</span>, RoomDetail: 'Ground Floor', CompliantType: 'Furniture issue', Assign: 'Viji Vaithi', Status: 'Success' },
    { id: 2, Date: '02-12-2022', RequestId: 'C13678', circle: 'SG', NamePhone: 'Satish Gangaiah', phone: <span>+91 6382678710</span>, RoomDetail: '1st Floor', CompliantType: 'Bed issue', Assign: 'Saravanan', Status: 'Hold' },
    { id: 3, Date: '02-11-2022', RequestId: 'C81262', circle: 'PN', NamePhone: 'Praveen N', phone: <span>+91 8098171974</span>, RoomDetail: '2nd Floor', CompliantType: 'AC Remote Not Working', Assign: 'Assign to', Status: 'Pending' },
    { id: 4, Date: '02-10-2022', RequestId: 'C90221', circle: 'JH', NamePhone: 'Janna Hagan', phone: <span>+91 9942675899</span>, RoomDetail: '3rd Floor', CompliantType: 'Both Room Sweeping issue', Assign: 'Boopathi raj', Status: 'Hold' },
    { id: 5, Date: '02-09-2022', RequestId: 'C17292', circle: 'AH', NamePhone: 'Azizul Hakim', phone: <span>+91 9942208719</span>, RoomDetail: 'Ground Floor', CompliantType: 'Door issue', Assign: 'Assign to', Status: 'Success' },
    { id: 6, Date: '02-08-2022', RequestId: 'C91792', circle: 'SR', NamePhone: 'Sajib Rahman', phone: <span>+91 9977123380</span>, RoomDetail: '1st Floor', CompliantType: 'Bed issue', Assign: 'Assign to', Status: 'Success' },
    { id: 7, Date: '02-08-2022', RequestId: 'C12973', circle: 'RK', NamePhone: 'Ranganath krishna', phone: <span>+91 9725036012</span>, RoomDetail: '2nd Floor', CompliantType: 'AC Remote Not Working', Assign: 'Sukumar', Status: 'Success' },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const handlePageSelect = (event) => {
    const selectedPage = parseInt(event.target.value, 10);
    setCurrentPage(selectedPage);
  };


  return (
    <div class=' ps-3 pe-3' style={{ marginTop: "20px" }} >
      <div class="row g-0" style={{ width: "100%" }}>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" >
          <div class="pt-1 ps-0" >
            <h6 style={{ fontSize: "16px" }}>Compliance</h6>
          </div>
        </div>
        <div class="col-lg-6  offset-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div class="p-1 d-flex justify-content-end align-items-center"  >
            <BsSearch class=" me-4" />
            <IoFilterOutline class=" me-4" />
            <button type="button" class="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Compliance</button>
          </div>
        </div>
        <div>

        </div>
      </div>

      <Table responsive>
        <thead style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
          <tr >
            <th style={{ color: "#91969E" }}>Date</th>
            <th style={{ color: "#91969E" }}>Request ID</th>
            <th style={{ color: "#91969E" }}>Name & Phone</th>
            <th style={{ color: "#91969E" }}>Room Detail</th>
            <th style={{ color: "#91969E" }}>Compliant Type</th>
            <th style={{ color: "#91969E" }}>Assign</th>
            <th style={{ color: "#91969E" }}>Status</th>
            <th style={{ color: "#91969E" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "10px" }}>
          {currentItems.map((item) => (
            <tr key={item.id} >
              <td style={{ color: "black", fontWeight: 500 }}>{item.Date}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.RequestId}</td>
              <td>
                <div class="d-flex">
                  <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.circle}</p></span>
                  <div class="ms-2">
                    <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.NamePhone}</label><br />
                    <label style={{ color: "#9DA9BC", fontWeight: 600 }}>{item.phone}</label>
                  </div>
                </div>
              </td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.RoomDetail}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.CompliantType}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Assign}</td>
              <td style={item.Status == "Success" ? { color: "green" } : { color: "red" }}>{item.Status}</td>
              <td class=""><img src={List} height="20" width="20" /><img class="ms-1" src={Edit} height="20" width="20" /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
          </div>
          <Dropdown onSelect={(eventKey) => handlePageSelect(parseInt(eventKey))} >
            <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
              {currentPage} - {currentPage}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              {generatePageNumbers().map((page) => (
                <Dropdown.Item key={page} eventKey={page} style={{ width: "10%" }} >
                  {currentPage} - {page}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
            of <label>{currentPage}</label>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>

          <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px" }}>
            Prev
          </div>
          <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
          <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px" }}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;