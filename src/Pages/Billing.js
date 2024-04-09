import React,{useState,useEffect} from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EB_Billings from "./EB_Billings";
import { logDOM } from "@testing-library/react";


const Billings = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch();


   

    const handleSave = (tempArray) => {
      console.log("temparray",tempArray);
     
        dispatch({ type: 'CHECKEB', payload: {
          EBDETAILS:
          {tempArray
          // Id:hostelId
         }
        } })
      
    }

    console.log("state for EB",state )
    

    useEffect(() => {
      dispatch({ type: 'HOSTELLIST' })
    }, [])

    return (
        <div>
<div>
                     <div className='d-flex  justify-content-between'>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 600 }}>EB Billing</h2>
                  </div>
                  <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}  onClick={handleSave} >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                </div>
                 
                </div>
                <hr style={{ opacity: 0.1 }} />

           <div>
      
        <div style={{ backgroundColor: "#E6EDF5",color:'black',padding:'5px' }}>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontWeight:600,flex:1}}>Hostel Name</div>
            <div className="text-center" style={{flex:1,fontWeight:600}}>Room Based<i class="bi bi-info-circle-fill ms-1"></i></div>           

          </div>
        </div>
     
         <div></div>
        {state.UsersList.hostelList.map((item) => (
          <EB_Billings Item={item} handleSave={handleSave}/>

         ))}</div>
                   
            </div>
        </div>
    )
}
export default Billings;