import React, { useEffect, useState, useRef } from 'react';
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../../Assets/Images/New_images/trash.png';
import Assign from '../../Assets/Images/New_images/assign.png'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import AssignAsset from '../../Pages/AssetFile/AssignAsset'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputGroup, Pagination, Table, DropdownButton, Dropdown, Form, Modal } from 'react-bootstrap';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash, ProfileAdd } from 'iconsax-react';
import Button from 'react-bootstrap/Button';


function AssetListTable(props) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const popupRef = useRef(null);

  const [showDots, setShowDots] = useState(null);
  const [showAssignAssetModal, setShowAssignAssetModal] = useState(false)
  const [assign, setAssign] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });




  const handleShowDots = (id, e) => {
    setShowDots(!showDots)
    const { top, left, width, height } = e.target.getBoundingClientRect();

    const popupHeight = 100;
    const viewportHeight = window.innerHeight;

    let popupTop = top + (height / 2);
    let popupLeft = left - 200;


    if (popupTop + popupHeight > viewportHeight) {
      popupTop = top - popupHeight;
    }
    setPopupPosition({ top: popupTop, left: popupLeft });
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
  const [deleteAsset_Id, setDeleteAsset_Id] = useState('')

  const handleShowDeleteAsset = (item) => {
    setShowDeleteAsset(true)
    setDeleteAsset_Id(item)
  }



  const handleCloseForDeleteAsset = () => {
    setShowDeleteAsset(false)
  }

  return (
    <>
      <tr style={{ fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} key={props.item.id}>
        <td className=''  title={props.item.product_name}  style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1, textAlign: 'center', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", paddingLeft: "20px" }}>{props.item.product_name}</td>

        <td  title={props.item.serial_number} style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>{props.item.serial_number}</td>

        <td title={props.item.brand_name  || "-"} style={{ textAlign: 'center', verticalAlign: 'middle', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", 
                // backgroundColor: "#FFEFCF",
                 fontWeight: 500, width: "120px", padding: 6, borderRadius: 60, fontSize: 13, fontFamily: "Gilroy" }}
            >{props.item.brand_name ? props.item.brand_name : "-"}</div>
          </div>
        </td>

        <td title={props.item.asset_name} style={{ textAlign: 'center', verticalAlign: 'middle', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500, padding: 6, borderRadius: 60, fontSize: 13, fontFamily: "Gilroy" }}>{props.item.asset_name ? props.item.asset_name : "-"}</div>
          </div>
        </td>

        <td title={props.item.price} style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>₹{props.item.price ? props.item.price.toLocaleString('en-IN') : '0'}</td>

        <td title={moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}   style={{ textAlign: 'center', verticalAlign: 'middle', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
            <div style={{
              //  backgroundColor: "#EBEBEB", 
              fontWeight: 500, padding: 6, borderRadius: 60, fontSize: 13, width: "fit-content", fontFamily: "Gilroy" }} >
              {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
            </div >
          </div>
        </td>

        <td title={props.item.hostel_Name || "-"}  style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>{props.item.hostel_Name || "-"}</td>


        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer", backgroundColor: showDots ? "#E7F1FF" : "white", height: 30, width: 30, 
              borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center",
               position: "relative" }} onClick={(e) => handleShowDots(props.item.id, e)}  >
              <PiDotsThreeOutlineVerticalFill style={{ height: 15, width: 15, }} />
              {showDots && <>
                <div
                 ref={popupRef}
                  style={{
                    cursor: "pointer", backgroundColor: "#F9F9F9",
                    position: "fixed",
                    top: popupPosition.top,
                    left: popupPosition.left,

                    width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", 
                    justifyContent: "start", padding: 10, alignItems: "center", zIndex: 1000
                  }}


                >
                  <div style={{ backgroundColor: "#F9F9F9" 
                  }} >

                    <div
                      className="mb-2 d-flex justify-content-start align-items-center gap-2"
                      onClick={() => {
                        if (!props.assetAddPermission) {
                          handleAssignAsset(props.item);
                        }
                      }}
                      style={{
                        backgroundColor: "#F9F9F9",
                        cursor: props.assetAddPermission ? "not-allowed" : "pointer",
                        pointerEvents: props.assetAddPermission ? "none" : "auto",
                        opacity: props.assetAddPermission ? 0.5 : 1,
                      }}
                    >
                      <ProfileAdd size="16" color="#1E45E1" />
                      <label
                        style={{
                          cursor: props.assetAddPermission ? "not-allowed" : "pointer",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: "#222222",
                        }}
                      >
                        {props.item.hostel_id ? "Reassign asset" : "Assign asset"}
                      </label>
                    </div>


                    <div
                      className="mb-2 d-flex justify-content-start align-items-center gap-2"
                      onClick={() => {
                        if (!props.assetEditPermission) {
                          handleEdit(props.item);
                        }
                      }}
                      style={{
                        backgroundColor: "#F9F9F9",
                        cursor: props.assetEditPermission ? "not-allowed" : "pointer",
                        pointerEvents: props.assetEditPermission ? "none" : "auto",
                        opacity: props.assetEditPermission ? 0.5 : 1,
                      }}
                    >
                      <Edit size="16" color="#1E45E1" />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy, sans-serif",
                          color: "#222222",
                          cursor: "pointer"
                        }}
                      >
                        Edit
                      </label>
                    </div>

                    <div
                      className="mb-1 d-flex justify-content-start align-items-center gap-2"
                      style={{
                        backgroundColor: "#F9F9F9",
                        cursor: props.assetDeletePermission || props.item.hostel_id ? "not-allowed" : "pointer",
                        pointerEvents: props.assetDeletePermission || props.item.hostel_id ? "none" : "auto",
                        opacity: props.assetDeletePermission || props.item.hostel_id ? 0.5 : 1,
                      }}
                      onClick={() => {
                        if (!props.assetDeletePermission && !props.item.hostel_id) {
                          handleShowDeleteAsset(props.item);
                        }
                      }}
                    >
                      <div>
                        <Trash size="16" color="red" />
                      </div>
                      <div>
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy, sans-serif",
                            color: "#FF0000",
                            cursor: props.assetDeletePermission || props.item.hostel_id ? "not-allowed" : "pointer",
                          }}
                        >
                          Delete
                        </label>
                      </div>
                    </div>

                  </div>
                </div>


              </>}

            </div>
          </div>

        </td>
      </tr>

      {showAssignAssetModal && <AssignAsset show={showAssignAssetModal} handleClose={handleClose} currentItem={assign} />}


      <div >
        <Modal show={showDeleteAsset} onHide={handleCloseForDeleteAsset} centered backdrop="static"
          // dialogClassName="custom-modal"
          style={{
            // width: 380,
            // height: 250,
            // marginLeft: "500px",
            // marginTop: "200px",
            // padding: "15px 25px",
            width: 388,
            height: 250,
            marginLeft: "500px",
            marginTop: "200px",
          }}
        >
          <Modal.Header style={{ display: "flex", justifyContent: "center", borderBottom: 'none' }}>
            <Modal.Title style={{
            
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}>Delete asset?</Modal.Title>
            {/* <CloseCircle size="24" color="#000"  onClick={handleCloseForDeleteAsset}/> */}
          </Modal.Header>




          <Modal.Body style={{
            //  fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", textAlign: "center", padding: "0px"
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-20px",
              }}>
            Are you sure you want to delete this asset?
          </Modal.Body>


          <Modal.Footer className='d-flex justify-content-center' 
          style={{
            //  border: "none" 
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}>
            <Button onClick={handleCloseForDeleteAsset} 
            style={{ 
              // borderRadius: 8, padding: "12px 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "#FFF",
              //  color: "rgba(36, 0, 255, 1)", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" 
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              marginRight: 10,
               }}>
              Cancel
            </Button>

            <Button style={{ 
              // borderRadius: 8, padding: "12px 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: 
              // "rgba(36, 0, 255, 1)", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" 
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              }} onClick={handleDelete}>
              Delete
            </Button>

          </Modal.Footer>
        </Modal>

      </div>



    </>
  )
}

export default AssetListTable