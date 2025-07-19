import html2canvas from 'html2canvas';

export const downloadCard = async (element: HTMLElement, filename: string) => {
  try {
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simple, reliable html2canvas configuration
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
      imageTimeout: 10000,
      removeContainer: true,
      // Minimal clone processing to avoid breaking layout
      onclone: (clonedDoc) => {
        // Fix all SVG icons alignment
        const svgElements = clonedDoc.querySelectorAll('svg');
        svgElements.forEach((svg) => {
          svg.style.display = 'inline-block';
          svg.style.verticalAlign = 'middle';
          svg.style.marginTop = '0';
          svg.style.marginBottom = '0';
        });

        // Fix all images including avatars and language logos
        const images = clonedDoc.querySelectorAll('img');
        images.forEach((img) => {
          img.style.display = 'inline-block';
          img.style.verticalAlign = 'middle';
          img.style.marginTop = '0';
          img.style.marginBottom = '0';
          img.crossOrigin = 'anonymous';
        });

        // Fix text alignment
        const textElements = clonedDoc.querySelectorAll('span, div, p, h1, h2, h3');
        textElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.lineHeight = '1.2';
          htmlEl.style.verticalAlign = 'middle';
        });

        // Fix flex containers
        const flexElements = clonedDoc.querySelectorAll('.flex');
        flexElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.alignItems = 'center';
        });

        // Fix grid containers
        const gridElements = clonedDoc.querySelectorAll('.grid');
        gridElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'grid';
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