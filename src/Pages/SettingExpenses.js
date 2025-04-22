/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Editbtn from '../Assets/Images/Edit-blue.png';
import Closebtn from '../Assets/Images/Delete_red.png';
import { MdError } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import { Card } from 'react-bootstrap';
import CreatableSelect from "react-select/creatable";
import { ArrowLeft2, ArrowRight2, } from "iconsax-react";
import './Settingexpense.css';
import PropTypes from "prop-types";
import {CloseCircle} from "iconsax-react";


function SettingExpenses({ hostelid }) {

  const state = useSelector(state => state)
  const dispatch = useDispatch()


  const [type, setType] = useState([]);
  const [subType, setSubType] = useState('');
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [showform, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cateogoryerrmsg, setCategoryErrmsg] = useState('');
  const [subcateogoryerrmsg, setSubCategoryErrmsg] = useState('');
  const [totalErrormsg, setTotalErrmsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [subcategory_Id, setSubCategory_ID] = useState(null)
  const [deleteCategoryId, setDeleteCategoryId] = useState('')
  const [loading, setLoading] = useState(true)
  const [expensesrowsPerPage, setExpensesrowsPerPage] = useState(10);
  const [expensesFilterddata, setExpensesFilterddata] = useState([]);
  const [expensescurrentPage, setExpensescurrentPage] = useState(1);




  


  // const uniqueExpences = expences.filter((expence, index, self) =>
  //   index === self.findIndex((e) => e.category_Id === expence.category_Id)
  // );

  // useEffect(() => {
  //   if (isSubCategory) {
  //     const selectedCategory = expences.find(category => category.category_Id === parseInt(category_Id));
  //     console.log("selectedCategory", selectedCategory)
  //     if (selectedCategory) {
  //       setType(selectedCategory.category_Name)
  //     }
  //   }

  // }, [isSubCategory])



  //add electricity
  const [showPopup, setShowPopup] = useState(false);
  const handleShow = () => {
    setCategoryErrmsg('')
    setSubCategoryErrmsg('')
    if (!hostelid) {
      setShowPopup(true);
      return;
    }
    setShowForm(true);
    setEdit(false);
    setEditsubCat(null)
    setSelectedOptions([])

  };


  const handleCloseForm = () => {
    setShowForm(false);
    setSubType('');
    setType('');
    setIsSubCategory(false)
    setCategoryErrmsg("")
    setSubCategoryErrmsg("")
    dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' })
    setFormError('')

  };

  const [editsubcat, setEditsubCat] = useState(false)



  const handleDeleteExpensesCategory = (item) => {
    setDeleteCategoryId(item.category_Id)
    setShowModal(true)
  };


  const [deletesubcatItems, setDeleteSubCatItems] = useState('')
  const [deletesubcat, setDeleteSubCat] = useState(false)

  const handleDeleteSubCategory = (item) => {
    console.log("items", item);

    setDeleteSubCatItems(item)
    setShowModal(true)
    setDeleteSubCat(true)
  }

  console.log("deletesubcatItems", deletesubcatItems);



  const confirmDelete = () => {

    if (deletesubcatItems && deletesubcat) {
      dispatch({
        type: 'DELETE-EXPENCES-CATEGORY',
        payload: {
          cat_id: deletesubcatItems.cat_id,
          subcat_id: deletesubcatItems.subcategory_Id
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

    //   if ( deleteCategoryId && subCategory_Id) {
    //     dispatch({
    //         type: 'DELETE-EXPENCES-CATEGORY',
    //         payload: {
    //             id: deleteCategoryId,
    //             subcat_id: subCategory_Id,
    //             cat_id:''
    //         },
    //     });
    // }
    //  else {
    //     dispatch({
    //         type: 'DELETE-EXPENCES-CATEGORY',
    //         payload: { id: deleteCategoryId,
    //           sub_Category_Id: subCategory_Id},
    //     });
    // }

  };

  const cancelDelete = () => {
    setShowModal(false)
  };






  // const addType = () => {
  //   if (!type) {
  //     setCategoryErrmsg("Please Enter a Category")
  //     return;
  //   }

  //   if (type.trim()) {
  //     if (isSubCategory) {

  //       if (!subType) {
  //         setSubCategoryErrmsg("Please Enter a Sub-Category")
  //       }

  //       if (!subType && !namefilter) {
  //         setTotalErrmsg('Please enter All Field')
  //         return;
  //       }
  //       else if (subType.trim()) {
  //         dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { hostel_id: hostelid, id: type, category_Name: namefilter, sub_Category: subType } });
  //         setSubType('');
  //         setType('');
  //         setShowForm(false);
  //         setIsSubCategory(false)
  //       }

  //     }
  //     else {
  //       dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { hostel_id: hostelid, category_Name: type, sub_Category: '' } });
  //       setType('');
  //       setShowForm(false);
  //       setIsSubCategory(false)
  //     }
  //   }

  // };








  useEffect(() => {
    if (state.Settings?.alreadycategoryerror) {

      setTimeout(() => {
        dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' });
      }, 3000);
    }
  }, [state.Settings?.alreadycategoryerror])

  useEffect(() => {
    setLoading(true);
    console.log('load', loading);
  
    dispatch({ type: 'EXPENCES-CATEGORY-LIST', payload: { hostel_id: hostelid } });
  
    // Set a delay for the loader to disappear
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust the duration (1000ms = 1 second) as needed
  
    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [hostelid]);
  


  useEffect(() => {
    if (state.Settings.getExpensesStatuscode === 200) {
      setExpensesFilterddata(state.Settings.Expences.data);
      setLoading(false)
      // setExpences(state.Settings.Expences.data)
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

  console.log("state.Settings.categoryError", state.Settings.categoryError, isSubCategory)



  useEffect(() => {
    if (state.Settings.addexpencesStatuscode === 200 || state.Settings.editexpencesStatuscode === 200 || state.Settings.deleteexpencesStatusCode === 200) {

      //  setShowForm(false)
      setCategoryErrmsg('')
      if (state.Settings.editexpencesStatuscode === 200) {
        setShowForm(false)
      }
      setTimeout(() => {
        dispatch({ type: 'EXPENCES-CATEGORY-LIST', payload: { hostel_id: hostelid } })
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
  }, [hostelid, state.Settings.addexpencesStatuscode, state.Settings.editexpencesStatuscode, state.Settings.deleteexpencesStatusCode])




  // useEffect(() => {
  //   dispatch({ type: 'EXPENCES-CATEGORY-LIST', payload: { hostel_id: hostelid } })
  // }, [])



  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [formError,  setFormError] = useState('')
  const [formCategoryError,  setFormCategoryError] = useState('')

  const [initialSubCategory, setInitialSubCategory] = useState({});
  const [initialCategory, setInitialCategory] = useState({});

  const updateType = () => {


    console.log("subType === initialSubCategory.subcategory",subType , initialSubCategory.name)


   

    if (subcategory_Id && subType) {
      if (subType === initialSubCategory.name) {
        setFormError("No Changes Detected");
        return;
      } else {
        setFormError(""); 
      }
  


      dispatch({ type: 'EDIT_EXPENCES_CATEGORY', payload: { id: subcategory_Id, hostel_id: hostelid, name: subType, type: 2 } })

      setIsSubCategory(false)
      setSubType('')
    }

    else {

      if (type.label === initialCategory.name) {
        setFormCategoryError("No Changes Detected");
        return;
      } else {
        setFormCategoryError(""); 
      }

      dispatch({ type: 'EDIT_EXPENCES_CATEGORY', payload: { id: type.value, hostel_id: hostelid, name: type.label, type: 1 } })

    }
  }


  console.log("isSubCategory", isSubCategory)

  const addType = () => {







    if (!selectedOptions.value) {
      setCategoryErrmsg("Please Enter a Category");
      return;
    }

    if (!isSubCategory) {
      setShowForm(false);
    }
    if (isSubCategory) {
      dispatch({
        type: "EXPENCES-CATEGORY-ADD",
        payload: {
          hostel_id: hostelid,
          id: type.value,
          category_Name: type.label,
          sub_Category: subType?.trim() || ''
        },
      });
      setSelectedOptions([])


    }
    setSubType("")
    setIsSubCategory(false);

  };


  useEffect(() => {
    if (state.Settings?.AddCategoryType === 2) {
      setShowForm(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_TYPE' })
      }, 1000)
    }
  }, [state.Settings.AddCategoryType])







  const handleEditCategory = (item) => {

    console.log("edititem", item);

    setEdit(true);
    setShowForm(true);
    if (item.category_Id && item.category_Name) {
      setType({ value: item.category_Id, label: item.category_Name });
      setSelectedOptions({ value: item.category_Id, label: item.category_Name })
      // setCategory_ID(item.category_Id || '')
      setEditsubCat(false)
      setIsSubCategory(false);
      setInitialCategory({ id: item.category_Id, name: item.category_Name });

    }
    else if (item.subcategory_Id && item.cat_id) {
      setIsSubCategory(true)
      setSubType(item.subcategory)
      setType({ value: item.cat_id, label: item.category_Name });
      setSelectedOptions({ value: item.cat_id, label: item.category_Name })
      setSubCategory_ID(item.subcategory_Id)
      setEditsubCat(true)

      setInitialSubCategory({ id: item.subcategory_Id, name: item.subcategory });
    }

  }


  const handleChange = (selected) => {
    setSelectedOptions(selected);
    console.log("Selected Category:", selected);
    setType(selected)
    setCategoryErrmsg("")
  };


  //   const handleCreate = (inputValue) => {
  //   const newOption = { value: inputValue, label: inputValue };
  //   console.log("Created Category:", newOption);
  //   setOptions((prev) => Array.isArray(prev) ? [...prev, newOption] : [newOption]);
  //   setSelectedOptions(newOption);

  //   dispatch({
  //     type: 'EXPENCES-CATEGORY-ADD',
  //     payload: { hostel_id: hostelid, category_Name: inputValue, sub_Category: '' }
  //   });
  // };





  console.log("editsubcat", editsubcat)





  const handleCreate = (inputValue) => {

    const existingCategoryIndex = options.findIndex(option => option.value === selectedOptions?.value);
    console.log(" existingCategoryIndex", existingCategoryIndex)

    if (existingCategoryIndex !== -1) {

      const updatedOptions = [...options];
      updatedOptions[existingCategoryIndex] = { ...updatedOptions[existingCategoryIndex], label: inputValue };

      setOptions(updatedOptions);
      setSelectedOptions(updatedOptions[existingCategoryIndex]);
      setType(updatedOptions[existingCategoryIndex]);

      dispatch({
        type: 'EDIT_EXPENCES_CATEGORY',
        payload: { id: selectedOptions.value, hostel_id: hostelid, name: inputValue, type: 1 }
      });



    } else {

      const newOption = { value: inputValue, label: inputValue };
      setOptions((prev) => [...prev, newOption]);
      setSelectedOptions(newOption);
      setType(newOption);

      dispatch({
        type: 'EXPENCES-CATEGORY-ADD',
        payload: { hostel_id: hostelid, category_Name: inputValue, sub_Category: '' }
      });
    }
  };





  useEffect(() => {
    if (!state.Settings?.Expences?.data || !Array.isArray(state.Settings.Expences.data)) {
      console.log("Expences data is undefined or not an array");
      return;
    }

    if (selectedOptions) {
      const TakeCategoryId = state.Settings.Expences.data.filter(
        (view) => selectedOptions?.label && view.category_Name?.toLowerCase() === selectedOptions.label.toLowerCase()
      );

      console.log("TakeCategoryId:", TakeCategoryId);

      if (TakeCategoryId.length > 0) {
        setType({ value: TakeCategoryId[0]?.category_Id, label: TakeCategoryId[0]?.category_Name });
      }
    }
  }, [state.Settings.addexpencesStatuscode, selectedOptions]);



  console.log("selected cate type", type)

  console.log("selectedOptions", selectedOptions)




  useEffect(() => {
    let optionArray = [];
    state.Settings?.Expences?.data?.map((view) => {

      let optionObj = {
        label: view.category_Name,
        value: view.category_Id
      }
      optionArray.push(optionObj)
      return view
    })
    setOptions(optionArray)

  }, [state.Settings?.Expences?.data])






  const handlesubcategoryAdd = (e) => {
    setSubType(e.target.value)
    setFormError('')
    setTotalErrmsg('')
    if (!e.target.value) {
      setSubCategoryErrmsg("Please Enter a Sub-Category")
    }
    else {
      setSubCategoryErrmsg("")
    }
  }

  // const [expandedCategoryId, setExpandedCategoryId] = useState(null);


  // const handleToggleDropdown = (categoryId) => {
  //   setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  // };

  // const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  
  const handleToggleDropdown = (categoryId, event) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      const rect = event.target.getBoundingClientRect();
      console.log("rect.width",rect.width, rect.bottom, rect.left );
      
      // setDropdownPosition({
      //   top: rect.bottom + 6, 
      //   // left: rect.left + window.scrollX,  
      //   left: rect.left - 361,
      //   width: rect.width + 370,
      // });
      setExpandedCategoryId(categoryId);
    }
  };
  

  // pagination
  const indexOfLastRowExpense = expensescurrentPage * expensesrowsPerPage;
  const indexOfFirstRowExpense = indexOfLastRowExpense - expensesrowsPerPage;
  const currentRowExpense = expensesFilterddata?.slice(
    indexOfFirstRowExpense,
    indexOfLastRowExpense
  );

  const handlePageChange = (generalpageNumber) => {
    setExpensescurrentPage(generalpageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setExpensesrowsPerPage(Number(event.target.value));
    setExpensescurrentPage(1)
  };

  const totalPagesGeneral = Math.ceil(
    expensesFilterddata?.length / expensesrowsPerPage
  );



  return (
    <div  style={{
      position: "relative", maxHeight: "570px",
      overflowY: "auto",paddingRight:10,paddingLeft:10
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






      {/* <div 
      className="d-flex flex-column flex-md-row justify-content-between align-items-center"
      style={{
                position: 'sticky',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
        height: 63,
        alignItems: "center",
        
      }} > */}
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
    // style={{ paddingTop: 20, paddingBottom: 10 }}
    style={{ marginTop: 20}}
  >
        {/* <div 
         className="w-100 text-md-start text-center"
        style={{ marginTop: 25 }}> */}
            <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
          <h3 style={{ fontFamily: "Gilroy", 
            fontSize: 20, color: "#222", 
            fontWeight: 600, marginLeft:-11,marginTop:18
            }}>
              Expenses Category</h3></div>
        {/* <div 
        className="d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0"
        
        > */}
    <div  className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
          <Button onClick={handleShow}
            style={{
              fontFamily: "Gilroy",
              fontSize: 14,
              backgroundColor: "#1E45E1",
              color: "white",
              fontWeight: 600,
              borderRadius: 8,
              // padding: "11px 35px",
              height:45,
              width:146,
              marginTop:5,
              marginRight:-12
            }}
            disabled={showPopup}
          >+ Category</Button></div>
</div>
      </div>


      {showPopup && (
        <div className="d-flex flex-wrap mt-3 align-items-center"
          style={{ gap: "10px" }} >
          <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
            Please add a hostel before adding Expense information.
          </p>

          {/* <img
            src={close}
            alt="close icon"
            onClick={() => setShowPopup(false)}
            className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-end"
            style={{ width: '20px', height: 'auto', cursor: "pointer" }}
          /> */}

        </div>


      )}


<div className="mt-4 d-flex flex-wrap justify-content-between scroll-issue" style={{ gap: "20px", alignItems: "flex-start" }}>

  {currentRowExpense && currentRowExpense.length > 0 ? (
    currentRowExpense.map((category) => (
      <div key={category.category_Id} 
      // className="col-12 col-md-6 col-lg-5 col-xl-4 border rounded p-2" 
      
       className="col-12 col-md-6 col-lg-5 col-xl-4 border rounded p-2 card-width-sm  mx-auto"
      style={{ 
        flex: "0 0 48%", 
        position: "relative",
        paddingBottom: "30px"
        }}>
        <Card className="d-flex justify-content-between border-0 card-height-sm" 
        style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500 }}>
          {/* <div className="d-flex justify-content-between align-items-center border-0 gap-4"> */}
          {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2"> */}
          <div className="d-flex justify-content-between align-items-center border-0 gap-4 flex-wrap card-inner">
            <div className="category-title">{category.category_Name}</div>
            {/* <div className="d-flex align-items-center gap-2 mt-2 mt-md-0"> */}
            <div className="d-flex align-items-center " style={{ gap: "10px" }}>
              <img
                src={Editbtn}
                height={15}
                width={15}
                alt="edit"
                style={{ 
                  // marginRight: 10, 
                  cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); handleEditCategory(category); }}
              />
              <img
                src={Closebtn}
                height={15}
                width={15}
                alt="delete"
                style={{ 
                  // marginRight: 10, 
                  cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); handleDeleteExpensesCategory(category); }}
              />
              <i
                onClick={(event) => handleToggleDropdown(category.category_Id, event)}
                className={`bi ${expandedCategoryId === category.category_Id ? "bi-chevron-up" : "bi-chevron-down"}`}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </Card>

        {expandedCategoryId === category.category_Id && (
  <div className="dropdown-content" style={{
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    zIndex: 999,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    maxHeight: "250px", 
    overflowY: "auto",
    marginTop: "5px"
  }}>
    <ul className="p-2 m-0">
      {category.subcategory?.length > 0 ? (
        category.subcategory.map((sub) => (
          <li key={sub.subcategory_Id} className="d-flex justify-content-between align-items-center mb-2">
            {sub.subcategory}
            <span>
              <img src={Editbtn} height={15} width={15} alt="edit" style={{ cursor: "pointer" }} onClick={() => handleEditCategory(sub)} />
              <img src={Closebtn} height={15} width={15} alt="delete" style={{ cursor: "pointer", marginLeft: 10 }} onClick={() => handleDeleteSubCategory(sub)} />
            </span>
          </li>
        ))
      ) : (
        <span className="text-muted">No Subcategories Available</span>
      )}
    </ul>
  </div>
)}

      </div>
    ))
  ) : !loading && (
    <div style={{ marginTop: 85, alignItems: "center", justifyContent: "center", marginLeft: '270px' }}>
      <div className="d-flex justify-content-center">
        <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
      </div>
      <div className="pb-1 mt-2" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>
        No Expense available
      </div>
    </div>
  )}


      {expensesFilterddata?.length >= 2 && (
        <nav 
        // className="pagination-container position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center" style={{zIndex:995}}
        // className="position-sticky bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center"
        className="container d-flex justify-content-center justify-content-lg-end align-items-center"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          left: "16px", 
          zIndex: 995,
          backgroundColor: "#fff",
          paddingBottom: '30px',
        }}
        >
          {/* Dropdown for Items Per Page */}
          <div >
            <select className='selectoption'
              value={expensesrowsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: "5px",
                border: "1px solid #1E45E1",
                borderRadius: "5px",
                color: "#1E45E1",
                fontWeight: "bold",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <ul className='selectoption'
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {/* Previous Button */}
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: expensescurrentPage === 1 ? "#ccc" : "#1E45E1",
                  cursor: expensescurrentPage === 1 ? "not-allowed" : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handlePageChange(expensescurrentPage - 1)}
                disabled={expensescurrentPage === 1}
              >
                <ArrowLeft2
                  size="16"
                  color={expensescurrentPage === 1 ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>

            {/* Current Page Indicator */}
            <li
              style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
            >
              {expensescurrentPage} of {totalPagesGeneral}
            </li>

            {/* Next Button */}
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color:
                    expensescurrentPage === totalPagesGeneral
                      ? "#ccc"
                      : "#1E45E1",
                  cursor:
                    expensescurrentPage === totalPagesGeneral
                      ? "not-allowed"
                      : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handlePageChange(expensescurrentPage + 1)}
                disabled={expensescurrentPage === totalPagesGeneral}
              >
                <ArrowRight2
                  size="16"
                  color={
                    expensescurrentPage === totalPagesGeneral
                      ? "#ccc"
                      : "#1E45E1"
                  }
                />
              </button>
            </li>
          </ul>
        </nav>
      )}



      {showform && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "initial",
            fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={showform}
            onHide={handleCloseForm}
            centered
            backdrop="static"
            dialogClassName="custom-modal"
          >
            <Modal.Dialog
              style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
              className="m-0 p-0"
            >
              <div>
                <Modal.Header
                  style={{ position: "relative" }}
                >
                  <div
                    style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}
                  >
                    {/* {edit ? "Edit Invoice" : "Add Invoice "} */}

                    {edit ? "Edit Category" : "Add Category"}


                  </div>
                  {/* <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleCloseForm}
                    style={{
                      position: "absolute", right: "10px",
                      top: "16px",
                      border: "1px solid black",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "30px",
                        paddingBottom: "6px",
                      }}
                    >
                      &times;
                    </span>
                  </button> */}
                  <CloseCircle size="24" color="#000" onClick={handleCloseForm} 
            style={{ cursor: 'pointer' }}/>

                  {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
                </Modal.Header>
              </div>
              <Modal.Body>

                <div className="row ">




                  <div className='d-flex flex-column '>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Category
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>


                        <CreatableSelect
                          isDisabled={editsubcat}
                          options={options}
                          value={selectedOptions}
                          onChange={handleChange}
                          onCreateOption={handleCreate}
                          placeholder="Select / Create Category"
                          styles={{
                            menu: (provided) => ({
                              ...provided,
                              maxHeight: '100px',  // Limit dropdown height
                              overflowY: 'auto',  // Enable scrolling when needed
                              zIndex: 9999,
                            }),
                           
                            menuList: (provided) => ({
                              ...provided,
                              maxHeight: '100px', 
      minHeight: '80px', 
      overflowY: 'scroll', 
      scrollbarWidth: 'thin', 
      scrollbarColor: '#888 #f0f0f0', 
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#555",
                              opacity: 1,
                              cursor: edit ? "not-allowed" : "pointer",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              padding: '6px 10px',
                              backgroundColor: state.isFocused ? "lightblue" : "white",
                              color: "#222",
                              cursor: "pointer",
                            }),
                            
                            control: (provided) => ({
                              ...provided,
                              minHeight: '40px',
                            }),
                          }}
                          menuPlacement="bottom" // Ensures dropdown opens properly
                        />



                        {cateogoryerrmsg.trim() !== "" && (
                          <div>
                            <p style={{ fontSize: '12px', color: 'red', marginTop: '5px', fontFamily: "Gilroy" }}>
                              {cateogoryerrmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red', marginBottom: "3px" }} />} {cateogoryerrmsg}
                            </p>
                          </div>
                        )}
                      </Form.Group>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <input
                        type='checkbox'
                        disabled={editsubcat === false}
                        className='mb-3 me-2'
                        checked={isSubCategory}
                        onChange={() => setIsSubCategory(!isSubCategory)}
                        style={{ width: '20px', height: '20px', border: '1px solid #ced4da', borderRadius: '4px' }}
                      />
                      <p className='' style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Make Sub-Category</p>
                    </div>

                    {/* {isSubCategory && ( */}
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12  ms-xs-0'>

                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label disabled={!isSubCategory} style={{ color: !isSubCategory ? 'grey' : '#222', opacity: !isSubCategory ? '0.5' : '1', fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Sub-Category</Form.Label>
                        <Form.Control
                          style={{ padding: '10px', marginTop: '10px', opacity: !isSubCategory ? '0.5' : '1', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
                          className={!isSubCategory ? 'custom-disabled' : 'white !important'}
                          type="text"
                          placeholder="Enter Sub-Category"
                          value={subType}
                          onChange={(e) => handlesubcategoryAdd(e)}
                          disabled={!isSubCategory}
                        />


                        {subcateogoryerrmsg.trim() !== "" && (
                          <div>
                            <p style={{ fontSize: '12px', color: 'red', marginTop: '3px', fontFamily: "Gilroy" }}>
                              {subcateogoryerrmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red' }} />} {subcateogoryerrmsg}
                            </p>
                          </div>
                        )}
                      </Form.Group>
                    </div>
                    {/* )} */}
                  </div>




                  {totalErrormsg.trim() !== "" && (
                    <div>
                      <p style={{ fontSize: '12px', color: 'red', marginTop: '3px',fontFamily:"Gilroy",fontWeight:500 }}>
                        {totalErrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {totalErrormsg}
                      </p>
                    </div>
                  )}

                  {state.Settings?.alreadycategoryerror && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: '5px',fontSize:14 }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {state.Settings?.alreadycategoryerror}
                      </label>
                    </div>
                  )}

{formError && (
                    <div className="" style={{textAlign:"center"}}>
                      <MdError style={{ color: "red", marginRight: '5px',fontSize: "14px", }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {formError}
                      </label>
                    </div>
                  )}



{formCategoryError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: '5px',fontSize: "14px", }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {formCategoryError}
                      </label>
                    </div>
                  )}
                </div>
              </Modal.Body>




              <Modal.Footer style={{ border: "none" }}>
                <Button
                  disabled={editsubcat === false}
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 500,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    marginTop:"-15px"
                  }}

                  onClick={edit ? updateType : addType}
                >
                  {edit ? "Save Changes" : "Save"}
                  {/* Add Category */}
                  {/* {edit ? "Save invoice" : "Add invice"} */}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      )}


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
            Delete Category?
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
          Are you sure you want to delete this Expences-category?
        </Modal.Body>

        <Modal.Footer 
        className="d-flex justify-content-center"
        style={{  borderTop: 'none', marginTop: '-10px' }}>
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
            onClick={cancelDelete} // Cancel, close modal
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
            onClick={confirmDelete}  // Confirm delete, dispatch action
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

   
    </div>
  </div>
  )
}

SettingExpenses.propTypes = {
  hostelid: PropTypes.func.isRequired
};
export default SettingExpenses;