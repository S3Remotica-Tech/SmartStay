/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import AssignAsset from '../../Pages/AssetFile/AssignAsset'
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import { Edit, Trash, ProfileAdd } from 'iconsax-react';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { useHasPermission } from '../../Utils/Permission';


function AssetListTable(props) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const popupRef = useRef(null);

  const [showDots, setShowDots] = useState(null);
  const [showAssignAssetModal, setShowAssignAssetModal] = useState(false)
  const [assign, setAssign] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);

  const {
    canWriteModule: canWriteAssets,
    // canReadModule: canReadAssets,
    canUpdateModule: canUpdateAsset,
    canDeleteModule: canDeleteAsset,
  } = useHasPermission("Assets");



  // const canUpdateAsset = useHasPermission("Assets", "canUpdate")
  //   const canDeleteAsset = useHasPermission("Assets", "canDelete")
  // const canWriteAssets = useHasPermission("Assets", "canWrite");

  const handleShowDots = (id, e) => {
    setShowDots(!showDots)
    const { top, left, height } = e.target.getBoundingClientRect();

    const popupHeight = 100;
    const viewportHeight = window.innerHeight;

    let popupTop = top + (height / 12);
    let popupLeft = left - 200;


    if (popupTop + popupHeight > viewportHeight) {
      popupTop = top - 50;
    }
    setPopupPosition({ top: popupTop, left: popupLeft });
  }

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;


      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  const handleEdit = (item) => {
    props.OnEditAsset(item)

  }

  const handleDelete = () => {


    if (deleteAsset_Id) {

      dispatch({
        type: 'DELETEASSET',
        payload: {
          assetId: deleteAsset_Id,
        },
      });



    }
  };


  const handleAssignAsset = (item) => {
    setShowAssignAssetModal(true)
    setAssign(item)
  }

  const handleClose = () => {
    setShowAssignAssetModal(false)
  }




  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [showDeleteAsset, setShowDeleteAsset] = useState(false)
  const [deleteAsset_Id, setDeleteAsset_Id] = useState('')

  const handleShowDeleteAsset = (item) => {

    setShowDeleteAsset(true)
    setDeleteAsset_Id(item.assetId)
  }



  const handleCloseForDeleteAsset = () => {
    setShowDeleteAsset(false)
  }

  useEffect(() => {
    if (state.AssetList.deleteAssetStatusCode === 200) {
      setShowDeleteAsset(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_ASSET_STATUS_CODE' })

      }, 100)
    }

  }, [state.AssetList.deleteAssetStatusCode])

  return (
    <>

      <tr
        key={props.item.id}
        className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
      >
        <td
          title={props.item.product_name || "-"}
          className="w-[230px] py-1 whitespace-nowrap truncate px-2"
        >
          {props.item.productName || "-"}
        </td>

        <td
          title={props.item.serial_number || "-"}
          className="w-[230px] py-1 px-2 whitespace-nowrap px-2 text-ellipsis"
        >
          {props.item.serialNumber || "-"}
        </td>

        <td
          title={props.item.brandName || "-"}
          className="w-[230px] py-1 whitespace-nowrap px-2 whitespace-nowrap"
        >
          {props.item.brandName || "-"}
        </td>

        <td
          title={props.item.asset_name}
          className="w-[230px] py-1 px-2 whitespace-nowrap text-ellipsis"
        >
          <div className="w-full">
            <div
              className="whitespace-nowrap "
            >
              {props.item.assetName || "-"}
            </div>
          </div>
        </td>

        <td
          title={props.item.price}
          className="w-[230px] py-1 whitespace-nowrap px-1.5"
        >
          ₹{props.item.price ? props.item.price.toLocaleString("en-IN") : "0"}
        </td>

        <td
          title={moment(props.item.purchaseDate)
            .format("DD MMM YYYY")
            .toUpperCase()}
          className="w-[230px] py-1 whitespace-nowrap px-2"
        >
          {props.item.purchaseDate}
        </td>

        <td
          title={props.item.hostelName || "-"}
          className="w-[230px] py-1 whitespace-nowrap px-2"
        >
          <div className="overflow-hidden text-ellipsis">
            {props.item.assignmentStatus === "Unassigned"
              ? "-"
              : props.item.hostelName}
          </div>
        </td>


        <td className="w-[230px] py-1 whitespace-nowrap px-2">
          <div className="w-full flex justify-start">
            <div
              onClick={(e) => handleShowDots(props.item.id, e)}
              className="relative flex items-center justify-center rounded-full cursor-pointer"
            >
              <PiDotsThreeOutlineVerticalFill
                className={`w-[15px] h-[15px] rotate-90
            ${showDots ? "text-[#1E45E1]" : "text-gray-800"}`}
              />

              {showDots && (
                <div
                  ref={popupRef}
                  className="fixed z-[1000] w-[160px] bg-[#F9F9F9]
                       border border-[#EBEBEB] rounded-[10px]"
                  style={{
                    top: showAbove
                      ? popupPosition.top -
                      (popupRef.current?.offsetHeight || 100) -
                      20
                      : popupPosition.top - 35,
                    left: popupPosition.left,
                  }}
                >
                  <div
                    onClick={() => canWriteAssets && handleAssignAsset(props.item)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-t-[10px]
                ${canWriteAssets
                        ? "cursor-pointer hover:bg-[#EDF2FF]"
                        : "cursor-not-allowed opacity-50"
                      }`}
                  >
                    <ProfileAdd size="16" color="#1E45E1" />
                    <span className="text-sm font-semibold font-gilroy text-[#222]">
                      {props.item.assignmentStatus === "Unassigned"
                        ? "Assign asset"
                        : "Reassign asset"}
                    </span>
                  </div>

                  <div className="h-px bg-[#F0F0F0]" />

                  <div
                    onClick={() => canUpdateAsset && handleEdit(props.item)}
                    className={`flex items-center gap-2 px-3 py-2
                ${canUpdateAsset
                        ? "cursor-pointer hover:bg-[#EDF2FF]"
                        : "cursor-not-allowed opacity-50"
                      }`}
                  >
                    <Edit size="16" color="#1E45E1" />
                    <span className="text-sm font-semibold font-gilroy text-[#222]">
                      Edit
                    </span>
                  </div>

                  <div className="h-px bg-[#F0F0F0]" />

                  <div
                    onClick={() =>
                      canDeleteAsset &&
                      props.item.assignmentStatus === "Unassigned" &&
                      handleShowDeleteAsset(props.item)
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-b-[10px]
                ${canDeleteAsset &&
                        props.item.assignmentStatus === "Unassigned"
                        ? "cursor-pointer hover:bg-[#FFF0F0]"
                        : "cursor-not-allowed opacity-50"
                      }`}
                  >
                    <Trash size="16" color="red" />
                    <span className="text-sm font-semibold font-gilroy text-red-600">
                      Delete
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>


      {showAssignAssetModal && <AssignAsset show={showAssignAssetModal} handleClose={handleClose} currentItem={assign} />}


      <div>
        <Modal show={showDeleteAsset} onHide={handleCloseForDeleteAsset} centered backdrop="static"
          dialogClassName="custom-delete-modal"

        >

          <Modal.Header className="border-0 justify-center">
            <Modal.Title className="w-full text-center !text-[19px] !font-gilroy !font-semibold !text-[#222]">
              Delete asset?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center text-[14px] font-medium !font-gilroy text-[#646464] -mt-2">
            Are you sure you want to delete this asset?
          </Modal.Body>






          <Modal.Footer className='flex justify-center border-0 -mt-2'
          >
            <Button className="w-full max-w-[160px] h-[52px] rounded-[8px] px-5 bg-white !text-[#1E45E1] !border-[#1E45E1] !font-gilroy !font-semibold !text-[15px] me-2"
              onClick={handleCloseForDeleteAsset}
            >
              Cancel
            </Button>

            <Button className="w-full max-w-[160px] h-[52px] rounded-[8px] px-5 !bg-[#1E45E1] text-white !font-gilroy !font-semibold !text-[15px]"
              onClick={handleDelete}>
              Delete
            </Button>

          </Modal.Footer>
        </Modal>

      </div>



    </>
  )
}
// AssetListTable.propTypes = {
//   OnEditAsset: PropTypes.func.isRequired,
//   item: PropTypes.func.isRequired,
//   // assetAddPermission: PropTypes.func.isRequired,
//   // assetEditPermission: PropTypes.func.isRequired,
//   // assetDeletePermission: PropTypes.func.isRequired
// };
AssetListTable.propTypes = {
  item: PropTypes.object.isRequired, // ✅ was PropTypes.func
  OnEditAsset: PropTypes.func,
  disableActions: PropTypes.bool,
};

export default AssetListTable