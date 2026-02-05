/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CloseCircle, DocumentUpload, CloseSquare } from "iconsax-react";
import PropTypes from "prop-types";


function ManualDocumentsUpload({ show, handleClose }) {
    const fileInputRef = useRef(null);

    const [files, setFiles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hover, setHover] = useState(false)

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const newFiles = selectedFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setFiles((prev) => {
            const updated = [...prev, ...newFiles];


            if (prev.length === 0) setSelectedIndex(0);
            return updated;
        });
    };

    const handleDeleteFile = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);

        if (index === selectedIndex) {
            setSelectedIndex(0);
        }
    };

    const selectedFile = files[selectedIndex];











    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            size={selectedFile ? "lg" : "md"}
        >
            <Modal.Header className="border border-[#E7E7E7]">
                <Modal.Title className="font-gilroy font-semibold text-[#222222] text-xl"
                 >
                    Upload Document
                </Modal.Title>

                <CloseCircle
                    size={24}
                    color="#000"
                    onClick={handleClose}
                    className="cursor pointer"
                />
            </Modal.Header>

            <Modal.Body className="pt-2 mt-1 mr-3 show-scroll max-h-[440px] overflow-y-auto">
                <div className="flex h-auto w-auto"
                >
                    {selectedFile &&
                        <div className="w-[160px] border-r border-[#eee] overflow-y-auto pr-[10px]">
                            {files.length === 0 ? (
                                <p className="font-gilroy text-sm">No Files</p>
                            ) : (
                                files.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedIndex(index)}
                                         className={`cursor-pointer rounded-[8px] p-[5px] mb-[10px] 
  ${selectedIndex === index
                                                ? "border-2 border-[#1E45E1] bg-[#EEF3FF]"
                                                : "border border-[#ddd] bg-white"
                                            }`}

                                    >
                                        {item.file.type.startsWith("image/") ? (
                                            <img onClick={() => setSelectedIndex(index)}
                                                src={item.url}
                                                alt=""
                                                className="w-full h-[90px] object-cover rounded-[6px]"
                                            />
                                        ) : (
                                            <iframe onClick={() => setSelectedIndex(index)}
                                                src={item.url}
                                                className="w-full h-[90px] pointer-events-none"
                                                title="pdf-preview"
                                            />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                    }
                    <div style={{ flex: 1, padding: 10 }}>
                        {selectedFile ? (
                            <div
                                style={{ position: "relative" }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}>
                                {selectedFile.file.type.startsWith("image/") ? (
                                    <img
                                        src={selectedFile.url}
                                         className="w-full h-[300px] object-contain rounded-[8px] bg-[#f8f8f8]"

                                    />
                                ) : (
                                    <iframe
                                        src={selectedFile.url}
                                        className="w-full h-[300px] pointer-events-none"
                                        title="document"
                                    />
                                )}

                                <div
                                    className={`flex justify-between items-center mt-2 absolute left-0 w-full h-[50px]
    bg-[rgba(0,0,0,0.55)] text-white px-[12px]
    rounded-b-[6px] font-gilroy transition-all duration-300 ease-in-out cursor-pointer
    ${hover ? "bottom-0" : "-bottom-[100px]"}`}
                                >
                                    <span className="font-gilroy truncate">
                                        {selectedFile.file.name}
                                    </span>

                                    <CloseSquare
                                        variant="Bulk"
                                        size={22}
                                        color="#E0ECFF"
                                        onClick={() => handleDeleteFile(selectedIndex)}
                                        className="cursor-pointer"
                                    />
                                </div>

                            </div>
                        ) : (
                            <>
                                <label className="mb-2 font-gilroy text-[14px] text-[#222222] font-normal">
                                    Documents
                                </label>

                              <div className="flex items-center justify-center gap-5 bg-[#E3E3E37D] p-[15px] rounded-[8px]">

                                    <div className="flex items-center bg-[#E0ECFF] px-[8px] py-[4px] rounded-[5px]">
                                        <DocumentUpload size="16" color="#1E45E1" />
                                    </div>

                                    <div>
                                        <label className="cursor-pointer text-[#1E45E1] font-gilroy text-[14px] font-normal">
                                            Choose file
                                            <input
                                                type="file"
                                                accept="image/*,.pdf"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                        </label>

                                        <span className="ml-1 text-[#16151C] font-gilroy text-[14px] font-normal">
                                            to Upload
                                        </span>

                                        <div className="text-[#4B4B4B] font-gilroy text-[12px] font-normal">
                                            JPG ,PNG, PDF Format (600px*300px)
                                        </div>
                                    </div>

                                </div>

                            </>




                        )}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer style={{ border: "none" }}>
                <div className={`d-flex ${selectedFile ? 'justify-content-between' : ' justify-content-end'} w-100 px-2 `}>

                    {selectedFile &&
                        <div>
                            <label
                                onClick={handleFileSelect}
                                className="font-gilroy text-[#1E45E1] text-[14px] cursor-pointer" >
                                + Add more Files
                            </label>
                        </div>
                    }

                    <div>
                        <Button
                            onClick={handleClose}
                           className="bg-white border-0 !text-[#1E45E1] !font-semibold rounded-[12px] mr-3 font-gilroy"
                        >
                            Cancel
                        </Button>

                        <Button
                            className="bg-[#1E45E1] text-white !font-semibold rounded-[12px] font-gilroy"
                         >
                            Attach
                        </Button>

                        <input
                            type="file"
                            ref={fileInputRef}
                           className="hidden"
                            multiple
                            onChange={handleFileUpload}
                            accept="image/*,.pdf"
                        />
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    );
}
ManualDocumentsUpload.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
export default ManualDocumentsUpload;
