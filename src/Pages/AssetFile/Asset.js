import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Pagination, Table, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import Filter from '../../Assets/Images/New_images/Group 13.png';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import AddAsset from './AddAsset'
import { CiSearch } from "react-icons/ci";
import Notify from '../../Assets/Images/New_images/notify.png';
import Profile from '../../Assets/Images/New_images/profile.png';
import AssetListTable from '../../Pages/AssetFile/AssetListTable'
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash, ArrowLeft2, ArrowRight2, } from 'iconsax-react';
import Spinner from 'react-bootstrap/Spinner';
import { MdError } from "react-icons/md";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";

function Asset() {




  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [getData, setGetData] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [show, setShow] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [loading, setLoading] = useState(false)
  const [assetrolePermission, setAssetRolePermission] = useState("");

  const [assetpermissionError, setAssetPermissionError] = useState("");
  const [assetAddPermission, setAssetAddPermission] = useState("")
  const [assetDeletePermission, setAssetDeletePermission] = useState("")
  const [assetEditPermission, setAssetEditPermission] = useState("")
  const [excelDownload, setExcelDownload] = useState("")
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(false)
  const [showFilterData, setShowFilterData] = useState(false)
  const stateAccount = useSelector(state => state.createAccount)
  const [profile, setProfile] = useState(stateAccount.accountList[0]?.user_details.profile)

  useEffect(() => {
    if (state.UsersList?.exportAssetsDetail?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportAssetsDetail?.response?.fileUrl);
    }
  }, [state.UsersList?.exportAssetsDetail?.response?.fileUrl]);

  const handleAssetsExcel = () => {
    dispatch({ type: "EXPORTASSETSDETAILS", payload: { type: "assets", hostel_id: state.login.selectedHostel_Id } });
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
    if (
      assetrolePermission[0]?.is_owner == 1 ||
      assetrolePermission[0]?.role_permissions[8]?.per_view == 1
    ) {
      setAssetPermissionError("");
    } else {
      setAssetPermissionError("Permission Denied");
    }
  }, [assetrolePermission]);



  useEffect(() => {
    if (
      assetrolePermission[0]?.is_owner == 1 ||
      assetrolePermission[0]?.role_permissions[8]?.per_create == 1
    ) {
      setAssetAddPermission("");
    } else {
      setAssetAddPermission("Permission Denied");
    }
  }, [assetrolePermission]);


  useEffect(() => {
    if (
      assetrolePermission[0]?.is_owner == 1 ||
      assetrolePermission[0]?.role_permissions[8]?.per_delete == 1
    ) {
      setAssetDeletePermission("");
    } else {
      setAssetDeletePermission("Permission Denied");
    }
  }, [assetrolePermission]);
  useEffect(() => {
    if (
      assetrolePermission[0]?.is_owner == 1 ||
      assetrolePermission[0]?.role_permissions[8]?.per_edit == 1
    ) {
      setAssetEditPermission("");
    } else {
      setAssetEditPermission("Permission Denied");
    }
  }, [assetrolePermission]);

  const handleShow = () => {
    setShow(true)
    setCurrentItem('')
  }

  const handleClose = () => {
    setShow(false);

  }


  useEffect(() => {
    dispatch({ type: 'ASSETLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
    setLoading(true)
  }, [state.login.selectedHostel_Id])


  useEffect(() => {
    if (state.AssetList.addAssetStatusCode == 200 || state.AssetList.deleteAssetStatusCode == 200 || state.AssetList.addAssignAssetStatusCode == 200) {
      setTimeout(() => {
        dispatch({ type: 'ASSETLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_ASSET_STATUS_CODE' })
      }, 4000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_ASSET_STATUS_CODE' })
      }, 4000)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ASSIGN_STATUS_CODE' })
      }, 4000)



    }

  }, [state.AssetList.addAssetStatusCode, state.AssetList.deleteAssetStatusCode, state.AssetList.addAssignAssetStatusCode])



  useEffect(() => {
    if (state.AssetList.getAssetStatusCode === 200) {
      setGetData(state.AssetList.assetList)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_ASSET_STATUS_CODE' })
      }, 2000)
    }

  }, [state.AssetList.getAssetStatusCode])





  useEffect(() => {
    if (state.AssetList.NoDataAssetStatusCode === 201) {
      setGetData([])
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NO_ASSET_LIST' })
      }, 2000)
    }

  }, [state.AssetList.NoDataAssetStatusCode])








  const customCheckboxStyle = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid #DCDCDC',
    borderRadius: '4px',
    display: 'inline-block',
    position: 'relative',
  };


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
      case 'All':
        return data
      default:
        return data;
    }
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterByPrice = () => {
    setShowFilter(!showFilter)
  }



  //  pagination 




  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = filterByPriceRange(getData);
  console.log("filteredData ",filteredData )

  // const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem)
  const currentItems = searchQuery.length > 0 ? filteredData : filteredData?.slice(indexOfFirstItem, indexOfLastItem);


