/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseCircle } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import ErrorMessage from '../../../Components/ErrorMessage'


function AddRole({ showRole, setShowRole, editRoleDetails, addRole }) {


    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [permissionRole, setPermissionRole] = useState([])
    const [roleName, setRoleName] = useState('')
    const [description, setDescription] = useState("");

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

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

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
setDescription(editRoleDetails?.description)
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
            <td className="px-4 py-1">{label}</td>
            {checkboxValues[rowName]?.map((checked, index) => (
                <td className='text-center' key={index}>
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
                description:description,
                isActive:true
            };
        } else {
            payload = {
                hostelId: state.login.selectedHostel_Id,
                roleName: roleName.trim(),
                permissionList: formattedPermissionList,
                 description:description
            };
        }



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
            className="modal show  block fixed inset-0 z-[1050] overflow-hidden">
            <Modal
                show={showRole}
                onHide={handleClose}
                centered
                backdrop="static"
                dialogClassName="custom-modal-no-scroll"
            >
                <Modal.Dialog className="w-full max-w-[850px] m-0 p-0">
                    <Modal.Header className="border border-[#E7E7E7]">
                        <Modal.Title className="!text-xl !text-gray-900 !font-gilroy !font-semibold mb-0">{editRoleDetails ? 'Edit Role' : 'Create Role'}</Modal.Title>

                        <CloseCircle size="24" color="#000" onClick={handleClose} className='cursor-pointer' />

                    </Modal.Header>

                    <Modal.Body className="max-h-60 md:max-h-80 sm:max-h-72 show-scroll overflow-y-scroll pt-0 mt-1 mr-3">

                        <div className="w-full">
                            <div className="mb-2">
                                <label className="block text-[#222222] font-gilroy font-medium text-[14px] mb-1">
                                    Role Name{" "}
                                    <span className="text-red-500 text-[20px]">*</span>
                                </label>
                                <input
                                    id="form-controls"
                                    type="text"
                                    placeholder="Enter Role"
                                    value={roleName}
                                    onChange={(e) => handleRoleName(e)}
                                    className="w-full h-[45px] px-3 text-[14px] text-[#4B4B4B] font-gilroy font-medium border border-[#D9D9D9] rounded-lg shadow-none focus:outline-none"
                                />
                                {errorForm && <ErrorMessage message={errorForm} type="error" />}

                                {roleError && <ErrorMessage message={roleError} type="error" />}
                                {editRoleError && <ErrorMessage message={editRoleError} type="error" />}

                            </div>


                        </div>

                        <div className="w-full">
                            <div className="mb-2">
                                <label className="block text-[#222222] font-gilroy font-medium text-[14px] mb-1">
                                    Role Description{" "}

                                </label>
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Enter description"
                                    className="w-full border rounded px-3 py-2 text-sm font-gilroy font-medium border border-[#D9D9D9] rounded-lg shadow-none focus:outline-none"
                                />


                            </div>


                        </div>

                        <div className="border border-gray-300 rounded-2xl max-h-[272px] overflow-y-auto">
                            <table className="min-w-full border-collapse mb-0">
                                <thead className="bg-[#E7F1FF] sticky top-0 z-10">
                                    <tr>
                                        <th className="text-[#4B4B4B] font-gilroy font-medium text-sm pl-4 py-2 rounded-tl-2xl">
                                            Permission
                                        </th>
                                        <th className="text-[#4B4B4B] font-gilroy font-medium text-sm py-2">Add</th>
                                        <th className="text-[#4B4B4B] font-gilroy font-medium text-sm py-2">Read</th>
                                        <th className="text-[#4B4B4B] font-gilroy font-medium text-sm py-2">Edit</th>
                                        <th className="text-[#4B4B4B] font-gilroy font-medium text-sm py-2 rounded-tr-2xl">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-[#4B4B4B] font-gilroy font-semibold text-base">


                                    {modules.map(module => {
                                        const formattedName = module.moduleName.replace(/\s+/g, '');
                                        return renderRow(formattedName, module.moduleName);
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>


                    {formLoading && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                            <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    {errorIsChanged && (
                        <div className="flex justify-center" style={{ textAlign: "center" }}>
                            <ErrorMessage message={errorIsChanged} type="error" />
                        </div>
                    )}



                    {errorPermission && (
                        <div className="flex justify-start ms-3" >
                            <ErrorMessage message={errorPermission} type="error" />
                        </div>
                    )}

                    <Modal.Footer className="border-0">
                        <Button
                            onClick={handleSubmit}
                            className="w-full !cursor-pointer !bg-[#1E45E1] !font-semibold !py-3 !rounded-lg !text-[16px] !font-gilroy"
                        >
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