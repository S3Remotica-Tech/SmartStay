import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft2, DocumentDownload, Export } from "iconsax-react";

function Preview({ handleClose, content }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="w-full max-w-[620px] h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3  bg-white">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleClose()}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
            >
              <ArrowLeft2 size={16} color="#475467" />
            </button>

            <h2 className="text-[18px] font-semibold text-[#344054]">
              Preview Agreement
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-[#475467] hover:bg-gray-50"
            >
              <DocumentDownload size={16} />
              Disclose
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E45E1] text-white text-[13px] font-medium hover:bg-[#24479F]"
            >
              <Export size={16} />
              Export as PDF
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-2">
          <div className="h-full rounded-2xl border border-[#D9DEE8] bg-[#F3F4F6] p-2">
            <div className="h-full overflow-y-auto rounded-lg border border-[#D9DEE8] bg-white px-8 py-6 show-scrolls">
              {content ? (
                <div
                  className="
                  agreement-preview
                  text-[12px] text-[#374151] leading-[1.7]

                  [&_p]:mb-1
                  [&_h1]:text-[18px]
                  [&_h1]:font-bold
                  [&_h1]:mt-4
                  [&_h1]:mb-2

                  [&_h2]:text-[16px]
                  [&_h2]:font-bold
                  [&_h2]:mt-4
                  [&_h2]:mb-2

                  [&_h3]:text-[14px]
                  [&_h3]:font-semibold
                  [&_h3]:mt-4
                  [&_h3]:mb-1

                  [&_ul]:list-disc
                  [&_ul]:pl-5
                  [&_ol]:list-decimal
                  [&_ol]:pl-5

                  [&_li]:mb-0.5

                  [&_img]:max-w-full
                  [&_img]:rounded-md
                "
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400">
                  No agreement content available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Preview.propTypes = {
  handleClose: PropTypes.func.isRequired,
  content: PropTypes.string,
};

export default Preview;
