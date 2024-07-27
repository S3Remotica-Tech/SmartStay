import React, { useEffect, useState } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Assign from '../Assets/Images/New_images/assign.png'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import AssignAsset from './AssignAsset'


function AssetListTable(props) {



    const state = useSelector(state => state)
  const dispatch = useDispatch();



    const [showDots, setShowDots] = useState(null);
    const [showAssignAssetModal, setShowAssignAssetModal] = useState(false)
const [assign, setAssign] = useState('')




    const handleShowDots = (id) => {
      console.log("id",id, showDots)
        setShowDots(!showDots)
      }


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


      const handleEdit = (item) => {
console.log("item",item)
props.OnEditAsset(item)

      }

      const handleDelete = (item) =>{
        console.log("delete item",item)
    if(item){
        Swal.fire({
          icon: 'warning',
          title: 'Do you want to delete the asset ?',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          showCancelButton: true,
      }).then((result) => {
          if (result.isConfirmed) {
              dispatch({
                  type: 'DELETEASSET',
                  payload: {
                    asset_id: item.id,
                    },
              });
              Swal.fire({
                  icon: 'success',
                  title: 'Asset deleted Successfully',
              })
          }
          
      });
    
    }
    
      }
    
const handleAssignAsset = (item) => {
setShowAssignAssetModal(true)
setAssign(item)
}

const handleClose = () => {
  setShowAssignAssetModal(false)
}



  return (
    <>
    <tr style={{ fontFamily: "Gilroy"}} key={props.item.id}>

    <td style={{ color: "", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center"}}>
      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
    </td>

    <td>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "between", flex:"wrap", gap:2, width:"100%" }}>
        <div style={{ height: 40, width: 40, backgroundColor: "#E0ECFF", borderRadius: "50%" }}></div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#222222" ,fontFamily: "Gilroy"}}>{props.item.asset_name}</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.serial_number}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 60, fontSize: 14, display: "flex", justifyContent: "center", width: "fit-content",fontFamily: "Gilroy" }}>{props.item.brand_name}</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}>{props.item.product_count}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>₹{props.item.price.toLocaleString('en-IN')}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content",fontFamily: "Gilroy" }} >
          {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
        </div >
      </div>

    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}>₹{props.item.total_price.toLocaleString('en-IN')}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>
      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position:"relative"}}  onClick={() => handleShowDots(props.item.id)}  >
        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />
     
     
{showDots  && <>
<div style={{cursor:"pointer",backgroundColor: "#fff", position: "absolute", right: 40, top:10, width: 163, height:"auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center" ,zIndex: 2000}}>
<div  style={{backgroundColor: "#fff"}} className=''>

<div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
  onClick={()=>handleAssignAsset(props.item)}
  style={{backgroundColor: "#fff"}}
   >
    <img src={Assign} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" }} >{props.item.hostel_id  ? 'Reassign asset':'Assign asset'}</label>
  </div>
 
  <div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
  onClick={()=>handleEdit(props.item)}
  style={{backgroundColor: "#fff"}}
   >
    <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" }} >Edit</label>
  </div>
  <div  className='mb-1 d-flex justify-content-start align-items-center gap-2'
  style={{backgroundColor: "#fff"}}
  onClick={()=>handleDelete(props.item)}
  > 
    <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#FF0000" }}>Delete</label>
  </div>
</div>
</div>


</>}
     
      </div>
      </div>
      
    </td>
  </tr>

{showAssignAssetModal && <AssignAsset  show={showAssignAssetModal}  handleClose={handleClose} currentItem={assign}/>}
  





  </>
  )
}

export default AssetListTable