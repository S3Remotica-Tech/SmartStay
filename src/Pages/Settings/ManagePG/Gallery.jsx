/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Add, CloseCircle, Trash, Refresh2 } from "iconsax-react";

const GalleryComponent = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const selectedHostel = state?.UsersList?.hostelList?.find(
    (hostel) =>
      String(hostel?.hostelId) === String(state?.login?.selectedHostel_Id),
  );

  const handleUploadClick = () => {
    if (isUploading) return;

    setError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setIsUploading(true);

    try {
      dispatch({
        type: "UPDATEPG",
        payload: {
          hostelId: selectedHostel.hostelId,
          additionalImages: [file],
        },
      });
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = (image) => {
    const imageId = image?.id;

    if (!imageId || !selectedHostel?.hostelId) {
      return;
    }

    setDeletingId(imageId);

    dispatch({
      type: "DELETEHOSTELIMAGES",
      payload: {
        imageId,
        hostelId: selectedHostel.hostelId,
      },
    });
  };

  useEffect(() => {
    if (state.PgList.updatePgStatusCode === 200) {
      setIsUploading(false);
      dispatch({ type: "HOSTELLIST" });
      dispatch({ type: "REMOVE_UPDATE_PG" });
    }
  }, [, state.PgList.updatePgStatusCode]);

  useEffect(() => {
    if (state.PgList.dleteHostelImagesStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" });
      setDeletingId(null);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_IMAGES" });
      }, 1000);
    }
  }, [state.PgList.dleteHostelImagesStatusCode]);

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {selectedHostel?.images?.map((image) => {
          const imageId = image.id;
          const imageUrl = image.image;

          const isDeleting = deletingId === imageId;
          const isHovered = hoveredImageId === imageId;

          return (
            <div
              key={imageId}
              onMouseEnter={() => setHoveredImageId(imageId)}
              onMouseLeave={() => setHoveredImageId(null)}
              className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F7FAFF]"
            >
              <img
                src={imageUrl}
                alt="Property"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />

              <div
                className={`absolute inset-0 z-20 bg-black/40 transition-opacity duration-200  flex items-center justify-center  ${
                  isHovered || isDeleting ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleDelete(image)}
                  disabled={deletingId !== null}
                  aria-label="Delete image"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border-1 border-[#E5E7EB] hover:bg-[#FFF5F5] hover:border-[#FECACA] active:scale-95 transition-all disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <Refresh2
                      size="18"
                      color="#EF4444"
                      className="animate-spin"
                    />
                  ) : (
                    <Trash size="18" color="#EF4444" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleUploadClick}
          disabled={isUploading}
          className="relative w-full aspect-[4/3] rounded-xl border-2 border-dashed border-[#1E45E1] bg-[#F7FAFF] flex flex-col items-center justify-center px-4 transition-all hover:bg-[#F0F5FF] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isUploading ? (
            <>
              <Refresh2
                size="28"
                color="#1E45E1"
                className="animate-spin mb-2"
              />

              <span className="text-[14px] sm:text-[15px] font-medium text-[#1E45E1]">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center justify-center w-9 h-9 rounded-full border-1 border-[#1E45E1] bg-white mb-2">
                <Add size="20" color="#1E45E1" />
              </span>

              <span className="text-[14px] sm:text-[15px] font-semibold text-[#1E45E1]">
                Add image
              </span>

              <span className="mt-1 text-[11px] sm:text-[12px] text-[#8B8B8B]">
                Max size 2 MB
              </span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-[12px] sm:text-[13px] text-[#EF4444]">
          <CloseCircle size="16" color="#EF4444" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;
