import React, { useEffect, useState, useRef } from 'react';
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../../Assets/Images/New_images/trash.png';
import Assign from '../../Assets/Images/New_images/assign.png';
import Profile from '../../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import TagAsset from '../../Assets/Images/TagAsset.svg';
import closeicon from '../../Assets/Images/close.svg';
import { Modal, Button, Form } from "react-bootstrap";

function ExpensesListTable(props) {


  const [showDots, setShowDots] = useState('')
  const popupRef = useRef(null);
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

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
   
  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, width, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });


  }

  const handleEditExpense = (item) => {
    props.OnEditExpense(item)
  }


  const handleDelete = (id) => {
    props.handleDelete(id)

  }


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  const [assetname, setAssetName] = useState('')
  const [assetnameerror, setAssetNameError] = useState('')

  const handleAssetname = (e) => {
    setAssetName(e.target.value)

    if (!e.target.value) {
      setAssetNameError("Please select a assetname ")
    }
    else {
      setAssetNameError('')
    }
  }

  const handleTagAsset = () => {

    if (!assetname) {
      setAssetNameError("Please select a assetname ")
      return;
    }
    if (assetname) {
      dispatch({ type: 'ADDEXPENSETAG', payload: { id: props.item.id, asset_id: assetname, hostel_id: props.item.hostel_id } })
    }
  }

  useEffect(() => {
    if (state.ExpenseList.StatusCodeForAddExpenseTagSuccess === 200) {

      setshowTagAsset(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_EXPENSE_TAG_STATUS_CODE' })
      }, 100)
    }
  }, [state.ExpenseList.StatusCodeForAddExpenseTagSuccess])



  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  //Tag Asset
  const [showTagAsset, setshowTagAsset] = useState();

  const handleShowTagAsset = () => {

    setshowTagAsset(true)


  };



  // close icon  in tag asset
  const handleHideTagAsset = () => {
    setshowTagAsset(false);
  };



  return (<>
    <tr style={{ fontFamily: "Gilroy", border: "none" }} key={props.item.id}>
      {/* 
      <td style={{ color: "black", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center",border: "none"}}>
      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
    </td> */}

      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",paddingLeft:"20px" }}>{moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}</td>


      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 14, display: "flex", justifyContent: "center", width: "fit-content", fontFamily: "Gilroy" }}>{props.item.category_Name}</div>
        </div>
      </td>

      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.description || "-"}</td>
      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.unit_count}</td>
      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.unit_amount}</td>


      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content", fontFamily: "Gilroy" }} >
            {props.item.purchase_amount}
          </div >
        </div>

      </td>

      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ backgroundColor: "#D9E9FF", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content", fontFamily: "Gilroy" }} >
            {props.item.payment_mode}
          </div >
        </div>

      </td>


      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }} className=''>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ cursor: "pointer",backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EBEBEB", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={(e)=>handleShowDots(e)}>
            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

            {showDots && <>
              <div ref={popupRef} 
              style={{ cursor: "pointer", backgroundColor: "#f9f9f9",
                position: "fixed",
                top: popupPosition.top,
                left: popupPosition.left,
               width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                <div style={{ backgroundColor: "#f9f9f9" }} className=''>


                  {/* Tag Asset  */}
                  <div
                    className="mb-1 d-flex justify-content-start align-items-center gap-2"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleShowTagAsset}>
                    <div>
                      <img src={TagAsset} />
                    </div>
                    <div>
                      <label
                        style={{
                          cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: "black",
                        }}
                      >
                        Tag Asset
                      </label>
                    </div>
                  </div>





                  {/* edit  */}
                  <div
                    className="mb-2 d-flex justify-content-start align-items-center gap-2 "
                    onClick={() => {
                      if (!props.expenceEditPermission) {
                        handleEditExpense(props.item);
                      }
                    }}
                    style={{
                      cursor: props.expenceEditPermission ? "not-allowed" : "pointer",
                    }}
                  >
                    <div>
                      <Edit
                        size="16"
                        color={props.expenceEditPermission ? "#A9A9A9" : "#1E45E1"}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          cursor: props.expenceEditPermission ? "not-allowed" : "pointer",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: props.expenceEditPermission ? "#A9A9A9" : "#222222",
                        }}
                      >
                        Edit
                      </label>
                    </div>
                  </div>

                  {/* Delete  */}
                  <div
                    className="mb-1 d-flex justify-content-start align-items-center gap-2"
                    style={{
                      cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!props.expenceDeletePermission) {
                        handleDelete(props.item.id);
                      }
                    }}
                  >
                    <div>
                      <Trash
                        size="16"
                        color={props.expenceDeletePermission ? "#A9A9A9" : "red"}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: props.expenceDeletePermission ? "#A9A9A9" : "#FF0000",
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

    {showTagAsset && (
      <>
        <div
          style={{
            // marginTop: 15,
            fontWeight: 500,
            fontSize: 14,
            fontFamily: "Gilroy, sans-serif",
            display: "block", 
            textAlign: "left", 
          }}
          onClick={(e) => e.stopPropagation()}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid#E7E7E7",
              paddingBottom: "10px",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: 18,
                fontFamily: "Gilroy, sans-serif",
                margin: 0,
              }}
            >
              Tag Asset
            </p>
            <img
              src={closeicon}
              alt="Close"
              style={{ cursor: "pointer", width: 20, height: 20 }}
              onClick={handleHideTagAsset}
            />
          </div>

          <div
            style={{
              marginTop: 15,
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}
          >
            <label
              style={{
                marginTop: 15,
                fontWeight: 500,
                fontSize: 14,
                fontFamily: "Gilroy, sans-serif",
                display: "block",
                textAlign: "left",
              }}
            >
              Asset Unique Name
            </label>

            <select
              style={{
                marginTop: 15,
                border: "1px solid #E7E7E7",
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 16,
                width: "100%",
                height: "52px",
                borderRadius: "12px",
                fontWeight: 500,
                fontSize: 14,
                fontFamily: "Gilroy, sans-serif",
              }}
              defaultValue=""

              value={assetname}
              onChange={(e) => handleAssetname(e)}
            >
              <option value="" disabled>
                Select an Asset
              </option>
              {state.AssetList.assetList.map((view) => (
                <option key={view.asset_id} value={view.asset_id}>
                  {view.asset_name}
                </option>
              ))}
            </select>

            {state.AssetList.assetList &&
              state.AssetList.assetList.length == 0 && (
                <label
                  className="pb-1"
                  style={{
                    fontSize: 14,
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {" "}
                  Please add an 'Asset' option in Asset page, accessible after
                  adding an expense.
                </label>
              )}

            <button
              style={{
                marginTop: 15,
                width: "100%",
                height: "59px",
                borderRadius: "12px",
                backgroundColor: "#1E45E1",
                color: "white",
                border: "none",
                fontSize: "16px",
                fontWeight: "400px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "40px",
                paddingRight: "40px",
                cursor: "pointer",
              }}

              onClick={handleTagAsset}
            >
              Tag Asset
            </button>
          </div>
        </div>

        <div
          onClick={handleHideTagAsset}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      </>
    )}


  </>
  )
}

export default ExpensesListTable