import React, { useState, useEffect, useRef } from "react";

import {
  Eye,
  TickCircle,
  More,
  Archive,
  Trash,
  TextItalic,
  TextUnderline,
  TextalignLeft,
  TextalignCenter,
  TextalignRight,
  Link1,
  Image as ImageIcon,
  TextBold,
} from "iconsax-react";
import Select from "react-select";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Preview from "./Preview";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "35px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 600,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function AddTemplate() {
  const popupRef = useRef(null);
  const imageInputRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const [signature, setSignature] = useState({
    tenant: true,
    proprietor: true,
    witness: false,
  });

  const [content, setContent] = useState("");

  const [showMore, setShowMore] = useState(false);

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const headingOptions = [
    { value: "0", label: "Normal" },
    { value: "1", label: "Heading 1" },
    { value: "2", label: "Heading 2" },
    { value: "3", label: "Heading 3" },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: content,

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "min-h-[600px] p-6 outline-none text-[13px] leading-6 focus:outline-none",
      },
    },
  });

  const handleSave = (type) => {
    console.log({ signature, content, type });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white px-2 py-2 font-gilroy">
      <div className="sticky top-0 z-50 bg-white ">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <label className="text-[18px] font-semibold text-[#101828]">
              Add Agreement & Policy Template
            </label>
            <div className="flex items-center gap-1 mt-1">
              <label className="text-[12px] text-gray-400">Settings</label>
              <label className="text-[12px] text-gray-400">{" > "}</label>
              <label className="text-[12px] text-gray-600">
                Agreement & Policy Templates
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border bg-white text-[12px] font-medium"
            >
              <Eye size={16} /> Preview
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border bg-white text-[12px] font-medium">
              <Archive size={16} /> Save Draft
            </button>
            <button
              onClick={() => handleSave("Activate")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f8a4a] text-white text-[12px] font-medium"
            >
              <TickCircle size={16} color="#FFF" variant="Bold" /> Activate
              Template
            </button>
            <button
              ref={popupRef}
              onClick={() => setShowMore(!showMore)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white"
            >
              <More size={16} className="rotate-90" />
            </button>
            {showMore && (
              <div className="absolute top-10 right-0 w-36 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] hover:bg-gray-50">
                  <Archive size={14} /> Disable
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] text-red-600 hover:bg-red-50">
                  <Trash size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 h-[calc(100vh-120px)]">
        <div className="col-span-12 lg:col-span-3  border-t border-gray-200">
          <div className="h-full overflow-y-auto p-3">
            <div className=" bg-white rounded-xl border p-2">
              <label className="text-[13px] font-semibold tracking-wider text-[#1E293B] ">
                Template Information
              </label>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-[#1E293B]">
                    Template Title
                  </label>
                  <input
                    value={title}
                    placeholder="Enter Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-[12px] outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-[#1E293B]">
                    Template Code
                  </label>
                  <input
                    value={code}
                    placeholder="Enter Code"
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-[#f6f6ff] text-[12px] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-[#1E293B]">
                    Meta description
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Enter your description for Template.."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={500}
                      rows={4}
                      className="w-full px-3 py-2 pb-6 rounded-lg border text-[12px] outline-none resize-none focus:border-indigo-500"
                    />

                    <span className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                      {description.length}/500
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-4 ">
              <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Signature Configuration
              </label>
              <div className="mt-3 flex flex-col gap-3">
                {[
                  { key: "tenant", label: "Tenant Signature Required" },
                  { key: "proprietor", label: "Proprietor Signature Required" },
                  { key: "witness", label: "Witness Signature Required" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={signature[item.key]}
                      onChange={() =>
                        setSignature({
                          ...signature,
                          [item.key]: !signature[item.key],
                        })
                      }
                      className="w-4 h-4 rounded accent-[#1E45E1] "
                    />
                    <label className="text-[12px] text-[#364153] cursor-pointer">
                      {item.label}
                    </label>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9 bg-gray-100 min-h-0 border-t border-gray-200">
          <div className="h-full overflow-y-auto p-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col min-h-full">
              <div className="flex items-center gap-2 px-4 py-3">
                <div className="bg-[#FF6467] h-2 w-2 rounded-full"></div>
                <div className="bg-[#FDC700] h-2 w-2 rounded-full"></div>
                <div className="bg-[#05DF72] h-2 w-2 rounded-full"></div>
              </div>

              <div className="flex items-center gap-1 px-4 py-1 border-b border-gray-100 flex-wrap bg-gray-200">
                <div className="flex items-center gap-1 pr-2 border-r border-gray-200 ">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      editor?.isActive("bold")
                        ? "bg-[#EEF2FF] text-[#1E45E1]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <TextBold size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      editor?.isActive("italic")
                        ? "bg-[#EEF2FF] text-[#1E45E1]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <TextItalic size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleUnderline().run()
                    }
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      editor?.isActive("underline")
                        ? "bg-[#EEF2FF] text-[#1E45E1]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <TextUnderline size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      editor?.isActive("strike")
                        ? "bg-[#EEF2FF] text-[#1E45E1]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-semibold line-through">S</span>
                  </button>
                </div>

                <Select
                  options={headingOptions}
                  defaultValue={headingOptions[0]}
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    const level = Number(selectedOption?.value);

                    if (level === 0) {
                      editor?.chain().focus().setParagraph().run();
                    } else {
                      editor?.chain().focus().toggleHeading({ level }).run();
                    }
                  }}
                  className="w-[130px] text-[12px]"
                  classNamePrefix="heading-select"
                  styles={CustomStyles}
                />

                <div className="flex items-center gap-1 px-2 border-x border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleOrderedList().run()
                    }
                    className={`px-2 h-8 rounded text-[13px] ${
                      editor?.isActive("orderedList")
                        ? "bg-[#EEF2FF] text-[#1E45E1]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    1.≡
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                    className={`px-2 h-8 rounded text-[16px] ${
                      editor?.isActive("bulletList")
                        ? "bg-[#EEF2FF] text-[#1E45E1]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    •≡
                  </button>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("left").run()
                    }
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                  >
                    <TextalignLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("center").run()
                    }
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                  >
                    <TextalignCenter size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("right").run()
                    }
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                  >
                    <TextalignRight size={17} />
                  </button>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLinkInput((prev) => !prev)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                    title="Add Link"
                  >
                    <Link1 size={17} />
                  </button>

                  {showLinkInput && (
                    <div className="absolute top-10 right-0 z-50 flex items-center gap-2 p-2 bg-white border rounded-lg shadow-lg">
                      <input
                        autoFocus
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-48 px-2 py-1.5 text-[12px] border rounded outline-none focus:border-[#1E45E1]"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (linkUrl.trim()) {
                            editor
                              ?.chain()
                              .focus()
                              .setLink({ href: linkUrl.trim() })
                              .run();

                            setLinkUrl("");
                            setShowLinkInput(false);
                          }
                        }}
                        className="px-2 py-1.5 text-[12px] bg-[#1E45E1] text-white rounded"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                  title="Upload Image"
                >
                  <ImageIcon size={17} />
                </button>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      const imageUrl = URL.createObjectURL(file);

                      editor?.chain().focus().setImage({ src: imageUrl }).run();
                    }

                    e.target.value = "";
                  }}
                />
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto">
                <EditorContent
                  editor={editor}
                  className="
        [&_.ProseMirror]:min-h-[600px]
        [&_.ProseMirror]:p-6
        [&_.ProseMirror]:outline-none
        [&_.ProseMirror]:text-[13px]
        [&_.ProseMirror]:leading-6

        [&_.ProseMirror_p]:mb-3

        [&_.ProseMirror_h1]:text-[28px]
        [&_.ProseMirror_h1]:font-bold
        [&_.ProseMirror_h1]:mb-4

        [&_.ProseMirror_h2]:text-[22px]
        [&_.ProseMirror_h2]:font-bold
        [&_.ProseMirror_h2]:mb-3

        [&_.ProseMirror_h3]:text-[18px]
        [&_.ProseMirror_h3]:font-semibold
        [&_.ProseMirror_h3]:mb-3

        [&_.ProseMirror_ul]:list-disc
        [&_.ProseMirror_ul]:pl-6
        [&_.ProseMirror_ol]:list-decimal
        [&_.ProseMirror_ol]:pl-6

        [&_.ProseMirror_img]:max-w-full
        [&_.ProseMirror_img]:rounded-md
      "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPreview && (
        <Preview
          show={showPreview}
          handleClose={handleClosePreview}
          content={content}
        />
      )}
    </div>
  );
}

export default AddTemplate;
