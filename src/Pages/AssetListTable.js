import React, { useEffect, useState, useRef } from 'react';
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Assign from '../Assets/Images/New_images/assign.png'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import AssignAsset from './AssignAsset'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputGroup, Pagination, Table, DropdownButton, Dropdown, Form ,Modal} from 'react-bootstrap';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort ,Edit, Trash,ProfileAdd} from 'iconsax-react';
import Button from 'react-bootstrap/Button';
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
    

    const handleDelete = () => {
    
    
      if (deleteAsset_Id) {

        dispatch({
          type: 'DELETEASSET',
          payload: {
            asset_id: deleteAsset_Id.id,
          },
        });


        // toast(
        //   ({ closeToast }) => (
        //     <div>
        //       <p style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        //         Do you want to delete the asset?
        //       </p>
        //       <div className='w-100 d-flex justify-content-center'>
        //         <button
        //           style={{
        //             marginRight: '10px',
        //             backgroundColor: '#1E45E1',
        //             color: '#fff',
        //             border: 'none',
        //             padding: '5px 10px',
        //             borderRadius: '5px',
        //             cursor: 'pointer',
        //             fontSize: 14,
        //             fontFamily: "Gilroy",
        //             fontWeight: 500
        //           }}
        //           onClick={() => {
        //             dispatch({
        //               type: 'DELETEASSET',
        //               payload: {
        //                 asset_id: item.id,
        //               },
        //             });
                    
                    
    
        //             closeToast(); // Close the confirmation toast after clicking 'Yes'
        //           }}
        //         >
        //           Yes
        //         </button>
             
        //         {/* <button
        //           style={{
        //             backgroundColor: '#f44336',
        //             color: '#fff',
        //             border: 'none',
        //             padding: '5px 10px',
        //             borderRadius: '5px',
        //             cursor: 'pointer',
        //             fontSize: 14,
        //             fontFamily: "Gilroy",
        //             fontWeight: 500
        //           }}
        //           onClick={closeToast} 
        //         >
        //           No
        //         </button> */}
        //       </div>
        //     </div>
        //   ),
        //   {
        //     position: 'top-center',
        //     autoClose: false,
        //     closeOnClick: false,
        //     hideProgressBar: true,
        //     draggable: false,
        //   }
        // );
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

const [showDeleteAsset, setShowDeleteAsset] = useState(false)
const [deleteAsset_Id,  setDeleteAsset_Id] = useState('')

const handleShowDeleteAsset = (item) =>{
  setShowDeleteAsset(true)
  setDeleteAsset_Id(item)
}



const handleCloseForDeleteAsset = () =>{
  setShowDeleteAsset(false)
}














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
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500,width:120,  padding: 8, borderRadius: 60, fontSize: 14, display: "flex", justifyContent: "center", fontFamily: "Gilroy" }}>{props.item.brand_name ? props.item.brand_name : "-" }</div>
      </div>
    </td>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' ,border: "none"}}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: 120, padding: 8, borderRadius: 60, fontSize: 14, display: "flex", justifyContent: "center",fontFamily: "Gilroy" }}>{props.item.asset_name ? props.item.asset_name : "-"}</div>
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
   
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.hostel_Name || "-"}</td>
    {/* <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.floor_name || "N/A"}</td>
    <td style={{ border: "none",textAlign: 'center', verticalAlign: 'middle', fontSize: 14, fontWeight: 500, color: "#000000" ,fontFamily: "Gilroy"}}>{props.item.room_id || "N/A"}</td> */}



    <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle' }}>
      <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>
      <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position:"relative"}}  onClick={() => handleShowDots(props.item.id)}  >
        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />
     
     
{showDots  && <>
<div ref={popupRef} 
style={{cursor:"pointer",backgroundColor: "#F9F9F9", position: "absolute", 
  right: 40, top:10, width: 163, height:"auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center" ,zIndex: 1000}}


>
<div  style={{backgroundColor: "#F9F9F9"}} className=''>

<div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
  onClick={()=>handleAssignAsset(props.item)}
  style={{backgroundColor: "#F9F9F9", cursor:"pointer"}}
   >
   <ProfileAdd
 size="16"
 color="#1E45E1"
/><label style={{cursor:"pointer", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", color: "#222222" ,cursor:"pointer"}} >{props.item.hostel_id  ? 'Reassign asset':'Assign asset'}</label>
  </div>
 
  <div className='mb-2 d-flex justify-content-start align-items-center gap-2' 
  onClick={()=>handleEdit(props.item)}
  style={{backgroundColor: "#F9F9F9",cursor:"pointer"}}
   >
    <Edit size="16" color="#1E45E1" /> <label style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", color: "#222222",cursor:"pointer" }} >Edit</label>
  </div>
  <div   className='mb-1 d-flex justify-content-start align-items-center gap-2'
  style={{backgroundColor: "#F9F9F9", cursor:props.item.hostel_id  ? "not-allowed": "pointer"  }}
  onClick={() => !props.item.hostel_id && handleShowDeleteAsset(props.item)}
  > 
     <div>
      <Trash size="16" color="red" /></div> 
      <div>
      <label style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", color: "#FF0000" ,cursor:props.item.hostel_id  ? "not-allowed": "pointer"}}>Delete</label>

      </div>
  </div>
</div>
</div>


</>}
     
      </div>
      </div>
      
    </td>
  </tr>

{showAssignAssetModal && <AssignAsset  show={showAssignAssetModal}  handleClose={handleClose} currentItem={assign}/>}
  

<div>  
        <Modal show={showDeleteAsset} onHide={handleCloseForDeleteAsset} centered backdrop="static">
    <Modal.Header style={{display:"flex", justifyContent:"center"}}>
      <Modal.Title style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>Delete asset?</Modal.Title>
      {/* <CloseCircle size="24" color="#000"  onClick={handleCloseForDeleteAsset}/> */}
    </Modal.Header>

   

    
      <Modal.Body style={{fontSize:14,fontWeight:500, fontFamily:"Gilroy", textAlign:"center"}}>
            Are you sure you want to delete this asset?
                </Modal.Body>

  
    <Modal.Footer className='d-flex justify-content-center' style={{border:"none"}}>
    <Button  onClick={handleCloseForDeleteAsset} style={{borderRadius:8, padding:"16px 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"#FFF",color:"rgba(36, 0, 255, 1)",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
         
          <Button style={{borderRadius:8, padding:"16px 45px" ,border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"rgba(36, 0, 255, 1)",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} onClick={handleDelete}>
            Delete
          </Button>

    </Modal.Footer>
  </Modal>
  
  </div>



  </>
  )
}

export default AssetListTable