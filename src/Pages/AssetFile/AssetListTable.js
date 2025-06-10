import React, { useEffect, useState, useRef } from 'react';
// import Edit from '../Assets/Images/New_images/edit.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import { useDispatch} from 'react-redux';
import AssignAsset from '../../Pages/AssetFile/AssignAsset'
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import { Edit, Trash, ProfileAdd } from 'iconsax-react';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types"


function AssetListTable(props) {


  // const state = useSelector(state => state)
  const dispatch = useDispatch();

  const popupRef = useRef(null);

  const [showDots, setShowDots] = useState(null);
  const [showAssignAssetModal, setShowAssignAssetModal] = useState(false)
  const [assign, setAssign] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });




  const handleShowDots = (id, e) => {
    setShowDots(!showDots)
    const { top, left, height } = e.target.getBoundingClientRect();

    const popupHeight = 100;
    const viewportHeight = window.innerHeight;

    let popupTop = top + (height / 12);
    let popupLeft = left - 200;


    if (popupTop + popupHeight > viewportHeight) {
      popupTop = top - 50;
    }
    setPopupPosition({ top: popupTop, left: popupLeft });
  }



  const handleEdit = (item) => {
    props.OnEditAsset(item)

  }

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
        <td className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"  title={props.item.product_name} 
         style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1, textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", }}>{props.item.product_name}</td>

        <td  title={props.item.serial_number} style={{ textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-4">{props.item.serial_number}</td>

        <td title={props.item.brand_name  || "-"} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ textAlign: 'start', verticalAlign: 'middle', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
          <div >
            <div
              style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", 
                // backgroundColor: "#FFEFCF",
                 fontWeight: 500, width: "120px", padding: 6, borderRadius: 60, fontSize: 13, fontFamily: "Gilroy" }}
            >{props.item.brand_name ? props.item.brand_name : "-"}</div>
          </div>
        </td>

        <td title={props.item.asset_name} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ textAlign: 'start', verticalAlign: 'middle', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>
          <div style={{ width: "100%" }}>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500, padding: 6, borderRadius: 60, fontSize: 13, fontFamily: "Gilroy" }}>{props.item.asset_name ? props.item.asset_name : "-"}</div>
          </div>
        </td>

        <td title={props.item.price} style={{ textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
          <div className='ps-1'>
          ₹{props.item.price ? props.item.price.toLocaleString('en-IN') : '0'}
          </div>
          </td>

        <td title={moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}   style={{ textAlign: 'start', verticalAlign: 'middle', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
          <div style={{ width: "100%", }}>
            <div style={{
              //  backgroundColor: "#EBEBEB", 
              fontWeight: 500, padding: 6, borderRadius: 60, fontSize: 13, width: "fit-content", fontFamily: "Gilroy" }} >
              {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
            </div >
          </div>
        </td>

        <td title={props.item.hostel_Name || "-"}  style={{ textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",paddingLeft:20 }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-4">
          {props.item.hostel_Name || "-"}
          </td>


        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "left" }}>
            <div style={{ cursor: "pointer", backgroundColor: showDots ? "#E7F1FF" : "white", height: 30, width: 30, 
              borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center",
               position: "relative" }} onClick={(e) => handleShowDots(props.item.id, e)}  >
              <PiDotsThreeOutlineVerticalFill style={{ height: 15, width: 15, }} />
              {showDots && 
              <>
                <div
                 ref={popupRef}
                  style={{
                    cursor: "pointer", backgroundColor: "#F9F9F9",
                    position: "fixed",
                    top: popupPosition.top -30,
                    left: popupPosition.left,
// marginBottom:"40px",
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
          dialogClassName="custom-delete-modal"
         
        >
          <Modal.Header style={{  borderBottom: 'none' }}>
            <Modal.Title 
            className="w-100 text-center"
            style={{
            
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}>Delete asset?</Modal.Title>
            {/* <CloseCircle size="24" color="#000"  onClick={handleCloseForDeleteAsset}/> */}
          </Modal.Header>




          <Modal.Body 
           className="text-center"
          style={{
            //  fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", textAlign: "center", padding: "0px"
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
  
            marginTop: "-10px",
              }}>
            Are you sure you want to delete this asset?
          </Modal.Body>


          <Modal.Footer className='d-flex justify-content-center' 
          style={{
            //  border: "none" 
            
            borderTop: "none",
            marginTop: "-10px",
          }}>
            <Button 
            className="me-2"
            onClick={handleCloseForDeleteAsset} 
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
               >
              Cancel
            </Button>

            <Button 
              style={{
                width: "100%",
                maxWidth: 160,
                height: 52,
                borderRadius: 8,
                padding: "12px 20px",
                background: "#1E45E1",
                color: "#FFFFFF",
                fontWeight: 600,
                fontFamily: "Gilroy",
                fontSize: "14px",
              }}
              onClick={handleDelete}>
              Delete
            </Button>

          </Modal.Footer>
        </Modal>

      </div>



    </>
  )
}
AssetListTable.propTypes = {
  OnEditAsset: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired,
  assetAddPermission: PropTypes.func.isRequired,
  assetEditPermission: PropTypes.func.isRequired,
  assetDeletePermission: PropTypes.func.isRequired 
};

export default AssetListTable