// Browser-side PDF generation from already-paginated DOM pages.
// This is the only place that uses html2canvas and jsPDF, so it can later be
// replaced by a backend-generated PDF (e.g. a download URL) without changing
// the screens that call it.
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Captures each page element as a PNG data URL, one image per page.
async function renderPagesToImages(pageElements = [], options = {}) {
  const { scale = 2, onProgress } = options;
  const images = [];
  for (let index = 0; index < pageElements.length; index += 1) {
    const element = pageElements[index];
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      // Capture the element itself, independent of the page scroll position.
      scrollX: 0,
      scrollY: 0,
    });
    images.push(canvas.toDataURL("image/png"));
    if (onProgress) onProgress(index + 1, pageElements.length);
  }
  return images;
}

// Builds a PDF with one full-page image per page.
function buildPdfFromImages(images = [], options = {}) {
  const { orientation = "landscape", format = "a4" } = options;
  const pdf = new jsPDF({ orientation, unit: "pt", format });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  images.forEach((image, index) => {
    if (index > 0) pdf.addPage(format, orientation);
    pdf.addImage(image, "PNG", 0, 0, width, height, undefined, "FAST");
  });

  return pdf;
}

// Convenience: pages -> { images, pdf }. The images double as the preview,
// so what the user previews is exactly what is downloaded.
export async function createPdfFromPages(pageElements, options = {}) {
  const images = await renderPagesToImages(pageElements, options);
  const pdf = buildPdfFromImages(images, options);
  return { images, pdf };
}

export function downloadPdf(pdf, fileName = "report.pdf") {
  pdf.save(fileName);
}
