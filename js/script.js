/*----Initialize variables and Libraries----*/
const saveImgButton = document.getElementById('saveImgButton');
const downloadButton = document.getElementById('downloadButton');
const testBtn1 = document.getElementById('testBtn1'); //Debug
const testBtn2 = document.getElementById('testBtn2'); //Debug
testBtn1.textContent = "Test Link"; //Debug
testBtn2.textContent = "Test Button 2"; //Debug
const debugTxtElement = document.getElementById('debugTxt'); //Debug
debugTxt.textContent = "Hello";

/*----- Buttons -----*/

saveImgButton.onclick = async function () {
 try {  
    debugTxt.textContent = 'Save Button Clicked';
    const blob = await generatePdf();
    savePdfToPhotos(blob);
  } catch {
    console.error('Failed to save image', error);
    alert('Failed to save image.');
  }
}

downloadButton.onclick = async function () {
  try {  
    const blob = await generatePdf();
    downloadFile(blob, "Test_RxPad.pdf");

  } catch {
    console.error('generatePdf() failed', error);
    alert('Could not generate PDF.');
  }
}

async function generatePdf () {
  try {  
    const response = await fetch('images/rxpad/RxPad_2025.pdf');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    return blob;

  } catch {
    console.error('Fetch Request Failed', error);
    alert('Download failed. Please try again.');
  }
}

/*----- Save File -----*/

async function savePdfToPhotos(pdfUrlOrData) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.min.mjs';
    debugTxt.textContent += ", Function 1 check";
    
    // Load the PDF
    let loadingTask;
    if (pdfUrlOrData instanceof Uint8Array) {
      loadingTask = pdfjsLib.getDocument({data: pdfUrlOrData});
    } else {
      loadingTask = pdfjsLib.getDocument(pdfUrlOrData);
    }
    
    const pdf = await loadingTask.promise;
    
    // Get the first page (or loop through all pages if you want)
    const page = await pdf.getPage(1);
    
    // Set scale for good quality
    const viewport = page.getViewport({scale: 2.0});
    
    // Create canvas for rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render PDF page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    // Convert canvas to image data
    canvas.toBlob(async (blob) => {
      try {
        // For iOS, we need to use the WebKit-specific API
        if (window.webkit && window.webkit.messageHandlers) {
          // This is for iOS webview apps - needs native bridge
          console.log("Need native implementation for iOS webview");
        } else {
          // For Safari on iOS
          const imageData = await canvas.toDataURL('image/jpeg');
          await saveToPhotos(imageData);
        }
      } catch (error) {
        console.error("Error saving to photos:", error);
        fallbackSave(blob);
      }
    }, 'image/jpeg', 0.95);
    
  } catch (error) {
    console.error("Error processing PDF:", error);
  }
}

async function saveToPhotos(imageData) {
  // For iOS Safari, we can use the share API as a workaround
  if (navigator.share) {
    try {
      // Convert data URL to blob
      const blob = await (await fetch(imageData)).blob();
      const file = new File([blob], 'image.jpg', {type: 'image/jpeg'});
      
      await navigator.share({
        files: [file],
        title: 'Save to Photos'
      });
    } catch (error) {
      console.error("Error sharing:", error);
      fallbackSave(imageData);
    }
  } else {
    // Fallback for non-share API browsers
    fallbackSave(imageData);
  }
}

function fallbackSave(blobOrData) {
  // Create download link
  const a = document.createElement('a');
  if (blobOrData instanceof Blob) {
    a.href = URL.createObjectURL(blobOrData);
  } else {
    a.href = blobOrData;
  }
  a.download = 'image.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


async function downloadFile (inputFile, inputFilename) {
  try {     
    const fileUrl = window.URL.createObjectURL(inputFile);
          
    // Create a temporary anchor element to trigger download
    const tempLink = document.createElement('a');
    tempLink.href = fileUrl;
    tempLink.target = '_blank'; // Important for iOS
    tempLink.rel = 'noopener noreferrer';
    //tempLink.download = inputFilename;  //Filename
    console.log(inputFilename);
    document.body.appendChild(tempLink);
    tempLink.click();

    // Remove objects created
    window.URL.revokeObjectURL(fileUrl);
    document.body.removeChild(tempLink);
      } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed in downloadFile function');
      }
}

/*----- Debug Buttons -----*/

testBtn1.onclick = async function() {
  try {  
    debugTxt.textContent = "TestBtn1";

    const response = await fetch('images/rxpad/RxPad_2025.pdf');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const blob = await response.blob();
    
    downloadFile(blob, 'Testpdf.pdf');
  } catch {
    console.error('Fetch Request Failed', error);
    alert('Fetch Failed. Please try again.');
  }
}

testBtn2.onclick = function() {
  debugTxt.textContent = "TestBtn2";
}