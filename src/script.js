/*----Initialize variables and Libraries----*/
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("lib/pdf.worker.mjs", window.location.href).href;

const nameInput = document.getElementById('nameInput');
const dateInput = document.getElementById('dateInput');
const betweenInput = document.getElementById('betweenInput');
const rxInput = document.getElementById('rxInput');

const generateButton = document.getElementById('generateButton');
const downloadButton = document.getElementById('downloadButton');

const pdfCanvas = document.getElementById('pdfCanvas');

const testBtn1 = document.getElementById('testBtn1'); //Debug
const testBtn2 = document.getElementById('testBtn2'); //Debug
testBtn1.textContent = "Test Link"; //Debug
testBtn2.textContent = "Display PDF"; //Debug
const debugTxtElement = document.getElementById('debugTxt'); //Debug
debugTxt.textContent = "Hello";

/*----- Buttons -----*/

generateButton.onclick = function () {
  debugTxt.textContent = "Generate clicked: ";
  let text = new Template(nameInput.value, dateInput.value, betweenInput.value, rxInput.value);
  debugTxt.textContent += `${text.name}, ${text.date}, ${text.between}, ${text.rx}`;
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

async function generatePdf () {
  try {  
    const response = await fetch('RxPad_2025.pdf');
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

/*----- Display PDF -----*/

async function displayPdf (pdfUrl) {

  debugTxt.textContent += ", inside displayPdf()";
  console.log("inside displayPdf()");

  pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc) { 
  pdfDoc.getPage(1).then(function (page) { 

    debugTxt.textContent += ", displayPdf() found page";
    console.log("displayPdf() found page");

    const viewport = page.getViewport({ scale: 1 });
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;

    const ctx = pdfCanvas.getContext('2d');
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    page.render(renderContext);
  });
}).catch(function (error) {
  console.log('Error loading pdf: ' + error);
  document.getElementById('debugTxt').textContent = 'Error loading pdf: ' + error.message;
});
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
    tempLink.download = inputFilename;  //Filename
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

    const response = await fetch('RxPad_2025.pdf');
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

testBtn2.addEventListener('click', async () => {
  try {
    debugTxt.textContent = "DisplayPdf clicked";
    console.log("DisplayPdf clicked");

    const pdfUrl = new URL("RxPad_2025.pdf", window.location.href).href;

    debugTxt.textContent += ", trying to fetch URL: " + pdfUrl;
    console.log(", trying to fetch URL: " + pdfUrl);

    await displayPdf(pdfUrl);
  }
  catch (error) {
    debugTxt.textContent += ", Failed to display pdf: " + error.message;
    console.log("failed to display pdf:" + error);
  }
});