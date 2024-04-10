import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';


const EB_Billings = (props) => {

  console.log("props", props);

  const [isChecked, setIsChecked] = useState(null);
  const [checkedvalue,setCheckedvalue]= useState([])

  const state = useSelector(state => state)
  console.log("state for EB billing",state )



  console.log("checkedvalue",checkedvalue);
  console.log("ischecked",isChecked);

  const handleChange = (event,hostelId) => {
      console.log("eventChecked", event.target.checked)
      setIsChecked(event.target.checked)
      props.onBoxchange(hostelId,event.target.checked)
     
  };

 


  useEffect(()=>{

    const UserIsEnable = state.UsersList.hostelList.filter(item=> item.id == props.Item.id)
    console.log("UserIsEnable",UserIsEnable)
   const IsEnableOn = UserIsEnable[0]?.isHostelBased
  
   console.log("IsEnableOn === 1",IsEnableOn === 1)
  
  if(IsEnableOn === 1){
    setIsChecked(true);
  }else{
    setIsChecked(false);
  }
  },[state.UsersList.hostelList])

 



  return (

    <div>

      <div style={{ backgroundColor: "#FFFFFF", padding: '5px' }}>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ color: "black", fontSize: '14px', fontWeight: 600, flex: 1 }}>{props.Item.Name}</div>
          <div className="text-center" style={{ flex: 1 }}>
            <Form.Check type="switch" id="custom-switch"
              checked={isChecked}
              onChange={(e)=>{handleChange(e,props.Item.id)}} />
          </div>
        </div>

    

      </div>

    </div>

  )
}
export default EB_Billings;