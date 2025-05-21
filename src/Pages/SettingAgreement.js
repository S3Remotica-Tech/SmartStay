

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import editimg from "../Assets/Images/New_images/edit.png";
import download from "../Assets/Images/New_images/searchss.png";
import savevec from "../Assets/Images/New_images/Vectorwhite.png";
import arrowleft from "../Assets/Images/New_images/arrow-leftbluenew.png";
import jsPDF from "jspdf";
import {CloseCircle} from "iconsax-react";
import searchteam from "../Assets/Images/New_images/Search Team.png";

function SettingAgreement() {
  const [isEditable, setIsEditable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

//   const variables = [
//     "[Date]", "[Smartstay / Hostel Name]", "[Tenant Full Name]", "[Room No]",
//     "[Single/Shared]", "[Joining Date]", "[6 months / 1 year / Until Notice]",
//     "[Amount]", "[Security Deposit]", "[Advance Paid]", "[Payment Due Date]",
//     "[Example: 5th of every month]"
//   ];

  const execCmd = (command, value = null) => {
    if (isEditable) {
      document.execCommand(command, false, value);
    }
  };
  const handleCloseEdit =()=>{
    setIsEditable(false)
  }

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
    <div className="container-fluid " style={{ fontFamily: "Gilroy" }}>
      {/* <div className="d-flex justify-content-between align-items-center mb-3"> */}
      {/* <div
  className="d-flex justify-content-between align-items-center mb-3 px-2 py-4 "
  style={{
                    // display: "flex", flexDirection: "row", justifyContent: "space-between",
                     position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 80,
                }}
>
        <div>
          <h5 className="mb-0" style={{ fontSize: 16, fontWeight: 600 }}>Agreement & Policy</h5>
          <small className="text-muted"><img src={arrowleft} width={20} height={20}/>Simple PG Stay Agreement</small>
        </div>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-secondary me-2" onClick={handleDownloadPDF}>
            <img src={download} alt="download" width={15} height={15} className="me-2" />
            Download Sample
          </button>
           {!isEditable && (
          <button className="btn btn-primary d-flex align-items-center gap-2 px-4" onClick={() => setIsEditable(true)}>
            <img src={editimg} alt="Edit" width={15} height={15} />
            Edit
          </button>
           )}
 {isEditable && (
           <button className="btn btn-primary d-flex align-items-center gap-2 px-4" onClick={() => setIsEditable(true)}>
            <img src={savevec} alt="Edit" width={15} height={15} />
            Save
          </button>
 )}
          {isEditable && (
            <CloseCircle size="24" color="#000" 
            onClick={handleCloseEdit} 
                      style={{ cursor: 'pointer' }}/>
          )}

        </div>
      </div> */}
      <div
  className="container-fluid sticky-top bg-white"
  style={{ zIndex: 1000 }}
>
  <div className="d-flex flex-wrap justify-content-between align-items-center  py-3">
    {/* Left Section: Title + Subtitle */}
    <div className="mb-2 mb-md-0">
      <h5 className="mb-1" style={{ fontSize: 16, fontWeight: 600 }}>Agreement & Policy</h5>
      <small className="text-muted d-flex align-items-center">
        <img src={arrowleft} alt="back" width={20} height={20} className="me-2" />
        Simple PG Stay Agreement
      </small>
    </div>

    {/* Right Section: Buttons */}
    <div className="d-flex flex-wrap align-items-center gap-2">
      <button className="btn btn-outline-secondary" onClick={handleDownloadPDF} style={{whiteSpace:"nowrap"}}>
        <img src={download} alt="download" width={15} height={15} className="me-2" />
        Download Sample
      </button>

      {!isEditable && (
        <button className="btn btn-primary d-flex align-items-center gap-2 px-4" onClick={() => setIsEditable(true)}>
          <img src={editimg} alt="Edit" width={15} height={15} />
          Edit
        </button>
      )}

      {isEditable && (
        <>
          <button className="btn btn-primary d-flex align-items-center gap-2 px-4" 
          // onClick={handleSave}
          >
            <img src={savevec} alt="Save" width={15} height={15} />
            Save
          </button>
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleCloseEdit}
            style={{ cursor: 'pointer' }}
          />
        </>
      )}
    </div>
  </div>
</div>

      <div className=" p-3" style={{backgroundColor:"#F8FAFC"}}>

      <div className="row">
       
        <div  className={`col-lg-${isEditable ? 9 : 12}`}>
          <div className="card border p-3">
            <h5 style={{ fontSize: 15, fontWeight: 600 }}>PG Accommodation Agreement</h5>

           
  {
    isEditable &&(
                 <div
  className="d-flex flex-wrap align-items-center py-2 "
  style={{ backgroundColor: "#f5f8ff", border: "1px solid #e1e1e1",whiteSpace:"nowrap" }}
>
  {/* Basic Styles */}
  <button className="btn btn-sm btn-light" onClick={() => execCmd("bold")} style={{fontSize:12,}}>
    <i className="bi bi-type-bold"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("italic")} style={{fontSize:12,marginLeft:"-10px"}}>
    <i className="bi bi-type-italic"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("underline")} style={{fontSize:12}}>
    <i className="bi bi-type-underline"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("strikeThrough")} style={{fontSize:12}} >
    <i className="bi bi-type-strikethrough"></i>
  </button>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("superscript")} style={{fontSize:12,marginLeft:"-10px"}}>X<sup>2</sup></button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("subscript")} style={{fontSize:12,marginLeft:"-10px"}}>X<sub>2</sub></button>

  
  <select
    className="form-select form-select-sm"
    style={{ width: "65px",backgroundColor:"transparent",border:"none",fontSize:12 }}
    onChange={(e) => applyFontSize(e.target.value)}
    defaultValue="16"
  >
    <option value="12">12</option>
    <option value="14">14</option>
    <option value="16">16</option>
    <option value="18">18</option>
    <option value="20">20</option>
  </select>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("justifyLeft")} style={{fontSize:12}}>
    <i className="bi bi-text-left"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("justifyCenter")} style={{fontSize:12}}>
    <i className="bi bi-text-center"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("justifyRight")} style={{fontSize:12}}>
    <i className="bi bi-text-right"></i>
  </button>

  
  {/* <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H1")} style={{fontSize:12}}>H1</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H2")} style={{fontSize:12}}>H2</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H3")} style={{fontSize:12}}>H3</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H4")} style={{fontSize:12}}>H4</button> */}

  <button className="btn btn-sm btn-light" onClick={() => execCmd("insertUnorderedList")} style={{fontSize:12}}>
    <i className="bi bi-list-ul"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("insertOrderedList")} style={{fontSize:12}}>
    <i className="bi bi-list-ol"></i>
  </button>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("outdent")} style={{fontSize:12}}>
    <i className="bi bi-text-indent-left"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("indent")} style={{fontSize:12}}>
    <i className="bi bi-text-indent-right"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "pre")} style={{fontSize:12}}>
    <i className="bi bi-code"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("createLink", prompt("Enter URL"))}>
    <i className="bi bi-link-45deg" style={{fontSize:10}}></i>
  </button>

  {/* Clear */}
  <button className="btn btn-sm btn-light" onClick={() => execCmd("removeFormat")}>
    <i className="bi bi-x-lg" style={{fontSize:10}}></i>
  </button>
