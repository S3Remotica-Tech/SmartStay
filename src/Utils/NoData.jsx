import React from "react";
// import NoDataImage from "../Assets/v2Images/NoData.svg";
import { useHasPermission } from "../Utils/Permission";
import DataSearch from "../Assets/v2Images/DataSearch.svg";
import PropTypes from "prop-types";
import { AddCircle, Buildings2, Play } from "iconsax-react";

function NoDataFormat({
    label,
    isSearching,
    handleClear,
    isHeightChanged,
    isClearSearch,
    subLabel,
    isWay,
    handleAddFloor,
    handleAddRoom
}) {



    const {
        canWriteModule: canWritePayingGuests,

    } = useHasPermission("Paying Guests");
    return (
        <div
            className={`w-full  ${isHeightChanged ? "min-h-[500px]" : "min-h-[calc(100vh-120px)]"}  bg-[#F8FAFC] flex items-center justify-center`}
        >
            <div className="flex flex-col items-center justify-center text-center h-full space-y-2">
                <div >
                    {isSearching ? (
                        <img src={DataSearch} alt="img" />
                    ) : (
                        (isWay === "Floor" || isWay === "Room") && (
                            <Buildings2 size={32} color="#1e45e1" />
                        )
                    )}
                </div>

                <h3 className="text-[24px] font-semibold text-[#101828] font-gilroy mb-0">
                    {isSearching ? "No Search Results Found" : label}
                </h3>

                <p className="mb-0 text-sm text-[#4A5565] font-gilroy">
                    {isSearching
                        ? "Your Search didn’t match any projects"
                        : `${subLabel}`}
                </p>

                <div className="flex gap-4 items-center">
                    {isSearching && isClearSearch && (
                        <button
                            onClick={handleClear}
                            className="flex justify-center rounded-lg !font-gilroy !text-[#4B4B4B]
                            !bg-[#F9F9F9] px-4 py-1 min-w-[95px] mr-2 !border !border-[#E7E7E7] text-sm"
                        >
                            Clear Search
                        </button>
                    )}

                    {
                        isWay === "Floor" && (
                            <>
                                <button disabled={!canWritePayingGuests}
                                    onClick={handleAddFloor}
                                    className="flex justify-center gap-1 items-center rounded-lg !font-gilroy !text-white
                            !bg-[#1E45E1] px-4 py-1 min-w-[95px] mr-2 !border !border-[#E7E7E7] text-sm"
                                >
                                    <AddCircle size="14"
                                        color="#FFFFFF" /> Add Floor
                                </button>


                                <button disabled
                                    // onClick={handleAddFloor}
                                    className="flex justify-center gap-1 items-center  rounded-lg !font-gilroy !text-[#191919]
                            !bg-[#F9F9F9] px-4 py-1 min-w-[95px] mr-2 !border !border-[#E7E7E7] text-sm cursor-not-allowed"
                                >
                                    <Play size="14"
                                        color="#191919" /> Watch Demo
                                </button>

                            </>
                        )
                    }
                    {
                        isWay === "Room" && (
                            <button disabled={!canWritePayingGuests}
                                onClick={handleAddRoom}
                                className="flex justify-center gap-1 items-center rounded-lg !font-gilroy !text-white
                            !bg-[#1E45E1] px-4 py-1 min-w-[95px] mr-2 !border !border-[#E7E7E7] text-sm"
                            >
                                <AddCircle size="14"
                                    color="#FFFFFF" /> Add Room
                            </button>
                        )}

                </div>
            </div>
        </div>
    );
}
NoDataFormat.propTypes = {
    label: PropTypes.string,
    isSearching: PropTypes.bool,
    handleClear: PropTypes.func,
    isHeightChanged: PropTypes.bool,
    isClearSearch: PropTypes.bool,
    subLabel: PropTypes.string,
    isWay: PropTypes.string,
    handleAddFloor: PropTypes.func,
    handleAddRoom: PropTypes.func,
};
export default NoDataFormat;
