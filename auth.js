// Firebase Configuration
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

// DOM Elements
const loadingView = document.getElementById("loading-view");
const appView = document.getElementById("app-view");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");
const userEmailDisplay = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");

// Auth Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is LOGGED IN
        if (loginBox || signupBox) {
            window.location.href = "index.html";
        }
        
        if (appView) {
            loadingView.style.display = "none";
            appView.style.display = "block";
            userEmailDisplay.textContent = user.email;

            // Initialize the QR script from script.js, passing user & db
            if (typeof initQRGenerator === 'function') {
                initQRGenerator(user, db);
            }
        }
    } else {
        // User is LOGGED OUT
        if (appView) {
            window.location.href = "login.html";
        }
    }
});

// Event Listeners for Login/Signup/Logout
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const errorEl = document.getElementById("auth-error-signup");
        
        auth.createUserWithEmailAndPassword(email, password)
            .catch((error) => { errorEl.textContent = error.message; });
    });
}

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const errorEl = document.getElementById("auth-error-login");

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => { errorEl.textContent = error.message; });
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        auth.signOut();
    });
}
