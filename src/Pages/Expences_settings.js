import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';
import { MdError } from "react-icons/md"; 
import Modal from 'react-bootstrap/Modal';
import EmptyState from '../Assets/Images/New_images/empty_image.png';

const ExpencesSettings = () => {

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


    return (

        <>
        {
            expencepermissionError ? (
                <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    //   height: "100vh",
    }}
  >
    {/* Image */}
    <img
      src={EmptyState}
      alt="Empty State"
      style={{ maxWidth: "100%", height: "auto" }}
    />

    {/* Permission Error */}
    {expencepermissionError && (
      <div
        style={{
          color: "red",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <MdError size={20} />
        <span>{expencepermissionError}</span>
      </div>
    )}
  </div>
            ):
            <div>
            <div className='d-flex flex-column flex-sm-column flex-md-row  flex-lg-row'>
                <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
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

                {/* {isSubCategory && ( */}
                <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12 ms-lg-4 ms-md-2 ms-xs-0'>

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

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input
                    type='checkbox'
                    className='mb-2 me-2'
                    checked={isSubCategory}
                    onChange={() => setIsSubCategory(!isSubCategory)}
                />
                <p className='mt-1' style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#000", fontStyle: 'normal', lineHeight: 'normal' }}>Make sub-category</p>
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
            <div style={{ marginTop: '20px', fontSize: 14, fontWeight: 600 }}>
                <Button
                    style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200 }}
                  disabled={expenceAddPermission}  onClick={addType}
                >
                    + Add category
                </Button>

                <div className="mt-3">
                    <h5 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Existing categories</h5>
                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {uniqueExpences.length > 0 && uniqueExpences.map((t, index) => (
                            <p key={index} className='m-1' style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                                <span style={{ backgroundColor: '#FFEFCF', padding: '8px 12px', color: '#222222', borderRadius: '14px' }}>
                                    {t.category_Name}
                                    <span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDeleteExpensesCategory(t.category_Id)}>
                                        <img src={Closebtn} height={15} width={15} alt="delete" />
                                    </span>
                                </span>
                            </p>
                        ))}
                    </div>
                </div>

                <div className="mt-3">
                    <h5 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Existing sub-categories</h5>

                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {expences.length > 0 && expences.filter(t => t.category_Name).map((t, index) => (
                            t.subcategory && t.subcategory.length > 0 ? (
                                <div key={index} className='m-1' style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ backgroundColor: '#FFEFCF', padding: '8px 12px', borderRadius: '14px', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}>
                                        <span style={{ marginLeft: '10px', fontSize: '18px', color: '#555' }}>
                                            {t.category_Name} - {t.subcategory}
                                        </span>
                                        <span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDeleteExpensesCategory(t)}>
                                            <img src={Closebtn} height={15} width={15} alt="delete" />
                                        </span>
                                    </span>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>

            </div>
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
        }
        
        </>
    );
};

export default ExpencesSettings;
