/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import {
  MessageText,
  Send2,
  TextBold,
  TextItalic,
  TextUnderline,
} from "iconsax-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
const quillStyle = {
  height: "50px",
  borderRadius: "22px",
  marginBottom: "42px",
};

function VendorComments({ selectedVendorId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [formLoading, setFormLoading] = useState(false);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    {
      id: 1,
      comment: "Need a Query Support for Client",
      createdAt: "25 Dec 2025, 1:00 PM",
      createdBy: "Priya",
    },
    {
      id: 2,
      comment: "Need a Query Support for Client",
      createdAt: "25 Dec 2025, 1:00 PM",
      createdBy: "Priya",
    },
  ]);

  const textareaRef = useRef(null);

  const applyFormat = (type) => {
    const textarea = textareaRef.current;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = comment.substring(start, end);

    let formattedText = selectedText;

    switch (type) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;

      case "italic":
        formattedText = `*${selectedText}*`;
        break;

      case "underline":
        formattedText = `__${selectedText}__`;
        break;

      default:
        break;
    }

    const newValue =
      comment.substring(0, start) + formattedText + comment.substring(end);

    setComment(newValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    dispatch({
      type: "ADD_VENDOR_COMMENTS_SAGA",
      payload: { comments: comment },
    });
    setFormLoading(true);
  };

  useEffect(() => {
    if (selectedVendorId) {
      dispatch({
        type: "VENDOR_COMMENTS_SAGA",
        payload: { vendorId: selectedVendorId },
      });
    }
  }, [selectedVendorId]);

  useEffect(() => {
    if (state.ComplianceList?.addCommentsVendorstatusCode) {
      setComment("");
      setFormLoading(false);
      dispatch({
        type: "VENDOR_COMMENTS_SAGA",
        payload: { vendorId: selectedVendorId },
      });
      dispatch({ type: "REMOVE_ADD_VENDOR_COMMENTS_REDUCER" });
    }
  }, [state.ComplianceList?.addCommentsVendorstatusCode]);

  const vendorComments = state.ComplianceList?.getVendorCommentsList;

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
            onChange={setComment}
            placeholder="Comment here"
            style={quillStyle}
          />
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddComment}
            disabled={formLoading}
            className={`flex items-center justify-center gap-2 bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm font-medium ${
              formLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {formLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </div>
            ) : (
              <>
                <Send2 size={16} color="#fff" />
                Add
              </>
            )}
          </button>
        </div>

        <div className="mt-2">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase mb-4">
            All Comments
          </p>

          {comments.map((item, index) => (
            <div key={item.id} className="flex gap-3 relative">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#EEF2FF] flex items-center justify-center z-10">
                  <MessageText size={18} color="#6B7280" variant="Linear" />
                </div>

                {index !== comments.length - 1 && (
                  <div className="w-[2px] flex-1 min-h-[60px] bg-[#E5E7EB]" />
                )}
              </div>

              <div className="flex-1 pb-8">
                <h4 className="text-[14px] font-medium text-[#222222]">
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
  );
}

export default VendorComments;
