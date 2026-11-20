/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";


function DeleteProfile({
    show,
    onCancel,
}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const state = useSelector((state) => state);
    const CustomerOverView = state?.UsersList?.customerdetails;

    useEffect(() => {
        if (state?.UsersList?.deleteProfilePicSuccess === 200) {
            setLoading(false);

            onCancel();
        }
    }, [state?.UsersList?.deleteProfilePicSuccess]);


    useEffect(() => {
        if (state?.UsersList?.tenantProfileDeleteError) {
            setLoading(false);
            dispatch({ type: "REMOVE_DELETE_TENANT_PROFILE_PICTURE_ERROR" });
        }
    }, [state?.UsersList?.tenantProfileDeleteError]);

    const handleConfirm = () => {
        setLoading(true);
        dispatch({ type: "REMOVE_DELETE_TENANT_PROFILE_PICTURE_ERROR" });
        dispatch({
            type: "DELETE_TENANT_PROFILE_PICTURE_SAGA",
            payload: {
                hostelId: state.login.selectedHostel_Id, customerId: CustomerOverView?.customerId
            }
        });
    };

    if (!show) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 z-[1100]"
                onClick={() => !loading && onCancel()}
            />
            <div
                role="dialog"
                aria-modal="true"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] max-w-[90vw] bg-white rounded-[16px] shadow-xl z-[1110] p-[24px] font-gilroy"
            >
                <div className="flex flex-col items-center text-center">

                    <h3 className="text-[18px] font-semibold text-[#222222] mb-[6px]">Delete Photo?</h3>
                    <p className="text-[14px] text-[#6B7280] mb-[20px]">Are you sure want to delete profile picture?</p>
                </div>

                <div className="flex gap-[12px]">
                    <button
                        onClick={onCancel}
                        className="w-full max-w-[160px] h-[52px] rounded-lg border border-[#1E45E1] bg-white text-[#1E45E1] text-[14px] font-semibold font-gilroy hover:bg-[#EEF2FF]"
                    >
                        Cancel
                    </button>


                    <button
                        disabled={loading}
                        onClick={handleConfirm}
                        className={`w-full max-w-[160px] h-[52px] rounded-lg bg-[#1E45E1] text-white text-[14px] font-semibold font-gilroy flex items-center justify-center gap-2 ${loading
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-[#1638BF]"
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

DeleteProfile.propTypes = {
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,


};

export default DeleteProfile;