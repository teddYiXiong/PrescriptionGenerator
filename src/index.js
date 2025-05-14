//This file is for setting up the pdf.js library
const canvas = document.getElementById('pdfCanvas');
const pdfUrl = '/RxPad_2025.pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdf.worker.mjs';

pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc) { 
  pdfDoc.getPage(1).then(function (page) { 

    const viewport = page.getViewport({ scale: 1 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext('2d');
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    page.render(renderContext);
  });
}).catch(function (error) {
  console.log('Error loading pdf');
  document.getElementById('debugTxt').textContent = 'Error loading pdf';
});