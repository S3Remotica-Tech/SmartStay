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
import ErrorMessage from '../../Components/ErrorMessage'


function AddRole({ showRole, setShowRole, editRoleDetails, addRole }) {


    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [permissionRole, setPermissionRole] = useState([])
    const [roleName, setRoleName] = useState('')
    const [errorForm, setErrorForm] = useState("")
    const [errorPermission, setErrorPermission] = useState("")
    const [errorIsChanged, setErrorIsChanged] = useState("");
    const [roleError, setRoleError] = useState("")
    const [editRoleError, setEditRoleError] = useState("")
    const initialFormState = useRef({
        roleName: "",
        permissionRole: []
    });

    const [formLoading, setFormLoading] = useState(false)



    // const handleCheckboxChange = (rowName, index) => {
    //     setErrorIsChanged("")
    //     setErrorPermission("")
    //     setCheckboxValues(prev => ({
    //         ...prev,
    //         [rowName]: prev[rowName].map((val, i) =>
    //             i === index ? !val : val
    //         )
    //     }));
    // };

const handleCheckboxChange = (rowName, index) => {
    setErrorIsChanged("");
    setErrorPermission("");

    setCheckboxValues(prev => {
        const row = prev[rowName];
       
        let newRow = row.map((val, i) => (i === index ? !val : val));
      
        if ((index === 2 || index === 3) && newRow[index]) {
            newRow[1] = true; 
        }
      
        if (index === 1 && !newRow[1]) {
            newRow[2] = false; 
            newRow[3] = false; 
           
        }

        return {
            ...prev,
            [rowName]: newRow
        };
    });
};




    const modules = state.Settings?.getModules || [];


    const permissionMapping = modules.reduce((acc, module) => {
        const formattedName = module.moduleName.replace(/\s+/g, '');
        acc[formattedName] = module.id;
        return acc;
    }, {});


    const initialCheckboxValues = modules.reduce((acc, module) => {
        const formattedName = module.moduleName.replace(/\s+/g, '');
        acc[formattedName] = [false, false, false, false];
        return acc;
    }, {});

    const [checkboxValues, setCheckboxValues] = useState(initialCheckboxValues);






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
                moduleId: permissionMapping[key],
                canWrite: values[0] ? 1 : 0,
                canRead: values[1] ? 1 : 0,
                canUpdate: values[2] ? 1 : 0,
                canDelete: values[3] ? 1 : 0
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

            setRoleName(editRoleDetails.name ? editRoleDetails.name.trim() : '');

            const updatedCheckboxValues = { ...checkboxValues };

            editRoleDetails.rolesPermissionDetails.forEach((permission) => {
                const permissionName = Object.keys(permissionMapping).find(
                    (key) => permissionMapping[key] === permission.moduleId
                );

                if (permissionName) {
                    updatedCheckboxValues[permissionName] = [
                        permission.canWrite ? true : false,
                        permission.canRead ? true : false,
                        permission.canUpdate ? true : false,
                        permission.canDelete ? true : false,
                    ];
                }
            });


            setCheckboxValues(updatedCheckboxValues);

            initialFormState.current = {
                roleName: editRoleDetails.name ? editRoleDetails.name.trim() : '',
                permissionRole: editRoleDetails.rolesPermissionDetails.map((p) => ({
                    moduleId: p.moduleId,
                    canRead: p.canRead ? 1 : 0,
                    canWrite: p.canWrite ? 1 : 0,
                    canUpdate: p.canUpdate ? 1 : 0,
                    canDelete: p.canDelete ? 1 : 0,
                })),
            };
        }
    }, [editRoleDetails]);



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
    let value = e.target.value;

    const valid = /^[A-Za-z0-9 ]*$/.test(value);

    if (!valid) {
        return;   
    }

    setErrorForm('');
    setRoleName(value);
    setErrorIsChanged("");
    setRoleError("");
    setEditRoleError("");
    dispatch({ type: "CLEAR_ROLE_ERROR" });
    dispatch({ type: "CLEAR_ROLE_EDIT_ERROR" });
};


    useEffect(() => {
        if (state.Settings.roleError) {
            setFormLoading(false)
            setRoleError(state.Settings?.roleError)
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
        permissions.map(({ moduleId, canWrite, canRead, canUpdate, canDelete }) => ({
            moduleId,
            canWrite, canRead, canUpdate, canDelete,
        })).sort((a, b) => a.moduleId - b.moduleId);



    const handleSubmit = () => {
        setEditRoleError("")
        dispatch({ type: "CLEAR_ROLE_ERROR" })
        dispatch({ type: "CLEAR_ROLE_EDIT_ERROR" })
        let isValid = true;

        if (!roleName) {
            setErrorForm("Please Enter Role Name");
            isValid = false;
        }
        const hasPermissionSelected = permissionRole.some(permission =>
            Boolean(permission.canRead || permission.canWrite || permission.canUpdate || permission.canDelete)
        );


        if (!hasPermissionSelected) {
            setErrorPermission("At Least One Permission Must Be Selected");
            isValid = false;
        }
        if (editRoleDetails) {
            const currentState = {
                roleName,
                permissionRole,
            };

            let hasRoleNameChanged = true;
            let hasPermissionRoleChanged = true;

            if (editRoleDetails) {
                const normalizedInitial = normalizePermissions(initialFormState.current.permissionRole || []);
                const normalizedCurrent = normalizePermissions(currentState.permissionRole);

                hasRoleNameChanged =
                    initialFormState.current.roleName?.trim() !== currentState.roleName?.trim();
                hasPermissionRoleChanged =
                    JSON.stringify(normalizedInitial) !== JSON.stringify(normalizedCurrent);
            }




            if (!hasRoleNameChanged && !hasPermissionRoleChanged) {
                setErrorIsChanged("No Changes Detected");
                isValid = false;
            }

        }

        if (!isValid) return;


     const formattedPermissionList = permissionRole.map(permission => ({
    moduleId: permission.moduleId,
    canRead: permission.canRead === 1 || permission.canRead === true,
    canWrite: permission.canWrite === 1 || permission.canWrite === true,
    canUpdate: permission.canUpdate === 1 || permission.canUpdate === true,
    canDelete: permission.canDelete === 1 || permission.canDelete === true,
}));


        let payload;
       

        if (editRoleDetails) {

            payload = {
                id: editRoleDetails.id || null,
                hostelId: state.login.selectedHostel_Id,
                roleName: roleName?.trim(),
                permissionList: formattedPermissionList,
            };
        } else {
            payload = {
                hostelId: state.login.selectedHostel_Id,
                roleName: roleName.trim(),
                permissionList: formattedPermissionList,
            };
        }



        if (isValid) {
             console.log("payload",payload)
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
                            <Form.Group className="">
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
                                  <ErrorMessage message={roleError} type="error"/>
                            )}
                            {editRoleError && (
                                 <ErrorMessage message={editRoleError} type="error"/>
                            )}



                            {errorForm && (
                                 <ErrorMessage message={errorForm} type="error"/>
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

                                    {modules.map(module => {
                                        const formattedName = module.moduleName.replace(/\s+/g, '');
                                        return renderRow(formattedName, module.moduleName);
                                    })}

                                  
                                </tbody>

                            </table>
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
                    {errorIsChanged && (
                        <div className="d-flex justify-content-center" style={{ textAlign: "center" }}>
                           <ErrorMessage message={errorIsChanged} type="error"/>
                        </div>
                    )}



                    {errorPermission && (
                        <div className="d-flex justify-content-start ms-3" >
                        <ErrorMessage message={errorPermission} type="error"/>
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