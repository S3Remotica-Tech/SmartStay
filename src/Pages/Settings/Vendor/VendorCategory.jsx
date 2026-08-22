/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {

  Edit,
  
  Messages3,
  Trash,
} from "iconsax-react";

import { useHasPermission } from "../../../Utils/Permission";
import { toast } from "react-toastify";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import PermissionDeniedMessage from "../../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../../Utils/NoDataMessage";
import AddCategory from "./AddCategory";
import DeleteVendorCategory from "./DeleteVendorCategory";

function VendorCategory() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updateDetails, setUpdateDetails] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [activeItem, setActiveItem] = useState(null);
  const buttonRefs = useRef([]);

  const {
    canWriteModule: canWriteVendor,
    canReadModule: canReadVendor,
    canDeleteModule: canDeleteVendor,
    canUpdateModule: canUpdateVendor,
  } = useHasPermission("Vendor");

  const handleShowDots = (index, item, e) => {
    e.stopPropagation();

    const rect = buttonRefs.current[index]?.getBoundingClientRect();

    setMenuPos({
      top: rect.bottom + 8,
      left: rect.right - 120,
    });

    setActiveIndex(index);
    setActiveItem(item);
  };

  const handleDelete = (deleteId) => {
    setDeleteId(deleteId);
    setShowDelete(true);
  };

  const handleUpdate = (e, update) => {
    e.stopPropagation();
    setOpen(true);
    setUpdateDetails(update);
    setActiveIndex(null);
    setActiveItem("");
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  useEffect(() => {
    if (!canReadVendor) {
      setLoading(false);
    }
  }, [canReadVendor]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "VENDOR_CATEGORY_LIST_SAGA",
        payload: state.login.selectedHostel_Id,
      });
      setLoading(true);
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.Settings?.vendorCategorySuccessCode === 200) {
      setLoading(false);
      setCategoryList(state.Settings?.vendorCategoryList);
      dispatch({ type: "REMOVE_VENDOR_CATEGORY_LIST_REDUCER" });
    }
  }, [state.Settings?.vendorCategorySuccessCode]);

  useEffect(() => {
    if (
      state.Settings?.createVendorCategorySuccessStatus === 201 ||
      state.Settings?.updateVendorCategorySuccessStatus === 200
    ) {
      setOpen(false);
      dispatch({
        type: "VENDOR_CATEGORY_LIST_SAGA",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({ type: "REMOVE_VENDOR_CATEGORY_REDUCER" });
      dispatch({ type: "REMOVE_UPDATE_VENDOR_CATEGORY_REDUCER" });
    }
  }, [
    state.Settings?.createVendorCategorySuccessStatus,
    state.Settings?.updateVendorCategorySuccessStatus,
  ]);

  useEffect(() => {
    if (state.Settings?.deleteVendorCategorySuccessStatus === 200) {
      setShowDelete(false);
      dispatch({
        type: "VENDOR_CATEGORY_LIST_SAGA",
        payload: state.login.selectedHostel_Id,
      });
      dispatch({ type: "REMOVE_DELETE_VENDOR_CATEGORY_REDUCER" });
    }
  }, [state.Settings?.deleteVendorCategorySuccessStatus]);

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding Expense information", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setOpen(true);
    setUpdateDetails("");
  };

  return (
    <div>
      {open && (
        <AddCategory
          show={open}
          onClose={() => setOpen(false)}
          updateDetails={updateDetails}
        />
      )}
      {showDelete && (
        <DeleteVendorCategory
          show={showDelete}
          handleClose={handleCloseDelete}
          deleteId={deleteId}
        />
      )}

      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">
        <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
          <label className="font-gilroy text-[18px] text-[#222] font-semibold">
            Vendor Category
          </label>
        </div>

        <div className="w-full flex justify-center md:justify-end">
          <button
            onClick={handleShow}
            disabled={!canWriteVendor}
            className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition
        ${
          canWriteVendor
            ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
          >
            + Vendor Category
          </button>
        </div>
      </div>

      {!canReadVendor ? (
        <>
          <PermissionDeniedMessage />
        </>
      ) : (
        <div className=" mt-2">
          {categoryList && categoryList?.length > 0 ? (
            <div className="container show-scrolls relative h-[500px] overflow-y-auto">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[9999]">
                  <div className="w-[40px] h-[40px] rounded-full border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent animate-spin" />
                </div>
              )}
              <div className="flex flex-wrap -mx-2">
                {categoryList.map((u, i) => (
                  <div
                    key={i}
                    className="w-full sm:w-1/2 md:w-full lg:w-1/3 px-2 mb-3"
                  >
                    <div
                      className="flex items-center justify-between p-3 border rounded w-full shrink-0"
                      style={{ height: "64px" }}
                    >
                      <div className="flex items-center min-w-0 flex-1">
                        <Messages3 className="shrink-0" />

                        <div className="relative group ml-5 flex-1 min-w-0">
                          <span className="block truncate text-[16px] font-semibold font-gilroy text-[#222222]">
                            {u.categoryName}
                          </span>

                          <div
                            className="absolute left-0 top-full mt-2 hidden group-hover:block
                 whitespace-nowrap rounded-md bg-blue-700  px-3 py-2 font-gilroy 
                 text-sm text-white shadow-lg z-50"
                          >
                            {u.categoryName}
                          </div>
                        </div>
                      </div>

                      <button
                        ref={(el) => (buttonRefs.current[i] = el)}
                        onClick={(e) => handleShowDots(i, u.id, e)}
                        className="flex items-center justify-center h-[35px] w-[35px] rounded-full
                         border border-[#EFEFEF] relative cursor-pointer font-gilroy"
                      >
                        <PiDotsThreeOutlineVerticalFill className="h-4.5 w-4.5" />

                        {activeItem && activeIndex === i && (
                          <div
                            ref={menuRef}
                            className="fixed z-50 bg-white border rounded-md "
                            style={{
                              top: menuPos.top,
                              left: menuPos.left,
                            }}
                          >
                            <button
                              onClick={(e) => {
                                if (!canUpdateVendor) return;
                                handleUpdate(e, u);
                              }}
                              disabled={!canUpdateVendor}
                              className={`w-full font-gilroy text-left  px-4 py-2 text-base flex items-center gap-1 
    ${
      canUpdateVendor
        ? "text-[#1E45E1] hover:bg-gray-100 cursor-pointer"
        : "text-gray-400 cursor-not-allowed opacity-50"
    }`}
                            >
                              <Edit
                                size="16"
                                color={canUpdateVendor ? "#1E45E1" : "#9CA3AF"}
                              />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (!canDeleteVendor) return;
                                handleDelete(u?.id);
                              }}
                              disabled={!canDeleteVendor}
                              className={`w-full font-gilroy text-left  px-4 py-2 text-base flex items-center gap-1 
    ${
      canDeleteVendor
        ? "text-red-600 hover:bg-gray-100 cursor-pointer"
        : "text-gray-400 cursor-not-allowed opacity-50"
    }`}
                            >
                              <Trash
                                size="16"
                                color={canDeleteVendor ? "#FF0000" : "#9CA3AF"}
                              />
                              Delete
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            categoryList.length === 0 &&
            canReadVendor && <NoDataMessage label="Vendor Category" />
          )}
        </div>
      )}
    </div>
  );
}

export default VendorCategory;
