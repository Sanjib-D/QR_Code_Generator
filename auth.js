//
// ⚠️ ======================================================================
// ⚠️  PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
// ⚠️  You get this from the Firebase console (Project Settings > General)
// ⚠️ ======================================================================
//
// Import the functions you need from the SDKs you need

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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

        // Are we on the login page?
        if (loginBox) {
            // Yes. Redirect them to the app (index.html).
            window.location.href = "index.html";
        }
        
        // Are we on the app page?
        if (appView) {
            // Yes. Show the app and hide loading.
            loadingView.style.display = "none";
            appView.style.display = "block";
            userEmailDisplay.textContent = user.email;

            // Now that the app is visible, initialize the QR script
            if (typeof initQRGenerator === 'function') {
                initQRGenerator();
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
