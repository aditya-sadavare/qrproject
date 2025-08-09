# Dynamic QR Scanner & URL Redirector

A full-stack application enabling user registration, QR code generation & management, and dynamic URL redirections—all built with **Node.js**, **Express**, **MongoDB**, **JWT**, and a **React** frontend.

---

## 🚀 Live Demo

Frontend & backend deployed at:  
[https://dynamicscanflow.vercel.app](https://dynamicscanflow.vercel.app)

---

## 🧩 Features

- 🔐 User registration & login with JWT authentication  
- ➕ Add and store original URLs per user  
- 📱 Generate unique QR codes (UIDs) for each URL  
- 🔄 Redirect via `/readqr/:uid` to original URL  
- 🖥️ User dashboard to view and update stored URLs  

---

## 📁 Project Structure

### Backend (`index.js`)
- **Express** server with CORS and JSON parsing  
- **Mongoose** models for Users (`regModel`) and QR entries (`qrModel`)  
- API Routes:
  - **POST** `/reg` – register new users  
  - **POST** `/login` – authenticate and issue JWT  
  - **POST** `/addqr` – add URL for current user  
  - **GET** `/readqr/:uid` – redirect to original URL  
  - **POST** `/home` – fetch user’s QR entries  
  - **PUT** `/updateurl` – update a stored URL  

### Frontend (`src/App.js` + components)
- **React** with React Router & React-Bootstrap UI  
- Pages:
  - **Login** – register/login, obtain JWT
  - **Home / Sidebar** – manage your URLs (add, view, update)
- **React-Toastify** for notifications

---

## ⚙️ Tech Stack

| Layer     | Technology                |
|----------|---------------------------|
| Backend  | Node.js, Express, Mongoose |
| Auth     | JWT (jsonwebtoken)        |
| Database | MongoDB Atlas             |
| Frontend | React, React Router, Bootstrap |
| UI       | React-Bootstrap, Toastify |

---
