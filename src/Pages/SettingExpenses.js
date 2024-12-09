import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';
import { MdError } from "react-icons/md"; 
import Modal from 'react-bootstrap/Modal';
import EmptyState from '../Assets/Images/New_images/empty_image.png';





       function SettingExpenses(){




    const state = useSelector(state => state)
    const dispatch = useDispatch()

    console.log("state", state);

    const [type, setType] = useState('');
    const [subType, setSubType] = useState('');
    const [typeerrmsg, setTypeErrmsg] = useState('')   

    const [typeidname, setTypeIdName] = useState('')
    const [types, setTypes] = useState([]);
    const [isSubCategory, setIsSubCategory] = useState(false);
    const [expences, setExpences] = useState([])
    console.log("expences", expences);

    const [expencerolePermission, setExpenceRolePermission] = useState("");

  const [expencepermissionError, setExpencePermissionError] = useState("");
  const [expenceAddPermission,setExpenceAddPermission]= useState("")
  const [expenceDeletePermission,setExpenceDeletePermission]=useState("")
  const [expenceEditPermission,setExpenceEditPermission]=useState("")
  const [showform, setShowForm] = useState(false);



  useEffect(() => {
    setExpenceRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    console.log("===expencerolePermission[0]", expencerolePermission);
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_view == 1
    ) {
      setExpencePermissionError("");
    } else {
      setExpencePermissionError("Permission Denied");
    }
  }, [expencerolePermission]);



  useEffect(() => {
    console.log("===expencerolePermission[0]", expencerolePermission);
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_create == 1
    ) {
      setExpenceAddPermission("");
    } else {
      setExpenceAddPermission("Permission Denied");
    }
  }, [expencerolePermission]);


  useEffect(() => {
    console.log("===expencerolePermission[0]", expencerolePermission);
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_delete == 1
    ) {
      setExpenceDeletePermission("");
    } else {
      setExpenceDeletePermission("Permission Denied");
    }
  }, [expencerolePermission]);
  useEffect(() => {
    console.log("===expencerolePermission[0]", expencerolePermission);
    if (
      expencerolePermission[0]?.is_owner == 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_edit == 1
    ) {
      setExpenceEditPermission("");
    } else {
      setExpenceEditPermission("Permission Denied");
    }
  }, [expencerolePermission]);



     const uniqueExpences = expences.filter((expence, index, self) =>
        index === self.findIndex((e) => e.category_Id === expence.category_Id)
      );
     
