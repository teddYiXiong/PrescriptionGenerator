/*----Initialize variables and Libraries----*/
const generateButton = document.getElementById('generateButton');
const saveImgButton = document.getElementById('saveImgButton');
const downloadButton = document.getElementById('downloadButton');
const nameInput = document.getElementById('nameInput');
const dateInput = document.getElementById('dateInput');
const betweenInput = document.getElementById('betweenInput');
const rxInput = document.getElementById('rxInput');
const testBtn1 = document.getElementById('testBtn1'); //Debug
const testBtn2 = document.getElementById('testBtn2'); //Debug
testBtn1.textContent = "Test Link"; //Debug
testBtn2.textContent = "Test Button 2"; //Debug
const debugTxtElement = document.getElementById('debugTxt'); //Debug
debugTxt.textContent = "Hello";

/*----- Buttons -----*/

generateButton.onclick = function () {
  debugTxt.textContent = "Generate clicked: ";
  let text = new Template(nameInput.value, dateInput.value, betweenInput.value, rxInput.value);
  debugTxt.textContent += `${text.name}, ${text.date}, ${text.between}, ${text.rx}`;
}

saveImgButton.onclick = async function () { //Deactivated
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

/*----- Generate PDF -----*/

function Template (name, date, between, rx) {
  this.name = name;
  this.date = date;
  this.between = between;
  this.rx = rx;
}

function findFormatTags (text) {
  //search for tags '{{', '{', '}}'
  return text;
}

function addFormat (text) {
  //identify format at index values
  //replace index values with format
  return text;
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