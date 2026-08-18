import React from "react";
import NoData from "../Assets/v2Images/NoData.svg";
import DataSearch from "../Assets/v2Images/DataSearch.svg";
import PropTypes from "prop-types";

function NoDataMessage({
  label,
  isSearching,
  handleClear,
  isHeightChanged,
  isClearSearch,
}) {
  return (
    <div
      className={`w-full  ${isHeightChanged ? "min-h-[350px]" : "min-h-[500px]"}  border border-[#E5E7EB] rounded-2xl bg-white flex items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div>
          {isSearching ? (
            <img src={DataSearch} alt="img" />
          ) : (
            <img src={NoData} alt="img" />
          )}
        </div>

        <h3 className="text-[20px] font-semibold text-[#101828] font-gilroy">
          {isSearching ? "No Search Results Found" : "No Data Found !"}
        </h3>

        <p className="mt-1 text-sm text-[#4A5565] font-gilroy">
          {isSearching
            ? "Your Search didn’t match any projects"
            : `No ${label || "Data"} found yet`}
        </p>

        <div className="flex">
          {isSearching && isClearSearch && (
            <button
              onClick={handleClear}
              className="flex justify-center rounded-lg !font-gilroy !text-[#4B4B4B]
                            !bg-[#F9F9F9] px-4 py-1 min-w-[95px] mr-2 !border !border-[#E7E7E7]"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
NoDataMessage.propTypes = {
  label: PropTypes.string,
  isSearching: PropTypes.bool,
  handleClear: PropTypes.func,
  isHeightChanged: PropTypes.bool,
  isClearSearch: PropTypes.bool,
};
export default NoDataMessage;
