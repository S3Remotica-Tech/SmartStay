import React,{useState} from "react";
import Documents from "../../Assets/v2Images/doc.png";
import PropTypes from "prop-types";
import upload from "../../Assets/Images/New_images/pdf@2x.png";
import { Trash, DocumentDownload, Eye } from "iconsax-react";
import DeleteTenantDocument from  "./DeleteTenantDocument"
function ManualDocumentsDetails({ documents }) {


  const [previewImg, setPreviewImg] = React.useState(null);
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
    <div className="w-full h-[200px] overflow-y-auto show-scrolls pr-2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  w-full ">

      {documents?.map((doc, index) => (
        <div key={doc?.documentId} className="mt-2">
          <div className="flex items-center gap-3 border  border-gray-300  rounded-lg p-2  w-full">


            <div className="flex items-center justify-center rounded-lg shadow-md border border-gray-300 bg-gray-50 py-2 px-2 w-full h-20 overflow-hidden">
              {doc.type === "IMAGE" ? (
                <img
                  src={doc.url}
                  alt={doc.name}
                  className="w-full h-full object-cover cursor-pointer rounded"
                />
              ) : doc.type === "PDF" ?
                (
                  <img
                    src={upload}
                    alt={doc.name}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                )
                :
                (
                  <img
                    src={Documents}
                    alt={doc.name}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                )
              }

              {/* <div>
            <p
              className="mb-0 font-semibold text-sm truncate max-w-[120px]"
              title={doc?.name}
              style={{ fontFamily: "Gilroy" }}
            >
              {doc?.name}
            </p>
            <small className="text-gray-500 text-xs">
              {doc?.size} • {doc?.type}
            </small>
          </div> */}
            </div>


            <div className="flex gap-2 shrink-0">
              {doc.type === "IMAGE" && (
                <Eye
                  size="22"
                  color="#5f5d5c" className=" cursor-pointer" onClick={() => setPreviewImg(doc.url)}
                />


              )}

              {doc.type !== "IMAGE" && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DocumentDownload
                    size="22"
                    color="#1E45E1"
                    className=" cursor-pointer"
                  />

                </a>
              )}
              <Trash size="22" onClick={()=>handleDeleteDocument(doc?.documentId)}
                className=" cursor-pointer"
                color="#FF0000"
              />
            </div>
            {previewImg && (
              <div className="fixed inset-0 bg-black/10 flex items-center justify-center  z-[9999]">
                <div className="relative bg-white rounded-lg p-3 max-w-[90%] max-h-[90%]">


                  <button
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center z-10"
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


          </div>
        </div>
      ))}



      {
        showDeleteDoc && <DeleteTenantDocument showDeleteDoc={showDeleteDoc}  handleDeleteDocumentClose={handleDeleteDocumentClose} showDocumentId={showDocumentId}/>
      }
    </div>
    </div>

  );
}

ManualDocumentsDetails.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      url: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.string,
    })
  ).isRequired,
};

export default ManualDocumentsDetails;
