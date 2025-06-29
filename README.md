# Doctor–Patient Appointment Management System

A RESTful API built with Node.js, Express.js, TypeScript, and MongoDB to manage doctors, their services, availability, and patient appointments.

---

## Project Overview

This API allows:

- Doctors to register, manage services and availability, and handle appointment requests.
- Patients to register, browse doctors, view profiles and availability, and book appointments.
- Secure JWT-based authentication with role-based access control.

---

## Tech Stack

- Node.js & Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Zod for input validation
- (Optional) Cloudinary for image uploads

---

## Setup & Installation

### 1. Clone the repository

````bash
git clone https://github.com/jsjunayet/Dr.Tech_task
cd dr.tech_task

```

```bash
PORT=5000
MONGO_URI = mongodb+srv://Dr_tech_Task:FTss9bkAO4y7y9cs@cluster0.l4anbhy.mongodb.net
JWT_SECRET=s3cr3tDrTechJWTKey123!@
JWT_REFRESH_SECRET=s3cr3tDrTechJWTKey123!@

````

### 3. Server run

```bash
npm run dev
```
