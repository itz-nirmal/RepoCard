import html2canvas from 'html2canvas';

export const downloadCard = async (element: HTMLElement, filename: string) => {
  try {
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    // Configure html2canvas for better rendering
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      // Better text rendering
      letterRendering: true,
      // Use DOM rendering instead of foreign object
      foreignObjectRendering: false,
      // Custom clone processing
      onclone: (clonedDoc, element) => {
        // Fix all text elements
        const allTextElements = clonedDoc.querySelectorAll('*');
        allTextElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            // Ensure proper text rendering
            htmlEl.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            htmlEl.style.webkitFontSmoothing = 'antialiased';
            htmlEl.style.mozOsxFontSmoothing = 'grayscale';
            
            // Fix line height and spacing
            if (htmlEl.tagName === 'DIV' || htmlEl.tagName === 'SPAN' || htmlEl.tagName === 'P') {
              htmlEl.style.lineHeight = '1.2';
              htmlEl.style.letterSpacing = 'normal';
            }
          }
        });

        // Fix all SVG icons
        const svgElements = clonedDoc.querySelectorAll('svg');
        svgElements.forEach((svg) => {
          svg.style.display = 'inline-block';
          svg.style.verticalAlign = 'middle';
          svg.style.flexShrink = '0';
        });

        // Fix all images
        const images = clonedDoc.querySelectorAll('img');
        images.forEach((img) => {
          img.style.display = 'inline-block';
          img.style.verticalAlign = 'middle';
          img.style.flexShrink = '0';
        });

        // Fix flex containers
        const flexElements = clonedDoc.querySelectorAll('.flex');
        flexElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.gap = htmlEl.style.gap || '0.5rem';
        });

        // Fix grid containers
        const gridElements = clonedDoc.querySelectorAll('.grid');
        gridElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'grid';
        });

        // Ensure proper spacing
        const spacingElements = clonedDoc.querySelectorAll('[class*="gap-"], [class*="space-"]');
        spacingElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.classList.contains('gap-2')) {
            htmlEl.style.gap = '0.5rem';
          } else if (htmlEl.classList.contains('gap-3')) {
            htmlEl.style.gap = '0.75rem';
          } else if (htmlEl.classList.contains('gap-4')) {
            htmlEl.style.gap = '1rem';
          }
        });
      }
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 1.0);

  } catch (error) {
    console.error('Error downloading card:', error);
    alert('Download failed. Please try again.');
  }
};