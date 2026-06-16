/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddCircle, Edit2, Message, Trash } from "iconsax-react";
import ErrorMessage from "../../../Components/ErrorMessage";
import { useHasPermission } from "../../../Utils/Permission";
import { toast } from "react-toastify";
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import PermissionDeniedMessage from "../../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../../Utils/NoDataMessage";
import AddCategory from "./AddCategory";

function VendorCategory() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const {
    canWriteModule: canWriteVendor,
    canReadModule: canReadVendor,
    canDeleteModule: canDeleteVendor,
  } = useHasPermission("Vendor");
  const handleShowDots = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!canReadVendor) {
      setLoading(false);
    }
  }, [canReadVendor]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    setLoading(true);
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "VENDOR_CATEGORY_LIST_SAGA" });
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
    if (state.Settings?.createVendorCategorySuccessStatus === 201) {
      setOpen(false);
      dispatch({ type: "VENDOR_CATEGORY_LIST_SAGA" });
      dispatch({ type: "REMOVE_VENDOR_CATEGORY_REDUCER" });
    }
  }, [state.Settings?.createVendorCategorySuccessStatus]);

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
  };

  return (
    <div>
      {open && <AddCategory show={open} onClose={() => setOpen(false)} />}
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
          {categoryList && categoryList.length > 0 ? (
            <div className="container show-scrolls relative max-h-[475px] overflow-y-auto">
              <div className="flex flex-wrap -mx-2">
                {categoryList.map((u, i) => (
                  <div
                    key={i}
                    className="w-full sm:w-1/2 md:w-full lg:w-1/3 px-2 mb-3"
                  >
                    <div
                      className="flex items-center justify-between p-3 border rounded w-full"
                      style={{ height: "64px" }}
                    >
                      <div className="flex items-center">
                        <Message />
                        <span className="ml-5 text-[16px] font-semibold font-gilroy text-[#222222]">
                          {u.categoryName}
                        </span>
                      </div>

                      <button
                        onClick={() => handleShowDots(i)}
                        className="flex items-center justify-center h-[35px] w-[35px] rounded-full border border-[#EFEFEF] relative cursor-pointer"
                      >
                        <PiDotsThreeOutlineVerticalFill className="h-4.5 w-4.5" />

                        {activeIndex === i && (
                          <div
                            className="absolute font-gilroy right-10 mt-2 w-fit  bg-white
                           border border-gray-200 rounded-md shadow-lg z-50"
                          >
                            {/* <button
                              onClick={() => {
                                handleEdit(u);
                                closeMenu();
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                            >
                              <Edit2 /> Edit
                            </button> */}

                            <button
                              onClick={() => {
                                if (!canDeleteVendor) return;
                                handleDelete(u);
                                closeMenu();
                              }}
                              disabled={!canDeleteVendor}
                              className={`w-full text-left rounded-md px-8 py-2 text-base flex items-center gap-1 
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
            !loading &&
            categoryList.length === 0 &&
            canReadVendor && <NoDataMessage label="Vendor Category" />
          )}
        </div>
      )}
    </div>
  );
}

export default VendorCategory;
