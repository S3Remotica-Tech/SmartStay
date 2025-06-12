/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'iconsax-react';
import TagAsset from '../../Assets/Images/TagAsset.svg';
import closeicon from '../../Assets/Images/close.svg';
import { Modal, Button } from "react-bootstrap";
import { MdError } from "react-icons/md";
import './Expenses.css'
import { FormControl, Select, MenuItem } from '@mui/material';
import PropTypes from "prop-types";
function ExpensesListTable(props) {


  const [showDots, setShowDots] = useState('')
  const popupRef = useRef(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });


  }

  const handleEditExpense = (item) => {
    props.OnEditExpense(item)
  }


  const handleDelete = (id) => {
    props.handleDelete(id)
   setShowDeletePopup(true); 
  }


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

   const [showTagAsset, setshowTagAsset] = useState(false);

  const handleShowTagAsset = () => {

    setshowTagAsset(true)


  };


useEffect(() => {
  function handleClickOutside(event) {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !showTagAsset &&
      !showDeletePopup
    ) {
      setShowDots(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [popupRef, showTagAsset, showDeletePopup]);



  const [assetname, setAssetName] = useState('')
  const [assetnameerror, setAssetNameError] = useState('')


  const handleAssetname = (event) => {
    const { value } = event.target;
    setAssetName(value);
    setAssetNameError(value ? '' : 'Please select an asset');
  };








  const handleTagAsset = () => {

    if (!assetname) {
      setAssetNameError("Please Select a Asset Name ")
      return;
    }
    setAssetNameError("");
    if (assetname) {
      dispatch({ type: 'ADDEXPENSETAG', payload: { id: props.item.id, asset_id: assetname, hostel_id: props.item.hostel_id } })
    }
  }

  useEffect(() => {
    if (state.ExpenseList.StatusCodeForAddExpenseTagSuccess === 200) {
      handleHideTagAsset("")
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



  const handleHideTagAsset = () => {
    setshowTagAsset(false);
    setAssetNameError('')
    setAssetName("")
  };



  return (<>
    <tr style={{ fontFamily: "Gilroy", border: "none" }} key={props.item.id}>
      
              <td  style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}</span></td>

      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none",borderBottom: "1px solid #E8E8E8",whiteSpace:"nowrap" }}  className="ps-0 ps-sm-0 ps-md-3 ps-lg-3">
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 13, display: "flex", justifyContent: "center", fontFamily: "Gilroy" }}>{props.item.category_Name}</div>
        </div>
      </td>

      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle',  fontSize: 13,  fontWeight: 50, fontFamily: "Gilroy", color: "#000000",borderBottom: "1px solid #E8E8E8",whiteSpace:"nowrap" }}  className="ps-0 ps-sm-0 ps-md-3 ps-lg-3">{props.item.description || "-"}</td>
      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" ,borderBottom: "1px solid #E8E8E8",whiteSpace:"nowrap"}}  className="ps-0 ps-sm-0 ps-md-3 ps-lg-4">{props.item.unit_count}</td>
      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8",whiteSpace:"nowrap" }}  className="ps-0 ps-sm-0 ps-md-3 ps-lg-4">{props.item.unit_amount}</td>


      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none",borderBottom: "1px solid #E8E8E8",whiteSpace:"nowrap" }}  className="ps-0 ps-sm-0 ps-md-3 ps-lg-3">
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 13, width: "fit-content", fontFamily: "Gilroy" }} >
            {props.item.purchase_amount}
          </div >
        </div>

      </td>

    

     <td className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"  style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8", }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }} className=''>
      {props.item.payment_mode}
      </span></td>



      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none",borderBottom: "1px solid #E8E8E8",whiteSpace:"nowrap" }} className=''>
        <div style={{ width: "100%", display: "flex", justifyContent: "left" }}>
          <div style={{ cursor: "pointer", backgroundColor: showDots ? "#E7F1FF" : "white", height: 30, width: 30, borderRadius: 100, border: "1px solid #EBEBEB", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={(e) => handleShowDots(e)}>
            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

            {showDots && <>
              <div ref={popupRef} className="dots-popup"
                style={{
                  cursor: "pointer", backgroundColor: "#f9f9f9",
                  position: "fixed",
                  top: popupPosition.top,
                  left: popupPosition.left,
                  width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto'
                }}>
                <div style={{ backgroundColor: "#f9f9f9" }} className=''>


                  <div
                    className="mb-2 d-flex justify-content-start align-items-center gap-2"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleShowTagAsset}>
                    <div>
                      <img src={TagAsset} alt='tagg' />
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

  



    {
      showTagAsset &&
      <Modal
        show={showTagAsset}
        onHide={handleHideTagAsset}
        centered
        dialogClassName="custom-modal"
        backdrop="static"

      >
        <Modal.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <Modal.Title
            style={{
              fontWeight: 600,
              fontSize: 18,
              fontFamily: "Gilroy, sans-serif",
              margin: 0,
            }}
          >
            Tag Asset
          </Modal.Title>
          <img
            src={closeicon}
            alt="Close"
            style={{ cursor: "pointer", width: 24, height: 24 }}
            onClick={handleHideTagAsset}
          />
        </Modal.Header>



        <Modal.Body>
          <div style={{ marginTop: 10, width: "100%" }}>


            <FormControl
              fullWidth
              variant="outlined"
              className="mb-2"
              sx={{

                "& #vendor-select": { height: "auto" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D9D9D9" },
                  "&:hover fieldset": { borderColor: "#40a9ff" },
                  "&.Mui-focused fieldset": { borderColor: "#40a9ff" },
                },
                "& .MuiSelect-select": {
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  color: "#000",
                },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              <Select
                labelId="asset-select-label"
                id="vendor-select"
                value={assetname}
                onChange={handleAssetname}
                displayEmpty
                renderValue={(selected) =>
                  !selected ? <span style={{ color: "#BDBDBD" }}>Select Asset</span> : selected
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "#f8f9fa", 
                      maxHeight: 150,
                      marginTop: 1,
                      overflowY: "auto",
                      border: "2px solid #D9D9D9",
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "#1E45E1",
                        color: "#fff",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#D9E6FC !important", 
                        color: "#000",
                      },
                      "& .Mui-selected:hover": {
                        backgroundColor: "#1E45E1 !important",
                        color: "#fff",
                      },
                      "&::-webkit-scrollbar": { width: "6px" },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#1E45E1",
                        borderRadius: "4px",
                        border: "1px solid #D9D9D9",
                      },
                      "&::-webkit-scrollbar-track": { backgroundColor: "#f0f0f0" },
                    },
                    style: { scrollbarWidth: "thin" },
                  },
                }}
              >
                {state.AssetList.assetList.length > 0 ? (
                  state.AssetList.assetList.map((view) => (
                    <MenuItem key={view.asset_id} value={view.asset_name}>
                      {view.asset_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No assets available
                  </MenuItem>
                )}
              </Select>
            </FormControl>








            {state.AssetList.assetList &&
              state.AssetList.assetList.length === 0 && (
                <label
                  className="pb-1"
                  style={{
                    fontSize: 14,
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Please add an &apos;Asset&apos;option in Asset page, accessible after
                  adding an expense.
                </label>
              )}
            {
              assetnameerror &&


              <div className="d-flex align-items-center justify-content-center p-2">
                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                <label
                  className="mb-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {assetnameerror}
                </label>
              </div>
            }

            <Button
              style={{
                marginBottom: 10,
                width: "100%",
                height: "45px",
                borderRadius: "12px",
                backgroundColor: "#1E45E1",
                color: "white",
                border: "none",
                fontSize: "16px",
                fontWeight: 400,
                fontFamily: "Gilroy",
                cursor: "pointer",
              }}
              onClick={handleTagAsset}
            >
              Tag Asset
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    }


  </>
  )
}
ExpensesListTable.propTypes = {
  item: PropTypes.func.isRequired,
  expenceEditPermission: PropTypes.func.isRequired,
  OnEditExpense: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  expenceDeletePermission: PropTypes.func.isRequired,
};
export default ExpensesListTable