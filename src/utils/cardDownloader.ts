// @ts-expect-error - dom-to-image-more doesn't have type declarations
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";

// HTML-based card downloader
export const downloadCard = async (element: HTMLElement, filename: string) => {
  try {
    // Wait for any animations to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create a comprehensive HTML export
    const htmlContent = await generateCompleteHTML(element);

    // Create and download the HTML file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading card:", error);

    // Fallback: offer to copy HTML content
    try {
      const htmlContent = await generateCompleteHTML(element);
      await navigator.clipboard.writeText(htmlContent);
      alert(
        "Download failed. Complete HTML content has been copied to clipboard. You can paste it into an HTML file and save it."
      );
    } catch {
      alert(
        "Download failed. Please try using the browser's print function (Ctrl+P) and save as PDF instead."
      );
    }
  }
};

// Direct PNG export using dom-to-image
export const downloadCardAsPNG = async (
  element: HTMLElement,
  filename: string
) => {
  try {
    // Wait for any animations to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add clean download class to remove problematic styles
    element.classList.add("download-clean");

    // Wait for styles to apply
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Force exact dimensions to prevent cropping and remove padding
    const originalStyle = {
      width: element.style.width,
      minWidth: element.style.minWidth,
      maxWidth: element.style.maxWidth,
      boxShadow: element.style.boxShadow,
      padding: element.style.padding,
      margin: element.style.margin,
      borderRadius: element.style.borderRadius,
    };

    element.style.width = "900px";
    element.style.minWidth = "900px";
    element.style.maxWidth = "900px";
    element.style.boxShadow = "none";
    element.style.padding = "0";
    element.style.margin = "0"; // Remove any margin that might cause white space
    element.style.borderRadius = "1rem"; // Ensure rounded corners

    // Wait for layout update
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Generate PNG with exact dimensions and preserve rounded corners
    const dataUrl = await domtoimage.toPng(element, {
      quality: 1.0,
      bgcolor: "transparent",
      width: element.offsetWidth, // Use actual element width, not forced width
      height: element.offsetHeight,
      scale: 2,
      style: {
        "box-sizing": "border-box",
        overflow: "hidden", // Ensure rounded corners are preserved
        border: "none !important",
        "box-shadow": "none !important",
        outline: "none !important",
        padding: "0 !important",
        margin: "0 !important",
        "border-radius": "1rem !important", // Preserve rounded corners (rounded-2xl = 1rem)
      },
    });

    // Restore original styles
    element.style.width = originalStyle.width;
    element.style.minWidth = originalStyle.minWidth;
    element.style.maxWidth = originalStyle.maxWidth;
    element.style.boxShadow = originalStyle.boxShadow;
    element.style.padding = originalStyle.padding;
    element.style.margin = originalStyle.margin;
    element.style.borderRadius = originalStyle.borderRadius;
    element.classList.remove("download-clean");

    // Create download link for PNG
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("PNG download completed successfully");
  } catch (error) {
    console.error("Error generating PNG:", error);
    alert("PNG generation failed. Please try the HTML download instead.");
  }
};

