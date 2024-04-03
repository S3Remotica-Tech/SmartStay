import React from "react";
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


const Billings = () => {


    return (
        <div>
<div>
                     <div className='d-flex  justify-content-between'>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 600 }}>EB Billing</h2>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                 
                </div>
                <hr style={{ opacity: 0.1 }} />


                <Table responsive>
        <thead style={{ backgroundColor: "#E6EDF5",color:'black' }}>
          <tr >
            <th style={{fontWeight:600}}>Hostel Name</th>
            <th  className="text-center" style={{fontWeight:600}}>Hostel Based-Room Based<i class="bi bi-info-circle-fill ms-1"></i></th>           
         
          </tr>
        </thead>
        <tbody style={{backgroundColor:"#FFFFFF" }}>
        
           
          
            <tr>
            <td style={{ color: "black",fontSize:'14px', fontWeight: 600 }}>Royal Grand Hostel</td>
              <td  className="text-center"><Form.Check type="switch" id="custom-switch" /></td>
            </tr>
           
         
            <tr>
            <td style={{ color: "black",fontSize:'14px', fontWeight: 600 }}>Sky Hostel</td>
            <td  className="text-center"><Form.Check type="switch" id="custom-switch" /></td>
            </tr>

            
            <tr>
            <td style={{ color: "black",fontSize:'14px', fontWeight: 600 }}>Sai Sri Boys Hostel</td>
            <td  className="text-center"><Form.Check type="switch" id="custom-switch" /></td>
            </tr>
        
        </tbody>
      </Table>
            </div>
        </div>
    )
}
export default Billings;