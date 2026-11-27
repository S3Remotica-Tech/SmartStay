/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import AssignAsset from "../../Pages/AssetFile/AssignAsset";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import { Edit, Trash, ProfileAdd } from "iconsax-react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useHasPermission } from "../../Utils/Permission";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function AssetListTable(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const popupRef = useRef(null);

  const [showDots, setShowDots] = useState(null);
  const [showAssignAssetModal, setShowAssignAssetModal] = useState(false);
  const [assign, setAssign] = useState("");
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
    setShowDots(!showDots);
    const { top, left, height } = e.target.getBoundingClientRect();

    const popupHeight = 100;
    const viewportHeight = window.innerHeight;

    let popupTop = top + height / 12;
    let popupLeft = left - 200;

    if (popupTop + popupHeight > viewportHeight) {
      popupTop = top - 50;
    }
    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;

      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  const handleEdit = (item) => {
    props.OnEditAsset(item);
  };

  const handleDelete = () => {
    if (deleteAsset_Id) {
      dispatch({
        type: "DELETEASSET",
        payload: {
          assetId: deleteAsset_Id,
        },
      });
      setDeleteLoading(true);
    }
  };

  const handleAssignAsset = (item) => {
    setShowAssignAssetModal(true);
    setAssign(item);
  };

  const handleClose = () => {
    setShowAssignAssetModal(false);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showDeleteAsset, setShowDeleteAsset] = useState(false);
  const [deleteAsset_Id, setDeleteAsset_Id] = useState("");

  const handleShowDeleteAsset = (item) => {
    setShowDeleteAsset(true);
    setDeleteAsset_Id(item.assetId);
  };

  const handleCloseForDeleteAsset = () => {
    setShowDeleteAsset(false);
  };

  useEffect(() => {
    if (state.AssetList.deleteAssetStatusCode === 200) {
      setDeleteLoading(false);
      setShowDeleteAsset(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ASSET_STATUS_CODE" });
      }, 100);
    }
  }, [state.AssetList.deleteAssetStatusCode]);

  return (
    <>
      <tr
        key={props.item.id}
      >
        <td
          title={props.item.product_name || "-"}
          className={`${TABLE_BODY_CELL} truncate text-[#111928] font-semibold`}
        >
          {props.item.productName || "-"}
        </td>

        <td
          title={props.item.serial_number || "-"}
          className={`${TABLE_BODY_CELL} text-[#314158]`}
        >
          {props.item.serialNumber || "-"}
        </td>

        <td
          title={props.item.brandName || "-"}
          className={`${TABLE_BODY_CELL} truncate text-[#111928]`}
        >
          {props.item.brandName || "-"}
        </td>

        <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
          <div className="truncate" title={props.item.assetName || "-"}>
            {props.item.assetName || "-"}
          </div>
        </td>
        <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
          <div className="truncate" title={props.item.paymentMode || "-"}>
            {props.item.paymentMode || "-"}
          </div>
        </td>
        <td
          title={props.item.price}
          className={`${TABLE_BODY_CELL} text-[#111928] text-right font-medium`}
        >
          ₹{props.item.price ? props.item.price.toLocaleString("en-IN") : "0"}
        </td>

        <td
          title={moment(props.item.purchaseDate)
            .format("DD MMM YYYY")
            .toUpperCase()}
          className={`${TABLE_BODY_CELL} text-[#314158]`}
        >
          {props.item.purchaseDate}
        </td>

        <td
          title={props.item.hostelName || "-"}
          className={`${TABLE_BODY_CELL} text-[#111928]`}
        >
          <div className="truncate">
            {props.item.assignmentStatus === "Unassigned"
              ? "-"
              : props.item.hostelName}
          </div>
        </td>

        <td className={`${TABLE_BODY_CELL} sticky right-0 z-[1] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] bg-white text-[#111928] text-center`}>
          <div className="w-full flex justify-center">
            <div data-testid={`asset-list-table-show-dots-action-${props.item.id}`}
              onClick={(e) => handleShowDots(props.item.id, e)}
              className={`relative inline-flex items-center justify-center w-[34px] h-[34px] rounded-[12px] border-[1px] cursor-pointer ${showDots ? "border-[#1E45E1] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F1F5FF]"}`}
            >
              <PiDotsThreeOutlineVerticalFill
                className={`w-[15px] h-[15px] rotate-90
            ${showDots ? "text-[#1E45E1]" : "text-[#4A5565]"}`}
              />

              {showDots && (
                createPortal(
                <div
                  ref={popupRef}
                  className="font-gilroy fixed z-[1000] w-[160px] bg-[#F9F9F9]
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
                  <div data-testid={`asset-list-table-action-${props.item.id}`}
                    onClick={() =>
                      canWriteAssets && handleAssignAsset(props.item)
                    }
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

                  <div data-testid={`asset-list-table-edit-action-${props.item.id}`}
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

                  <div data-testid={`asset-list-table-delete-action-${props.item.id}`}
                    onClick={() =>
                      canDeleteAsset &&
                      props.item.assignmentStatus === "Unassigned" &&
                      handleShowDeleteAsset(props.item)
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-b-[10px]
                ${canDeleteAsset && props.item.assignmentStatus === "Unassigned"
                        ? "cursor-pointer hover:bg-[#FFF0F0]"
                        : "cursor-not-allowed opacity-50"
                      }`}
                  >
                    <Trash size="16" color="red" />
                    <span className="text-sm font-semibold font-gilroy text-red-600">
                      Delete
                    </span>
                  </div>
                </div>,
                document.body,
              )
              )}
            </div>
          </div>
        </td>
      </tr>

      {showAssignAssetModal && (
        <AssignAsset
          show={showAssignAssetModal}
          handleClose={handleClose}
          currentItem={assign}
        />
      )}

      <div>
        <Modal data-testid="asset-list-table-delete-asset-are-you-modal"
          show={showDeleteAsset}
          onHide={handleCloseForDeleteAsset}
          centered
          backdrop="static"
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

          <Modal.Footer className="flex justify-center border-0 -mt-2">
            <Button data-testid="asset-list-table-cancel-btn"
              className="w-full max-w-[160px] h-[52px] rounded-[8px] px-5 bg-white !text-[#1E45E1] !border-[#1E45E1] !font-gilroy !font-semibold !text-[15px] me-2"
              onClick={handleCloseForDeleteAsset}
            >
              Cancel
            </Button>

            <Button data-testid="asset-list-table-delete-btn"
              disabled={deleteLoading}
              className={`
   !w-full 
    !max-w-[160px] 
    !h-[52px] 
    !rounded-[8px] 
    !px-[20px] 
    !py-[12px]  
    !bg-[#1E45E1] 
    !text-white 
    !font-semibold 
    !font-gilroy 
    !text-[14px]
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
              onClick={handleDelete}
            >
              {deleteLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent !rounded-full animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

AssetListTable.propTypes = {
  item: PropTypes.object.isRequired,
  OnEditAsset: PropTypes.func,
  disableActions: PropTypes.bool,
};

export default AssetListTable;
