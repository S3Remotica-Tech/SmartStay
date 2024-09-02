import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';

const ExpencesSettings = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    console.log("state", state);

    const [type, setType] = useState('');
    // console.log("type",type);
    const [subType, setSubType] = useState('');
    // console.log("subType",subType);

    const [typeidname, setTypeIdName] = useState('')
    // console.log("typeid", typeidname);
    const [types, setTypes] = useState([]);
    const [isSubCategory, setIsSubCategory] = useState(false);
    // console.log("isSubCategory",isSubCategory);
    const [expences, setExpences] = useState([])
    console.log("expences", expences);

    const [namefilter, setNamefilter] = useState()
    //    console.log("namefilter",namefilter);

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

    const addType = () => {
        if (type.trim()) {
            if (isSubCategory) {
                if (subType.trim()) {
                    console.log("subexecuted");
                    // setTypes([...types, { category: type, subCategory: subType }]);
                    dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { id: type, category_Name: namefilter, sub_Category: subType } });
                    // Swal.fire({
                    //     icon: "success",
                    //     title: 'Expenses Category Added successfully',
                    //     confirmButtonText: "ok"
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //     }
                    // });
                    setSubType('');
                    setType('');
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Please enter a sub-category',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                // setTypes([...types, { category: type, subCategory: '' }]);
                dispatch({ type: 'EXPENCES-CATEGORY-ADD', payload: { category_Name: type, sub_Category: '' } });
                // Swal.fire({
                //     icon: "success",
                //     title: 'Expenses Category Added successfully',
                //     confirmButtonText: "ok"
                // }).then((result) => {
                //     if (result.isConfirmed) {
                //     }
                // });
                setType('');
            }
        } else {
            console.log("Please enter a category");
            Swal.fire({
                icon: 'warning',
                title: 'Please enter a category',
                confirmButtonText: 'OK'
            });
        }
    };




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


    const handleDeleteExpensesCategory = (item) => {
        console.log("deleteitem", item)
        if (item && item.category_Id && item.subcategory_Id) {
            Swal.fire({
                icon: 'warning',
                title: 'Do you want to delete the Expenses sub Category ?',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch({
                        type: 'DELETE-EXPENCES-CATEGORY',
                        payload: {
                            id: item.category_Id,
                            sub_Category_Id: item.subcategory_Id
                        },
                    });
                    console.log("deleteexecuted");
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Expenses sub-Category deleted Successfully',
                    // })
                }
            });

        }

        else {
            Swal.fire({
                icon: 'warning',
                title: 'Do you want to delete the Expenses Category ?',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch({
                        type: 'DELETE-EXPENCES-CATEGORY',
                        payload: {
                            id: item,
                            //   sub_Category_Id : item.subcategory_Id
                        },
                    });
                    console.log("deleteexecuted");
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Expenses Category deleted Successfully',
                    // })
                }
            });
        }


    }
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
                                {expences.map((category, index) => (
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
                                onChange={(e) => setType(e.target.value)}
                            />
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
                            onChange={(e) => setSubType(e.target.value)}
                            disabled={!isSubCategory}
                        />
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

            <div style={{ marginTop: '30px', fontSize: 14, fontWeight: 600 }}>
                <Button
                    style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200 }}
                    onClick={addType}
                >
                    + Add category
                </Button>

                <div className="mt-3">
                    <h5 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Existing categories</h5>
                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {expences.length > 0 && expences.map((t, index) => (
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
        </div>
    );
};

export default ExpencesSettings;
