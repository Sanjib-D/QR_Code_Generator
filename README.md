# 🔳 QR Code Generator (with Firebase Authentication)

A simple **web-based QR Code Generator** that allows users to create QR codes for any text or URL — protected by **Firebase Authentication** (Sign up / Login system).

---

## 🚀 Features

- **Firebase Authentication**
  - Sign up, login, and logout functionality.
  - Redirects unauthorized users to the login page.
- **QR Code Generation**
  - Enter any text or URL to generate a custom QR code.
  - Auto-refreshes QR image on each generation.
- **Protected Access**
  - Only logged-in users can access the main generator page.
- **Responsive UI**
  - Works on both desktop and mobile browsers.

---

## 🧩 Tech Stack

- **HTML5, CSS3, JavaScript**
- **Firebase (Auth & Hosting ready)**
- **QRCode.js** library for generating QR codes

---

## 📁 Project Structure

```
QR_Code_Generator/
│
├── index.html         # Main QR code generator page (protected)
├── login.html         # Login and Sign Up page
├── script.js          # Handles QR code generation logic
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
| `login.html` | Public | Allows login/signup |
| `index.html` | Protected | Redirects to login if user not signed in |
| `logout` | Authenticated users | Signs out and returns to login page |

---


## 👨‍💻 Author

**Sanjib Das**  
GitHub: [@Sanjib-D](https://github.com/Sanjib-D)
