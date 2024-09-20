import React, { useEffect, useState, useRef } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Assign from '../Assets/Images/New_images/assign.png'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import AssignAsset from './AssignAsset'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AssetListTable(props) {

console.log("props asste",props)

    const state = useSelector(state => state)
  const dispatch = useDispatch();

  const popupRef = useRef(null);

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

    //   const handleDelete = (item) =>{
    //     console.log("delete item",item)
    // if(item){
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Do you want to delete the asset ?',
    //       confirmButtonText: 'Yes',
    //       cancelButtonText: 'No',
    //       showCancelButton: true,
    //   }).then((result) => {
    //       if (result.isConfirmed) {
    //           dispatch({
    //               type: 'DELETEASSET',
    //               payload: {
    //                 asset_id: item.id,
    //                 },
    //           });
    //           Swal.fire({
    //               icon: 'success',
    //               title: 'Asset deleted Successfully',
    //           })
    //       }
          
    //   });
    
    // }
    
    //   }
    

    const handleDelete = (item) => {
      console.log("delete item", item);
    
      if (item) {
        toast(
          ({ closeToast }) => (
            <div>
              <p style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                Do you want to delete the asset?
              </p>
              <div className='w-100 d-flex justify-content-center'>
                <button
                  style={{
                    marginRight: '10px',
                    backgroundColor: '#1E45E1',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 500
                  }}
                  onClick={() => {
                    dispatch({
                      type: 'DELETEASSET',
                      payload: {
                        asset_id: item.id,
                      },
                    });
                    
                    
    
                    closeToast(); // Close the confirmation toast after clicking 'Yes'
                  }}
                >
                  Yes
                </button>
             
                {/* <button
                  style={{
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 500
                  }}
                  onClick={closeToast} 
                >
                  No
                </button> */}
              </div>
            </div>
          ),
          {
            position: 'top-center',
            autoClose: false,
            closeOnClick: false,
            hideProgressBar: true,
            draggable: false,
          }
        );
      }
    };
    

const handleAssignAsset = (item) => {
setShowAssignAssetModal(true)
setAssign(item)
}

const handleClose = () => {
  setShowAssignAssetModal(false)
}




const handleClickOutside = (event) => {
  if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


// const popupStyle = {
//   position: 'absolute', 
//   right: '300px',  
//   top: '50%',  
//   width: '163px',
//   height: 'auto',
//   backgroundColor: '#fff',
//   border: '1px solid #EBEBEB',
//   borderRadius: '10px',
//   zIndex: 1000,
//   padding: '10px',
//   overflowY: 'auto',  
//   maxHeight: '300px' 
// };

  return (
    <>
    <tr style={{ fontFamily: "Gilroy"}} key={props.item.id}>

    {/* <td style={{ color: "", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center", border: "none"}}>
      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
    </td> */}
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.product_name}</td>

    {/* <td style={{border: "none"}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "between", flex:"wrap", gap:2, width:"100%" }}>
        <div style={{ height: 40, width: 40, backgroundColor: "#E0ECFF", borderRadius: "50%" }}></div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#222222" ,fontFamily: "Gilroy"}}>{props.item.asset_name}</div>
      </div>
    </td> */}
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.serial_number}</td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' ,border: "none"}}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500,width:120,  padding: 8, borderRadius: 60, fontSize: 14, display: "flex", justifyContent: "center", fontFamily: "Gilroy" }}>{props.item.brand_name ? props.item.brand_name : "Not Available" }</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' ,border: "none"}}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: 120, padding: 8, borderRadius: 60, fontSize: 14, display: "flex", justifyContent: "center",fontFamily: "Gilroy" }}>{props.item.asset_name ? props.item.asset_name : "Not Available "}</div>
      </div>
    </td>
    {/* <td style={{ border: "none" , textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}>{props.item.product_count}</td> */}
    <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>₹{props.item.price.toLocaleString('en-IN')}</td>
    <td style={{border: "none", textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content",fontFamily: "Gilroy" }} >
          {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
        </div >
      </div>

    </td>

    {/* <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}>₹{props.item.total_price.toLocaleString('en-IN')}</td> */}
   
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.hostel_Name || "Not assigned"}</td>
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.floor_name || "Not assignedt"}</td>
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.room_id || "Not assigned"}</td>



    <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>
      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position:"relative"}}  onClick={() => handleShowDots(props.item.id)}  >
        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />
     
     
{showDots  && <>
<div ref={popupRef} 
style={{cursor:"pointer",backgroundColor: "#fff", position: "absolute", 
  right: 40, top:10, width: 163, height:"auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center" ,zIndex: 1000}}


>
<div  style={{backgroundColor: "#fff"}} className=''>

<div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
  onClick={()=>handleAssignAsset(props.item)}
  style={{backgroundColor: "#fff", cursor:"pointer"}}
   >
    <img src={Assign} style={{ height: 16, width: 16 }} /> <label style={{cursor:"pointer", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" ,cursor:"pointer"}} >{props.item.hostel_id  ? 'Reassign asset':'Assign asset'}</label>
  </div>
 
  <div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
  onClick={()=>handleEdit(props.item)}
  style={{backgroundColor: "#fff",cursor:"pointer"}}
   >
    <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222",cursor:"pointer" }} >Edit</label>
  </div>
  <div   className='mb-1 d-flex justify-content-start align-items-center gap-2'
  style={{backgroundColor: "#fff", cursor:props.item.hostel_id  ? "not-allowed": "pointer"  }}
  onClick={() => !props.item.hostel_id && handleDelete(props.item)}
  > 
    <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#FF0000" ,cursor:props.item.hostel_id  ? "not-allowed": "pointer"}}>Delete</label>
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