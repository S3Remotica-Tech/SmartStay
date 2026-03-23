import React, { useState } from "react";
import upload from "../../Assets/Images/New_images/pdf@2x.png";
import Documents from "../../Assets/v2Images/doc.png";
import { Eye, DocumentDownload, Trash } from "iconsax-react";
import DeleteTenantDocument from  "./DeleteTenantDocument"
function KYCDocuments({ documents }) {

  const [previewImg, setPreviewImg] = useState(null);
  const [showDeleteDoc, setShowDeleteDoc] = useState(false);
  const [showDocumentId, setDocumentId] = useState('');

  const handleDeleteDocument = (documentId) => {
    setShowDeleteDoc(true)
    setDocumentId(documentId)
  }
  const handleDeleteDocumentClose = () => {
    setShowDeleteDoc(false)
  }
  return (
    <div className="w-full max-h-[200px] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

        {documents?.length > 0 && (
          documents.map((doc, index) => (
            <div key={index} className="mt-2">
              <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-lg p-2 w-full">


                <div className="flex items-center gap-3 w-full">


                  <div className="flex items-center justify-center rounded-lg shadow-md border border-gray-300 bg-gray-50 p-2 w-full h-20 overflow-hidden">
                    {doc.type === "IMAGE" ? (
                      <img
                        src={doc.url}
                        alt={doc.documentId}
                        className="w-full h-full object-cover rounded cursor-pointer"
                        onClick={() => setPreviewImg(doc.url)}
                      />
                    ) : doc.type === "PDF" ? (
                      <img
                        src={upload}
                        alt="pdf"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={Documents}
                        alt="doc"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>


                  {/* <div className="min-w-[120px]">
                    <p
                      className="text-sm font-semibold truncate"
                      title={doc.name}
                    >
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doc.size} • {doc.type}
                    </p>
                  </div> */}
                </div>


                <div className="flex gap-2 shrink-0">


                  {doc.type === "IMAGE" ? (
                    <Eye
                      size="20"
                      color="#5f5d5c"
                      className="cursor-pointer"
                      onClick={() => setPreviewImg(doc.url)}
                    />
                  ) : (
                    <a href={doc.url} target="_blank" rel="noreferrer">
                      <DocumentDownload
                        size="20"
                        color="#1E45E1"
                        className="cursor-pointer"
                      />
                    </a>
                  )}

                  <Trash size="22" onClick={() => handleDeleteDocument(doc?.documentId)}
                    className=" cursor-pointer"
                    color="#FF0000"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>


      {previewImg && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">
          <div className="relative bg-white rounded-lg p-3 max-w-[90%] max-h-[90%]">

            <button
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
              onClick={() => setPreviewImg(null)}
            >
              ✕
            </button>

            <img
              src={previewImg}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}

      {
        showDeleteDoc && <DeleteTenantDocument showDeleteDoc={showDeleteDoc} handleDeleteDocumentClose={handleDeleteDocumentClose} showDocumentId={showDocumentId} />
      }
    </div>
  );
}

export default KYCDocuments;