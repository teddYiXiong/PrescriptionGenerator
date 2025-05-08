//Initialize variables
const downloadButton = document.getElementById('downloadButton');


downloadButton.onclick = async function () {
  try {  
    downloadButton.textContent = 'Click!';

    const response = await fetch('images/rxpad/RxPad_2025.pdf');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const blob = await response.blob();

    downloadFile(blob, "Test_RxPad.pdf");
  } catch {
    console.error('Fetch Request Failed', error);
    alert('Download failed. Please try again.');
  }
}

async function downloadFile (inputFile, inputFilename) {
  try {     
    const fileUrl = window.URL.createObjectURL(inputFile);
          
    // Create a temporary anchor element to trigger download
    const tempLink = document.createElement('a');
    tempLink.href = fileUrl;
    tempLink.target = '_blank'; // Important for iOS
    tempLink.rel = 'noopener noreferrer';
    tempLink.download = inputFilename;  //Filename
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
