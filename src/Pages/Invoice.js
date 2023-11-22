import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import { Dropdown } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';

const TableWithPagination = () => {
  const data = [
    { id: 1, Date: '02-01-2023', Invoices: '20230102-407', circle: 'RK', NamePhone: 'Ranganath krishna', Amount: '₹6500.00', BalanceDue: '00.00', DueDate: '02-01-2023', Status: 'Success' },
    { id: 2, Date: '02-12-2022', Invoices: '20230102-407', circle: 'SG', NamePhone: 'Satish Gangalah', Amount: '₹6500.00', BalanceDue: '700.00', DueDate: '02-12-2022', Status: 'Overdue by 13 days' },
    { id: 3, Date: '02-11-2022', Invoices: '20220102-364', circle: 'PN', NamePhone: 'Praveen N', Amount: '₹6500.00', BalanceDue: '00.00', DueDate: '02-11-2022', Status: 'Success' },
    { id: 4, Date: '02-10-2022', Invoices: '20221002-239', circle: 'JH', NamePhone: 'Janna Hagan', Amount: '₹6500.00', BalanceDue: '2000.00', DueDate: '02-10-2022', Status: 'Overdue by 15 days' },
    { id: 5, Date: '02-09-2022', Invoices: '20220902-326', circle: 'AH', NamePhone: 'Azizul Hakim', Amount: '₹6500.00', BalanceDue: '00.00', DueDate: '02-09-2022', Status: 'Success' },
    { id: 6, Date: '02-08-2022', Invoices: '20220802-251', circle: 'SR', NamePhone: 'Sajib Rahman', Amount: '₹6500.00', BalanceDue: '00.00', DueDate: '02-08-2022', Status: 'Success' },
    { id: 7, Date: '02-08-2022', Invoices: '20220802-212', circle: 'SR', NamePhone: 'Samson Raj', Amount: '₹6500.00', BalanceDue: '00.00', DueDate: '02-08-2022', Status: 'Success' },

  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // pagination
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  // page range
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
            <h6 style={{ fontSize: "16px" }}>Invoices</h6>
          </div>
        </div>
        <div class="col-lg-6  offset-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div class="p-1 d-flex justify-content-end align-items-center"  >
            <BsSearch class=" me-4" />
            <IoFilterOutline class=" me-4" />
            <button type="button" class="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Invoice</button>
          </div>
        </div>
        <div>

        </div>
      </div>
      <Table responsive >
        <thead class='pt-0' style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
          <tr style={{}}>
            <th style={{ color: "#91969E" }} >Date</th>
            <th style={{ color: "#91969E" }} >Invoices#</th>
            <th style={{ color: "#91969E" }} >Name & Phone</th>
            <th style={{ color: "#91969E" }} >Amount</th>
            <th style={{ color: "#91969E" }} >Balance Due</th>
            <th style={{ color: "#91969E" }} >Due Date</th>
            <th style={{ color: "#91969E" }} >Status</th>
            <th style={{ color: "#91969E" }} >Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "10px" }}>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ color: "black", fontWeight: 500 }} >{item.Date}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Invoices}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}> <span class="i-circle"><p style={{ fontSize: 12, color: "black" }} class="mb-0">{item.circle}</p></span><span style={{ color: "#0D99FF", fontWeight: 600, marginLeft: 5 }}>{item.NamePhone}</span></td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Amount}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.BalanceDue}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.DueDate}</td>
              <td style={item.Status == "Success" ? { color: "green" } : { color: "red" }}>{item.Status}</td>
              <td class="justify-content-between"><img src={List} height="20" width="20" alt='List'/><img class="ms-1" src={Edit} height="20" width="20" alt='Edit'/></td>
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
            <Dropdown.Menu>
              {generatePageNumbers().map((page) => (
                <Dropdown.Item key={page} eventKey={page}>
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

export default TableWithPagination;
