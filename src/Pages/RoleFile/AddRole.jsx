/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseCircle } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";



function AddRole({ showRole, setShowRole, editRoleDetails, addRole }) {


    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [permissionRole, setPermissionRole] = useState([])
    const [roleName, setRoleName] = useState('')
    const [errorForm, setErrorForm] = useState("")
    const [errorPermission, setErrorPermission] = useState("")
    const [editPermissionDetails, setEditPermissionDetails] = useState([])
    const [errorIsChanged, setErrorIsChanged] = useState("");
    const [roleError, setRoleError] = useState("")
    const [editRoleError, setEditRoleError] = useState("")
    const initialFormState = useRef(null);
    const [formLoading, setFormLoading] = useState(false)

    const [checkboxValues, setCheckboxValues] = useState({
        Dashboard: [false, false, false, false],
        Announcement: [false, false, false, false],
        Updates: [false, false, false, false],
        PayingGuest: [false, false, false, false],
        Customers: [false, false, false, false],
        Bookings: [false, false, false, false],
        Checkout: [false, false, false, false],
        WalkIn: [false, false, false, false],
        Assets: [false, false, false, false],
        Vendor: [false, false, false, false],
        Bills: [false, false, false, false],
        RecuringBills: [false, false, false, false],
        Electricity: [false, false, false, false],
        Complaints: [false, false, false, false],
        Expenses: [false, false, false, false],
        Reports: [false, false, false, false],
        Bankings: [false, false, false, false],
        Profile: [false, false, false, false],
        Amenities: [false, false, false, false]

    });

    const handleCheckboxChange = (row, index) => {
        setErrorPermission('')
        setErrorIsChanged("")
        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [row]: prevValues[row].map((value, i) => (i === index ? !value : value))
        }));
    };
    const permissionMapping = {
        Dashboard: 1,
        Announcement: 2,
        Updates: 3,
        PayingGuest: 4,
        Customers: 5,
        Bookings: 6,
        Checkout: 7,
        WalkIn: 8,
        Assets: 9,
        Vendor: 10,
        Bills: 11,
        RecuringBills: 12,
        Electricity: 13,
        Complaints: 14,
        Expenses: 15,
        Reports: 16,
        Bankings: 17,
        Profile: 18,
        Amenities: 19
    };

    useEffect(() => {
        if (!checkboxValues || typeof checkboxValues !== 'object') {
            return;
        }

        const permissions = Object.entries(checkboxValues).map(([key, values]) => {
            if (!permissionMapping[key]) {
                console.error(`Permission mapping for key "${key}" is missing.`);
                return null;
            }
            if (!Array.isArray(values)) {
                console.error(`Values for key "${key}" are not an array:`, values);
                return null;
            }

            return {
                permission_id: permissionMapping[key],
                per_create: values[0] ? 1 : 0,
                per_view: values[1] ? 1 : 0,
                per_edit: values[2] ? 1 : 0,
                per_delete: values[3] ? 1 : 0
            };
        }).filter(Boolean);



        setPermissionRole(prev => {
            const prevPermissionsString = JSON.stringify(prev);
            const newPermissionsString = JSON.stringify(permissions);
            return prevPermissionsString !== newPermissionsString ? permissions : prev;
        });


    }, [checkboxValues, permissionMapping]);


    useEffect(() => {
        if (editRoleDetails) {
            dispatch({ type: "EDITPERMISSIONROLE", payload: { role_id: editRoleDetails.id } });
        }

    }, [editRoleDetails])


    useEffect(() => {
        if (state.Settings.editStatusCosePermission === 200) {
            setEditPermissionDetails(state.Settings?.editRolePermission?.role_details)
        }

    }, [state.Settings.editStatusCosePermission])


    useEffect(() => {
        if (editPermissionDetails) {

            setRoleName(editRoleDetails.role_name ? editRoleDetails.role_name.trim() : '');


            const updatedCheckboxValues = { ...checkboxValues };

            editPermissionDetails.forEach((permission) => {
                const permissionName = Object.keys(permissionMapping).find(
                    (key) => permissionMapping[key] === permission.permission_id
                );

                if (permissionName) {
                    updatedCheckboxValues[permissionName] = [
                        permission.per_create === 1,
                        permission.per_view === 1,
                        permission.per_edit === 1,
                        permission.per_delete === 1,
                    ];
                }
            });

            setCheckboxValues(updatedCheckboxValues);
            initialFormState.current = {
                roleName: editRoleDetails.role_name ? editRoleDetails.role_name.trim() : '',
                permissionRole: editPermissionDetails,
            };


        }
    }, [editPermissionDetails]);


    const handleClose = () => {
        setShowRole(false)
        setRoleError("")
        setErrorForm('')
        setErrorPermission('')
        setErrorIsChanged("")
        setEditRoleError("")
        dispatch({ type: "CLEAR_ROLE_ERROR" })
        dispatch({ type: "CLEAR_ROLE_EDIT_ERROR" })
    }

    const handleRoleName = (e) => {
        const value = e.target.value.trim()
        const pattern = /^[a-zA-Z\s]*$/;
        if (!pattern.test(value)) {
            return;
        }
        setErrorForm('')
        setRoleName(value);

        setErrorIsChanged("")
        setRoleError("")
        setEditRoleError("")
        dispatch({ type: "CLEAR_ROLE_ERROR" })
        dispatch({ type: "CLEAR_ROLE_EDIT_ERROR" })

    }

    useEffect(() => {
        if (state.Settings.roleError) {
            setFormLoading(false)
            setRoleError(state.Settings.roleError)
        }

    }, [state.Settings.roleError])

    useEffect(() => {
        if (state.Settings.roleEditError) {
            setFormLoading(false)
            setEditRoleError(state.Settings.roleEditError)
        }

    }, [state.Settings.roleEditError])


    const renderRow = (rowName, label) => (
        <tr key={rowName}>
            <td style={{ paddingLeft: '16px' }}>{label}</td>
            {checkboxValues[rowName]?.map((checked, index) => (
                <td key={index}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxChange(rowName, index)}
                    />
                </td>
            ))}
        </tr>
    );


    const normalizePermissions = (permissions) =>
        permissions.map(({ permission_id, per_create, per_view, per_edit, per_delete }) => ({
            permission_id,
            per_create,
            per_view,
            per_edit,
            per_delete,
        })).sort((a, b) => a.permission_id - b.permission_id);



    const handleSubmit = () => {
        dispatch({ type: "CLEAR_ROLE_ERROR" })
        dispatch({ type: "CLEAR_ROLE_EDIT_ERROR" })
        let isValid = true;

        if (!roleName.trim()) {
            setErrorForm("Role Name Cannot Be Empty");
            isValid = false;
        }
        const hasPermissionSelected = permissionRole.some(permission =>
            permission.per_create !== 0 || permission.per_delete !== 0 || permission.per_edit !== 0 || permission.per_view !== 0
        )

        if (!hasPermissionSelected) {
            setErrorPermission("At Least One Permission Must Be Selected");
            isValid = false;
        }

        const currentState = {
            roleName,
            permissionRole,
        };

        const normalizedInitial = normalizePermissions(initialFormState.current.permissionRole);
        const normalizedCurrent = normalizePermissions(currentState.permissionRole);

        const hasRoleNameChanged = initialFormState.current.roleName?.trim() !== currentState.roleName?.trim();
        const hasPermissionRoleChanged = JSON.stringify(normalizedInitial) !== JSON.stringify(normalizedCurrent);




        if (!hasRoleNameChanged && !hasPermissionRoleChanged) {
            setErrorIsChanged("No Changes Detected");
            isValid = false;
        }



        if (!isValid) return;
        const payload = {
            id: editRoleDetails.id || null,
            hostel_id: state.login.selectedHostel_Id,
            role_name: roleName,
            permissions: permissionRole,

        };

        if (isValid) {
            if (editRoleDetails) {

                dispatch({ type: "EDITSETTINGROLEPERMISSION", payload });
                setFormLoading(true)
            } else {
                dispatch({ type: "SETTING_ADD_ROLE_LIST", payload });
                setFormLoading(true)
            }
        }
    };


    useEffect(() => {
        if (addRole) {
            setEditPermissionDetails([])
            setRoleName("")
            setPermissionRole([])
            setCheckboxValues((prevValues) => {
                const resetValues = {};
                Object.keys(prevValues).forEach((key) => {
                    resetValues[key] = prevValues[key].map(() => false);
                });
                return resetValues;
            });

        }

    }, [addRole])
    useEffect(() => {
        document.body.style.overflow = showRole ? "hidden" : "auto";
    }, [showRole]);


useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


    
    return (
        <div
            className="modal show"
            style={{
                display: "block",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1050,
                overflow: "hidden",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
        >
            <Modal
                show={showRole}
                onHide={handleClose}
                centered
                backdrop="static"
                dialogClassName="custom-modal-no-scroll"
            >
                <Modal.Dialog
                    style={{
                        maxWidth: 850,
                        width: "100%",
                        margin: 0,
                    }}
                    className="m-0 p-0"
                >
                    <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{editRoleDetails ? 'Edit Role' : 'Create Role'}</Modal.Title>

                        <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />

                    </Modal.Header>

                    <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll pt-1 mt-1 me-3 pt-0">



                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3">
                                <Form.Label
                                    style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                    }}
                                >
                                    Role Name {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>
                                <FormControl
                                    id="form-controls"
                                    placeholder="Enter Role"
                                    type="text"
                                    value={roleName}
                                    onChange={(e) => handleRoleName(e)}
                                    style={{
                                        fontSize: 16,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        height: 50,
                                        borderRadius: 8,
                                    }}
                                />
                            </Form.Group>

                            {roleError && (
                                <div className="d-flex align-items-center" style={{ marginTop: "-10px" }}>
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {roleError}
                                    </label>
                                </div>
                            )}
                            {editRoleError && (
                                <div className="d-flex align-items-center  " style={{ marginTop: "-10px" }}>
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {editRoleError}
                                    </label>
                                </div>
                            )}



                            {errorForm && (
                                <div className="d-flex align-items-center" style={{ marginTop: "-10px" }}>
                                    <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px", marginBottom: "2px" }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {errorForm}
                                    </label>
                                </div>
                            )}
                        </div>





                        <div className="mt-3 " style={{ border: "1px solid #DCDCDC", borderRadius: "16px", maxHeight: "280px", overflowY: "auto", }}>
                            <table className="table mb-0">
                                <thead style={{
                                    backgroundColor: "#E7F1FF",
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                }}>
                                    <tr >
                                        <th style={{ paddingLeft: '16px', fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B", borderTopLeftRadius: 16, }}>Permission</th>
                                        <th style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Add</th>
                                        <th style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Read</th>
                                        <th style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Edit</th>
                                        <th style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B", borderTopRightRadius: 16 }}>Delete</th>
                                    </tr>
                                </thead>

                                <tbody style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600, color: "#4B4B4B" }}>

                                    {renderRow('Dashboard', 'Dashboard')}
                                    {renderRow('Announcement', 'Announcement')}
                                    {renderRow('Updates', 'Updates')}
                                    {renderRow('PayingGuest', 'PayingGuest')}
                                    {renderRow('Customers', 'Customers')}
                                    {renderRow('Bookings', 'Bookings')}
                                    {renderRow('Checkout', 'Checkout')}
                                    {renderRow('WalkIn', 'WalkIn')}
                                    {renderRow('Assets', 'Assets')}
                                    {renderRow('Vendor', 'Vendor')}
                                    {renderRow('Bills', 'Bills')}
                                    {renderRow('RecuringBills', 'RecuringBills')}
                                    {renderRow('Electricity', 'Electricity')}
                                    {renderRow('Complaints', 'Complaints')}
                                    {renderRow('Expenses', 'Expenses')}
                                    {renderRow('Reports', 'Reports')}
                                    {renderRow('Bankings', 'Bankings')}
                                    {renderRow('Profile', 'Profile')}
                                    {renderRow('Amenities', 'Amenities')}


                                </tbody>

                            </table>
                        </div>



                    </Modal.Body>

                     {state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-3 mb-1'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
              </div>
              : null}
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
                    {errorIsChanged && (
                        <div className="mb-3 mt-2" style={{ textAlign: "center" }}>
                            <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px", marginBottom: "2px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                {errorIsChanged}
                            </label>
                        </div>
                    )}



                    {errorPermission && (
                        <div className="d-flex align-items-center ms-3 mb-3 mt-3">
                            <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "13px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                {errorPermission}
                            </label>
                        </div>
                    )}
                    <Modal.Footer style={{ border: "none" }}>

                        <Button
                            onClick={handleSubmit}
                            className='w-100' style={{ cursor: "pointer", backgroundColor: "#1E45E1", fontWeight: 600, padding: 12, borderRadius: 8, fontSize: 16, fontFamily: "Gilroy" }}>
                            {editRoleDetails ? 'Save Changes' : 'Create Role'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}
AddRole.propTypes = {
    editRoleDetails: PropTypes.func.isRequired,
    setShowRole: PropTypes.func.isRequired,
    addRole: PropTypes.func.isRequired,
    showRole: PropTypes.func.isRequired,
};
export default AddRole