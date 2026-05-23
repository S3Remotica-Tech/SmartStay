import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import editimg from "../../Assets/Images/New_images/edit.png";
import download from "../../Assets/Images/New_images/searchss.png";
import savevec from "../../Assets/Images/New_images/Vectorwhite.png";
import arrowleft from "../../Assets/Images/New_images/arrow-leftbluenew.png";
import jsPDF from "jspdf";
import { CloseCircle } from "iconsax-react";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import ComingSoon from "../../Utils/ComingSoon";
import { useHasPermission } from "../../Utils/Permission";
import ErrorMessage from "../../Components/ErrorMessage";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import Emptystate from "../../Assets/Images/Empty-State-svg.svg";

function SettingAgreement() {
  const [isEditable, setIsEditable] = useState(false);

  //  const canReadAgreement = useHasPermission("Agreement", "canRead")
  //   const canWriteAgreement = useHasPermission("Agreement", "canWrite");
  //   const canUpdateAgreement = useHasPermission("Agreement", "canUpdate");
  // const canDeleteAgreement = useHasPermission("Agreement", "canDelete");

  const {
    canWriteModule: canWriteAgreement,
    canReadModule: canReadAgreement,
    canUpdateModule: canUpdateAgreement,
    // canDeleteModule: canDeleteAgreement,
  } = useHasPermission("Agreement");

  const execCmd = (command, value = null) => {
    if (isEditable) {
      document.execCommand(command, false, value);
    }
  };
  const handleCloseEdit = () => {
    setIsEditable(false);
  };

  const applyFontSize = (size) => {
    const sizeMap = { 12: 1, 14: 2, 16: 3, 18: 4, 20: 5 };
    const fontSizeValue = sizeMap[size];
    if (fontSizeValue) {
      document.execCommand("fontSize", false, fontSizeValue);
      const editor = document.getElementById("editor");
      const fonts = editor.getElementsByTagName("font");
      for (let font of fonts) {
        if (font.size === `${fontSizeValue}`) {
          const span = document.createElement("span");
          span.style.fontSize = `${size}px`;
          span.innerHTML = font.innerHTML;
          font.parentNode.replaceChild(span, font);
        }
      }
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const content = document.getElementById("editor");
    const text = content.innerText;
    const lines = doc.splitTextToSize(text, 180);
    let y = 20;
    for (let line of lines) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += 7;
    }
    doc.save("PG_Agreement.pdf");
  };

  //   const filteredVariables = variables.filter(v =>
  //     v.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <div className="font-gilroy">
      <div className="sticky top-0 bg-white z-50">
        <div className="flex flex-wrap justify-between items-center py-3 px-4">
          <div className="mb-2 md:mb-0">
            <h5 className="mb-1 text-[16px] font-semibold">
              Agreement & Policy
            </h5>
            <div className="text-gray-500 flex items-center">
              <img src={arrowleft} alt="back" className="w-5 h-5 mr-2" />
              <span>Simple PG Stay Agreement</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={!canReadAgreement}
              onClick={handleDownloadPDF}
              className={`flex items-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition ${
                canReadAgreement
                  ? "border-gray-400 text-gray-700 hover:bg-gray-100"
                  : "cursor-not-allowed border-gray-300 text-gray-400"
              }`}
            >
              <img src={download} alt="download" className="w-4 h-4 mr-2" />
              Download Sample
            </button>

            {!isEditable && (
              <button
                disabled={!canUpdateAgreement}
                onClick={() => setIsEditable(true)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition ${
                  canUpdateAgreement
                    ? "border-gray-400 text-gray-700 hover:bg-gray-100"
                    : "cursor-not-allowed border-gray-300 text-gray-400"
                }`}
              >
                <img src={editimg} alt="Edit" className="w-4 h-4" />
                Edit
              </button>
            )}

            {isEditable && (
              <div className="flex items-center gap-2">
                <button
                  disabled={!canWriteAgreement}
                  // onClick={handleSave}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                    canWriteAgreement
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "cursor-not-allowed bg-blue-300 text-white"
                  }`}
                >
                  <img src={savevec} alt="Save" className="w-4 h-4" />
                  Save
                </button>
                <CloseCircle
                  size={24}
                  color="#000"
                  onClick={handleCloseEdit}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {!canReadAgreement ? (
        <>
          <PermissionDeniedMessage />
        </>
      ) : import.meta.env.MODE === "development" ? (
        <div className=" p-3" style={{ backgroundColor: "#F8FAFC" }}>
          <div className="row">
            <div className={`col-lg-${isEditable ? 9 : 12}`}>
              <div className="card border p-3">
                <h5 style={{ fontSize: 15, fontWeight: 600 }}>
                  PG Accommodation Agreement
                </h5>

                {isEditable && (
                  <div
                    className="d-flex flex-wrap align-items-center py-2 "
                    style={{
                      backgroundColor: "#f5f8ff",
                      border: "1px solid #e1e1e1",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {/* Basic Styles */}
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("bold")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-bold"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("italic")}
                      style={{ fontSize: 12, marginLeft: "-10px" }}
                    >
                      <i className="bi bi-type-italic"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("underline")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-underline"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("strikeThrough")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-strikethrough"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("superscript")}
                      style={{ fontSize: 12, marginLeft: "-10px" }}
                    >
                      X<sup>2</sup>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("subscript")}
                      style={{ fontSize: 12, marginLeft: "-10px" }}
                    >
                      X<sub>2</sub>
                    </button>

                    <select
                      className="form-select form-select-sm"
                      style={{
                        width: "65px",
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: 12,
                      }}
                      onChange={(e) => applyFontSize(e.target.value)}
                      defaultValue="16"
                    >
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="16">16</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                    </select>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("justifyLeft")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-left"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("justifyCenter")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-center"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("justifyRight")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-right"></i>
                    </button>

                    {/* <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H1")} style={{fontSize:12}}>H1</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H2")} style={{fontSize:12}}>H2</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H3")} style={{fontSize:12}}>H3</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H4")} style={{fontSize:12}}>H4</button> */}

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("insertUnorderedList")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-list-ul"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("insertOrderedList")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-list-ol"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("outdent")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-indent-left"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("indent")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-indent-right"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("formatBlock", "pre")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-code"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("createLink", prompt("Enter URL"))}
                    >
                      <i
                        className="bi bi-link-45deg"
                        style={{ fontSize: 10 }}
                      ></i>
                    </button>

                    {/* Clear */}
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("removeFormat")}
                    >
                      <i className="bi bi-x-lg" style={{ fontSize: 10 }}></i>
                    </button>
                  </div>
                )}
                {!isEditable && (
                  <div
                    className="d-flex flex-wrap align-items-center gap-1  py-2"
                    style={{ backgroundColor: "#f5f8ff", whiteSpace: "nowrap" }}
                  >
                    {/* Basic Styles */}
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("bold")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-bold"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("italic")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-italic"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("underline")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-underline"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("strikeThrough")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-type-strikethrough"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("superscript")}
                      style={{ fontSize: 12 }}
                    >
                      X<sup>2</sup>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("subscript")}
                      style={{ fontSize: 12 }}
                    >
                      X<sub>2</sub>
                    </button>

                    <select
                      className="form-select form-select-sm"
                      style={{
                        width: "65px",
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: 12,
                      }}
                      onChange={(e) => applyFontSize(e.target.value)}
                      defaultValue="16"
                    >
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="16">16</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                    </select>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("justifyLeft")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-left"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("justifyCenter")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-center"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("justifyRight")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-right"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("formatBlock", "H1")}
                      style={{ fontSize: 12 }}
                    >
                      H1
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("formatBlock", "H2")}
                      style={{ fontSize: 12 }}
                    >
                      H2
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("formatBlock", "H3")}
                      style={{ fontSize: 12 }}
                    >
                      H3
                    </button>
                    {/* <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H4")} style={{fontSize:12}}>H4</button> */}

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("insertUnorderedList")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-list-ul"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("insertOrderedList")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-list-ol"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("outdent")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-indent-left"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("indent")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-text-indent-right"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("formatBlock", "pre")}
                      style={{ fontSize: 12 }}
                    >
                      <i className="bi bi-code"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("createLink", prompt("Enter URL"))}
                    >
                      <i
                        className="bi bi-link-45deg"
                        style={{ fontSize: 10 }}
                      ></i>
                    </button>

                    {/* Clear */}
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => execCmd("removeFormat")}
                    >
                      <i className="bi bi-x-lg" style={{ fontSize: 10 }}></i>
                    </button>
                  </div>
                )}

                {/* )} */}

                <div
                  id="editor"
                  contentEditable={isEditable}
                  style={{
                    minHeight: "350px",
                    padding: "10px",
                    background: "#fff",
                    marginTop: "10px",
                    overflowY: "auto",
                  }}
                >
                  <h6
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Chapter 1, The History
                  </h6>
                  <p
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    This agreement is made on [date] between :
                  </p>
                  <ul
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    <li>
                      PG/Hostel Name: [Smartstay / Hostel Name] (hereinafter
                      referred to as “Provider”)
                    </li>
                    <li>
                      Tenant Name: [Tenant Full Name] (hereinafter referred to
                      as “Tenant”)
                    </li>
                  </ul>

                  <h6
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    1. Accommodation Details
                  </h6>
                  <ul
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    <li>Room Number: [Room No]</li>
                    <li>Bed Type: [Single/Shared]</li>
                    <li>Joining Date: [Joining Date]</li>
                    <li>
                      Duration of Stay: [6 months / 1 year / Until Notice]
                    </li>
                  </ul>

                  <h6
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    2. Rent and Payments
                  </h6>
                  <ul
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    <li>Monthly Rent: ₹ [Amount]</li>
                    <li>Security Deposit: ₹ [Amount]</li>
                    <li>
                      Advance Paid: ₹ [Amount] (Adjustable / Non-refundable)
                    </li>
                    <li>Payment Due Date: [Example: 5th of every month]</li>
                  </ul>

                  <h6
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    3. Rules & Regulations
                  </h6>
                  <ul
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    <li>The tenant must maintain cleanliness and hygiene.</li>
                    <li>
                      No illegal activities or disturbances allowed inside the
                      premises.
                    </li>
                    <li>
                      Visitors are restricted unless prior permission is taken.
                    </li>
                    <li>
                      Use of electrical appliances without approval is
                      prohibited.
                    </li>
                    <li>
                      Damages caused to property must be compensated by the
                      tenant.
                    </li>
                  </ul>

                  <h6
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    4. Cancellation and Refund Policy
                  </h6>
                  <ul
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                    }}
                  >
                    <li>
                      The security deposit will be refunded after deductions (if
                      any) during checkout.
                    </li>
                    <li>
                      Advance payments are non-refundable in case of early exit
                      unless specified.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            {isEditable && (
              <div className="col-lg-3">
                <div className="card p-3 shadow-sm" style={{ height: "50%" }}>
                  <h6 className="mb-2" style={{ fontWeight: 600 }}>
                    Variables
                  </h6>
                  {/* <input
                type="text"
                className="form-control form-control-sm mb-2"
                placeholder="Search Variables"
              /> */}
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="text"
                      style={{ fontSize: 12 }}
                      className="form-control border-end-0"
                      placeholder="Search Variables"
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <img
                        src={searchteam}
                        width={15}
                        height={15}
                        alt="search_variable"
                      />{" "}
                      {/* Bootstrap icon class */}
                    </span>
                  </div>

                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <ul className="list-group list-group-flush small"></ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}

export default withErrorBoundary(SettingAgreement);
