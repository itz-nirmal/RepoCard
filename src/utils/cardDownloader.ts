import html2canvas from 'html2canvas';

export const downloadCard = async (element: HTMLElement, filename: string) => {
  try {
    // Wait a bit for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Configure html2canvas options for high quality and better text rendering
    const canvas = await html2canvas(element, {
      scale: 4, // Even higher scale for crisp rendering
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
      // Force hardware acceleration
      foreignObjectRendering: false,
      // Ignore elements that might cause issues
      ignoreElements: (element) => {
        return element.tagName === 'IFRAME' || element.tagName === 'SCRIPT';
      },
      // Custom image loading
      onclone: (clonedDoc) => {
        // Fix all icon and element alignment issues
        const icons = clonedDoc.querySelectorAll('svg');
        icons.forEach((icon) => {
          icon.style.verticalAlign = 'middle';
          icon.style.display = 'inline-block';
          icon.style.transform = 'translateY(-1px)';
        });

        // Fix all images (including language logos)
        const images = clonedDoc.querySelectorAll('img');
        images.forEach((img) => {
          img.style.verticalAlign = 'middle';
          img.style.display = 'inline-block';
          img.style.transform = 'translateY(-1px)';
          // Force dimensions to prevent layout shifts
          if (img.offsetWidth && img.offsetHeight) {
            img.style.width = img.offsetWidth + 'px';
            img.style.height = img.offsetHeight + 'px';
          }
        });

        // Fix all flex container alignment and text baseline
        const flexElements = clonedDoc.querySelectorAll('.flex');
        flexElements.forEach((el) => {
          (el as HTMLElement).style.alignItems = 'center';
          (el as HTMLElement).style.display = 'flex';
        });

        // Fix text alignment in flex containers
        const textElements = clonedDoc.querySelectorAll('span, div, p');
        textElements.forEach((el) => {
          (el as HTMLElement).style.lineHeight = '1';
          (el as HTMLElement).style.display = 'inline-block';
          (el as HTMLElement).style.verticalAlign = 'middle';
        });
      }
    });

    // Convert canvas to blob with high quality
    canvas.toBlob((blob) => {
      if (blob) {
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 1.0);

  } catch (error) {
    console.error('Error downloading card:', error);
    
    // Fallback: Try with different settings
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

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
      }, 'image/png', 0.95);

    } catch (fallbackError) {
      console.error('Fallback download also failed:', fallbackError);
      alert('Download failed. Please try again or check your browser settings.');
    }
  }
};