console.log("currentItems",currentItems)

const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentItems;

    const sorted = [...currentItems].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];


      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentItems, sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };



  console.log("sortedData:", sortedData);
    console.log("sortConfig:", sortConfig);
  










  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);


 

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
    if (searchItem != '') {
      const filteredItems = state.AssetList.assetList && state.AssetList.assetList.filter((user) =>
        user.asset_name && user.asset_name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setGetData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setGetData(state.AssetList.assetList)
    }
    setCurrentPage(1);
  };



  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredItems = state.AssetList.assetList && state.AssetList.assetList.filter((user) =>
        user.asset_name && user.asset_name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setGetData(filteredItems);
    }
    else {
      setGetData(state.AssetList.assetList)
    }
    setCurrentPage(1);
    setShowDropDown(false)
  }






  useEffect(() => {
    if (stateAccount.statusCodeForAccountList == 200) {
      const loginProfile = stateAccount.accountList[0].user_details.profile

      setProfile(loginProfile)
    }

  }, [stateAccount.statusCodeForAccountList])

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
    const appearOnScro1l = new IntersectionObserver(function (entries, appearOnScrool) {
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




  return (
    <>
      {
        assetpermissionError ? (
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
              {/* Image */}
              <img
                src={EmptyState}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              {assetpermissionError && (
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <MdError size={20} />
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{assetpermissionError}</span>
                </div>
              )}
            </div></>
        ) :
          <div className='container p-0'>
            <div>

              <div className="container d-flex justify-content-between align-items-center mb-1 flex-wrap"
                style={{
                  position: 'sticky',
 
                  backgroundColor: 'white',
                  zIndex: 10,
                  // padding: '10px',
                  paddingLeft:25,paddingRight:20,
                  height: 83,
                }}
              >
                <div style={{marginTop:-5}}>
                  <label style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>
                    Assets</label>
                </div>

                <div style={{marginTop:-7}} className="d-flex justify-content-between align-items-center flex-wrap ">

                  {
                    !showFilterData &&

                    <div className='me-3' style={{marginTop:-5}} onClick={handleShowSearch}>
                      <SearchNormal1
                        size="26"
                        color="#222"

                      />
                    </div>
                  }
                  {
                    showFilterData &&
                    <div className='me-3 flex flex-wrap ' style={{ position: 'relative',marginTop:-5 }}>
                      <InputGroup
                        style={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          width: '100%',
                        }}



                      >

                        <FormControl size="lg"
                          value={searchQuery}
                          onChange={handleInputChange}

                          style={{
                            width: 235, boxShadow: "none", borderColor: "lightgray", borderRight: "none", fontSize: 15, fontWeight: 500, color: "#222",
                            //  '::placeholder': { color: "#222", fontWeight: 500 } 
                          }}
                          placeholder="Search..."
                        />
                        <InputGroup.Text style={{ backgroundColor: "#ffffff", }}>
                          <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                        </InputGroup.Text>
                      </InputGroup>



                      {
                        getData.length > 0 && searchQuery !== '' && showDropDown && (

                          <div style={{ border: '1px solid #d9d9d9 ', position: "absolute", top: 50, left: 0, zIndex: 1000, padding: 10, borderRadius: 8, backgroundColor: "#fff" }}>
                            <ul className='show-scroll' style={{
                              // position: 'absolute',
                              // top: '50px',
                              // left: 0,
                              width: 260,
                              backgroundColor: '#fff',
                              // border: '1px solid #D9D9D9',
                              borderRadius: '4px',
                              maxHeight: 174,
                              minHeight: 100,
                              overflowY: 'auto',
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
                                    style={{
                                      padding: '10px',
                                      cursor: 'pointer',
                                      borderBottom: '1px solid #dcdcdc',
                                      fontSize: '14px',
                                      fontFamily: 'Gilroy',
                                      fontWeight: 500,

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




                  <div className='me-3' style={{marginTop:-5}} onClick={handleFilterByPrice}>
                    <Sort
                      Size="24"
                      color="#222"
                      variant="Outline"
                    />
                  </div>

                  {
                    showFilter &&

                    <div className='me-3'>
                      <Form.Select aria-label="Select Price Range"
                        value={selectedPriceRange}
                        onChange={handlePriceRangeChange}
                        className='' id="vendor-select" style={{ color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>
                        <option value="All">All</option>
                        <option value="0-100">0-100</option>
                        <option value="100-500">100-500</option>
                        <option value="500-1000">500-1000</option>
                        <option value="1000+">1000+</option>
                      </Form.Select>
                    </div>
                  }
                  <div style={{ paddingRight: "10px",marginTop:-5 }}>
                    <img src={excelimg} width={38} height={38} style={{ marginTop: 5 }}
                      onClick={handleAssetsExcel}
                    />
                  </div>

            <div>
              <Button disabled={assetAddPermission} onClick={handleShow}
              //  style={{ fontFamily: "Gilroy", fontSize: 14,
              //    backgroundColor: "#1E45E1", color: "white", fontWeight: 500, borderRadius: 12, padding: "12px 16px" }}
              style={{
                fontFamily: "Gilroy",
                fontSize: "14px",
                backgroundColor: "#1E45E1",
                color: "white",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "10px 12px",
                width: "auto",
                maxWidth: "100%",
                marginBottom: "10px",
                maxHeight: 45,marginTop:8
    
              }}
                 >
                   + Asset</Button>
            </div>
          </div>
        </div>
      </div>

            {/* <div className='table-responsive' 
        style={{ border: "1px solid #DCDCDC", borderRadius: "24px", overflow: "visible", height:"auto"}}
         >  */}


            {searchQuery && (
              <div className='mb-4' style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
                {getData.length > 0 ? (
                  <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
                    {getData.length} result{getData.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span>
                  </span>
                ) : (
                  <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span></span>
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





            {sortedData && sortedData.length > 0 && (



              <div
               className='show-scrolls'
                style={{
                  // height: "400px",
                  // height: currentItems.length >= 6 ? "380px" : "auto",
                  // overflowY: currentItems.length >= 6 ? "auto" : "visible",
                  // borderRadius: "24px",
                  // border: "1px solid #DCDCDC",
                  // borderBottom:"none"
                  height: currentItems.length >= 8  || sortedData.length >= 8 ? "500px" : "auto",
                  overflowY: "auto",
                  borderTop: "1px solid #E8E8E8",
                  marginBottom:20,
                  //  borderBottom:"1px solid #DCDCDC"
                }}>

                <Table
                  responsive="md"
                  style={{ tableLayout: "fixed", width: "100%" }}
                >

                  <thead style={{
                    fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                    top: 0,
                    zIndex: 1
                  }}>
                    <tr>
                      <th style={{ verticalAlign: "middle", textAlign: "center",fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 }}> <div className='d-flex gap-1 align-items-center justify-content-center'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("product_name", 'asc')}  style={{cursor:"pointer"}}/>
                        <ArrowDown2 size="10"   variant="Bold" color="#1E45E1" onClick={() => handleSort("product_name", 'desc')} style={{cursor:"pointer"}}/>
                      </div>  Product Name </div>  </th>
                                             
                      <th style={{  textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 ,}} > <div className='d-flex gap-1 align-items-center justify-content-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                      <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("serial_number", 'asc')}  style={{cursor:"pointer"}}/>
                      <ArrowDown2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("serial_number", 'desc')} style={{cursor:"pointer"}}/>
                        </div>  Serial Number </div></th>

                      <th style={{  textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 , }}> <div className='d-flex gap-1 align-items-center justify-content-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                      <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("brand_name", 'asc')}  style={{cursor:"pointer"}}/>
                      <ArrowDown2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("brand_name", 'desc')} style={{cursor:"pointer"}}/>
                        </div> Brand </div> </th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 , }}><div className='d-flex gap-1 align-items-center justify-content-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                      <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("asset_name", 'asc')}  style={{cursor:"pointer"}}/>
                      <ArrowDown2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("asset_name", 'desc')} style={{cursor:"pointer"}}/>
                        </div> Asset </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 , }}><div className='d-flex gap-1 align-items-center justify-content-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                      <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("price", 'asc')}  style={{cursor:"pointer"}}/>
                      <ArrowDown2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("price", 'desc')} style={{cursor:"pointer"}}/>
                        </div>  Price </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 ,}}><div className='d-flex gap-1 align-items-center justify-content-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                      <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_date", 'asc')}  style={{cursor:"pointer"}}/>
                      <ArrowDown2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_date", 'desc')} style={{cursor:"pointer"}}/>
                        </div> Purchase Date </div></th>

                      <th style={{  textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 , }}><div className='d-flex gap-1 align-items-center justify-content-center'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                      <ArrowUp2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("hostel_Name", 'asc')}  style={{cursor:"pointer"}}/>
                      <ArrowDown2 size="10"  variant="Bold" color="#1E45E1" onClick={() => handleSort("hostel_Name", 'desc')} style={{cursor:"pointer"}}/>
                        </div>  Assigned </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 600 , }}></th>
                    </tr>
                  </thead>
               

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
                              {sortedData.map((item) => (
                                <AssetListTable item={item} OnEditAsset={handleEditAsset} key={item.id} assetEditPermission={assetEditPermission} assetAddPermission={assetAddPermission} assetDeletePermission={assetDeletePermission} />
                              ))}
                            </>
                          )

                        )
                    }
                  </tbody>


                </Table>
              </div>


            )}
            {
              !loading && currentItems && currentItems.length === 0 &&

              <div className='d-flex align-items-center justify-content-center animated-text mt-5' style={{ width: "100%", height: 350, margin: "0px auto" }}>

                <div>
                  <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                  <div className="pb-1 mt-3" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No Assets available</div>
                  <div className="pb-1 mt-2" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There are no Assets added.</div>

                </div>
                <div>

                </div>
              </div>


            }







            {/* </div>  */}
            {/*  Pagination code */}
            {currentItems.length > 0 &&
              // <Pagination className="mt-4 d-flex justify-content-end align-items-center">
              //   <Pagination.Prev style={{ visibility: "visible" }}
              //     onClick={() => paginate(currentPage - 1)}
              //     disabled={currentPage === 1}
              //   />
              //   {renderPagination()}
              //   <Pagination.Next style={{ visibility: "visible" }}
              //     onClick={() => paginate(currentPage + 1)}
              //     disabled={currentPage === totalPages}
              //   />
              // </Pagination>

              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  padding: "10px",
                  position: "fixed",
                  bottom: "0",
                  right: "0",
                  backgroundColor: "white",
                  zIndex: "1000",
                }}
              >
                {/* Dropdown for Items Per Page */}
                <div>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    style={{
                      padding: "5px",
                      border: "1px solid #1E45E1",
                      borderRadius: "5px",
                      color: "#1E45E1",
                      fontWeight: "bold",
                      cursor: "pointer",
                      outline: "none",
                      boxShadow: "none",

                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                {/* Pagination Controls */}
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {/* Previous Button */}
                  <li style={{ margin: "0 10px" }}>
                    <button
                      style={{
                        padding: "5px",
                        textDecoration: "none",
                        color: currentPage === 1 ? "#ccc" : "#1E45E1",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                    </button>
                  </li>

                  {/* Current Page Indicator */}
                  <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                    {currentPage} of {totalPages}
                  </li>

                  {/* Next Button */}
                  <li style={{ margin: "0 10px" }}>
                    <button
                      style={{
                        padding: "5px",
                        textDecoration: "none",
                        color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ArrowRight2
                        size="16"
                        color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                      />
                    </button>
                  </li>
                </ul>
              </nav>

            }


            {/* </div> */}
          </div>
      }

      {show && <AddAsset show={show} handleClose={handleClose} currentItem={currentItem} />}



    </>
  )
}

export default Asset;