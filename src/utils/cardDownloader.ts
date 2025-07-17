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
        // Fix all SVG icon alignment issues
        const icons = clonedDoc.querySelectorAll('svg');
        icons.forEach((icon) => {
          icon.style.verticalAlign = 'baseline';
          icon.style.display = 'inline-block';
          icon.style.transform = 'translateY(0)';
          icon.style.position = 'relative';
          icon.style.top = '0';
          icon.style.marginTop = '0';
          icon.style.marginBottom = '0';
        });

        // Fix all flex container alignment
        const flexElements = clonedDoc.querySelectorAll('*');
        flexElements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.display === 'flex') {
            (el as HTMLElement).style.alignItems = 'center';
            (el as HTMLElement).style.justifyContent = style.justifyContent;
          }
        });

        // Ensure all images have proper dimensions and alignment
        const images = clonedDoc.querySelectorAll('img');
        images.forEach((img) => {
          img.style.verticalAlign = 'middle';
          img.style.display = 'inline-block';
          img.style.transform = 'translateY(0)';
          img.style.position = 'relative';
          img.style.top = '0';
          // Force dimensions to prevent layout shifts
          if (img.offsetWidth && img.offsetHeight) {
            img.style.width = img.offsetWidth + 'px';
            img.style.height = img.offsetHeight + 'px';
          }
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