</div>
    )
  }
  {
    !isEditable && 
               <div
  className="d-flex flex-wrap align-items-center gap-1  py-2"
  style={{ backgroundColor: "#f5f8ff",whiteSpace:"nowrap" }}
>
  {/* Basic Styles */}
  <button className="btn btn-sm btn-light" onClick={() => execCmd("bold")} style={{fontSize:12}}>
    <i className="bi bi-type-bold"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("italic")} style={{fontSize:12}}>
    <i className="bi bi-type-italic"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("underline")} style={{fontSize:12}}>
    <i className="bi bi-type-underline"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("strikeThrough")} style={{fontSize:12}} >
    <i className="bi bi-type-strikethrough"></i>
  </button>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("superscript")} style={{fontSize:12}}>X<sup>2</sup></button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("subscript")} style={{fontSize:12}}>X<sub>2</sub></button>

  
  <select
    className="form-select form-select-sm"
    style={{ width: "65px",backgroundColor:"transparent",border:"none",fontSize:12 }}
    onChange={(e) => applyFontSize(e.target.value)}
    defaultValue="16"
  >
    <option value="12">12</option>
    <option value="14">14</option>
    <option value="16">16</option>
    <option value="18">18</option>
    <option value="20">20</option>
  </select>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("justifyLeft")} style={{fontSize:12}}>
    <i className="bi bi-text-left"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("justifyCenter")} style={{fontSize:12}}>
    <i className="bi bi-text-center"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("justifyRight")} style={{fontSize:12}}>
    <i className="bi bi-text-right"></i>
  </button>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H1")} style={{fontSize:12}}>H1</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H2")} style={{fontSize:12}}>H2</button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H3")} style={{fontSize:12}}>H3</button>
  {/* <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "H4")} style={{fontSize:12}}>H4</button> */}

  <button className="btn btn-sm btn-light" onClick={() => execCmd("insertUnorderedList")} style={{fontSize:12}}>
    <i className="bi bi-list-ul"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("insertOrderedList")} style={{fontSize:12}}>
    <i className="bi bi-list-ol"></i>
  </button>

  
  <button className="btn btn-sm btn-light" onClick={() => execCmd("outdent")} style={{fontSize:12}}>
    <i className="bi bi-text-indent-left"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("indent")} style={{fontSize:12}}>
    <i className="bi bi-text-indent-right"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("formatBlock", "pre")} style={{fontSize:12}}>
    <i className="bi bi-code"></i>
  </button>
  <button className="btn btn-sm btn-light" onClick={() => execCmd("createLink", prompt("Enter URL"))}>
    <i className="bi bi-link-45deg" style={{fontSize:10}}></i>
  </button>

  {/* Clear */}
  <button className="btn btn-sm btn-light" onClick={() => execCmd("removeFormat")}>
    <i className="bi bi-x-lg" style={{fontSize:10}}></i>
  </button>
