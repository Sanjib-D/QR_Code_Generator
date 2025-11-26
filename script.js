// This function receives 'user' and 'db' from auth.js
function initQRGenerator(user, db) {
    
    const generateBtn = document.getElementById("generateBtn");
    const qrTextInput = document.getElementById("qrText");
    const qrContainer = document.getElementById("qrContainer");
    const historyList = document.getElementById("history-list");

    let qrCode;

    // 1. Load History immediately on startup
    loadHistory();

    function generateQRCode() {
        const text = qrTextInput.value;

        if (!text) {
            alert("Please enter some text or a URL.");
            return;
        }

        qrContainer.innerHTML = "";

        // Create QR Code
        qrCode = new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // 2. Save to Firestore
        addToHistory(text);
    }

    // Function to save data to Firestore
    function addToHistory(text) {
        // Save to: users -> [USER_ID] -> history -> [NEW_DOCUMENT]
        db.collection("users").doc(user.uid).collection("history").add({
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("History saved to database");
        })
        .catch((error) => {
            console.error("Error adding history: ", error);
            alert("Could not save history. Check console for details.");
        });
    }

    // Function to Listen for updates from Firestore
    function loadHistory() {
        // Real-time listener
        db.collection("users").doc(user.uid).collection("history")
        .orderBy("timestamp", "desc")
        .limit(10)
        .onSnapshot((snapshot) => {
            
            historyList.innerHTML = ""; // Clear list

            snapshot.forEach((doc) => {
                const data = doc.data();
                const li = document.createElement("li");
                
                // Build list item
                li.innerHTML = `
                    <span>${data.text}</span>
                    <button class="history-btn" onclick="navigator.clipboard.writeText('${data.text}')">Copy</button>
                `;
                
                historyList.appendChild(li);
            });

            if(snapshot.empty) {
                historyList.innerHTML = "<p style='color:#888; font-size:0.8rem; padding:10px;'>No history yet.</p>";
            }
        });
    }

    // Event Listeners
    generateBtn.addEventListener("click", generateQRCode);

    qrTextInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generateQRCode();
        }
    });
}
