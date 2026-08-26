import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Eye, TickCircle, More, Archive, Trash } from "iconsax-react";

function AddTemplate() {
  const [form, setForm] = useState({
    title: "Standard Long Stay Agreement",
    code: "TEMP 001",
    description: "",
  });

  const [signature, setSignature] = useState({
    tenant: true,
    proprietor: true,
    witness: false,
  });

  const [content, setContent] = useState("");

  const [showMore, setShowMore] = useState(false);

  const modules = {
    toolbar: {
      container: "#custom-toolbar",
    },
  };

  const handleSave = (type) => {
    console.log({ form, signature, content, type });
  };

  return (
    <div className="min-h-screen bg-white px-2 py-2 font-gilroy">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <label className="text-[18px] font-bold text-gray-900">
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
            onClick={() => handleSave("Preview")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border bg-white text-[12px] font-medium"
          >
            <Eye size={16} /> Preview
          </button>
          <button
            onClick={() => handleSave("Draft")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border bg-white text-[12px] font-medium"
          >
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
            onClick={() => setShowMore(!showMore)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white"
          >
            <More size={16} />
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

      <div className="grid grid-cols-12 gap-4">
        {/* Left */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-xl border p-4 h-fit">
          <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            Template Information
          </label>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-gray-600">
                Template Title
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-[12px] outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-gray-600">
                Template Code
              </label>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-[#f6f6ff] text-[12px] outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-gray-600">
                Meta description
              </label>
              <textarea
                placeholder="Enter your description for Template.."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 rounded-lg border text-[12px] outline-none resize-none focus:border-indigo-500"
              />
              <label className="text-[10px] text-gray-400">
                {form.description.length}/500
              </label>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
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
                    className="w-4 h-4 rounded accent-indigo-600"
                  />
                  <label className="text-[12px] text-gray-700 cursor-pointer">
                    {item.label}
                  </label>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Quill Editor */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl border overflow-hidden flex flex-col">
          {/* Custom Toolbar */}
          <div
            id="custom-toolbar"
            className="flex items-center gap-2 px-4 py-2 border-b!border-gray-100 flex-wrap"
          >
            <span className="ql-formats flex gap-2">
              <button className="ql-bold" />
              <button className="ql-italic" />
              <button className="ql-underline" />
              <button className="ql-strike" />
            </span>
            <span className="ql-formats">
              <select className="ql-size">
                <option value="small">12</option>
                <option selected>16</option>
                <option value="large">18</option>
                <option value="huge">24</option>
              </select>
            </span>
            <span className="ql-formats">
              <button className="ql-list" value="ordered" />
              <button className="ql-list" value="bullet" />
            </span>
            <span className="ql-formats">
              <select className="ql-header">
                <option value="1">H1</option>
                <option value="2">H2</option>
                <option value="3">H3</option>
                <option value="4">H4</option>
                <option value="5">H5</option>
                <option value="6">H6</option>
                <option selected>Normal</option>
              </select>
            </span>
            <span className="ql-formats flex gap-2">
              <button className="ql-align" value="" />
              <button className="ql-align" value="center" />
              <button className="ql-align" value="right" />
              <button className="ql-link" />
              <button className="ql-image" />
            </span>
          </div>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-[600px] [&_.ql-editor]:text-[13px] [&_.ql-editor]:leading-6 [&_.ql-container]:border-none"
          />
        </div>
      </div>

      <style>{`
       .ql-toolbar.ql-snow { border: none!important; }
       .ql-container.ql-snow { border: none!important; }
        #custom-toolbar { border-bottom: 1px solid #f3f4f6!important; }
      `}</style>
    </div>
  );
}

export default AddTemplate;
