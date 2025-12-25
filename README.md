# E-commerce Platform – Full Documentation

## Author

**Nikoloz Gigiashvili**  – Full‑Stack Developer

## ⚠️ Disclaimer

This project was built **individually**, without a team. Every feature — backend, API logic, database design, email system, cart, orders, and DevOps setup — was implemented alone.

Because of that, some areas can be improved or expanded, but all decisions were made intentionally to simulate a **real production application**, not just a basic tutorial or example project.

DevOps deployment is ongoing, and a public demo may be released on free hosting platforms.

👀 Live Site: https://ecommerce-by-nikoloz.vercel.app/

---

---

## 📌 Overview

This repository contains a fully functional **Ecommerce Web Application** built using a modern full‑stack architecture. The project implements a complete shopping workflow including authentication, product management, cart operations, order placement, payment gateway preparation, email verification, and administrative tooling.

The goal of this project was to create an end‑to‑end ecommerce solution that mirrors real production systems — including backend REST APIs, a decoupled frontend, user security flows, and scalable architectural decisions.

---

## 🚀 Key Features

### **1. Authentication & User Management**

* User registration with email verification codes
* Secure login system
* JWT authentication (access & refresh tokens)
* Password hashing & validation
* Backend-side verification logic

### **2. Email Verification Flow**

* Email verification code generation
* Code expiration logic (2‑minute lifetime)
* Unique generation per user
* Mailgun/Gmail SMTP support (configurable)
* API endpoint for verification workflows

### **3. Product System**

* Product model with images, prices, and inventory
* Category-based organization
* Create, read, list, update APIs
* Optimized static/media handling

### **4. Shopping Cart**

* Add/remove items
* Automatic quantity validation
* Total price auto‑calculation
* Persistent cart states per user

### **5. Orders**

* Full order creation flow
* Backend validation for availability
* Order summary representation
* Shipping fields and address storage

### **6. Payments (WIP: DevOps Phase)**

* Payment integration preparation (PayPal/Stripe-ready)
* Secure transaction architecture designed
* Demo will be deployed on free hosting

### **7. Admin Tools**

* Django admin
* Superuser product management
* Order monitoring
* Verification logs

### **8. API Architecture**

* Django REST Framework
* CORS enabled for external frontend
* Organized app-level structure
* Serializers, views, and endpoints separated cleanly

---

## 🏗️ Tech Stack

**Backend:**

* Django
* Django REST Framework
* Pillow (media management)
* Django CORS Headers
* Mailgun / Gmail SMTP (email service)

**Frontend (separate project):**

* React
* Axios
* Context API
* Clean manually written CSS (no Tailwind)

**Infrastructure:**

* Virtual environments
* Git for version control
* Render / Vercel deployment preparations

---

## 📬 Email Verification System

### How it works

1. User enters email
2. Backend generates a **6-digit unique code**
3. Code is saved in database with expiration timestamp
4. Email is sent via Mailgun/Gmail
5. User submits code for verification
6. Backend validates code and activates user

### Security Considerations

* Codes expire in **120 seconds**
* Code is unique per user
* No plaintext passwords sent
* SMTP credentials stored in `.env`

---

## ⚙️ Installation

### Backend

```
git clone https://github.com/NikolozWDev/Ecommerce
cd Ecommerce
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 📡 Environment Variables

Create a `.env` file:

```
SECRET_KEY=your_key_here
DEBUG=True
EMAIL_HOST=smtp.mailgun.org
EMAIL_HOST_USER=postmaster@yourdomain.com
EMAIL_HOST_PASSWORD=your_generated_api_key
EMAIL_PORT=587
DEFAULT_FROM_EMAIL=Ecommerce <noreply@yourdomain.com>
```

---

## 🛠️ DevOps Status
OK
* SMTP configuration for production → pending
* Domain verification (Mailgun) → pending

A **free demo version** may be deployed after DevOps stages complete.
