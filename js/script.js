document.getElementById("generate-btn").addEventListener("click", generatePrescription);

function generatePrescription() {
    const text = document.getElementById("prescription-text").value;
    const contentArea = document.getElementById("content-area");
    const previewContainer = document.getElementById("preview-container");
    
    if (!text.trim()) {
        alert("Please enter prescription text!");
        return;
    }
    
    // Insert text into the preview
    contentArea.textContent = text;
    previewContainer.classList.remove("hidden");
    
    // Generate PDF after a small delay (to allow rendering)
    setTimeout(() => {
        generatePDF();
    }, 500);
}

function generatePDF() {
    const element = document.getElementById("preview-container");
    
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });
        
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 dimensions (210x297mm)
        pdf.save("prescription.pdf");
    });
}


