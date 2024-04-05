import React,{useState,useEffect} from "react";
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EB_Billings from "./EB_Billings";


const Billings = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(null);

  console.log("isChecked",isChecked)

    const handleChange = (event) => {
      console.log("eventChecked", event.target.checked)
      setIsChecked(event.target.checked);
    };

    // const handleSave = (hostelId) => {
    //   if (isChecked) {
    //     dispatch({ type: 'CHECKEB', payload: {Ishostelbased:isChecked ,Id:hostelId } })
    //   }
    // }

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
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}   >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                </div>
                 
                </div>
                <hr style={{ opacity: 0.1 }} />


      
        <div style={{ backgroundColor: "#E6EDF5",color:'black',padding:'5px' }}>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontWeight:600,flex:1}}>Hostel Name</div>
            <div className="text-center" style={{flex:1,fontWeight:600}}>Hostel Based<i class="bi bi-info-circle-fill ms-1"></i></div>           

          </div>
        </div>
     
        {state.UsersList.hostelList.map((item) => (
          <EB_Billings Item={item}/>

         ))}
                   
            </div>
        </div>
    )
}
export default Billings;