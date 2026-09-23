import React, { useRef, useState } from "react";
import {
  DocumentText,
  Eye,
  DocumentDownload,
  TickCircle,
  ExportCurve,
} from "iconsax-react";

const Documents = () => {
  const fileInputRef = useRef(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Rental Agreement",
      fileName: "agreement_v2.pdf",
      size: "180 KB",
      type: "PDF",
      date: "03 Jun 2025",
      status: "uploaded",
      verified: false,
    },
    {
      id: 2,
      name: "Aadhaar Card",
      fileName: "aadhaar_arjun.pdf",
      size: "340 KB",
      type: "PDF",
      date: "06 Jun 2025",
      status: "uploaded",
      verified: true,
    },
    {
      id: 3,
      name: "PAN Card",
      fileName: "pan_arjun.pdf",
      size: "210 KB",
      type: "PDF",
      date: "06 Jun 2025",
      status: "uploaded",
      verified: true,
    },
    {
      id: 4,
      name: "Passport Photo",
      fileName: "photo_arjun.jpg",
      size: "85 KB",
      type: "JPG",
      date: "01 Jun 2025",
      status: "uploaded",
      verified: false,
    },
    {
      id: 5,
      name: "Driving License",
      fileName: "",
      size: "",
      type: "",
      date: "",
      status: "missing",
      verified: false,
    },
    {
      id: 6,
      name: "Other Attachments",
      fileName: "",
      size: "",
      type: "",
      date: "",
      status: "missing",
      verified: false,
    },
  ]);

  const handleUploadClick = (document) => {
    setSelectedDocument(document);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !selectedDocument) return;

    const fileSize =
      file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const fileExtension = file.name.split(".").pop()?.toUpperCase() || "";

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setDocuments((prev) =>
      prev.map((document) =>
        document.id === selectedDocument.id
          ? {
              ...document,
              fileName: file.name,
              size: fileSize,
              type: fileExtension,
              date: formattedDate,
              status: "uploaded",
            }
          : document,
      ),
    );

    setSelectedDocument(null);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    const fileSize =
      file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const fileExtension = file.name.split(".").pop()?.toUpperCase() || "";

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const missingDocument = documents.find(
      (document) => document.status === "missing",
    );

    if (!missingDocument) return;

    setDocuments((prev) =>
      prev.map((document) =>
        document.id === missingDocument.id
          ? {
              ...document,
              fileName: file.name,
              size: fileSize,
              type: fileExtension,
              date: formattedDate,
              status: "uploaded",
            }
          : document,
      ),
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleView = (document) => {};

  const handleDownload = (document) => {};

  return (
    <div className="w-full rounded-xl bg-white font-gilroy">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {documents.map((document) => {
          const isMissing = document.status === "missing";

          return (
            <div
              key={document.id}
              className="flex min-h-[82px] items-center justify-between rounded-xl border-1 border-[#E5E7EB] bg-white
               px-3 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isMissing ? "bg-[#FFF7F7]" : "bg-[#F0F4FF]"
                  }`}
                >
                  <DocumentText
                    size="21"
                    variant="Linear"
                    color={isMissing ? "#FF3B30" : "#315BEA"}
                  />
                </div>

                <div className="min-w-0">
                  <div className="mb-0.5 flex items-center gap-2">
                    <p className="truncate text-[16px] font-semibold text-[#111928] mb-1">
                      {document.name}
                    </p>

                    {document.verified && (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F0FDF4] px-1.5 py-[2px]
                       text-[10px] font-medium text-[#15803D]"
                      >
                        <TickCircle size="10" variant="Bold" color="#15803D" />
                        Verified
                      </span>
                    )}
                  </div>

                  {!isMissing ? (
                    <>
                      <p className="truncate text-[12px] font-medium text-[#6B7280] mb-1">
                        {document.fileName}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-[#6B7280]">
                        <span>{document.size}</span>
                        <span>•</span>
                        <span>{document.type}</span>
                        <span>•</span>
                        <span>{document.date}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[12px] font-medium text-[#99A1AF] mb-1">
                        Not uploaded
                      </p>

                      <span
                        className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#FEF2F2] px-1.5 py-[2px]
                       text-[10px] font-medium text-[#DC2626]"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#DC2626]" />
                        Missing
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-3">
                {!isMissing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleView(document)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#374151] transition hover:bg-[#F5F7FA]"
                      aria-label={`View ${document.name}`}
                    >
                      <Eye size="18" variant="Linear" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(document)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#374151] transition hover:bg-[#F5F7FA]"
                      aria-label={`Download ${document.name}`}
                    >
                      <DocumentDownload size="18" variant="Linear" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUploadClick(document)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#315BEA] text-white transition hover:bg-[#244BD0]"
                    aria-label={`Upload ${document.name}`}
                  >
                    <ExportCurve size="16" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          const missingDocument = documents.find(
            (document) => document.status === "missing",
          );

          if (missingDocument) {
            handleUploadClick(missingDocument);
          }
        }}
        className="mt-2.5 flex min-h-[88px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#E3E6EB] bg-white px-4 py-4 transition hover:border-[#315BEA] hover:bg-[#FAFBFF]"
      >
        <ExportCurve size="21" variant="Linear" color="#8290A3" />

        <p className="mt-1 text-[14px] font-semibold text-[#222222] mb-1">
          Drop files here or click to upload
        </p>

        <p className="mt-0.5 text-[12px] font-medium text-[#99A1AF] mb-1">
          PDF, JPG, PNG - max 10 MB each
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Documents;
