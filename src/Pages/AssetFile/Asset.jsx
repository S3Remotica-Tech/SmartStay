/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { FormControl, InputGroup, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import AddAsset from "./AddAsset";
import AssetListTable from "../../Pages/AssetFile/AssetListTable";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import { CloseCircle, SearchNormal1, Sort, Setting3 } from "iconsax-react";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Select from "react-select";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";

function Asset() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [getData, setGetData] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [show, setShow] = useState(null);
  const [showFilter, setShowFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showFilterData, setShowFilterData] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ExcelFilterDates, setExcelFilterDates] = useState([]);
  const [ExcelDownloadDates, setExcelDownloadDates] = useState([]);
  const [filterexcelprice, setFilterExcelPrice] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const { canWriteModule: canWriteAssets, canReadModule: canReadAssets } =
    useHasPermission("Assets");
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (!canReadAssets) {
      setLoading(false);
    }
  }, [canReadAssets]);

  const location = useLocation();

  const isAssetForm = location.state?.isAssetForm || false;

  useEffect(() => {
    setShow(isAssetForm);
  }, [isAssetForm]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 1000);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.UsersList?.exportAssetsDetail?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportAssetsDetail?.response?.fileUrl);
    }
  }, [state.UsersList?.exportAssetsDetail?.response?.fileUrl]);

  const handleAssetsExcel = () => {
    if (ExcelDownloadDates.length === 2) {
      dispatch({
        type: "EXPORTASSETSDETAILS",
        payload: {
          type: "assets",
          hostel_id: state.login.selectedHostel_Id,
          start_date: ExcelDownloadDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelDownloadDates[1]?.format("YYYY-MM-DD"),
        },
      });

      setExcelDownloadDates([]);
      setFilterExcelPrice("");
      setIsDownloadTriggered(true);
      return;
    }

    if (
      filterexcelprice &&
      filterexcelprice !== "date" &&
      filterexcelprice !== "All"
    ) {
      dispatch({
        type: "EXPORTASSETSDETAILS",
        payload: {
          type: "assets",
          hostel_id: state.login.selectedHostel_Id,
          price_range: filterexcelprice,
        },
      });

      setExcelDownloadDates([]);
      setFilterExcelPrice("");
      setIsDownloadTriggered(true);
      return;
    }

    dispatch({
      type: "EXPORTASSETSDETAILS",
      payload: { type: "assets", hostel_id: state.login.selectedHostel_Id },
    });

    setIsDownloadTriggered(true);
  };

  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownload, isDownloadTriggered]);

  useEffect(() => {
    if (state.UsersList?.statusCodeforExportAssetsCode === 200) {
      setIsDownloadTriggered(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_ASSETS_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeforExportAssetsCode]);

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding asset information", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }

    if (state.bankingDetails?.bankingList?.length === 0) {
      toast.error(" Please Create Banking before adding an asset", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }

    setShow(true);
    setCurrentItem("");
  };

  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      setLoading(true);

      dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
    } else {
      setLoading(false);
    }
  }, [state.login?.selectedHostel_Id]);

  useEffect(() => {
    if (
      state.AssetList.updateAssetStatusCode === 200 ||
      state.AssetList.addAssetStatusCode === 200 ||
      state.AssetList.deleteAssetStatusCode === 200 ||
      state.AssetList.addAssignAssetStatusCode === 200
    ) {
      setShow(false);
      setTimeout(() => {
        dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
        dispatch({ type: "CLEAR_ADD_ASSET_STATUS_CODE" });
        dispatch({ type: "CLEAR_UPDATE_ASSET_STATUS_CODE" });
        dispatch({ type: "CLEAR_DELETE_ASSET_STATUS_CODE" });
        dispatch({ type: "CLEAR_ASSIGN_STATUS_CODE" });
      }, 100);
    }
  }, [
    state.AssetList.updateAssetStatusCode,
    state.AssetList.addAssetStatusCode,
    state.AssetList.deleteAssetStatusCode,
    state.AssetList.addAssignAssetStatusCode,
  ]);

  useEffect(() => {
    if (state.AssetList.getAssetStatusCode === 200) {
      setGetData(state.AssetList.assetList);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_ASSET_STATUS_CODE" });
      }, 200);
    }
  }, [state.AssetList.getAssetStatusCode]);

  useEffect(() => {
    setLoading(false);
  }, [state.AssetList.assetList]);

  const [selectedDateRange, setSelectedDateRange] = useState([]);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const filterByPriceRange = (data) => {
    switch (selectedPriceRange) {
      case "0-100":
        return data.filter((item) => item.total_price <= 100);
      case "100-500":
        return data.filter(
          (item) => item.total_price > 100 && item.total_price <= 500,
        );
      case "500-1000":
        return data.filter(
          (item) => item.total_price > 500 && item.total_price <= 1000,
        );
      case "1000+":
        return data.filter((item) => item.total_price > 1000);
      case "date":
        if (selectedDateRange?.length === 2) {
          const [start, end] = selectedDateRange;
          return data.filter(
            (item) =>
              dayjs(item.purchase_date).isSameOrAfter(start, "day") &&
              dayjs(item.purchase_date).isSameOrBefore(end, "day"),
          );
        }

        return data;
      case "All":
      default:
        return data;
    }
  };

  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) {
      setSelectedDateRange([]);
      setSelectedPriceRange("All");
      if (state.login.selectedHostel_Id) {
        dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
      }

      return;
    }

    setSelectedDateRange(dates);

    const newStartDate = dayjs(dates[0]).startOf("day");
    const newEndDate = dayjs(dates[1]).endOf("day");
    setExcelFilterDates([newStartDate, newEndDate]);
    setExcelDownloadDates([newStartDate, newEndDate]);

    setSelectedPriceRange("date");
  };

  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(value);
    setFilterExcelPrice(value);

    if (value === "All" && state.login.selectedHostel_Id) {
      dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
    } else if (value === "date" && state.login.selectedHostel_Id) {
      dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
      setExcelFilterDates([]);
      setSelectedDateRange([]);
      setExcelDownloadDates([]);
    } else if (value && state.login.selectedHostel_Id) {
      dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
    }
  };

  useEffect(() => {
    if (
      selectedPriceRange === "date" &&
      ExcelFilterDates.length === 2 &&
      state.login.selectedHostel_Id
    ) {
      dispatch({
        type: "ASSETLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          start_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelFilterDates[1]?.format("YYYY-MM-DD"),
        },
      });
    }
  }, [selectedPriceRange, ExcelFilterDates]);

  useEffect(() => {
    if (!showFilter && showFilter !== null) {
      if (state.login.selectedHostel_Id) {
        dispatch({ type: "ASSETLIST", payload: state.login.selectedHostel_Id });
      }

      setSelectedPriceRange("All");
      setSelectedDateRange([]);
      setExcelFilterDates([]);
      setExcelDownloadDates([]);
    }
  }, [showFilter]);

  const handleFilterByPrice = () => {
    const newShowFilter = !showFilter;
    setShowFilter(newShowFilter);

    if (!showFilter) {
      setSelectedPriceRange("All");
      setSelectedDateRange([]);
      setExcelFilterDates([]);
      setExcelDownloadDates([]);
      setGetData(state.AssetList.assetList);
    }
  };

  // const filteredData = filterByPriceRange(getData);

  const handleEditAsset = (item) => {
    setShow(true);
    setCurrentItem(item);
  };

  const handleShowSearch = () => {
    setShowFilterData(!showFilterData);
  };

  const handleCloseSearch = () => {
    setShowFilterData(false);
    setGetData(state.AssetList?.assetList);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
    if (searchItem !== "") {
      const filteredItems =
        state.AssetList.assetList &&
        state.AssetList.assetList.filter(
          (user) =>
            user.asset_name &&
            user.asset_name.toLowerCase().includes(searchItem.toLowerCase()),
        );

      setGetData(filteredItems);
      setShowDropDown(true);
    } else {
      setGetData(state.AssetList.assetList);
    }
  };

  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem !== "") {
      const filteredItems =
        state.AssetList.assetList &&
        state.AssetList.assetList.filter(
          (user) =>
            user.asset_name &&
            user.asset_name.toLowerCase().includes(searchItem.toLowerCase()),
        );

      setGetData(filteredItems);
    } else {
      setGetData(state.AssetList.assetList);
    }
    setShowDropDown(false);
  };

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = getData.slice(startIndex, endIndex);

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="w-full p-0">
          <div className="flex items-center justify-between sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px]">
            <div className="flex lg:justify-start justify-center items-center flex-wrap">
              <label className="text-lg text-black font-semibold font-gilroy">
                Assets
              </label>
            </div>

            <div className="flex justify-between items-center gap-2 flex-wrap p-2">
              <div
                className={`flex items-center rounded-xl border px-3 py-1.5 !bg-white  transition
                 ${
                   canReadAssets
                     ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
                     : "border-gray-200 opacity-60 cursor-not-allowed"
                 }`}
              >
                <input
                  type="text"
                  className="w-full !bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF]  disabled:cursor-not-allowed"
                  placeholder="Search"
                  value={filterInput}
                  onChange={(e) => handlefilterInput(e)}
                  disabled={canReadAssets}
                />

                <SearchNormal1
                  size="18"
                  color={canReadAssets ? "#6B7280" : "#A0A0A0"}
                  className="mr-2"
                />
              </div>

              <div
                className={`
  ${canReadAssets ? "mr-2 mt-0 cursor-not-allowed opacity-100 pointer-events-auto" : "cursor-not-allowed opacity-40 pointer-events-none"}
  transition-opacity duration-300 ease-in-out
`}
              >
                <img
                  src={excelimg}
                  alt="excel"
                  className="w-[35px] h-[35px]"
                  onClick={() => {
                    if (canReadAssets) handleAssetsExcel();
                  }}
                />
              </div>

              <div style={{}}>
                <Button
                  disabled={!canWriteAssets}
                  onClick={handleShow}
                  className="font-gilroy !text-[14px] !bg-[#1E45E1] text-white !font-gilroy !font-semibold rounded-[8px] p-2 w-[146px] whitespace-nowrap"
                >
                  {" "}
                  + Asset
                </Button>
              </div>
            </div>
          </div>

          <div className={` flex items-center justify-end gap-2 mr-2 `}>
            <div>
              <Setting3
                // onClick={() => setOpen(!open)}
                className="cursor-not-allowed"
                size="22"
                color="#4B4B4B"
              />
            </div>

            <div className="mr-2">
              <PaginationList
                totalItems={getData?.length}
                itemsPerPage={pageSize}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(size) => setPageSize(size)}
              />
            </div>
          </div>

          {!canReadAssets ? (
            <>
              <div className="flex flex-col items-center justify-center h-screen">
                <img
                  src={EmptyState}
                  alt="Empty State"
                  className="max-w-full h-auto"
                />

                <ErrorMessage
                  message={["You do not have access to view Asset"]}
                  type="warning"
                />
              </div>
            </>
          ) : (
            <div className="relative">
              {getData && getData?.length > 0 && (
                <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                  <div
                    id="tableContainer"
                    ref={tableContainerRef}
                    className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                  >
                    <table className=" w-full font-gilroy">
                      <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                        <tr className="h-9">
                          <th className="w-[230px] px-2">Product Name</th>
                          <th className="w-[230px] px-2">Serial Number</th>
                          <th className="w-[230px] px-2">Brand</th>
                          <th className="w-[230px] px-2">Asset</th>
                          <th className="w-[230px] px-2">Price</th>
                          <th className="w-[230px] px-2">Purchase Date</th>
                          <th className="w-[230px] px-2">Assigned</th>
                          <th className="w-[230px] px-2">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedData.map((item) => (
                          <AssetListTable
                            item={item}
                            OnEditAsset={handleEditAsset}
                            key={item.id}
                            disableActions={state?.login?.planStatus === 0}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          {!loading && getData && getData.length === 0 && (
            <div className="animated-text flex items-center justify-center h-[60vh] 2xl:mt-20">
              <div>
                <div className="flex justify-center mb-2 mt-8">
                  <img src={EmptyState} alt="Empty state" />
                </div>

                <div className="pb-1 text-center font-gilroy font-semibold text-lg text-gray-700">
                  No Assets available
                </div>

                <div className="text-center font-gilroy font-medium text-sm text-gray-700">
                  There are no Assets added.
                </div>
              </div>

              <div></div>
            </div>
          )}
        </div>
        {loading && (
          <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-[40px] h-[40px] rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
          </div>
        )}
        {show && (
          <AddAsset show={show} currentItem={currentItem} setShow={setShow} />
        )}
      </div>
    </>
  );
}

export default withErrorBoundary(Asset);
