/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Editbtn from '../../Assets/Images/Edit-blue.png';
import Closebtn from '../../Assets/Images/Delete_red.png';
import Modal from 'react-bootstrap/Modal';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { Card } from 'react-bootstrap';
import '../../Pages/Settings/Settingexpense.css';
import PropTypes from "prop-types";
import { AddCircle } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import AddCategory from '../Settings/AddCategory';
import { toast } from 'react-toastify';
import AddSubCategory from '../Settings/AddSubCategory';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function SettingExpenses() {

  const state = useSelector(state => state)
  const dispatch = useDispatch()



  const [type, setType] = useState([]);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false)
  const [subType, setSubType] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const popupRef = useRef(null);
  const [showform, setShowForm] = useState(false);
  const [hoveredSubId, setHoveredSubId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [subCategoryDetails, setSubCategoryDetails] = useState('')
  const [deleteCategoryId, setDeleteCategoryId] = useState('')
  const [loading, setLoading] = useState(false)
  const [expensesFilterddata, setExpensesFilterddata] = useState([]);
  const [expensescurrentPage, setExpensescurrentPage] = useState(1);
  const [deletesubcatItems, setDeleteSubCatItems] = useState('')
  const [deletesubcat, setDeleteSubCat] = useState(false)




  const {
    canWriteModule: canWriteExpense,
    canReadModule: canReadExpense,
    canUpdateModule: canUpdateExpense,
    canDeleteModule: canDeleteExpense,
  } = useHasPermission("Expense");

  useEffect(() => {
    if (!canReadExpense) {
      setLoading(false);
    }
  }, [canReadExpense]);



  useEffect(() => {
    if (expensesFilterddata.length === 0) {
      setLoading(false);
    }

  }, [expensesFilterddata])










  const handleShow = () => {

    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding Expense information', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowForm(true);
    setType("")

  };

  const handleCreateSubCategory = (sub) => {
    setSubType(sub)
    setShowSubCategoryForm(true)
    setSubCategoryDetails('')
  }

  const handleCloseSubCategory = () => {
    setShowSubCategoryForm(false)
  }

  const handleCloseForm = () => {
    setShowForm(false);
    setSubType('');
    setType('');
    // setIsSubCategory(false)
    // setCategoryErrmsg("")
    // setSubCategoryErrmsg("")
    dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' })
    // setFormError('')

  };





  const handleDeleteExpensesCategory = (item) => {
    setDeleteCategoryId(item.categoryId)
    setShowModal(true)
  };




  const handleDeleteSubCategory = (item) => {
    setDeleteSubCatItems(item)
    setShowModal(true)
    setDeleteSubCat(true)
  }





  const confirmDelete = () => {

    if (deletesubcatItems && deletesubcat) {
      dispatch({
        type: 'DELETE-EXPENCES-CATEGORY',
        payload: {
          cat_id: deletesubcatItems.cat_id,
          subcat_id: deletesubcatItems.subCategoryId
        },
      });
    }

    else {
      dispatch({
        type: 'DELETE-EXPENCES-CATEGORY',
        payload: {
          cat_id: deleteCategoryId
        },
      });
    }
    setShowModal(false);



  };

  const cancelDelete = () => {
    setShowModal(false)
    setDeleteSubCat("")
  };





  useEffect(() => {
    if (state.Settings?.alreadycategoryerror) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' });
      }, 3000);
    }
  }, [state.Settings?.alreadycategoryerror])

  useEffect(() => {
    setLoading(true);
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'EXPENCES-CATEGORY-LIST', payload: state.login.selectedHostel_Id });
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [state.login.selectedHostel_Id]);



  useEffect(() => {
    if (state.Settings.getExpensesStatuscode === 200) {
      setExpensesFilterddata(state.Settings.Expences);
      setLoading(false)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_EXPENSES_STATUS_CODE' })
      }, 100)
    }
  }, [state.Settings.getExpensesStatuscode])

  useEffect(() => {
    if (state.Settings.categoryError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ERROR_CATEGORY' })
      }, 100)
    }

  }, [state.Settings.categoryError])





  useEffect(() => {
    if (state.Settings.addexpencesStatuscode === 201 || state.Settings.editexpencesStatuscode === 200 || state.Settings.deleteexpencesStatusCode === 200 || state.Settings.editExpencesSubCategoryStatuscode === 200) {
      setShowForm(false)
      setShowSubCategoryForm(false)
      // setFormLoading(false)
      // setCategoryErrmsg('')
      if (state.Settings.editexpencesStatuscode === 200) {
        setShowForm(false)
      }
      setTimeout(() => {
        dispatch({ type: 'EXPENCES-CATEGORY-LIST', payload: state.login.selectedHostel_Id })
      }, 100)
      setDeleteSubCatItems('')

      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_EXPENCES_STATUS_CODE' })
        dispatch({ type: 'REMOVE-EDIT-EXPENCES-SUB-CATEGORY' })
        dispatch({ type: 'CLEAR_EDITEXPENCES_CATEGORY_STATUS_CODE' })
        dispatch({ type: 'CLEAR_DELETE_EXPENCES_STATUS_CODE' })
      }, 1000)


    }
  }, [state.login.selectedHostel_Id, state.Settings.editExpencesSubCategoryStatuscode, state.Settings.addexpencesStatuscode, state.Settings.editexpencesStatuscode, state.Settings.deleteexpencesStatusCode])


  // const [options, setOptions] = useState([]);
  // const [formError, setFormError] = useState('')




  useEffect(() => {
    if (state.Settings?.AddCategoryType === 2) {
      setShowForm(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_TYPE' })
      }, 1000)
    }
  }, [state.Settings.AddCategoryType])







  const handleEditCategory = (item) => {

    // setEdit(true);
    setShowForm(true);
    setType(item)


  }










  const handleSubEditCategory = (subcategory) => {
    setShowSubCategoryForm(true)
    setSubCategoryDetails(subcategory)
  }





  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const handleToggleDropdown = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".dropdown-content") ||
        event.target.closest(".bi-chevron-down") ||
        event.target.closest(".bi-chevron-up")
      ) {
        return;
      }

      setExpandedCategoryId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);







  useEffect(() => {
    if (
      expensesFilterddata?.length > 0 &&
      expensesFilterddata?.length === 0 &&
      expensescurrentPage > 1
    ) {
      setExpensescurrentPage(expensescurrentPage - 1);
    }
  }, [expensesFilterddata])




  useEffect(() => {
    if (state.Settings?.alreadycategoryerror) {
      // setFormLoading(false)
    }
  }, [state.Settings?.alreadycategoryerror])
  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenMenuId(null)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);





  return (
    <>


      {loading && (
        <div
          style={{
            position: 'fixed',
            top: '48%',
            left: '68%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            zIndex: 1050,
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
      )}







     <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">

  <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
    <label className="font-gilroy text-[18px] text-[#222] font-semibold">
      Expenses Category
    </label>
  </div>

  
  <div className="w-full flex justify-center md:justify-end">
    <button
      onClick={handleShow}
      disabled={!canWriteExpense}
      className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition
        ${canWriteExpense
          ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
    >
      + Category
    </button>
  </div>
</div>




      {
        !canReadExpense ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >


            <ErrorMessage message={['You do not have access to view Expense Category']} type="warning" />


          </div>
        )
          :

          (


            <div
              className={`mt-2 show-scrolls overflow-y-auto ${expensesFilterddata.length === 0 ? "bg-[#FFFFFF] h-screen" : "bg-[#F9FAFB] h-fit"}  px-3 py-4 rounded-lg `}
              style={{}}
            >




              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 w-full">


                {expensesFilterddata && expensesFilterddata.length > 0 && (
                  expensesFilterddata.map((category) => (


                    <Card
                      key={category.categoryId}
                      className="border-0 shadow rounded-lg p-2 font-[Gilroy] text-[16px] font-medium  flex flex-col bg-white"
                    >



                      <div className="flex items-center gap-4 w-full  min-w-0 px-2 py-1">
                        <div className="flex-1 min-w-0">
                          <label
                            className="block truncate capitalize"
                            title={category.categoryName}
                          >
                            {category.categoryName}
                          </label>
                        </div>


                        <div className="flex items-center gap-[10px] shrink-0">


                          <div className='border-1  py-1 px-2 rounded border-dashed border-[#1E45E1] '>
                            <AddCircle
                              size="16"
                              color="#1E45E1"
                              className={canWriteExpense ? "cursor-pointer" : "cursor-not-allowed opacity-40"}
                              onClick={() => {
                                if (canWriteExpense) handleCreateSubCategory(category);
                              }}
                            />
                          </div>
                          <div className="relative">
                            <PiDotsThreeOutlineVerticalFill
                              className="cursor-pointer"
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId === category.categoryId ? null : category.categoryId
                                )
                              }
                            />


                            {openMenuId === category.categoryId && (
                              <div ref={popupRef} className="absolute right-0 top-6 z-50 w-28 bg-white border rounded shadow-md">


                                <div
                                  className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100
          ${canUpdateExpense ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
                                  onClick={() => {
                                    if (!canUpdateExpense) return;
                                    handleEditCategory(category);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <img src={Editbtn} className="h-[14px] w-[14px]" />
                                  <span>Edit</span>
                                </div>


                                <div
                                  className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100
          ${canDeleteExpense ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
                                  onClick={() => {
                                    if (!canDeleteExpense) return;
                                    handleDeleteExpensesCategory(category);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <img src={Closebtn} className="h-[14px] w-[14px]" />
                                  <span>Delete</span>
                                </div>

                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      <div >


                        <ul className="p-2 m-0 overflow-y-auto h-[150px] bg-[#F9FAFB] mt-2 show-scrolls">
                          {category.listSubcategories?.length > 0 ? (
                            category.listSubcategories.map((sub) => (
                              <li
                                key={sub.subCategoryId}
                                onMouseEnter={() => setHoveredSubId(sub.subCategoryId)}
                                onMouseLeave={() => setHoveredSubId(null)}
                                className="flex items-center justify-between rounded px-3 py-2 font-[Gilroy] bg-white mb-3 hover:bg-[#F5F8FF] transition"
                              >

                                <div
                                  className="flex-1 min-w-0 truncate"
                                  title={sub.subCategoryName}
                                >
                                  {sub.subCategoryName}
                                </div>


                                <div
                                  className={`flex items-center gap-2 shrink-0 transition-all duration-200
            ${hoveredSubId === sub.subCategoryId
                                      ? "opacity-100 translate-x-0"
                                      : "opacity-0 translate-x-1 pointer-events-none"}`}
                                >
                                  <img
                                    src={Editbtn}
                                    className={`h-[15px] w-[15px] ${canUpdateExpense
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed opacity-40"
                                      }`}
                                    alt="edit"
                                    onClick={() =>
                                      canUpdateExpense && handleSubEditCategory(sub)
                                    }
                                  />

                                  <img
                                    src={Closebtn}
                                    className={`h-[15px] w-[15px] ${canDeleteExpense
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed opacity-40"
                                      }`}
                                    alt="delete"
                                    onClick={() =>
                                      canDeleteExpense && handleDeleteSubCategory(sub)
                                    }
                                  />
                                </div>
                              </li>
                            ))
                          ) : (
                            <div className="flex items-center justify-center h-full text-center">
                              <span className="text-gray-400 font-[Gilroy] text-sm">
                                No Subcategory Details are there!
                              </span>
                            </div>
                          )}
                        </ul>


                      </div>
                    </Card>




                  ))
                )}
              </div>

              {!loading && expensesFilterddata.length === 0 && (


                <div className='w-full'
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 90,

                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={EmptyState}
                      alt="emptystate"
                      style={{ maxWidth: "250px" }}
                    />
                    <div
                      style={{
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 18,
                        color: "rgba(75, 75, 75, 1)",
                      }}
                    >
                      No Expense available
                    </div>
                  </div>
                </div>



              )}






              {showform && (
                <AddCategory show={showform} handleCloseForm={handleCloseForm} editCategory={type} />
              )}

              {
                showSubCategoryForm && <AddSubCategory show={showSubCategoryForm} handleCloseForm={handleCloseSubCategory} AddSubCategory={subType} editSubCategory={subCategoryDetails} />
              }

              <Modal
                show={showModal} onHide={cancelDelete}
                centered
                backdrop="static"
                dialogClassName="custom-delete-modal"

              >
                <Modal.Header style={{ borderBottom: 'none' }}>
                  <Modal.Title
                    className="w-100 text-center mt-2"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Gilroy',

                      fontWeight: 600,
                      color: '#222222',

                    }}
                  >
                    {deletesubcat ? "Delete Sub-Category?" : "Delete Category?"}
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body
                  className="text-center"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: 'Gilroy',
                    color: '#646464',

                    marginTop: '-27px'
                  }}
                >
                  {deletesubcat ? "Are you sure you want to delete this Expences-Sub-category?" : "Are you sure you want to delete this Expences-Category?"}
                </Modal.Body>

                <Modal.Footer
                  className="d-flex justify-content-center"
                  style={{ borderTop: 'none', marginTop: '-10px' }}>
                  <Button
                    className="me-2"
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
                    onClick={cancelDelete}
                  >
                    Cancel
                  </Button>
                  <Button disabled
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
                    onClick={confirmDelete}
                  >
                    {/* Delete */} Coming Soon
                  </Button>
                </Modal.Footer>
              </Modal>


            </div>
          )
      }

    </>
  )
}

SettingExpenses.propTypes = {
  hostelid: PropTypes.func.isRequired
};
export default withErrorBoundary(SettingExpenses);