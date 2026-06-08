import React, { useState, useRef } from "react";
import {
  MessageText,
  Send2,
  TextBold,
  TextItalic,
  TextUnderline,
} from "iconsax-react";

function VendorComments() {
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

    const newComment = {
      id: Date.now(),
      comment,
      createdAt: new Date().toLocaleString("en-IN"),
      createdBy: "Priya",
    };

    setComments((prev) => [newComment, ...prev]);
    setComment("");
  };

  return (
    <div className="my-2">
      <div className="w-full bg-white">
        <label className="block mb-2 text-[14px] font-medium text-[#222222]">
          Additional Comments
          <span className="text-red-500 ml-1">*</span>
        </label>

        <div className="border border-[#D9D9D9] rounded-lg overflow-hidden">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Comment here"
            rows={4}
            className="w-full resize-none p-3 text-sm focus:outline-none"
          />

          <div className="flex justify-end items-center px-2 py-2">
            <div className="w-fit flex justify-end items-center gap-2  px-3 py-2   bg-[#F2F5FF] rounded-md ">
              <button onClick={() => applyFormat("bold")}>
                <TextBold size={14} color="#6B7280" />
              </button>

              <button onClick={() => applyFormat("italic")}>
                <TextItalic size={14} color="#6B7280" />
              </button>

              <button onClick={() => applyFormat("underline")}>
                <TextUnderline size={14} color="#6B7280" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddComment}
            className="flex items-center gap-2 bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Send2 size={16} color="#fff" />
            Add
          </button>
        </div>

        <div className="mt-8">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase mb-4">
            All Comments
          </p>

          {comments.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 pb-6 mb-6 border-b border-[#F1F1F1] last:border-b-0"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                  <MessageText size={18} color="#6B7280" variant="Linear" />
                </div>
              </div>

              <div className="flex-1">
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
