import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';
import { MdError } from "react-icons/md"; 
import Modal from 'react-bootstrap/Modal';

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



     const uniqueExpences = expences.filter((expence, index, self) =>
        index === self.findIndex((e) => e.category_Id === expence.category_Id)
      );
     
console.log("uniqueExpences",uniqueExpences);

      

    const [namefilter, setNamefilter] = useState()

    //    useEffect(() => {
    //     console.log("useEffect triggered");
    //     console.log("state.Settings.Expences.data", state.Settings.Expences.data);
    //     console.log("typeid", typeidname);

    //     // if (state.Settings.Expences.data && type !== undefined) {
    //     //     // Filter the data based on the typeidname
    //     //     console.log("type",type);
    //     //     const Typeidnamefilter = state.Settings.Expences.data.filter((typename) => {
    //     //         console.log("all", typename.id);
    //     //         return typename.id === type;
    //     //     });
    //     //     // Set the filtered data to the state
    //     //     setNamefilter(Typeidnamefilter);
    //     //     // Log the filtered data for debugging
    //     //     console.log("Typeidnamefilter", Typeidnamefilter);
    //     // }
    // }, [state.Settings.Expences.data, type]); 


    const [cateogoryerrmsg, setCategoryErrmsg] = useState('');
    const [subcateogoryerrmsg, setSubCategoryErrmsg] = useState('');
    const [totalErrormsg,setTotalErrmsg]= useState('');



    const [showModal, setShowModal] = useState(false);  // Modal visibility state
    const [deleteItem, setDeleteItem] = useState(null);  // Store item to delete

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
            setTotalErrmsg('Please enter All Field')
            setTimeout(() => {
                setTotalErrmsg('')
            }, 2000);
           return;
        }


        if (type.trim()) {
            if (isSubCategory) {
                if( !subType || !namefilter){
                    setTotalErrmsg('Please enter All Field')
                    setTimeout(() => {
                        setTotalErrmsg('')
                    }, 2000);
                   return;
                }
              else  if (subType.trim()) {
                    console.log("subexecuted");
                    // setTypes([...types, { category: type, subCategory: subType }]);
                    dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { id: type, category_Name: namefilter, sub_Category: subType } });
             
                    setSubType('');
                    setType('');
                } 
                // else {
                //     Swal.fire({
                //         icon: 'warning',
                //         title: 'Please enter a sub-category',
                //         confirmButtonText: 'OK'
                //     });
                // }
            } else {

                if( !type ){
                    setTotalErrmsg('Please enter All Field')
                    setTimeout(() => {
                        setTotalErrmsg('')
                    }, 2000);
                   return;
                }

                else{
                    dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { category_Name: type, sub_Category: '' } });
                    setType('');
                }
                // setTypes([...types, { category: type, subCategory: '' }]);
              
            }
        } 
        // else {
        //     console.log("Please enter a category");
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Please enter a category',
        //         confirmButtonText: 'OK'
        //     });
        // }
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


    // const handleDeleteExpensesCategory = (item) => {
    //     console.log("deleteitem", item)
    //     if (item && item.category_Id && item.subcategory_Id) {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: 'Do you want to delete the Expenses sub Category ?',
    //             confirmButtonText: 'Yes',
    //             cancelButtonText: 'No',
    //             showCancelButton: true,
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 dispatch({
    //                     type: 'DELETE-EXPENCES-CATEGORY',
    //                     payload: {
    //                         id: item.category_Id,
    //                         sub_Category_Id: item.subcategory_Id
    //                     },
    //                 });
    //                 console.log("deleteexecuted");
                 
    //             }
    //         });

    //     }

    //     else {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: 'Do you want to delete the Expenses Category ?',
    //             confirmButtonText: 'Yes',
    //             cancelButtonText: 'No',
    //             showCancelButton: true,
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 dispatch({
    //                     type: 'DELETE-EXPENCES-CATEGORY',
    //                     payload: {
    //                         id: item,
    //                     },
    //                 });
    //                 console.log("deleteexecuted");
                 
    //             }
    //         });
    //     }


    // }


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

        if(!e.target.value){
            setCategoryErrmsg("Please Enter a Category")
        }
        else {
            setCategoryErrmsg("")
        }
    }

    const handlecategoryAdd = (e) => {
        setType(e.target.value)
        if(!e.target.value){
            setCategoryErrmsg("Please Enter a Category")
        }
        else {
            setCategoryErrmsg("")
        }
    }


    const handlesubcategoryAdd = (e) => {
        setSubType(e.target.value)
        if(!e.target.value){
            setSubCategoryErrmsg("Please Enter a Sub-Category")
        }
        else {
            setSubCategoryErrmsg("")
        }
    }


    return (
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
                    onClick={addType}
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
    );
};

export default ExpencesSettings;
