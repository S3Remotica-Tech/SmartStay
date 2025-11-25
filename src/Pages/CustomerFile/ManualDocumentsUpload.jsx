/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CloseCircle, DocumentUpload, CloseSquare } from "iconsax-react";

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
            <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                <Modal.Title style={{ fontFamily: "Gilroy", fontWeight: 600, color: "#222222", fontSize: 20 }}>
                    Upload Document
                </Modal.Title>

                <CloseCircle
                    size={24}
                    color="#000"
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                />
            </Modal.Header>

            <Modal.Body className="pt-2 show-scroll me-3 mt-1" style={{ maxHeight: 440, overflowY: 'auto' }}>
                <div style={{ display: "flex", height: "auto", width: "auto" }}>
                    {selectedFile &&
                        <div
                            style={{
                                width: 160,
                                borderRight: "1px solid #eee",
                                overflowY: "auto",
                                paddingRight: 10,
                            }}
                        >
                            {files.length === 0 ? (
                                <p style={{ fontFamily: "Gilroy", fontSize: 12 }}>No Files</p>
                            ) : (
                                files.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedIndex(index)}
                                        style={{
                                            border:
                                                selectedIndex === index
                                                    ? "2px solid #1E45E1"
                                                    : "1px solid #ddd",
                                            borderRadius: 8,
                                            padding: 5,
                                            marginBottom: 10,
                                            cursor: "pointer",
                                            backgroundColor:
                                                selectedIndex === index ? "#EEF3FF" : "white",
                                        }}
                                    >
                                        {item.file.type.startsWith("image/") ? (
                                            <img onClick={() => setSelectedIndex(index)}
                                                src={item.url}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    height: 90,
                                                    objectFit: "cover",
                                                    borderRadius: 6,
                                                }}
                                            />
                                        ) : (
                                            <iframe onClick={() => setSelectedIndex(index)}
                                                src={item.url}
                                                style={{ width: "100%", height: 90, pointerEvents: "none", }}
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
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: 300,
                                            objectFit: "contain",
                                            borderRadius: 8,
                                            background: "#f8f8f8",
                                        }}
                                    />
                                ) : (
                                    <iframe
                                        src={selectedFile.url}
                                        style={{ width: "100%", height: 300, pointerEvents: "none" }}
                                        title="document"
                                    />
                                )}

                                <div className="d-flex justify-content-between mt-2" style={{
                                    position: "absolute",
                                    bottom: hover ? "0px" : "-100px",
                                    left: 0,
                                    width: "100%",
                                    height: 50,
                                    background: "rgba(0,0,0,0.55)",
                                    color: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0 12px",
                                    borderRadius: "0 0 6px 6px",
                                    fontFamily: "Gilroy",
                                    transition: "all 0.3s ease",cursor:"pointer"
                                }}>
                                    <span style={{ fontFamily: "Gilroy" }}>
                                        {selectedFile.file.name}
                                    </span>

                                    <CloseSquare
                                        variant="Bulk"
                                        size={22}
                                        color="#E0ECFF"
                                        onClick={() => handleDeleteFile(selectedIndex)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <label className="mb-2" style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222", fontWeight: 400 }}>Documents</label>
                                <div style={{ backgroundColor: "#E3E3E37D", padding: 15, borderRadius: 8 }} className="d-flex align-items-center justify-content-center gap-5">

                                    <div style={{ backgroundColor: "#E0ECFF", padding: "4px 8px", borderRadius: 5}}  className="d-flex align-items-center">

                                        <DocumentUpload
                                            size="16"
                                            color="#1E45E1"
                                        />
                                    </div>
                                    <div style={{ backgroundColor: "" }}>
                                        <label
                                            style={{
                                                cursor: 'pointer',
                                                color: '#1E45E1',
                                                fontFamily: 'Gilroy',
                                                fontSize: 14,
                                                fontWeight: 400
                                            }}
                                        >
                                            Choose file
                                            <input
                                                type="file"
                                                accept="image/*,.pdf"
                                                className="d-none"

                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                        <span className="ms-1" style={{ color: '#16151C', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>
                                            to Upload
                                        </span>
                                        <div className="" style={{ color: '#4B4B4B', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400 }}> JPG ,PNG, PDF Format (600px*300px)</div>
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
                                style={{
                                    fontFamily: "Gilroy",
                                    color: "#1E45E1",
                                    fontSize: 14,
                                    cursor: "pointer",
                                }}
                            >
                                + Add more Files
                            </label>
                        </div>
                    }

                    <div>
                        <Button
                            onClick={handleClose}
                            style={{
                                backgroundColor: "#fff",
                                border: "none",
                                color: "#1E45E1",
                                fontWeight: 600,
                                borderRadius: 12,
                                marginRight: 12,
                                fontFamily: "Gilroy",
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            style={{
                                backgroundColor: "#1E45E1",
                                color: "#fff",
                                fontWeight: 600,
                                borderRadius: 12,
                                fontFamily: "Gilroy",
                            }}
                        >
                            Attach
                        </Button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
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

export default ManualDocumentsUpload;
