import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import {
  ArrowLeft,
  ArrowLeft2,
  ArrowRight2,
  DocumentDownload,
  SearchZoomIn,
  SearchZoomOut,
  Maximize4,
  Warning2,
} from "iconsax-react";
import { IoCloseOutline } from "react-icons/io5";
import NoDataMessage from "../../Utils/NoDataMessage";
import { createPdfFromPages, downloadPdf } from "../../Utils/ExportPdf";
import ConsolidatedReportPage from "./ConsolidatedReportPage";
import {
  PDF_LAYOUT,
  buildExportFileName,
  getExportColumns,
  paginateExportData,
} from "./consolidatedExportLayout";

const STATUS = {
  PREPARING: "preparing",
  READY: "ready",
  EMPTY: "empty",
  ERROR: "error",
};

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;
const FIT_PADDING = 48;

const iconButton =
  "inline-flex items-center justify-center w-[36px] h-[36px] rounded-[10px] border-[1px] border-[#E2E8F0] bg-white disabled:opacity-40 disabled:cursor-not-allowed";

// Full-screen PDF preview for the Pending Collection Sheet.
// Pages are paginated, rendered off-screen, captured to images and assembled
// into a PDF; the same images are shown here, so preview = download.
function ConsolidatedExportPreview({ show, exportData, onBack, onClose }) {
  const [status, setStatus] = useState(STATUS.PREPARING);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(null); // null = fit to view
  const [fitScale, setFitScale] = useState(1);
  const [attempt, setAttempt] = useState(0);

  const pageRefs = useRef([]);
  const viewerRef = useRef(null);

  const meta = exportData?.meta || {};
  const showPropertyAndPeriod = Boolean(
    exportData?.settings?.includePropertyAndPeriod,
  );

  const columns = useMemo(
    () => getExportColumns(exportData?.columnKeys || []),
    [exportData],
  );

  const pages = useMemo(
    () =>
      exportData && exportData.rowCount > 0
        ? paginateExportData(exportData, { showPropertyAndPeriod })
        : [],
    [exportData, showPropertyAndPeriod],
  );

  const fileName = buildExportFileName(meta.propertyName, meta.period);

  // Start (or restart) generation whenever new export data arrives.
  // When hidden, clear the previous result so a stale preview never flashes.
  useEffect(() => {
    setImages([]);
    setPdf(null);
    setPageIndex(0);
    setZoom(null);
    if (!show || !exportData) {
      setStatus(STATUS.PREPARING);
      return;
    }
    if (exportData.rowCount === 0) {
      setStatus(STATUS.EMPTY);
      return;
    }
    setProgress({ done: 0, total: pages.length });
    setStatus(STATUS.PREPARING);
  }, [show, exportData, pages.length, attempt]);

  // Once the off-screen pages are mounted, capture them into a PDF.
  useEffect(() => {
    if (!show || status !== STATUS.PREPARING || pages.length === 0) return undefined;
    let cancelled = false;

    const generate = async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
        await new Promise((resolve) => requestAnimationFrame(() => resolve()));
        const elements = pageRefs.current.slice(0, pages.length).filter(Boolean);
        if (elements.length !== pages.length) {
          throw new Error("Report pages were not rendered");
        }
        const result = await createPdfFromPages(elements, {
          orientation: "landscape",
          format: "a4",
          onProgress: (done, total) => {
            if (!cancelled) setProgress({ done, total });
          },
        });
        if (cancelled) return;
        setImages(result.images);
        setPdf(result.pdf);
        setStatus(STATUS.READY);
      } catch {
        if (!cancelled) setStatus(STATUS.ERROR);
      }
    };

    generate();
    return () => {
      cancelled = true;
    };
  }, [show, status, pages]);

  // Fit-to-view scale follows the viewer size.
  const updateFitScale = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const scale = Math.min(
      (viewer.clientWidth - FIT_PADDING) / PDF_LAYOUT.pageWidth,
      (viewer.clientHeight - FIT_PADDING) / PDF_LAYOUT.pageHeight,
    );
    setFitScale(scale > 0 ? Math.min(scale, MAX_ZOOM) : 1);
  }, []);

  useEffect(() => {
    if (status !== STATUS.READY) return undefined;
    updateFitScale();
    window.addEventListener("resize", updateFitScale);
    return () => window.removeEventListener("resize", updateFitScale);
  }, [status, updateFitScale]);

  const scale = zoom ?? fitScale;
  const totalPages = images.length;

  const goTo = useCallback(
    (index) => setPageIndex(Math.max(0, Math.min(index, totalPages - 1))),
    [totalPages],
  );

  const changeZoom = (delta) => {
    const next = Math.round((scale + delta) / ZOOM_STEP) * ZOOM_STEP;
    setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next)));
  };

  // Arrow keys move between pages.
  useEffect(() => {
    if (!show || status !== STATUS.READY) return undefined;
    const handleKey = (event) => {
      if (event.key === "ArrowRight") goTo(pageIndex + 1);
      if (event.key === "ArrowLeft") goTo(pageIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [show, status, pageIndex, goTo]);

  const handleDownload = () => {
    if (pdf) downloadPdf(pdf, fileName);
  };

  const isReady = status === STATUS.READY;

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen
      animation={false}
      backdrop="static"
      aria-labelledby="export-preview-title"
      style={{ zIndex: 1060 }}
    >
      <div className="flex flex-col h-full bg-[#F1F5F9] font-gilroy">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-[12px] px-6 py-[12px] bg-white border-b border-[#E2E8F0]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 h-[36px] px-[12px] rounded-[10px] border-[1px] border-[#E2E8F0] bg-white text-[14px] font-semibold text-[#314158]"
          >
            <ArrowLeft size="16" color="#314158" />
            Back to settings
          </button>

          <div className="flex-1 min-w-[200px]">
            <h2
              id="export-preview-title"
              className="m-0 font-semibold text-[16px] leading-[22px] text-[#020618]"
            >
              Preview · Pending Collection Sheet
            </h2>
            <p className="mb-0 text-[12px] text-[#62748E] truncate">{fileName}</p>
          </div>

          {isReady && (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => goTo(pageIndex - 1)}
                  disabled={pageIndex === 0}
                  aria-label="Previous page"
                >
                  <ArrowLeft2 size="16" color="#314158" />
                </button>
                <span
                  className="min-w-[96px] text-center text-[14px] font-medium text-[#1D293D]"
                  aria-live="polite"
                >
                  Page {pageIndex + 1} of {totalPages}
                </span>
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => goTo(pageIndex + 1)}
                  disabled={pageIndex >= totalPages - 1}
                  aria-label="Next page"
                >
                  <ArrowRight2 size="16" color="#314158" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => changeZoom(-ZOOM_STEP)}
                  disabled={scale <= MIN_ZOOM}
                  aria-label="Zoom out"
                >
                  <SearchZoomOut size="16" color="#314158" />
                </button>
                <span
                  className="min-w-[48px] text-center text-[14px] font-medium text-[#1D293D]"
                  data-testid="preview-zoom"
                >
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => changeZoom(ZOOM_STEP)}
                  disabled={scale >= MAX_ZOOM}
                  aria-label="Zoom in"
                >
                  <SearchZoomIn size="16" color="#314158" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(null)}
                  aria-pressed={zoom === null}
                  className={`flex items-center gap-1 h-[36px] px-[12px] rounded-[10px] border-[1px] text-[14px] font-medium ${
                    zoom === null
                      ? "border-[#1E45E1] bg-[#EFF6FF] text-[#1E45E1]"
                      : "border-[#E2E8F0] bg-white text-[#314158]"
                  }`}
                >
                  <Maximize4 size="14" color={zoom === null ? "#1E45E1" : "#314158"} />
                  Fit
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleDownload}
            disabled={!isReady}
            className="flex items-center gap-2 h-[36px] px-[16px] rounded-[10px] bg-[#1E45E1] text-white text-[14px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DocumentDownload size="16" color="#FFFFFF" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="bg-transparent border-0 p-1"
          >
            <IoCloseOutline size={22} color="#62748E" />
          </button>
        </div>

        {/* Viewer */}
        <div
          ref={viewerRef}
          className="flex-1 overflow-auto show-scrolls"
          data-testid="preview-viewer"
        >
          {status === STATUS.PREPARING && (
            <div
              className="h-full flex flex-col items-center justify-center gap-[12px]"
              role="status"
              aria-live="polite"
            >
              <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin" />
              <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
                Generating PDF preview…
              </p>
              {progress.total > 0 && (
                <p className="mb-0 text-[12px] text-[#62748E]">
                  Page {progress.done} of {progress.total}
                </p>
              )}
            </div>
          )}

          {status === STATUS.EMPTY && (
            <div className="p-6">
              <NoDataMessage label="Pending Collections" isSearching={false} />
            </div>
          )}

          {status === STATUS.ERROR && (
            <div
              className="h-full flex flex-col items-center justify-center gap-[12px] text-center"
              role="alert"
            >
              <Warning2 size="32" color="#C10007" />
              <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
                We couldn&apos;t generate the PDF preview.
              </p>
              <p className="mb-0 text-[12px] text-[#62748E]">
                Try again, or go back and reduce the columns or rows.
              </p>
              <button
                type="button"
                onClick={() => setAttempt((prev) => prev + 1)}
                className="px-[16px] py-2 rounded-[12px] bg-[#1E45E1] text-white text-[14px] font-semibold"
              >
                Try again
              </button>
            </div>
          )}

          {isReady && images[pageIndex] && (
            <div className="min-h-full w-max min-w-full flex items-start justify-center p-6">
              <img
                src={images[pageIndex]}
                alt={`Pending Collection Sheet page ${pageIndex + 1} of ${totalPages}`}
                style={{
                  width: PDF_LAYOUT.pageWidth * scale,
                  height: PDF_LAYOUT.pageHeight * scale,
                  maxWidth: "none",
                }}
                className="bg-white shadow-[0px_4px_16px_rgba(15,23,42,0.12)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pages used only for PDF capture. They sit at the top-left, behind the
          full-screen preview (z-index -1), because html2canvas can produce
          blank captures for elements placed far off-screen. */}
      {status === STATUS.PREPARING && pages.length > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          {pages.map((page, index) => (
            <ConsolidatedReportPage
              key={page.pageNumber}
              ref={(element) => {
                pageRefs.current[index] = element;
              }}
              page={page}
              columns={columns}
              meta={meta}
              showPropertyAndPeriod={showPropertyAndPeriod}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

ConsolidatedExportPreview.propTypes = {
  show: PropTypes.bool.isRequired,
  exportData: PropTypes.shape({
    rowCount: PropTypes.number,
    columnKeys: PropTypes.arrayOf(PropTypes.string),
    groups: PropTypes.array,
    grandTotal: PropTypes.object,
    settings: PropTypes.object,
    meta: PropTypes.object,
  }),
  onBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConsolidatedExportPreview;
