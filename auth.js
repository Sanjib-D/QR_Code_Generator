//
// ⚠️ ======================================================================
// ⚠️  PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
// ⚠️  You get this from the Firebase console (Project Settings > General)
// ⚠️ ======================================================================
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC_wjN2s0ellxlMMh25Nw_HW--nv8F_I0",
  authDomain: "qr-generator-app-21e62.firebaseapp.com",
  projectId: "qr-generator-app-21e62",
  storageBucket: "qr-generator-app-21e62.firebasestorage.app",
  messagingSenderId: "165403782440",
  appId: "1:165403782440:web:53af715d0a24f0983af41d",
  measurementId: "G-LTZ6BMXD8W"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // Initialize Firestore
// === PAGE PROTECTION & AUTH LOGIC ===

// Get references to elements (they might not all exist on the current page)
const loadingView = document.getElementById("loading-view");
const appView = document.getElementById("app-view");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");
const userEmailDisplay = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");

// This observer is the core of the login system.
// It runs on *every page* that imports this script.
auth.onAuthStateChanged((user) => {
    if (user) {
        // --- User is LOGGED IN ---

        // Are we on the login page OR the signup page?
        if (loginBox || signupBox) { // <-- *** THIS IS THE ONLY CHANGE ***
            // Yes. Redirect them to the app (index.html).
            window.location.href = "index.html";
        }
        
        // Are we on the app page?
        if (appView) {
            // Yes. Show the app and hide loading.
            loadingView.style.display = "none";
            appView.style.display = "block";
            userEmailDisplay.textContent = user.email;
    // Accept user and db arguments
function initQRGenerator(user, db) {
    
    const generateBtn = document.getElementById("generateBtn");
    const qrTextInput = document.getElementById("qrText");
    const qrContainer = document.getElementById("qrContainer");
    const historyList = document.getElementById("history-list");

    let qrCode;

    // 1. Load History immediately
    loadHistory();

    function generateQRCode() {
        const text = qrTextInput.value;

        if (!text) {
            alert("Please enter some text or a URL.");
            return;
        }

        qrContainer.innerHTML = "";

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
        // We create a collection called 'users', go to the specific user ID, 
        // then a sub-collection called 'history'.
        db.collection("users").doc(user.uid).collection("history").add({
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("History saved");
        })
        .catch((error) => {
            console.error("Error adding history: ", error);
        });
    }

    // Function to Listen for updates from Firestore
    function loadHistory() {
        // This listener runs automatically whenever the database changes
        db.collection("users").doc(user.uid).collection("history")
        .orderBy("timestamp", "desc") // Show newest first
        .limit(10) // Limit to last 10 items (optional)
        .onSnapshot((snapshot) => {
            
            // Clear current list
            historyList.innerHTML = "";

            snapshot.forEach((doc) => {
                const data = doc.data();
                const li = document.createElement("li");
                
                // Create content
                li.innerHTML = `
                    <span>${data.text}</span>
                    <button class="history-btn" onclick="navigator.clipboard.writeText('${data.text}')">Copy</button>
                `;
                
                historyList.appendChild(li);
            });

            if(snapshot.empty) {
                historyList.innerHTML = "<p style='color:#888; font-size:0.8rem;'>No history yet.</p>";
            }
        });
    }

    generateBtn.addEventListener("click", generateQRCode);

    qrTextInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generateQRCode();
        }
    });
}

            // Now that the app is visible, initialize the QR script
            if (typeof initQRGenerator === 'function') {
    // Pass the user and database to the function
    initQRGenerator(user, db);
}
        }

    } else {
        // --- User is LOGGED OUT ---

        // Are we on the (protected) app page (index.html)?
        if (appView) {
            // Yes. Redirect them back to the login page.
            window.location.href = "login.html";
        }
        
        // (If we are on the login page, do nothing. Just let them log in.)
    }
});


// === EVENT LISTENERS ===
// (No changes needed to the rest of the file)

// Add signup listener (only if the button exists on this page)
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const errorEl = document.getElementById("auth-error-signup");
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Sign up successful, Firebase will auto-login
                // The onAuthStateChanged observer will handle the redirect.
                console.log("Sign up successful:", userCredential.user);
            })
            .catch((error) => {
                errorEl.textContent = error.message;
            });
    });
}

// Add login listener (only if the button exists on this page)
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const errorEl = document.getElementById("auth-error-login");

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login successful.
                // The onAuthStateChanged observer will handle the redirect.
                console.log("Login successful:", userCredential.user);
            })
            .catch((error) => {
                errorEl.textContent = error.message;
            });
    });
}

// Add logout listener (only if the button exists on this page)
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        auth.signOut().then(() => {
            // Sign out successful.
            // The onAuthStateChanged observer will redirect to login.
            console.log("User signed out.");
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    });
}
