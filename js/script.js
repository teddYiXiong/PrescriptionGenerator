/*----Initialize variables----*/
const saveImgButton = document.getElementById('saveImgButton');
const downloadButton = document.getElementById('downloadButton');
const testBtn1 = document.getElementById('testBtn1'); //Debug
const testBtn2 = document.getElementById('testBtn2'); //Debug
testBtn1.textContent = "Test Link"; //Debug
testBtn2.textContent = "Test Button 2"; //Debug
const debugTxtElement = document.getElementById('debugTxt'); //Debug


downloadButton.onclick = async function () {
  try {  
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

testBtn1.onclick = async function() {
  try {  
    debugTxt.textContent = "TestBtn1";

    const response = await fetch('images/rxpad/RxPad_2025.pdf');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const blob = await response.blob();
    
    const fileUrl = window.URL.createObjectURL(blob);
    debugTxt.textContent = fileUrl;
    //window.open(fileUrl, '_blank');
    const tempLink = document.createElement('a');
    tempLink.href = fileUrl;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener noreferrer';
    tempLink.download = 'Test.pdf';  //Filename
    document.body.appendChild(tempLink);
    tempLink.click();
  } catch {
    console.error('Fetch Request Failed', error);
    alert('Fetch Failed. Please try again.');
  }
}

testBtn2.onclick = function() {
  debugTxt.textContent = "TestBtn2";
}