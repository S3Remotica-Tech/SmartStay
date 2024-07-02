import React, { useEffect, useState } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Assign from '../Assets/Images/New_images/assign.png';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

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

  return (
    <tr style={{ fontFamily: "Gilroy, sans-serif"}} key={props.item.id}>

    <td style={{ color: "black", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center"}}>
      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
    </td>

    <td>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "between", flex:"wrap", gap:2, width:"100%" }}>
       <img src={Profile}  style={{height:40, width:40}}/>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#222222" }}>{props.item.asset_name}</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 14, display: "flex", justifyContent: "center", width: "fit-content" }}>{props.item.brand_name}</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" }}>{props.item.serial_number}</td>
   
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 10, fontSize: 14, width: "fit-content" }} >
          {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
        </div >
      </div>

    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" }}>{props.item.product_count}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#D9E9FF", fontWeight: 500, padding: 8, borderRadius: 10, fontSize: 14, width: "fit-content" }} >
          {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
        </div >
      </div>

    </td>
   
   
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className=''>
    <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>
      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center",position:"relative"}} onClick={handleShowDots}>
        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

        {showDots && <>
<div style={{cursor:"pointer",backgroundColor: "#fff", position: "absolute", right: 0, top:40, width: 163, height:"auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center" ,zIndex: showDots ? 1000 : 'auto'}}>
<div  style={{backgroundColor: "#fff"}} className=''>


<div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
onClick={()=>handleEditExpense(props.item)}
style={{backgroundColor: "#fff"}}
>
<img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Edit</label>
</div>
<div  className='mb-1 d-flex justify-content-start align-items-center gap-2'
style={{backgroundColor: "#fff"}}
// onClick={()=>handleDelete(props.item)}
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