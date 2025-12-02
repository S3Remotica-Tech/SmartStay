/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Editbtn from '../Assets/Images/Edit-blue.png';
import Closebtn from '../Assets/Images/Delete_red.png';
// import { MdError } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import { Card } from 'react-bootstrap';
// import CreatableSelect from "react-select/creatable";
import './Settingexpense.css';
import PropTypes from "prop-types";
import { AddCircle } from "iconsax-react";
import ErrorMessage from '../Components/ErrorMessage'
import { useHasPermission } from '../Utils/Permission';
import AddCategory from './Settings/AddCategory';
import { toast } from 'react-toastify';
import AddSubCategory from './Settings/AddSubCategory';
import withErrorBoundary from "../Hoc/WithErrorBountry";

function SettingExpenses() {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  // const [formLoading, setFormLoading] = useState(false)

  const [type, setType] = useState([]);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false)
  const [subType, setSubType] = useState('');
  // const [isSubCategory, setIsSubCategory] = useState(false);
  const [showform, setShowForm] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const [cateogoryerrmsg, setCategoryErrmsg] = useState('');
  // const [subcateogoryerrmsg, setSubCategoryErrmsg] = useState('');
  // const [totalErrormsg, setTotalErrmsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [subCategoryDetails, setSubCategoryDetails] = useState('')
  const [deleteCategoryId, setDeleteCategoryId] = useState('')
  const [loading, setLoading] = useState(false)
  const [expensesFilterddata, setExpensesFilterddata] = useState([]);
  const [expensescurrentPage, setExpensescurrentPage] = useState(1);
  const [deletesubcatItems, setDeleteSubCatItems] = useState('')
  const [deletesubcat, setDeleteSubCat] = useState(false)
  // const [showPopup, setShowPopup] = useState(false);

  // const canReadExpense = useHasPermission("Expense", "canRead");
  // const canWriteExpense = useHasPermission("Expense", "canWrite");
  // const canUpdateExpense = useHasPermission("Expense", "canUpdate");
  // const canDeleteExpense = useHasPermission("Expense", "canDelete");

  const {
    canWriteModule: canWriteExpense,
    canReadModule: canReadExpense,
    canUpdateModule: canUpdateExpense,
    canDeleteModule: canDeleteExpense,
  } = useHasPermission("Expense");

  useEffect(() => {
    if (!canReadExpense) {
      setLoading(false);
    } else {
      setLoading(true);
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
    // setLoading(true);
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
    if (state.Settings.addexpencesStatuscode === 201 || state.Settings.editexpencesStatuscode === 200 || state.Settings.deleteexpencesStatusCode === 200) {
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
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_EDITEXPENCES_CATEGORY_STATUS_CODE' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_EXPENCES_STATUS_CODE' })
      }, 1000)
    }
  }, [state.login.selectedHostel_Id, state.Settings.addexpencesStatuscode, state.Settings.editexpencesStatuscode, state.Settings.deleteexpencesStatusCode])


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


  // const handleChange = (selected) => {
  //   dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' })
  //   setSelectedOptions(selected);

  //   setType(selected)
  //   setCategoryErrmsg("")
  // };




  // const handleCreate = (inputValue) => {
  //   // dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' })
  //   const existingCategoryIndex = options.findIndex(option => option.value === selectedOptions?.value);



  // if (existingCategoryIndex !== -1) {

  //   const updatedOptions = [...options];
  //   updatedOptions[existingCategoryIndex] = { 
  //     ...updatedOptions[existingCategoryIndex], 
  //     label: cleanedValue 
  //   };

  //   setOptions(updatedOptions);
  //   setSelectedOptions(updatedOptions[existingCategoryIndex]);
  //   setType(updatedOptions[existingCategoryIndex]);

  //     dispatch({
  //       type: 'EDIT_EXPENCES_CATEGORY',
  //       payload: { id: selectedOptions.value, hostel_id: state.login.selectedHostel_Id, name: inputValue.trim(), type: 1 }
  //     });
  //     // setFormLoading(true)


  // } else {

  //   const newOption = { value: cleanedValue, label: cleanedValue };

  //   setOptions((prev) => [...prev, newOption]);
  //   setSelectedOptions(newOption);
  //   setType(newOption);

  //     dispatch({
  //       type: 'EXPENCES-CATEGORY-ADD',
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         categoryName: inputValue.trim(),
  //       }
  //     });
  //     // setFormLoading(true)
  //   }
  // };

  // const handleCreate = (inputValue) => {
  //   const cleanedValue = inputValue.trim();   

  //   const existingCategoryIndex = options.findIndex(
  //     option => option.value === selectedOptions?.value
  //   );

  //   if (existingCategoryIndex !== -1) {

  //     const updatedOptions = [...options];
  //     updatedOptions[existingCategoryIndex] = { 
  //       ...updatedOptions[existingCategoryIndex], 
  //       label: cleanedValue 
  //     };

  //     setOptions(updatedOptions);
  //     setSelectedOptions(updatedOptions[existingCategoryIndex]);
  //     setType(updatedOptions[existingCategoryIndex]);

  //     dispatch({
  //       type: 'EDIT_EXPENCES_CATEGORY',
  //       payload: { 
  //         id: selectedOptions.value,
  //         hostel_id: state.login.selectedHostel_Id,
  //         name: cleanedValue,
  //         type: 1 
  //       }
  //     });

  //   } else {

  //     const newOption = { value: cleanedValue, label: cleanedValue };

  //     setOptions((prev) => [...prev, newOption]);
  //     setSelectedOptions(newOption);
  //     setType(newOption);

  //     dispatch({
  //       type: 'EXPENCES-CATEGORY-ADD',
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         categoryName: cleanedValue,
  //       }
  //     });
  //   }
  // };


  // useEffect(() => {
  //   if (!state.Settings?.Expences || !Array.isArray(state.Settings.Expences)) {

  //     return;
  //   }

  //   if (selectedOptions) {
  //     const TakeCategoryId = state.Settings.Expences.filter(
  //       (view) => selectedOptions?.label && view.categoryName?.toLowerCase() === selectedOptions.label.toLowerCase()
  //     );



  //     if (TakeCategoryId.length > 0) {
  //       setType({ value: TakeCategoryId[0]?.categoryId, label: TakeCategoryId[0]?.categoryName });
  //     }
  //   }
  // }, [state.Settings.addexpencesStatuscode, selectedOptions]);




  const handleSubEditCategory = (subcategory) => {
    setShowSubCategoryForm(true)
    setSubCategoryDetails(subcategory)
  }



  // useEffect(() => {
  //   let optionArray = [];
  //   state.Settings?.Expences?.map((view) => {

  //     let optionObj = {
  //       label: view.categoryName,
  //       value: view.categoryId
  //     }
  //     optionArray.push(optionObj)
  //     return view
  //   })
  //   setOptions(optionArray)

  // }, [state.Settings?.Expences])






  // const handlesubcategoryAdd = (e) => {
  //   setSubType(e.target.value)
  //   setFormError('')
  //   setTotalErrmsg('')
  //   if (!e.target.value) {
  //     setSubCategoryErrmsg("Please Enter  Sub-Category")
  //   }
  //   else {
  //     setSubCategoryErrmsg("")
  //   }
  // }


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

  return (
    <div style={{
      position: "relative", maxHeight: "570px",
      overflowY: "auto", paddingRight: 10, paddingLeft: 10
    }}>


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







      <div
        className="container-fluid"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          height: 'auto',
        }}
      >
        <div
          className="row align-items-center justify-content-between"

          style={{ marginTop: 20 }}
        >

          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            <h3 style={{
              fontFamily: "Gilroy",
              fontSize: 20, color: "#222",
              fontWeight: 600, marginLeft: -11, marginTop: 18
            }}>
              Expenses Category</h3></div>

          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <Button onClick={handleShow}
              style={{
                fontFamily: "Gilroy",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                fontWeight: 600,
                borderRadius: 8,
                height: 45,
                width: 146,
                marginTop: 5,
                marginRight: -12
              }}
              disabled={!canWriteExpense}
            >+ Category</Button></div>
        </div>
      </div>


      {/* {showPopup && (
        <div className="d-flex flex-wrap mt-3 align-items-center"
          style={{ gap: "10px" }} >
          <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
            Please add a hostel before adding Expense information.
          </p>



        </div>


      )} */}

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


            <div className="mt-4 pe-4 d-flex flex-wrap justify-content-between show-scrolls" style={{
              alignItems: "flex-start", minHeight: "450px",
              overflowY: "auto", backgroundColor: "", columnGap: "20px",
              rowGap: "10px",
            }}>



              <div className='row ms-3 g-1' style={{ width: "100%" }}>

                {expensesFilterddata && expensesFilterddata.length > 0 ? (
                  expensesFilterddata.map((category) => (

                    <div key={category.categoryId}

                      className="col-lg-4"
                      style={{
                        // flex: "0 0 48%",
                        position: "relative",
                        paddingBottom: "30px",
                        // backgroundColor:"orangered"
                      }}>
                      <Card className="d-flex justify-content-between card-height-sm border rounded p-2"
                        style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500 }}>

                        <div className="d-flex justify-content-between align-items-center border-0 gap-4 flex-wrap card-inner">
                          <div className="category-title">{category.categoryName}</div>

                          <div className="d-flex align-items-center " style={{ gap: "10px" }}>

                            <img
                              src={Editbtn}
                              height={15}
                              width={15}
                              alt="edit"
                              style={{
                                cursor: canUpdateExpense ? "pointer" : "not-allowed",
                                opacity: canUpdateExpense ? 1 : 0.4
                              }}
                              onClick={() => { if (canUpdateExpense) handleEditCategory(category); }}
                            />
                            <AddCircle onClick={() => { if (canWriteExpense) handleCreateSubCategory(category) }}
                              size="16"
                              color="#FF9900" style={{ cursor: canWriteExpense ? "pointer" : "not-allowed", }}
                            />

                            <img
                              src={Closebtn}
                              height={15}
                              width={15}
                              alt="delete"
                              style={{
                                cursor: canDeleteExpense ? "pointer" : "not-allowed",
                                opacity: canDeleteExpense ? 1 : 0.4
                              }}
                              onClick={() => {
                                if (canDeleteExpense) {
                                  handleDeleteExpensesCategory(category);
                                }
                              }}

                            />
                            <i
                              onClick={(event) => handleToggleDropdown(category.categoryId, event)}
                              className={`bi ${expandedCategoryId === category.categoryId ? "bi-chevron-up" : "bi-chevron-down"}`}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      </Card>

                      {expandedCategoryId === category.categoryId && (
                        <div className="dropdown-content" style={{
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          width: "100%",
                          zIndex: 999,
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "0 0 10px 10px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          maxHeight: "70px",
                          overflowY: "auto",
                          marginTop: "5px"
                        }}>
                          <ul className="p-2 m-0">
                            {category.listSubcategories && category?.listSubcategories?.length > 0 ? (
                              category.listSubcategories.map((sub) => (
                                <li key={sub.subCategoryId} className="d-flex justify-content-between align-items-center mb-2" style={{ fontFamily: "Gilroy" }}>
                                  {sub.subCategoryName}
                                  <span>
                                    <img
                                      src={Editbtn}
                                      height={15}
                                      width={15}
                                      alt="edit"
                                      style={{
                                        cursor: canUpdateExpense ? "pointer" : "not-allowed",
                                        opacity: canUpdateExpense ? 1 : 0.4
                                      }}
                                      onClick={() => {
                                        if (canUpdateExpense) handleSubEditCategory(sub);
                                      }}
                                    />

                                    <img
                                      src={Closebtn}
                                      height={15}
                                      width={15}
                                      alt="delete"
                                      style={{
                                        cursor: canDeleteExpense ? "pointer" : "not-allowed",
                                        opacity: canDeleteExpense ? 1 : 0.4,
                                        marginLeft: 10
                                      }}
                                      onClick={() => {
                                        if (canDeleteExpense) handleDeleteSubCategory(sub);
                                      }}
                                    />

                                  </span>
                                </li>
                              ))
                            ) : (
                              <span className="text-muted" style={{ fontFamily: "Gilroy" }}>No Subcategories Available</span>
                            )}
                          </ul>
                        </div>
                      )}

                    </div>
                  ))
                ) : !loading && (


                  <div
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
                      onClick={confirmDelete}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>

              </div>
            </div>
          )
      }

    </div>
  )
}

SettingExpenses.propTypes = {
  hostelid: PropTypes.func.isRequired
};
export default withErrorBoundary(SettingExpenses);