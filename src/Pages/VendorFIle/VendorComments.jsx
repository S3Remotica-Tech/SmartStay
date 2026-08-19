/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  MessageText,
  Send2,
  // TextBold,
  // TextItalic,
  // TextUnderline,
} from "iconsax-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import ApiPagination from "../../Components/ApiPagination";
import { Edit2, Trash } from "iconsax-react";
import DeleteComments from "./DeleteComments";
import { useHasPermission } from "../../Utils/Permission";
// import PropTypes from "prop-types";

const quillStyle = {
  height: "100px",
  borderRadius: "22px",
  marginBottom: "42px",
};

function VendorComments() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const VendorOverView = state.ComplianceList?.vendorOverview;
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const {
    canWriteModule: canWriteVendor,
    // canReadModule: canReadVendor,
    canDeleteModule: canDeleteVendor,
    canUpdateModule: canUpdateVendor,
  } = useHasPermission("Vendor");

  const [formLoading, setFormLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  // const textareaRef = useRef(null);

  // const applyFormat = (type) => {
  //   const textarea = textareaRef.current;

  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;

  //   const selectedText = comment.substring(start, end);

  //   let formattedText = selectedText;

  //   switch (type) {
  //     case "bold":
  //       formattedText = `**${selectedText}**`;
  //       break;

  //     case "italic":
  //       formattedText = `*${selectedText}*`;
  //       break;

  //     case "underline":
  //       formattedText = `__${selectedText}__`;
  //       break;

  //     default:
  //       break;
  //   }

  //   const newValue =
  //     comment.substring(0, start) + formattedText + comment.substring(end);

  //   setComment(newValue);
  // };

  // const handleCommentChange = (e) => {
  //   setComment(e.target.value);
  // };

  const handleAddComment = () => {
    const plainText = comment.replace(/<[^>]+>/g, "").trim();

    if (!plainText) {
      setCommentError("Please enter comments");
      return;
    }

    setCommentError("");
    if (edit && selectedCommentId) {
      dispatch({
        type: "UPDATE_VENDOR_COMMENTS_SAGA",
        payload: {
          comment: plainText,
          commentId: selectedCommentId,
        },
      });
      setFormLoading(true);
    } else {
      dispatch({
        type: "ADD_VENDOR_COMMENTS_SAGA",
        payload: {
          comment: plainText,
          vendorId: VendorOverView?.id,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (VendorOverView?.id) {
      dispatch({
        type: "VENDOR_COMMENTS_SAGA",
        payload: { vendorId: VendorOverView?.id, page: page, size: size },
      });
    }
  }, [VendorOverView?.id, page, size]);

  useEffect(() => {
    if (state.ComplianceList?.addCommentsVendorstatusCode === 201) {
      setComment("");
      setFormLoading(false);
      dispatch({
        type: "VENDOR_COMMENTS_SAGA",
        payload: { vendorId: VendorOverView?.id, page: page, size: size },
      });

      dispatch({ type: "REMOVE_ADD_VENDOR_COMMENTS_REDUCER" });
    }
  }, [state.ComplianceList?.addCommentsVendorstatusCode]);

  useEffect(() => {
    if (state.ComplianceList?.updateCommentsVendorstatusCode === 200) {
      setComment("");
      setFormLoading(false);
      dispatch({
        type: "VENDOR_COMMENTS_SAGA",
        payload: { vendorId: VendorOverView?.id, page: page, size: size },
      });
      setEdit(false);

      dispatch({ type: "REMOVE_UPDATE_VENDOR_COMMENTS_REDUCER" });
    }
  }, [state.ComplianceList?.updateCommentsVendorstatusCode]);

  useEffect(() => {
    if (state.ComplianceList?.deleteCommentsVendorstatusCode === 200) {
      setShowDelete(false);
      dispatch({
        type: "VENDOR_COMMENTS_SAGA",
        payload: { vendorId: VendorOverView?.id, page: page, size: size },
      });
      dispatch({ type: "REMOVE_DELETE_VENDOR_COMMENTS_REDUCER" });
    }
  }, [state.ComplianceList?.deleteCommentsVendorstatusCode]);

  const vendorComments = state.ComplianceList?.getVendorCommentsList;

  // console.log("vendorComments", vendorComments);
  const currentPage = vendorComments?.currentPage ?? 1;

  const totalPages = vendorComments?.totalPages ?? 1;

  const totalRecords = vendorComments?.totalComments ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
    // console.log("clicked ddddddd", page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  const handleEdit = (item) => {
    // console.log("Edit", item);
    setComment(item.comment);
    setSelectedCommentId(item.id);
    setEdit(true);
  };

  const handleDelete = (id) => {
    setSelectedCommentId(id);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setSelectedCommentId(null);
  };

  return (
    <div className="px-4">
      <div className="w-full bg-white">
        <label className="block mb-2 text-[14px] font-medium text-[#222222]">
          Additional Comments
          <span className="text-red-500 ml-1">*</span>
        </label>

        <div className=" rounded-lg mb-[50px] ">
          <ReactQuill
            theme="snow"
            value={comment}
            onChange={(value) => {
              setComment(value);
              const plainText = value.replace(/<[^>]+>/g, "").trim();
              if (plainText) {
                setCommentError("");
              }
            }}
            placeholder="Comment here"
            style={quillStyle}
          />
        </div>

        {commentError && <ErrorMessage message={commentError} type="error" />}

        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddComment}
            disabled={formLoading || !canWriteVendor}
            className={`disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm font-medium ${
              formLoading || !canWriteVendor
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {formLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {edit ? "Saving....." : "Adding..."}
              </div>
            ) : (
              <>
                <Send2 size={16} color="#fff" />
                {edit ? "Save" : "Add"}
              </>
            )}
          </button>
        </div>

        <div className="mt-2">
          <div className="flex justify-between items-center mb-4 ">
            <p className="text-[11px] font-semibold text-[#6B7280] uppercase">
              All Comments
            </p>

            {vendorComments?.comments?.length > 0 && (
              <ApiPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}
                isTenantPagination={true}
                size={size}
              />
            )}
          </div>
          <div className="max-h-[350px] overflow-y-auto pr-2 show-scrolls w-full">
            {vendorComments?.comments?.map((item, index) => (
              <div
                key={item.id}
                className="group flex gap-3 relative hover:bg-[#F9FAFB] rounded-lg p-2 transition"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#EEF2FF] flex items-center justify-center z-10">
                    <MessageText size={18} color="#6B7280" />
                  </div>

                  {index !== vendorComments.comments.length - 1 && (
                    <div className="w-[2px] flex-1 min-h-[60px] bg-[#E5E7EB]" />
                  )}
                </div>

                <div className="flex-1 min-w-0 pb-8 relative">
                  <div className="absolute right-0 top-0 hidden group-hover:flex items-center gap-2">
                    <button
                      onClick={() => canUpdateVendor && handleEdit(item)}
                      disabled={!canUpdateVendor}
                      className={`p-1 rounded ${
                        canUpdateVendor
                          ? "hover:bg-blue-100 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Edit2
                        size={18}
                        color={canUpdateVendor ? "#2563EB" : "#9CA3AF"}
                      />
                    </button>

                    <button
                      onClick={() => canDeleteVendor && handleDelete(item.id)}
                      disabled={!canDeleteVendor}
                      className={`p-1 rounded ${
                        canDeleteVendor
                          ? "hover:bg-red-100 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Trash
                        size={18}
                        color={canDeleteVendor ? "#EF4444" : "#9CA3AF"}
                      />
                    </button>
                  </div>

                  <h4 className="text-[14px] font-medium text-[#222222] pr-16 break-words whitespace-pre-wrap">
                    {item.comment}
                  </h4>

                  <p className="text-[12px] text-[#6B7280] mt-1">
                    {item.createdAt}
                  </p>

                  <p className="text-[12px] text-[#9CA3AF] mt-2">
                    Added by {item.createdBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeleteComments
        open={showDelete}
        onClose={handleCloseDelete}
        selectedCommentId={selectedCommentId}
      />
    </div>
  );
}
// VendorComments.propTypes = {
//   selectedVendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };
export default VendorComments;
