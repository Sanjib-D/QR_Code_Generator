// This function is called by auth.js *after* Firebase confirms the user is logged in.
function initQRGenerator() {
    
    // Get references to the HTML elements on the index.html page
    const generateBtn = document.getElementById("generateBtn");
    const qrTextInput = document.getElementById("qrText");
    const qrContainer = document.getElementById("qrContainer");

    // Initialize a variable to hold the QR code object
    let qrCode;

    // Function to generate the QR code
    function generateQRCode() {
        // Get the text from the input field
        const text = qrTextInput.value;

        // If the text is empty, do nothing
        if (!text) {
            alert("Please enter some text or a URL.");
            return;
        }

        // Clear the container if a QR code already exists
        qrContainer.innerHTML = "";

        // Create a new QR Code
        qrCode = new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Add a click event listener to the button
    generateBtn.addEventListener("click", generateQRCode);

    // Optional: Allow pressing 'Enter' key in the input field to generate
    qrTextInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generateQRCode();
        }
    });
}