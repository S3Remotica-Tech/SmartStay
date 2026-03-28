/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
// import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'iconsax-react';
import TagAsset from '../../Assets/Images/TagAsset.svg';
import closeicon from '../../Assets/Images/close.svg';
import { Modal, Button } from "react-bootstrap";
// import { MdError } from "react-icons/md";
import './Expenses.css';
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import PropTypes from "prop-types";
import Select from "react-select";
function ExpensesListTable(props) {


  const [showDots, setShowDots] = useState(null)
  const popupRef = useRef(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  // const canUpdateExpense = useHasPermission("Expense", "canUpdate");
  // const canDeleteExpense = useHasPermission("Expense", "canDelete");
  // const canWriteExpense = useHasPermission("Expense", "canWrite");


  const {
    canWriteModule: canWriteExpense,
    // canReadModule: canReadExpense,
    canUpdateModule: canUpdateExpense,
    canDeleteModule: canDeleteExpense,
  } = useHasPermission("Expense");



  const [showAbove, setShowAbove] = useState(false);

  const [assetname, setAssetName] = useState('')
  const [assetnameerror, setAssetNameError] = useState('')




  const [showTagAsset, setshowTagAsset] = useState(false);




  const handleShowDots = (event, rowId) => {

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 210;

    setPopupPosition({ top: popupTop, left: popupLeft });
    setShowDots(prev => (prev === rowId ? null : rowId));
  };



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
      setShowDots(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !showTagAsset &&
        !showDeletePopup
      ) {
        setShowDots(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupRef, showTagAsset, showDeletePopup]);


  const handleShowTagAsset = () => {
    setshowTagAsset(true)
  };


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


  console.log("props",props)

  return (
    <>

      <tr className="text-sm font-gilroy border-b border-[#E8E8E8] h-10" key={props.item.expenseId}>

        <td className='w-[230px] px-2 py-1 whitespace-nowrap'>{props.item.transactionDate}</td>
        <td className='w-[230px] px-2 py-1 truncate' title={props.item.categoryName}>{props.item.categoryName}</td>
        <td className='w-[230px] px-2 py-1 truncate' title={props.item.description}>{props.item.description || "-"}</td>
        <td className='w-[230px] px-2 py-1'>{props.item.itemsCount}</td>
        <td className='w-[230px] px-2 py-1'>{props.item.unitPrice}</td>
        <td className='w-[230px] px-2 py-1 whitespace-nowrap'> {props.item.totalAmount}  </td>
        <td className='w-[230px] px-2 py-1 truncate' title={props.item.accountHolderName}>{props.item.accountHolderName && props.item.accountHolderName} - {props.item.bankName}</td>
        <td className="relative cursor-pointer px-2 py-1">
          <div onClick={(e) => handleShowDots(e, props.item.expenseId)}>
            <PiDotsThreeOutlineVerticalFill
              className={`h-5 w-5 rotate-90
          ${showDots === props.item.expenseId ? "text-blue-600" : "text-gray-500"}`}
            />

            {showDots === props.item.expenseId && <>
              <div
                ref={popupRef}

                className={`fixed flex flex-col items-start cursor-pointer
    bg-gray-50 w-40 border border-gray-200 rounded-lg translate-x-10
    ${showDots === props.item.expenseId ? "z-50" : "z-auto"
                  }
  `}
                style={{
                  top: showAbove
                    ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 5
                    : popupPosition.top - 9,
                  left: popupPosition.left,
                }}
              >

                <div
                  onClick={() => {
                    if (canWriteExpense) {
                      handleShowTagAsset();
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#EDF2FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                  }}
                  className={`flex justify-start items-center gap-2 w-full py-2 px-2 rounded-t-lg
  ${!canWriteExpense ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"}
`}

                >
                  <img src={TagAsset} alt="tag" />
                  <label
                    className={`text-sm font-semibold font-gilroy text-gray-800
  ${!canWriteExpense ? "cursor-not-allowed" : "cursor-pointer"}
`}
                  >
                    Tag Asset
                  </label>
                </div>

                <div className='h-px bg-gray-100 m-0' />
                <div
                  className={`flex justify-start items-center gap-2 w-full py-2 px-2 ${!canUpdateExpense
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer opacity-100"
                    }`}

                  onClick={() => {
                    if (canUpdateExpense) {
                      handleEditExpense(props.item);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#EDF2FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                  }}
                >
                  <Edit
                    size="16"
                    color={"#1E45E1"}
                  />
                  <label className={`text-sm font-semibold font-gilroy text-gray-800 ${!canUpdateExpense ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    Edit
                  </label>
                </div>

                <div className='h-px bg-gray-100 m-0' />

                <div className={`flex items-center justify-start gap-2 w-full px-2 py-2 rounded-b-lg
  ${!canDeleteExpense ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
`}

                  onClick={() => {
                    if (canDeleteExpense) {
                      handleDelete(props.item.expenseId);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFF0F0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                  }}

                >
                  <Trash
                    size="16"
                    color={"red"}
                  />
                  <label className={`text-sm font-semibold font-gilroy text-gray-800 ${!canUpdateExpense ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    Delete
                  </label>
                </div>
              </div>



            </>}


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

          <Modal.Header className="flex items-center justify-between pb-2">
            <Modal.Title className="!font-gilroy !font-semibold !text-lg m-0">
              Tag Asset
            </Modal.Title>

            <img
              src={closeicon}
              alt="Close"
              className="w-6 h-6 cursor-pointer"
              onClick={handleHideTagAsset}
            />
          </Modal.Header>




          <Modal.Body>
            <div className='w-full mt-3'>

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
                    borderBottomLeftRadius: 8,
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
                  <label className="pb-1 !text-sm !text-red-500 !font-gilroy !font-medium">
                    Please add an &apos;Asset&apos;option in Asset page, accessible after
                    adding an expense.
                  </label>
                )}
              {
                assetnameerror &&


                <div className="flex items-center justify-center mt-1 mb-1">
                  <ErrorMessage message={assetnameerror} type="error" />
                </div>
              }



              <Button disabled
                className="w-full h-11 mt-4 mb-1 rounded-xl bg-blue-600 text-white text-base font-normal !font-gilroy cursor-pointer"

                onClick={handleTagAsset}
              >
                {/* Tag Asset */} Coming Soon
              </Button>
            </div>
          </Modal.Body>

          {formLoading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10"><div className="h-10 w-10 rounded-full border-t-4 border-blue-600 border-r-4 border-r-transparent animate-spin"></div></div>}



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