console.log("uniqueExpences",uniqueExpences);

      

    const [namefilter, setNamefilter] = useState()

   

    const [cateogoryerrmsg, setCategoryErrmsg] = useState('');
    const [subcateogoryerrmsg, setSubCategoryErrmsg] = useState('');
    const [totalErrormsg,setTotalErrmsg]= useState('');



    const [showModal, setShowModal] = useState(false);  
    const [deleteItem, setDeleteItem] = useState(null);  



    const handleShow = () => {
        setShowForm(true);
        // setEdit(false);
      };
    
      const handleCloseForm = () => {
        setShowForm(false);
      };

    const handleDeleteExpensesCategory = (item) => {
        setDeleteItem(item);  // Set item to delete
        setShowModal(true);   // Show confirmation modal
    };

    const confirmDelete = () => {
        if (deleteItem && deleteItem.category_Id && deleteItem.subcategory_Id) {
            dispatch({
                type: 'DELETE-EXPENCES-CATEGORY',
                payload: {
                    id: deleteItem.category_Id,
                    sub_Category_Id: deleteItem.subcategory_Id
                },
            });
        } else {
            dispatch({
                type: 'DELETE-EXPENCES-CATEGORY',
                payload: { id: deleteItem },
            });
        }
        setShowModal(false);  // Close the modal
    };

    const cancelDelete = () => {
        setShowModal(false);  // Close modal without deleting
    };

    const addType = () => {

        if( !type ){
            setCategoryErrmsg("Please Enter a Category")   
           return;
        }


        if (type.trim()) {
            if (isSubCategory) {

                if(!subType){
                    setSubCategoryErrmsg("Please Enter a Sub-Category")
                }

                if( !subType && !namefilter){
                    setTotalErrmsg('Please enter All Field') 
                   return;
                }
              else  if (subType.trim()) {
                    console.log("subexecuted");
                    dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { id: type, category_Name: namefilter, sub_Category: subType } });
             
                    setSubType('');
                    setType('');
                } 
            
                }
             else {

              
                    dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { category_Name: type, sub_Category: '' } });
                    setType('');            
            }
        } 
    
    };


    useEffect(() => {
        if (state.Settings?.alreadycategoryerror) {
            
          setTimeout(() => {
            dispatch({ type: 'CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR' });
          }, 3000);    
        }
      }, [state.Settings?.alreadycategoryerror])

    useEffect(() => {
        dispatch({ type: 'EXPENCES-CATEGORY-LIST' })
    }, [])

    useEffect(() => {
        if (state.Settings.getExpensesStatuscode === 200) {
            setExpences(state.Settings.Expences.data)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_GET_EXPENSES_STATUS_CODE' })
            }, 100)
        }
    }, [state.Settings.getExpensesStatuscode])



    useEffect(() => {
        if (state.Settings.addexpencesStatuscode === 200 || state.Settings.deleteexpencesStatusCode === 200) {
            setTimeout(() => {
                dispatch({ type: 'EXPENCES-CATEGORY-LIST' })
                console.log("get expense category list executed")
            }, 100)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_ADD_EXPENCES_STATUS_CODE' })
            }, 1000)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_DELETE_EXPENCES_STATUS_CODE' })
            }, 1000)
        }
    }, [state.Settings.addexpencesStatuscode, state.Settings.deleteexpencesStatusCode])


  


    const handleCategoryid = (e) => {
        setType(e.target.value)

        if (state.Settings.Expences.data && e.target.value !== undefined) {
            console.log("type", e.target.value);
            const Typeidnamefilter = state.Settings.Expences.data.filter((typename) => {
                console.log("all", typename.id);
                return typename.category_Id == e.target.value;
            });
            console.log("Typeidnamefilter", Typeidnamefilter);
            setNamefilter(Typeidnamefilter[0].category_Name);

            console.log("Typeidnamefilter", Typeidnamefilter);
        }
        setTotalErrmsg('')

        if(!e.target.value){
            setCategoryErrmsg("Please Enter a Category")
        }
        else {
            setCategoryErrmsg("")
        }
    }

    const handlecategoryAdd = (e) => {
        setType(e.target.value)
        setTotalErrmsg('')
        if(!e.target.value){
            setCategoryErrmsg("Please Enter a Category")
        }
        else {
            setCategoryErrmsg("")
        }
    }


    const handlesubcategoryAdd = (e) => {
        setSubType(e.target.value)
        setTotalErrmsg('')
        if(!e.target.value){
            setSubCategoryErrmsg("Please Enter a Sub-Category")
        }
        else {
            setSubCategoryErrmsg("")
        }
    }

    const [expandedCategoryId, setExpandedCategoryId] = useState(null); // Track which dropdown is expanded

    // Toggle the dropdown for a specific category
    const handleToggleDropdown = (categoryId) => {
      setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
    };


    return(
        <div className="container"> 
             <div style={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
        <h3> Expences Category</h3>
        <div></div>
        <Button  onClick={handleShow} style={{fontSize: 16,backgroundColor: "#1E45E1",color: "white",height: 46,fontWeight: 600,
            borderRadius: 12,
            width: 180,
            padding: "18px, 20px, 18px, 20px",
            color: "#FFF",
            fontFamily: "Montserrat"}}>{" "}+ Add Category</Button>
      </div>

      <div className="mt-4 d-flex row ">
        {uniqueExpences.map((category) => (
          <div key={category.category_Id} className="mb-3 col-lg-4">
            {/* Dropdown Button */}
            <button
              className="btn btn-white dropdown-toggle border"
              type="button"
              onClick={() => handleToggleDropdown(category.category_Id)}
              style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500 }}
            >
              {category.category_Name}
            </button>

            {/* Subcategory Dropdown */}
            {expandedCategoryId === category.category_Id && (
              <ul
                className="list-group mt-2"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {category.subcategory && category.subcategory.length > 0 ? (
                  category.subcategory.map((sub, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#222",
                      }}
                    >
                      {sub}
                      <span
                        style={{
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() =>
                          alert(`Delete action for Subcategory: ${sub}`)
                        }
                      >
                        <img src={Closebtn} height={15} width={15} alt="delete" />
                      </span>
                    </li>
                  ))
                ) : (
                  <li
                    className="list-group-item"
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#555",
                    }}
                  >
                    No Subcategories Available
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>


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
          >
            <Modal.Dialog
              style={{
                maxWidth: 950,
                paddingRight: "10px",
                paddingRight: "10px",
                borderRadius: "30px",
              }}
              className="m-0 p-0"
            >
            
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      {/* {edit ? "Edit Invoice" : "Add Invoice "} */}
                      Add Category

                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseForm}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "16px",
                        border: "1px solid black",
                        background: "transparent",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "32px",
                        height: "32px",
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
                    </button>

                    {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
                  </Modal.Header>
                </div>
                <Modal.Body>

                <div className="row ">
                
                   
              

                <div className='d-flex flex-column '>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Category</Form.Label>
                        {isSubCategory ? (
                            <Form.Control
                                as="select"
                                style={{ padding: '20px', marginTop: '10px' , fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight:'18.83px' , fontWeight: 500}}
                                value={type}
                                onChange={(e) => handleCategoryid(e)}
                            >
                                <option value="">Select Category</option>
                                {uniqueExpences.length > 0 && uniqueExpences.map((category, index) => (
                                    <option key={index} value={category.category_Id}>
                                        {category.category_Name}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control
                                style={{ padding: '20px', marginTop: '10px' , fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight:'18.83px' , fontWeight: 500}}
                                type="text"
                                placeholder="Enter Category"
                                value={type}
                                onChange={(e) => handlecategoryAdd(e)}
                            />
                        )}
      

{cateogoryerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {cateogoryerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {cateogoryerrmsg}
    </p>
  </div>
)}
                    </Form.Group>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input
                    type='checkbox'
                    className='mb-3 me-2'
                    checked={isSubCategory}
                    onChange={() => setIsSubCategory(!isSubCategory)}
                    style={{ width: '20px', height: '20px', border: '4px solid black', borderRadius: '4px'}}
                />
                <p className='' style={{ fontFamily: 'Gilroy', fontSize: 15, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}>Make sub-category</p>
            </div>

                {/* {isSubCategory && ( */}
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12  ms-xs-0'>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label disabled={!isSubCategory} style={{ color: !isSubCategory ? 'grey' : 'black', opacity: !isSubCategory ? '0.5' : '1', fontSize: 14, fontWeight: 600 }}>Sub-Category</Form.Label>
                        <Form.Control
                            style={{ padding: '20px', marginTop: '10px', opacity: !isSubCategory ? '0.5' : '1' , fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight:'18.83px' , fontWeight: 500}}
                            className={!isSubCategory ? 'custom-disabled' : 'white !important'}
                            type="text"
                            placeholder="Enter sub-category"
                            value={subType}
                            onChange={(e) => handlesubcategoryAdd(e)}
                            disabled={!isSubCategory}
                        />
       

{subcateogoryerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {subcateogoryerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {subcateogoryerrmsg}
    </p>
  </div>
)}
                    </Form.Group>
                </div>
                {/* )} */}
            </div>

           


            {totalErrormsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {totalErrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {totalErrormsg}
    </p>
  </div>
)}   

{state.Settings?.alreadycategoryerror && (
                    <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.Settings?.alreadycategoryerror}
                        </label>
                    </div>
                )}
       

                 
                
                </div>
              </Modal.Body>

              <Modal.Footer style={{ border: "none" }}>
                <Button
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
                  }}
                onClick={addType}
                >
                  Add Category
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
  style={{ width: 388, height: 250, marginLeft: '500px', marginTop: '200px' }} 
>
  <Modal.Header style={{ borderBottom: 'none' }}> 
    <Modal.Title 
      style={{
        fontSize: '18px',
        fontFamily: 'Gilroy',
        textAlign: 'center',
        fontWeight: 600,
        color: '#222222',
        flex: 1
      }}
    >
      Delete Category?
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Gilroy',
      color: '#646464',
      textAlign: 'center',
      marginTop: '-20px'
    }}
  >
    Are you sure you want to delete this Expences-category?
  </Modal.Body>
  
  <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '-10px' }}> 
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#fff',
        color: '#1E45E1',
        border: '1px solid #1E45E1',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px',
        marginRight: 10
      }}
      onClick={cancelDelete} // Cancel, close modal
    >
      Cancel
    </Button>
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 8,
        padding: '12px 20px',
        background: '#1E45E1',
        color: '#FFFFFF',
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: '14px'
      }}
      onClick={confirmDelete}  // Confirm delete, dispatch action
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>

        </div> 
    )
}
export default SettingExpenses;