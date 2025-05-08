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
    const url = window.URL.createObjectURL(inputFile);
          
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = inputFilename; // The filename for the downloaded file
    document.body.appendChild(a);
    a.click();
      
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
      } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed. Please check console for details.');
      }
}