// Direct PDF export using dom-to-image + jsPDF
export const downloadCardAsPDF = async (
  element: HTMLElement,
  filename: string
) => {
  try {
    // Wait for any animations to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add clean download class to remove problematic styles
    element.classList.add("download-clean");

    // Wait for styles to apply
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Force exact dimensions to prevent cropping and remove padding
    const originalStyle = {
      width: element.style.width,
      minWidth: element.style.minWidth,
      maxWidth: element.style.maxWidth,
      boxShadow: element.style.boxShadow,
      padding: element.style.padding,
      margin: element.style.margin,
      borderRadius: element.style.borderRadius,
    };

    element.style.width = "900px";
    element.style.minWidth = "900px";
    element.style.maxWidth = "900px";
    element.style.boxShadow = "none";
    element.style.padding = "0";
    element.style.margin = "0"; // Remove any margin that might cause white space
    element.style.borderRadius = "1rem"; // Ensure rounded corners

    // Wait for layout update
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Generate PNG data with exact dimensions and preserve rounded corners
    const dataUrl = await domtoimage.toPng(element, {
      quality: 1.0,
      bgcolor: "transparent",
      width: element.offsetWidth, // Use actual element width, not forced width
      height: element.offsetHeight,
      scale: 2,
      style: {
        "box-sizing": "border-box",
        overflow: "hidden", // Ensure rounded corners are preserved
        border: "none !important",
        "box-shadow": "none !important",
        outline: "none !important",
        padding: "0 !important",
        margin: "0 !important",
        "border-radius": "1rem !important", // Preserve rounded corners (rounded-2xl = 1rem)
      },
    });

    // Restore original styles
    element.style.width = originalStyle.width;
    element.style.minWidth = originalStyle.minWidth;
    element.style.maxWidth = originalStyle.maxWidth;
    element.style.boxShadow = originalStyle.boxShadow;
    element.style.padding = originalStyle.padding;
    element.style.margin = originalStyle.margin;
    element.style.borderRadius = originalStyle.borderRadius;
    element.classList.remove("download-clean");

    // Create new image to get proper dimensions
    const img = new Image();

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        try {
          const imgWidth = img.naturalWidth;
          const imgHeight = img.naturalHeight;

          // Calculate PDF size - compensate for the 2x scaling
          const actualWidth = imgWidth / 2;
          const actualHeight = imgHeight / 2;

          // Convert to PDF points with good quality
          const pdfWidth = actualWidth * 0.75; // 72 DPI conversion
          const pdfHeight = actualHeight * 0.75;

          // Create PDF with calculated dimensions
          const pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
            unit: "pt",
            format: [pdfWidth, pdfHeight],
          });

          // Add image to PDF with exact fit
          pdf.addImage(
            dataUrl,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight,
            undefined,
            "FAST"
          );

          // Save the PDF
          pdf.save(`${filename}.pdf`);
          console.log("PDF download completed successfully");
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error("Failed to load generated image"));
      };

      img.src = dataUrl;
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("PDF generation failed. Please try the HTML download instead.");
  }
};

const generateCompleteHTML = async (element: HTMLElement): Promise<string> => {
  // Get element dimensions
  const rect = element.getBoundingClientRect();

  // Extract all styles from the document
  const allStyles = await extractStyles();

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Clean up the cloned element
  cleanClonedElement(clonedElement);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RepoCard Export</title>
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #000;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-width: ${rect.width}px;
      width: 100%;
    }
    
    /* Extracted styles from the page */
    ${allStyles}
    
    /* Additional utilities */
    ${extractInlineStyles()}
    
    /* Ensure images are responsive */
    img {
      max-width: 100%;
      height: auto;
      display: inline-block;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="card-container">
    ${clonedElement.outerHTML}
  </div>
</body>
</html>`;
};

const cleanClonedElement = (element: HTMLElement) => {
  // Remove any problematic attributes or elements
  const removeAttributes = ["data-testid", "data-reactroot"];
  removeAttributes.forEach((attr) => {
    element.removeAttribute(attr);
  });

  // Clean up all child elements
  const allElements = element.querySelectorAll("*");
  allElements.forEach((el) => {
    removeAttributes.forEach((attr) => {
      el.removeAttribute(attr);
    });

    // Ensure images have alt attributes
    if (el.tagName === "IMG") {
      const img = el as HTMLImageElement;
      if (!img.alt) {
        img.alt = "";
      }
    }
  });
};

const extractStyles = async (): Promise<string> => {
  // Extract all CSS rules from stylesheets
  let allStyles = "";

  try {
    for (const stylesheet of Array.from(document.styleSheets)) {
      try {
        const rules = Array.from(stylesheet.cssRules || []);
        for (const rule of rules) {
          allStyles += rule.cssText + "\n";
        }
      } catch (e) {
        // Skip stylesheets that can't be accessed (CORS)
        console.warn("Could not access stylesheet:", e);
      }
    }
  } catch (e) {
    console.warn("Could not extract styles:", e);
  }

  return allStyles;
};

const extractInlineStyles = (): string => {
  return `
    /* Basic utility classes */
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .text-white { color: white; }
    .font-semibold { font-weight: 600; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  `;
};
