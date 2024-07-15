import React, { useEffect, useState } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Assign from '../Assets/Images/New_images/assign.png';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';

function ExpensesListTable(props) {


    const [showDots, setShowDots] = useState('')

    const state = useSelector(state => state)
    const dispatch = useDispatch();
  
    const customCheckboxStyle = {
        appearance: 'none',
        width: '20px',
        height: '20px',
        backgroundColor: '#fff',
        border: '2px solid #DCDCDC',
        borderRadius: '4px',
        display: 'inline-block',
        position: 'relative',
      };


    const handleShowDots = () => {
        setShowDots(!showDots)
      }

      const handleEditExpense = (item) => {
        props.OnEditExpense(item)
      }


const handleDelete = (id) =>{
props.handleDelete(id)

}








  return (
    <tr style={{ fontFamily: "Gilroy, sans-serif"}} key={props.item.id}>

    <td style={{ color: "black", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center"}}>
      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
    </td>

    <td>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "between", flex:"wrap", gap:2, width:"100%" }}>
       <Image src={props.item.Vendor_profile ? props.item.Vendor_profile : Profile} roundedCircle style={{height:40, width:40}}/>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#222222" }}>{props.item.Vendor_Name}</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 14, display: "flex", justifyContent: "center", width: "fit-content" }}>{props.item.category_Name}</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" }}>{props.item.asset_name}</td>
   
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 10, fontSize: 14, width: "fit-content" }} >
          {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
        </div >
      </div>

    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" }}>{props.item.purchase_amount}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#D9E9FF", fontWeight: 500, padding: 8, borderRadius: 10, fontSize: 14, width: "fit-content" }} >
          {props.item.payment_mode}
        </div >
      </div>

    </td>
   
   
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className=''>
    <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>
      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center",position:"relative"}} onClick={handleShowDots}>
        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

        {showDots && <>
<div style={{cursor:"pointer",backgroundColor: "#fff", position: "absolute", right: 40, top:10, width: 163, height:"auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center" ,zIndex: showDots ? 1000 : 'auto'}}>
<div  style={{backgroundColor: "#fff"}} className=''>


<div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
onClick={()=>handleEditExpense(props.item)}
style={{backgroundColor: "#fff"}}
>
<img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Edit</label>
</div>
<div  className='mb-1 d-flex justify-content-start align-items-center gap-2'
style={{backgroundColor: "#fff"}}
onClick={()=>handleDelete(props.item.id)}
> 
<img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000" }}>Delete</label>
</div>
</div>
</div>


</>}


      </div>
      </div>
    </td>
  </tr>
  )
}

export default ExpensesListTable