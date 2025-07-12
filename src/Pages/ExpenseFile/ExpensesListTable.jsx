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

import PropTypes from "prop-types";
import Select from "react-select";
function ExpensesListTable(props) {


  const [showDots, setShowDots] = useState('')
  const popupRef = useRef(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });


  }
  const [showAbove, setShowAbove] = useState(false);

useEffect(() => {
  if (popupRef.current) {
    const popupHeight = popupRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - popupPosition.top;
    
   
    setShowAbove(spaceBelow < popupHeight + 20);
  }
}, [popupPosition]);

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



  const handleAssetname = (selectedValue) => {
  setAssetName(selectedValue);
  setAssetNameError(selectedValue ? '' : 'Please select an asset');
};








  const handleTagAsset = () => {

    if (!assetname) {
      setAssetNameError("Please Select a Asset Name ")
      return;
    }
    setAssetNameError("");
    if (assetname) {
      dispatch({ type: 'ADDEXPENSETAG', payload: { id: props.item.id, asset_id: assetname, hostel_id: props.item.hostel_id } })

      setFormLoading(true)
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

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])



const options = state.AssetList.assetList.map((view) => ({
  value: view.asset_name,
  label: view.asset_name,
}));


  return (<>
    <tr style={{ fontFamily: "Gilroy", border: "none" }} key={props.item.id}>

      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}</span></td>

      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8", whiteSpace: "nowrap" }} className="ps-0 ps-sm-0 ps-md-3 ps-lg-3">
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 13, display: "flex", justifyContent: "center", fontFamily: "Gilroy" }}>{props.item.category_Name}</div>
        </div>
      </td>

      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", color: "#000000", borderBottom: "1px solid #E8E8E8", whiteSpace: "nowrap" }} className="ps-0 ps-sm-0 ps-md-3 ps-lg-4">{props.item.description || "-"}</td>
      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8", whiteSpace: "nowrap" }} className="ps-0 ps-sm-0 ps-md-3 ps-lg-4">{props.item.unit_count}</td>
      <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8", whiteSpace: "nowrap" }} className="ps-0 ps-sm-0 ps-md-3 ps-lg-4">{props.item.unit_amount}</td>


      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8", whiteSpace: "nowrap" }} className="ps-0 ps-sm-0 ps-md-3 ps-lg-3">
        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
          <div style={{ fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 13, width: "fit-content", fontFamily: "Gilroy" }} >
            {props.item.purchase_amount}
          </div >
        </div>

      </td>



      <td className="ps-0 ps-sm-0 ps-md-3 ps-lg-3" style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8", }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }} className=''>
        {props.item.paymentModeName ? props.item.paymentModeName : '-'}

      </span></td>



      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8", whiteSpace: "nowrap" }} className=''>
        <div style={{ width: "100%", display: "flex", justifyContent: "left" }}>
          <div style={{ cursor: "pointer", backgroundColor: showDots ? "#E7F1FF" : "white", height: 40, width: 40, borderRadius: 100, border: "1px solid #EBEBEB", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={(e) => handleShowDots(e)}>
            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

            {showDots && <>
              <div
                ref={popupRef}
                className="dots-popup"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#F9F9F9",
                  position: "fixed",
                   top: showAbove
    ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 20
    : popupPosition.top - 35,
                  left: popupPosition.left,
                  width: 160,
                  height: "auto",
                  border: "1px solid #EBEBEB",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  zIndex: showDots ? 1000 : "auto",
                }}
              >

                <div
                  className="d-flex justify-content-start align-items-center gap-2"
                  onClick={() => {
                    if (!props.expenceDeletePermission) {
                      handleShowTagAsset();
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!props.expenceDeletePermission)
                      e.currentTarget.style.backgroundColor = "#EDF2FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                    pointerEvents: props.expenceDeletePermission ? "none" : "auto",
                    opacity: props.expenceDeletePermission ? 0.5 : 1,
                  }}
                >
                  <img src={TagAsset} alt="tag" />
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: "#000000",
                      cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                    }}
                  >
                    Tag Asset
                  </label>
                </div>

                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />
                <div
                  className="d-flex justify-content-start align-items-center gap-2"
                  onClick={() => {
                    if (!props.expenceEditPermission) {
                      handleEditExpense(props.item);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!props.expenceEditPermission)
                      e.currentTarget.style.backgroundColor = "#EDF2FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    cursor: props.expenceEditPermission ? "not-allowed" : "pointer",
                    pointerEvents: props.expenceEditPermission ? "none" : "auto",
                    opacity: props.expenceEditPermission ? 0.5 : 1,
                  }}
                >
                  <Edit
                    size="16"
                    color={props.expenceEditPermission ? "#A9A9A9" : "#1E45E1"}
                  />
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: props.expenceEditPermission ? "#A9A9A9" : "#222222",
                      cursor: props.expenceEditPermission ? "not-allowed" : "pointer",
                    }}
                  >
                    Edit
                  </label>
                </div>

                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />

                <div
                  className="d-flex justify-content-start align-items-center gap-2"
                  onClick={() => {
                    if (!props.expenceDeletePermission) {
                      handleDelete(props.item.id);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!props.expenceDeletePermission)
                      e.currentTarget.style.backgroundColor = "#FFF0F0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                    pointerEvents: props.expenceDeletePermission ? "none" : "auto",
                    opacity: props.expenceDeletePermission ? 0.5 : 1,
                  }}
                >
                  <Trash
                    size="16"
                    color={props.expenceDeletePermission ? "#A9A9A9" : "red"}
                  />
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      color: props.expenceDeletePermission ? "#A9A9A9" : "#FF0000",
                      cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
                    }}
                  >
                    Delete
                  </label>
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


           


<Select
  options={options}
  placeholder="Select Asset"
  value={options.find((opt) => opt.value === assetname) || null}
  onChange={(selectedOption) => handleAssetname(selectedOption?.value)}
  styles={{
    control: (base, state) => ({
      ...base,
      fontSize: "16px",
      color: "rgba(75, 75, 75, 1)",
      fontFamily: "Gilroy",
      fontWeight: assetname ? 600 : 500,
      border: state.isFocused ? "1px solid #40a9ff" : "2px solid #D9D9D9",
      borderRadius: "8px",
      boxShadow: "none",
      borderBottomLeftRadius:8,
      height: "50px",
      "&:hover": {
        borderColor: "lightgrey",
      },
      
    }),
    placeholder: (base) => ({
      ...base,
      color: "#BDBDBD",
      fontFamily: "Gilroy",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000",
      fontFamily: "Gilroy",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#555",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      marginTop: 4,
      fontFamily: "Gilroy",
      fontSize: 16,
    }),
     menuList: (base) => ({
                        ...base,
                        backgroundColor: "#f8f9fa",
                        maxHeight: "120px",
                        padding: 0,
                        scrollbarWidth: "thin",
                        overflowY: "auto",
                        fontFamily: "Gilroy",
                      }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "#D9E6FC"
        : state.isFocused
        ? "#D9E6FC"
        : "#fff",
      color: state.isSelected
        ? "#000"
        : state.isFocused
        ? "#000000"
        : "#000",
      fontFamily: "Gilroy",
      padding: "8px 12px",
    }),
  }}
  isClearable={false}
/>





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

            {state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                <MdError style={{ color: "red", marginRight: '5px', fontSize: 14 }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
              </div>
              : null}

            <Button
              style={{
                marginBottom: 5,
                marginTop: 10,
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
        {formLoading &&
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>
        }



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