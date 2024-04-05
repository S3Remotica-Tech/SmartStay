import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';


  const EB_Billings = (props) => {

    console.log("props",props);
    const state = useSelector(state => state)
    const dispatch = useDispatch();
  
    const [isChecked, setIsChecked] = useState(null);
  
    console.log("isChecked",isChecked)
  
      const handleChange = (event) => {
        console.log("eventChecked", event.target.checked)
        setIsChecked(event.target.checked);
      };
  
      const handleSave = (hostelId) => {
        if (hostelId) {
          dispatch({ type: 'CHECKEB', payload: {Ishostelbased:isChecked ,Id:hostelId } })
        }
      }
  
      console.log("state for EB",state )

   return (

      <div> 
<div style={{backgroundColor:"#FFFFFF",display:'flex',flexDirection:'row',padding:'5px' }}>
           
                <div style={{ color: "black",fontSize:'14px', fontWeight: 600 ,flex:1}}>{props.Item.Name}</div>

                <div  className="text-center" style={{flex:1}}>
                  <Form.Check type="switch" id="custom-switch"
                     checked={isChecked}
                     onChange={handleChange} />
                </div>

                <div>
                <button type="button" class="mb-2"
                style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "600", width: "60px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}
                onClick={()=>{handleSave(props.Item.id)}} >Save</button>
              </div>
                      
                        </div>
        
      </div>

   )
  }
  export default EB_Billings;