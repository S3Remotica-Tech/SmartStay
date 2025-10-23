/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import AddAsset from './AddAsset'
import AssetListTable from '../../Pages/AssetFile/AssetListTable'
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort } from 'iconsax-react';
import { MdError } from "react-icons/md";
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


function Asset() {


  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [getData, setGetData] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [show, setShow] = useState(null)
  const [showFilter, setShowFilter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [assetrolePermission, setAssetRolePermission] = useState("");

  const [assetpermissionError, setAssetPermissionError] = useState("");
  const [assetAddPermission, setAssetAddPermission] = useState("")
  const [assetDeletePermission, setAssetDeletePermission] = useState("")
  const [assetEditPermission, setAssetEditPermission] = useState("")
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

  const canWriteAssets = useHasPermission("Assets", "canWrite");
  const canReadAssets = useHasPermission("Assets", "canRead");


  useEffect(() => {
    if (!canReadAssets) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [canReadAssets]);





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









  useEffect(() => {
    setAssetRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);




  useEffect(() => {

    const userType = assetrolePermission[0]?.user_details?.user_type;
    const isAdmin = userType === "admin" || userType === "agent";
    if (isAdmin) {
      if (state?.login?.planStatus === 0) {
        setAssetPermissionError("");
        setAssetAddPermission("Permission Denied");
        setAssetEditPermission("Permission Denied");
        setAssetDeletePermission("Permission Denied");

      } else if (state?.login?.planStatus === 1) {
        setAssetPermissionError("");
        setAssetAddPermission("");
        setAssetEditPermission("");
        setAssetDeletePermission("");
      }
    }

  }, [state?.login?.planStatus, state.login?.selectedHostel_Id, assetrolePermission])



  useEffect(() => {
    const assetPermission = assetrolePermission[0]?.role_permissions?.find(
      (perm) => perm.permission_name === "Assets"
    );

    const isOwner = assetrolePermission[0]?.user_details?.user_type === "staff";
    const planActive = state?.login?.planStatus === 1;

    if (!assetPermission || !isOwner) return;


    if (assetPermission.per_view === 1 && planActive) {
      setAssetPermissionError("");
    } else {
      setAssetPermissionError("Permission Denied");
    }


    if (assetPermission.per_create === 1 && planActive) {
      setAssetAddPermission("");
    } else {
      setAssetAddPermission("Permission Denied");
    }

    if (assetPermission.per_edit === 1 && planActive) {
      setAssetEditPermission("");
    } else {
      setAssetEditPermission("Permission Denied");
    }


    if (assetPermission.per_delete === 1 && planActive) {
      setAssetDeletePermission("");
    } else {
      setAssetDeletePermission("Permission Denied");
    }
  }, [assetrolePermission, state?.login?.planStatus, state.login?.selectedHostel_Id]);


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
      // setLoading(true)

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

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);


  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };






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





  const skeletonStyle = {
    backgroundColor: '#dcdcdc',
    borderRadius: '10px',
    height: '20px',
    marginBottom: '10px',
  };


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


  // useEffect(() => {
  //   if (
  //     getData.length > 0 &&
  //     currentItems.length === 0 &&
  //     currentPage > 1
  //   ) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }, [getData])



  return (
    <>

      <div className='container p-0 ' style={{ marginTop: 7 }}>
        <div className="container d-flex justify-content-between align-items-center  flex-wrap h-auto"
          style={{
            position: 'sticky',

            backgroundColor: 'white',
            zIndex: 10,
            paddingLeft: 25, paddingRight: 20,
            height: 83,
          }}
        >
          <div style={{ marginTop: 10 }}>
            <label style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>
              Assets</label>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap ">

            {
              !showFilterData &&

              <div onClick={()=>canReadAssets && handleShowSearch()} style={{ paddingRight: 30, marginTop: 12, cursor: "pointer" }}>
                <SearchNormal1
                  size="26"
                  color="#222"
style={{cursor: canReadAssets ? "pointer" : "not-allowed",
                  opacity: canReadAssets ? 1 : 0.4,
                  pointerEvents: canReadAssets ? "auto" : "none",
                  transition: "opacity 0.3s ease"}}
                />
              </div>
            }
            {

              showFilterData &&
              <div className='me-3 flex flex-wrap ' style={{
                position: 'relative', cursor: "pointer", marginTop: 10
              }}>
                <InputGroup
                  style={{
                    maxWidth: "100%",
                    flexWrap: 'nowrap',

                  }}
                >

                  <FormControl size="lg"
                    value={searchQuery}
                    onChange={handleInputChange}

                    style={{
                      width: "100%",
                      maxWidth: "235px",
                      boxShadow: "none",
                      borderColor: "lightgray",
                      borderRight: "none", fontSize: 15, fontWeight: 500, color: "#222",
                    }}
                    placeholder="Search..."
                  />
                  <InputGroup.Text style={{ backgroundColor: "#ffffff", cursor: "pointer" }}>
                    <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                  </InputGroup.Text>
                </InputGroup>
                {
                  getData.length > 0 && searchQuery !== '' && showDropDown && (

                    <div style={{ border: '1px solid #d9d9d9 ', position: "absolute", top: 50, left: 0, padding: 5, zIndex: 1000, borderRadius: 8, backgroundColor: "#fff" }}>
                      <ul className='show-scroll' style={{
                        width: 263,
                        backgroundColor: '#fff',
                        maxHeight: "174px",
                        minHeight: getData?.length > 1 ? "100px" : "auto",
                        overflowY: getData?.length > 2 ? "auto" : "hidden",
                        padding: '5px 10px',
                        margin: '0',
                        listStyleType: 'none',

                        borderRadius: 8,
                        boxSizing: 'border-box'
                      }}>
                        {
                          getData.map((user, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                handleDropDown(user.asset_name);

                              }}
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              style={{
                                padding: '10px',
                                cursor: 'pointer',

                                borderBottom: getData.length > 1 ? '1px solid #dcdcdc' : 'none',
                                fontSize: '14px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                backgroundColor: hoveredIndex === index ? '#1E45E1' : 'transparent',
                                color: hoveredIndex === index ? 'white' : 'black',

                              }}
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




            <div onClick={()=> canReadAssets && handleFilterByPrice()} style={{ paddingRight: 23, marginTop: 12, cursor: "pointer" }}>
              <Sort
                Size="24"
                color="#222"
                variant="Outline"
                style={{cursor: canReadAssets ? "pointer" : "not-allowed",
                  opacity: canReadAssets ? 1 : 0.4,
                  pointerEvents: canReadAssets ? "auto" : "none",
                  transition: "opacity 0.3s ease"}}
              />
            </div>

            {
              showFilter &&


              <div style={{ paddingRight: 30, marginTop: 10 }}>
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
                  style={{ height: 40, cursor: "pointer" }}
                />
              </div>
            )}

            <div className='me-2' style={{ marginTop: 8, cursor: "pointer" }}>
              <img src={excelimg} alt='excel' width={38} height={38}

                style={{
                  cursor: canReadAssets ? "pointer" : "not-allowed",
                  opacity: canReadAssets ? 1 : 0.4,
                  pointerEvents: canReadAssets ? "auto" : "none",
                  transition: "opacity 0.3s ease"
                }}
                onClick={() => { if (canReadAssets) handleAssetsExcel() }}
              />
            </div>

            <div style={{ marginTop: 15, paddingRight: 4 }}>
              <Button disabled={!canWriteAssets} onClick={handleShow}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  padding: "12px",
                  paddingLeft: 50,
                  paddingRight: 48,
                  marginBottom: "10px",
                  maxHeight: 45,

                }}
              >
                + Asset</Button>
            </div>
          </div>
        </div>

        {searchQuery && (
          <div className='mb-4' style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
            {getData.length > 0 ? (
              <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
                {getData.length} result{getData.length > 1 ? 's' : ''} found for{" "}
                <span style={{ color: "rgba(34, 34, 34, 1)" }}>
                  &quot;{searchQuery}&quot;
                </span>
              </span>
            ) : (
              <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for {" "}<span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}> &quot;{searchQuery}&quot;</span></span>
            )}
          </div>
        )}






        {loading &&
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>
        }


        {
          !canReadAssets ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <img
                  src={EmptyState}
                  alt="Empty State"
                  style={{ maxWidth: "100%", height: "auto" }}
                />

                <ErrorMessage message={['You do not have access to view Asset']} type="warning" />

              </div>
            </>
          ) :


            sortedData && sortedData.length > 0 && (

              <div
                className="p-0 booking-table-userlist  booking-table ms-2 me-4"
                style={{ paddingBottom: "20px", marginLeft: "-22px" }}
              >

                <div
                  className='show-scrolls'
                  style={{
                    height: sortedData.length >= 8 || sortedData.length >= 8 ? "460px" : "auto",
                    overflow: "auto",
                    marginTop: "20px"
                  }}>

                  <Table
                    responsive="md"
                  >

                    <thead style={{
                      fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                      top: 0,
                      zIndex: 1
                    }}>
                      <tr>
                        <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500 }}> <div className='d-flex gap-1 align-items-center '> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("product_name", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("product_name", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Product Name </div>  </th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }} > <div className='d-flex gap-1 align-items-center '><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("serial_number", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("serial_number", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Serial Number </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}> <div className='d-flex gap-1 align-items-center '><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("brand_name", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("brand_name", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Brand </div> </th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("asset_name", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("asset_name", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Asset </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("price", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("price", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Price </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center '><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_date", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_date", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Purchase Date </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center '><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("hostel_Name", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("hostel_Name", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Assigned </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, paddingBottom: 10 }}>Action</th>
                      </tr>
                    </thead>


                    {/* <tbody>
                      {
                        loading ? (
                          <>
                            <tr>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            </tr>
                          </>
                        )



                          : (
                            sortedData && sortedData.length > 0 && (
                              <>
                                {sortedData.map((item) => (
                                  <AssetListTable item={item} OnEditAsset={handleEditAsset} key={item.id} assetEditPermission={assetEditPermission} assetAddPermission={assetAddPermission} assetDeletePermission={assetDeletePermission} disableActions={state?.login?.planStatus === 0} />
                                ))}
                              </>
                            )

                          )
                      }
                    </tbody> */}
                    <tbody>
                      {
                        loading ? (
                          <>
                            <tr>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                              <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            </tr>
                          </>
                        )



                          : (
                            sortedData && sortedData.length > 0 && (
                              <>
                                <PaginationList>
                                  {sortedData.map((item) => (
                                    <AssetListTable item={item} OnEditAsset={handleEditAsset} key={item.id} assetEditPermission={assetEditPermission} assetAddPermission={assetAddPermission} assetDeletePermission={assetDeletePermission} disableActions={state?.login?.planStatus === 0} />
                                  ))}
                                </PaginationList>
                              </>
                            )

                          )
                      }
                    </tbody>


                  </Table>
                </div>

              </div>
            )

        }
        {
          !loading && sortedData && sortedData.length === 0 &&

          <div className='d-flex align-items-center justify-content-center animated-text mt-5' style={{ width: "100%", height: 350, margin: "0px auto" }}>

            <div>
              <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
              <div className="pb-1 " style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>No Assets available</div>
              <div className="pb-1 " style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>There are no Assets added.</div>

            </div>
            <div>

            </div>
          </div>


        }




      </div>


      {show && <AddAsset show={show} currentItem={currentItem} setShow={setShow} />}



    </>
  )
}

export default Asset;