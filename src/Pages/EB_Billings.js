import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';


const EB_Billings = (props) => {


  const [isChecked, setIsChecked] = useState(null);
  const [checkedvalue,setCheckedvalue]= useState([])

  const state = useSelector(state => state)


  const handleChange = (event,hostelId) => {
      setIsChecked(event.target.checked)
      props.onBoxchange(hostelId,event.target.checked)
     
  };

 


  useEffect(()=>{

    const UserIsEnable = state.UsersList.hostelList.filter(item=> item.id == props.Item.id)
   const IsEnableOn = UserIsEnable[0]?.isHostelBased
    
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
          <div className="text-center" style={{ flex: 0.5 }}>
            <Form.Check type="switch" id="custom-switch"
              checked={isChecked}
              onChange={(e)=>{handleChange(e,props.Item.id)}} />
          </div>
          <div style={{ color: "black", fontSize: '14px', fontWeight: 600, flex: 0.5 }}>
            {isChecked == true ? ' Hostel_based': ' Room_based'}
          </div>
        </div>

    

      </div>

    </div>

  )
}
export default EB_Billings;