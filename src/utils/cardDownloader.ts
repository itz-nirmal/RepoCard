import html2canvas from 'html2canvas';

export const downloadCard = async (element: HTMLElement, filename: string) => {
  try {
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Configure html2canvas for perfect rendering
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      letterRendering: true,
      foreignObjectRendering: false,
      imageTimeout: 15000,
      removeContainer: true,
      // Custom clone processing to fix all rendering issues
      onclone: (clonedDoc, element) => {
        // Fix all text elements
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            // Ensure proper text rendering
            htmlEl.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            htmlEl.style.webkitFontSmoothing = 'antialiased';
            htmlEl.style.mozOsxFontSmoothing = 'grayscale';
            htmlEl.style.textRendering = 'optimizeLegibility';
            
            // Fix line height and spacing
            if (htmlEl.tagName === 'DIV' || htmlEl.tagName === 'SPAN' || htmlEl.tagName === 'P' || htmlEl.tagName === 'H1' || htmlEl.tagName === 'H2' || htmlEl.tagName === 'H3') {
              htmlEl.style.lineHeight = '1.4';
              htmlEl.style.letterSpacing = 'normal';
              htmlEl.style.wordSpacing = 'normal';
            }
          }
        });

        // Fix all SVG icons - ensure they render properly
        const svgElements = clonedDoc.querySelectorAll('svg');
        svgElements.forEach((svg) => {
          svg.style.display = 'inline-block';
          svg.style.verticalAlign = 'middle';
          svg.style.flexShrink = '0';
          svg.style.width = svg.getAttribute('width') || '16px';
          svg.style.height = svg.getAttribute('height') || '16px';
          svg.style.fill = 'currentColor';
          svg.style.stroke = 'currentColor';
          
          // Ensure all paths in SVG are properly styled
          const paths = svg.querySelectorAll('path');
          paths.forEach(path => {
            path.style.fill = 'currentColor';
            path.style.stroke = 'currentColor';
          });
        });

        // Fix all images including language logos and avatars
        const images = clonedDoc.querySelectorAll('img');
        images.forEach((img) => {
          img.style.display = 'inline-block';
          img.style.verticalAlign = 'middle';
          img.style.flexShrink = '0';
          img.style.objectFit = 'contain';
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          
          // Add crossorigin for external images
          img.crossOrigin = 'anonymous';
          
          // Handle broken images
          img.onerror = () => {
            img.style.display = 'none';
          };
        });

        // Fix flex containers
        const flexElements = clonedDoc.querySelectorAll('.flex');
        flexElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.justifyContent = htmlEl.classList.contains('justify-center') ? 'center' : 
                                       htmlEl.classList.contains('justify-between') ? 'space-between' : 'flex-start';
          
          // Set gap based on classes
          if (htmlEl.classList.contains('gap-1')) htmlEl.style.gap = '0.25rem';
          else if (htmlEl.classList.contains('gap-2')) htmlEl.style.gap = '0.5rem';
          else if (htmlEl.classList.contains('gap-3')) htmlEl.style.gap = '0.75rem';
          else if (htmlEl.classList.contains('gap-4')) htmlEl.style.gap = '1rem';
        });

        // Fix grid containers
        const gridElements = clonedDoc.querySelectorAll('.grid');
        gridElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'grid';
          
          if (htmlEl.classList.contains('grid-cols-2')) {
            htmlEl.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
          } else if (htmlEl.classList.contains('grid-cols-3')) {
            htmlEl.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
          }
          
          // Set gap
          if (htmlEl.classList.contains('gap-2')) htmlEl.style.gap = '0.5rem';
          else if (htmlEl.classList.contains('gap-3')) htmlEl.style.gap = '0.75rem';
          else if (htmlEl.classList.contains('gap-4')) htmlEl.style.gap = '1rem';
        });

        // Fix specific layout issues
        const languageItems = clonedDoc.querySelectorAll('[data-language-item]');
        languageItems.forEach((item) => {
          const htmlEl = item as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.gap = '0.5rem';
          htmlEl.style.padding = '0.5rem';
          htmlEl.style.borderRadius = '0.5rem';
          htmlEl.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        });

        // Fix contributor items
        const contributorItems = clonedDoc.querySelectorAll('[data-contributor-item]');
        contributorItems.forEach((item) => {
          const htmlEl = item as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.gap = '0.75rem';
          htmlEl.style.padding = '0.75rem';
          htmlEl.style.borderRadius = '0.5rem';
          htmlEl.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });

        // Ensure proper spacing and alignment for all text
        const textElements = clonedDoc.querySelectorAll('span, div, p, h1, h2, h3');
        textElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.whiteSpace = 'nowrap';
          htmlEl.style.overflow = 'hidden';
          htmlEl.style.textOverflow = 'ellipsis';
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