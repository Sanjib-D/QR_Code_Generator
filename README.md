# 🔳 QR Code Generator (with Firebase Authentication)

A **web-based QR Code Generator** that allows users to create QR codes for any text or URL. It features **User Accounts** to keep your data safe and a **History Tab** to track your past generations.

---

## 🚀 Features

- **Firebase Authentication**
  - Sign up, login, and logout functionality.
  - Redirects unauthorized users to the login page.
- **QR Code Generation**
  - Enter any text or URL to generate a custom QR code instantly.
- **Generation History (New!)**
  - Automatically saves every QR code you generate.
  - **Cloud Sync:** History is saved to your account (Firestore), so you can see it on any device.
  - **Quick Action:** One-click "Copy" button to retrieve old links.
- **Protected Access**
  - Only logged-in users can access the generator and their personal history.
- **Responsive UI**
  - Works on both desktop and mobile browsers.

---

## 🧩 Tech Stack

- **HTML5, CSS3, JavaScript**
- **Firebase Authentication** (User management)
- **Firebase Cloud Firestore** (Real-time database for history)
- **QRCode.js** (Library for generating QR codes)

---

## 📁 Project Structure

```
QR_Code_Generator/
│
├── index.html         # Main App (Generator + History)
├── login.html         # Login Page
├── signup.html        # Sign Up Page
├── script.js          # Handles QR generation & History logic
├── auth.js            # Firebase config & authentication logic
├── style.css          # Styling for the pages
└── README.md          # Project documentation
```
---

## Login & Generate

- Create a new account on the **Sign Up** form.  
- After successful login, you’ll be redirected to the **QR Generator** page.  
- Enter any text or URL → click **Generate QR Code**.

---



## 🔒 Authentication Flow

| Page | Access | Behavior |
|------|---------|-----------|
| `login.html` | Public | Allows login |
| `signup.html` | Public | Allows account creation |
| `index.html` | Protected | Redirects to login if user not signed in |
| **Database** | Private | Users can only read/write their own history |

---


## 👨‍💻 Author

**Sanjib Das**  
GitHub: [@Sanjib-D](https://github.com/Sanjib-D)
