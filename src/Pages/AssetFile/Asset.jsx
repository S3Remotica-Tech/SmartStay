/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import AddAsset from './AddAsset'
import AssetListTable from '../../Pages/AssetFile/AssetListTable'
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { CloseCircle, SearchNormal1, Sort } from 'iconsax-react';
// import { MdError } from "react-icons/md";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import { toast } from 'react-toastify';
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Select from "react-select";
import PaginationList from '../../Components/PaginationList';
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";


function Asset() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [getData, setGetData] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [show, setShow] = useState(null)
  const [showFilter, setShowFilter] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [assetrolePermission, setAssetRolePermission] = useState("");

  // const [assetpermissionError, setAssetPermissionError] = useState("");
  // const [assetAddPermission, setAssetAddPermission] = useState("")
  // const [assetDeletePermission, setAssetDeletePermission] = useState("")
  // const [assetEditPermission, setAssetEditPermission] = useState("")
  const [excelDownload, setExcelDownload] = useState("")
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(false)
  const [showFilterData, setShowFilterData] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ExcelFilterDates, setExcelFilterDates] = useState([])
  const [ExcelDownloadDates, setExcelDownloadDates] = useState([])
  const [filterexcelprice, setFilterExcelPrice] = useState('')

  // const canWriteAssets = useHasPermission("Assets", "canWrite");
  // const canReadAssets = useHasPermission("Assets", "canRead");

  const {
    canWriteModule: canWriteAssets,
    canReadModule: canReadAssets,
    // canUpdateModule: canUpdateUser,
    // canDeleteModule: canDeleteUser,
  } = useHasPermission("Assets");

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
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])

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
        ;
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
  }, [state.UsersList?.statusCodeforExportAssetsCode])












  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding asset information', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }

    if (state.bankingDetails?.bankingList?.length === 0) {
      toast.error(' Please Create Banking before adding an asset', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }



    setShow(true)
    setCurrentItem('')
  }





  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      setLoading(true)

      dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });

    } else {
      setLoading(false)
    }
  }, [state.login?.selectedHostel_Id])



  useEffect(() => {
    if (state.AssetList.updateAssetStatusCode === 200 || state.AssetList.addAssetStatusCode === 200 || state.AssetList.deleteAssetStatusCode === 200 || state.AssetList.addAssignAssetStatusCode === 200) {
      setShow(false)
      setTimeout(() => {
        dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
        dispatch({ type: 'CLEAR_ADD_ASSET_STATUS_CODE' })
        dispatch({ type: 'CLEAR_UPDATE_ASSET_STATUS_CODE' })
        dispatch({ type: 'CLEAR_DELETE_ASSET_STATUS_CODE' })
        dispatch({ type: 'CLEAR_ASSIGN_STATUS_CODE' })
      }, 100)
    }

  }, [state.AssetList.updateAssetStatusCode, state.AssetList.addAssetStatusCode, state.AssetList.deleteAssetStatusCode, state.AssetList.addAssignAssetStatusCode])



  useEffect(() => {
    if (state.AssetList.getAssetStatusCode === 200) {
      setGetData(state.AssetList.assetList)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_ASSET_STATUS_CODE' })
      }, 200)
    }

  }, [state.AssetList.getAssetStatusCode])

  useEffect(() => {
    setLoading(false)
  }, [state.AssetList.assetList])



  const [selectedDateRange, setSelectedDateRange] = useState([]);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const filterByPriceRange = (data) => {
    switch (selectedPriceRange) {
      case '0-100':
        return data.filter(item => item.total_price <= 100);
      case '100-500':
        return data.filter(item => item.total_price > 100 && item.total_price <= 500);
      case '500-1000':
        return data.filter(item => item.total_price > 500 && item.total_price <= 1000);
      case '1000+':
        return data.filter(item => item.total_price > 1000);
      case 'date':

        if (selectedDateRange?.length === 2) {
          const [start, end] = selectedDateRange;
          return data.filter(item =>
            dayjs(item.purchase_date).isSameOrAfter(start, 'day') &&
            dayjs(item.purchase_date).isSameOrBefore(end, 'day')
          );
        }

        return data;
      case 'All':
      default:
        return data;
    }
  };


  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) {
      setSelectedDateRange([]);
      setSelectedPriceRange("All");
      if (state.login.selectedHostel_Id) {
        dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
      }

      return;
    }

    setSelectedDateRange(dates);

    const newStartDate = dayjs(dates[0]).startOf("day");
    const newEndDate = dayjs(dates[1]).endOf("day");
    setExcelFilterDates([newStartDate, newEndDate]);
    setExcelDownloadDates([newStartDate, newEndDate])

    setSelectedPriceRange("date");

    // setCurrentPage(1);
  };


  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(value);
    setFilterExcelPrice(value)

    if (value === "All" && state.login.selectedHostel_Id) {
      dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
    } else if (value === "date" && state.login.selectedHostel_Id) {
      dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
      setExcelFilterDates([]);
      setSelectedDateRange([]);
      setExcelDownloadDates([]);
    } else if (value && state.login.selectedHostel_Id) {
      dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
    }

    // setCurrentPage(1);
  };



  useEffect(() => {
    if (selectedPriceRange === "date" && ExcelFilterDates.length === 2 && state.login.selectedHostel_Id) {
      dispatch({
        type: 'ASSETLIST',
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          start_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelFilterDates[1]?.format("YYYY-MM-DD")
        }
      });
    }
  }, [selectedPriceRange, ExcelFilterDates]);





  useEffect(() => {
    if (!showFilter && showFilter !== null) {

      if (state.login.selectedHostel_Id) {
        dispatch({ type: 'ASSETLIST', payload: state.login.selectedHostel_Id })
      }

      setSelectedPriceRange('All');
      setSelectedDateRange([]);
      setExcelFilterDates([])
      setExcelDownloadDates([])
    }
  }, [showFilter]);

  const handleFilterByPrice = () => {

    const newShowFilter = !showFilter;
    setShowFilter(newShowFilter);

    if (!showFilter) {
      setSelectedPriceRange("All");
      setSelectedDateRange([]);
      setExcelFilterDates([]);
      setExcelDownloadDates([])
      setGetData(state.AssetList.assetList)

    }
  };













  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = filterByPriceRange(getData);


  // const currentItems = searchQuery.length > 0 ? filteredData : filteredData?.slice(indexOfFirstItem, indexOfLastItem);




  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key) return currentItems;

  //   const sorted = [...currentItems].sort((a, b) => {
  //     const valueA = a[sortConfig.key];
  //     const valueB = b[sortConfig.key];


  //     if (!isNaN(valueA) && !isNaN(valueB)) {
  //       return sortConfig.direction === 'asc'
  //         ? valueA - valueB
  //         : valueB - valueA;
  //     }

  //     if (typeof valueA === 'string' && typeof valueB === 'string') {
  //       return sortConfig.direction === 'asc'
  //         ? valueA.localeCompare(valueB)
  //         : valueB.localeCompare(valueA);
  //     }

  //     return 0;
  //   });

  //   return sorted;
  // }, [currentItems, sortConfig]);




  const sortedData = React.useMemo(() => {
    return Array.isArray(filteredData) ? filteredData : [];
  }, [filteredData]);


  // const handleSort = (key, direction) => {
  //   setSortConfig({ key, direction });
  // };






  const handleEditAsset = (item) => {
    setShow(true)
    setCurrentItem(item);
  }


  const handleShowSearch = () => {
    setShowFilterData(!showFilterData)
  }

  const handleCloseSearch = () => {
    setShowFilterData(false)
    setGetData(state.AssetList?.assetList)
    setSearchQuery('');
  }

  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setSearchQuery(searchItem);
    if (searchItem !== '') {
      const filteredItems = state.AssetList.assetList && state.AssetList.assetList.filter((user) =>
        user.asset_name && user.asset_name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setGetData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setGetData(state.AssetList.assetList)
    }
    // setCurrentPage(1);
  };



  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem !== '') {
      const filteredItems = state.AssetList.assetList && state.AssetList.assetList.filter((user) =>
        user.asset_name && user.asset_name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setGetData(filteredItems);
    }
    else {
      setGetData(state.AssetList.assetList)
    }
    // setCurrentPage(1);
    setShowDropDown(false)
  }





  // const skeletonStyle = {
  //   backgroundColor: '#dcdcdc',
  //   borderRadius: '10px',
  //   height: '20px',
  //   marginBottom: '10px',
  // };


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });



 const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10
  );

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

  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <>

      <div className="relative">

        {loading &&
          <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-[40px] h-[40px] rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
          </div>

        }

        <div className="flex justify-between items-center flex-wrap">
          <div className="flex lg:justify-start justify-center items-center flex-wrap">
            <label className="text-lg text-black font-semibold font-gilroy">
              Assets
            </label>
          </div>

          <div className="flex justify-between items-center flex-wrap p-2">

            {
              !showFilterData &&

              <div onClick={() => canReadAssets && handleShowSearch()} className="pr-7 cursor-pointer">
                <SearchNormal1
                  size="26"
                  color="#222"
                  className={`
  ${canReadAssets ? "cursor-pointer opacity-100 pointer-events-auto" : "cursor-not-allowed opacity-40 pointer-events-none"} 
  transition-opacity duration-300 ease-in-out
`}
                />
              </div>
            }
            {

              showFilterData &&
              <div className="relative cursor-pointer mt-0 mr-3 flex flex-wrap">

                <InputGroup className="max-w-full flex-nowrap"

                >

                  <FormControl
                    value={searchQuery}
                    onChange={handleInputChange}

                    className="w-full max-w-[235px] shadow-none border border-lightGray border-r-0 text-[10px] font-medium text-[#222]"

                    placeholder="Search..."
                  />
                  <InputGroup.Text className="bg-white cursor-pointer">
                    <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                  </InputGroup.Text>
                </InputGroup>
                {
                  getData.length > 0 && searchQuery !== '' && showDropDown && (

                    <div className="absolute top-[50px] left-0 p-1.5 z-[1000] rounded-[8px] border border-[#d9d9d9] bg-white">


                      <ul className={`show-scroll
    w-[263px] bg-white max-h-[174px] rounded-[8px] p-[5px_10px] m-0 list-none box-border
    ${getData?.length > 1 ? "min-h-[100px]" : "min-h-auto"}
    ${getData?.length > 2 ? "overflow-y-auto" : "overflow-y-hidden"}
  `}
                      >
                        {
                          getData.map((user, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                handleDropDown(user.asset_name);

                              }}
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              className={`
    px-2.5 py-2.5 cursor-pointer font-gilroy text-[14px] font-medium
    ${getData.length > 1 ? 'border-b border-[#dcdcdc]' : 'border-b-0'}
    ${hoveredIndex === index ? 'bg-[#1E45E1] text-white' : 'bg-transparent text-black'}
  `}
                            >
                              {user.asset_name}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }


              </div>


            }




            <div onClick={() => canReadAssets && handleFilterByPrice()} className="pr-[23px] mt-0 cursor-pointer">
              <Sort
                Size="24"
                color="#222"
                variant="Outline"
                className={`
  ${canReadAssets ? "cursor-pointer opacity-100 pointer-events-auto" : "cursor-not-allowed opacity-40 pointer-events-none"}
  transition-opacity duration-300 ease-in-out
`}

              />
            </div>

            {
              showFilter &&

              <div className="pr-[30px] mt-0">
                <Select

                  value={{
                    value: selectedPriceRange,
                    label: selectedPriceRange === "date" ? "Date" : selectedPriceRange
                  }}
                  onChange={(selectedOption) => handlePriceRangeChange(selectedOption?.value)}
                  options={[
                    { value: "All", label: "All" },
                    { value: "0-100", label: "0-100" },
                    { value: "100-500", label: "100-500" },
                    { value: "500-1000", label: "500-1000" },
                    { value: "1000+", label: "1000+" },
                    { value: "date", label: "Date" }
                  ]}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "40px",
                      borderRadius: "6px",
                      boxShadow: "none !important",
                      outline: "none !important",
                      backgroundColor: "#fff",
                      minHeight: "unset",
                      minWidth: "140px",
                      '&:hover': {
                        borderColor: "#ccc"
                      }
                    }),
                    menuList: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      maxHeight: "150px",
                      padding: 0,
                      scrollbarWidth: "thin",
                      overflowY: "auto",
                      fontFamily: "Gilroy",

                      minWidth: "140px",
                      zIndex: 9999
                    }),
                    indicatorSeparator: () => ({
                      display: "none",

                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      padding: "0 8px",
                      cursor: "pointer"
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0 12px"
                    }),
                    input: (base) => ({
                      ...base,
                      margin: 0,
                      padding: 0,
                      border: "none",
                      boxShadow: "none",
                      outline: "none"
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#222",
                      fontWeight: 600,
                      fontFamily: "Gilroy"
                    }),

                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
                      color: "#222",
                      fontFamily: "Gilroy",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "14px",
                      cursor: "pointer"
                    })
                  }}
                  placeholder="Select Price Range"
                />
              </div>
            }

            {showFilter && selectedPriceRange === 'date' && (
              <div style={{ paddingRight: 30, marginTop: 10 }}>
                <RangePicker
                  value={selectedDateRange}
                  onChange={handleDateChange}
                  format="DD-MM-YYYY"
                  className="h-10 cursor-pointer"
                />
              </div>
            )}

            <div
              className={`
  ${canReadAssets ? "mr-2 mt-0 cursor-pointer opacity-100 pointer-events-auto" : "cursor-not-allowed opacity-40 pointer-events-none"}
  transition-opacity duration-300 ease-in-out
`}

            >
              <img src={excelimg} alt='excel' className="w-[38px] h-[38px]"
                onClick={() => { if (canReadAssets) handleAssetsExcel() }}
              />
            </div>

            <div style={{}}>
              <Button disabled={!canWriteAssets} onClick={handleShow}
                className="font-gilroy !text-[14px] !bg-[#1E45E1] text-white !font-gilroy !font-semibold rounded-[8px] p-2 w-[146px] whitespace-nowrap"
              > + Asset</Button>
            </div>
          </div>
        </div>

        {searchQuery && (
          <div className="mt-5 mb-4 font-semibold text-[16px]">
            {getData.length > 0 ? (
              <span className="text-center font-semibold font-gilroy text-[16px] text-[rgba(100,100,100,1)]">
                {getData.length} result{getData.length > 1 ? 's' : ''} found for{" "}
                <span className="text-[rgba(34,34,34,1)]">
                  &quot;{searchQuery}&quot;
                </span>
              </span>
            ) : (
              <span className="text-center font-semibold font-gilroy text-[16px] text-[rgba(100,100,100,1)]">
                No results found for{" "}
                <span className="text-center font-semibold font-gilroy text-[16px] text-[rgba(34,34,34,1)]">
                  &quot;{searchQuery}&quot;
                </span>
              </span>

            )}
          </div>
        )}

        {
          !canReadAssets ? (
            <>

              <div className="flex flex-col items-center justify-center h-screen">
                <img
                  src={EmptyState}
                  alt="Empty State"
                  className="max-w-full h-auto"
                />

                <ErrorMessage message={['You do not have access to view Asset']} type="warning" />
              </div>

            </>
          ) :

            <div className="overflow-auto mb-5">
              <div className="flex justify-end mt-2 mb-3 mr-2">
                <PaginationList
                  totalItems={sortedData.length}
                  itemsPerPage={pageSize}
                  currentPage={page}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(size) => setPageSize(size)}
                />
              </div>
              {sortedData && sortedData.length > 0 && (

                <div className="relative h-[calc(100vh-155px)] flex flex-col mt-3">
                  <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll">
                    <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">
                      <thead className="bg-blue-100 sticky top-0 z-20">
                      
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
                        {

                          sortedData && sortedData.length > 0 && (
                            <>

                              {/* {sortedData.map((item) => (
                                <AssetListTable item={item} OnEditAsset={handleEditAsset} key={item.id}
                                  // assetEditPermission={assetEditPermission}
                                  //  assetAddPermission={assetAddPermission} 
                                  // assetDeletePermission={assetDeletePermission}
                                  disableActions={state?.login?.planStatus === 0} />
                              ))} */}

                              {paginatedData.map((item) => (
                                <AssetListTable
                                  item={item}
                                  OnEditAsset={handleEditAsset}
                                  key={item.id}
                                  disableActions={state?.login?.planStatus === 0}
                                />
                              ))}

                            </>
                          )


                        }
                      </tbody>


                    </table>

                  </div>
                </div>

              )}
            </div>

        }
        {
          !loading && sortedData && sortedData.length === 0 &&

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

            <div>

            </div>
          </div>


        }




      </div >


      {show && <AddAsset show={show} currentItem={currentItem} setShow={setShow} />
      }



    </>
  )
}

export default withErrorBoundary(Asset);