</div>
  }

            {/* )} */}

            <div id="editor"
              contentEditable={isEditable}
              style={{ minHeight: "350px", padding: "10px", background: "#fff", marginTop: "10px",overflowY:"auto" }}
            >
            <h6 style={{fontWeight:600,fontSize:16,fontFamily:"Gilroy"}}>Chapter 1, The History</h6>
      <p style={{fontSize:15,fontFamily:"Gilroy",fontWeight:400}}>This agreement  is made on [date] between :</p>
      <ul style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>
        <li>PG/Hostel Name: [Smartstay / Hostel Name] (hereinafter referred to as “Provider”)</li>
        <li>Tenant Name: [Tenant Full Name] (hereinafter referred to as “Tenant”)</li>
      </ul>

      <h6 style={{fontSize:15,fontFamily:"Gilroy",fontWeight:400}}>1. Accommodation Details</h6>
      <ul style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>
        <li>Room Number: [Room No]</li>
        <li>Bed Type: [Single/Shared]</li>
        <li>Joining Date: [Joining Date]</li>
        <li>Duration of Stay: [6 months / 1 year / Until Notice]</li>
      </ul>

      <h6 style={{fontSize:15,fontFamily:"Gilroy",fontWeight:400}}>2. Rent and Payments</h6>
      <ul style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>
        <li>Monthly Rent: ₹ [Amount]</li>
        <li>Security Deposit: ₹ [Amount]</li>
        <li>Advance Paid: ₹ [Amount] (Adjustable / Non-refundable)</li>
        <li>Payment Due Date: [Example: 5th of every month]</li>
      </ul>

      <h6 style={{fontSize:15,fontFamily:"Gilroy",fontWeight:400}}>3. Rules & Regulations</h6>
      <ul style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>
        <li>The tenant must maintain cleanliness and hygiene.</li>
        <li>No illegal activities or disturbances allowed inside the premises.</li>
        <li>Visitors are restricted unless prior permission is taken.</li>
        <li>Use of electrical appliances without approval is prohibited.</li>
        <li>Damages caused to property must be compensated by the tenant.</li>
      </ul>

      <h6 style={{fontSize:15,fontFamily:"Gilroy",fontWeight:400}}>4. Cancellation and Refund Policy</h6>
      <ul style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>
        <li>The security deposit will be refunded after deductions (if any) during checkout.</li>
        <li>Advance payments  are non-refundable in case of early exit unless specified.</li>
      </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {isEditable && (
          <div className="col-lg-3">
            <div className="card p-3 shadow-sm" style={{ height: "50%" }}>
              <h6 className="mb-2" style={{ fontWeight: 600 }}>Variables</h6>
              {/* <input
                type="text"
                className="form-control form-control-sm mb-2"
                placeholder="Search Variables"
              /> */}
              <div className="input-group input-group-sm mb-2">
 
  <input
    type="text"
    style={{fontSize:12}}
    className="form-control border-end-0"
    placeholder="Search Variables"
  />
   <span className="input-group-text bg-white border-start-0">
    <img src={searchteam} width={15} height={15}/> {/* Bootstrap icon class */}
  </span>
</div>

              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <ul className="list-group list-group-flush small">
                
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default SettingAgreement;
