# 📚 BookWorm

BookWorm is a full-stack e-commerce and library management application designed for book lovers. It allows users to browse, purchase, rent, and manage books in their personal digital library. The platform features a responsive React frontend and a robust Spring Boot backend.

## 🚀 Features

*   **User Authentication**: Secure sign-up and login, including Google OAuth2 integration.
*   **Book Browsing**: Search and filter books by genre, author, and more.
*   **E-commerce**: Add books to cart, checkout, and purchase functionality (generating PFD invoices).
*   **Library Management**: "My Shelf" feature to view purchased books.
*   **Renting System**: Rent books for a specific period.
*   **Membership Plans**: Subscribe to library plans (Silver, Gold, Platinum).
*   **Admin Dashboard**: Manage books, users, and orders.
*   **Responsive Design**: Modern UI built with React and Tailwind/CSS.

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite), JavaScript, HTML5, CSS3, Axios
*   **Backend**: Java (Spring Boot), Spring Security, Spring Data JPA
*   **Database**: MySQL
*   **Containerization**: Docker, Docker Compose
*   **Build Tools**: Maven (Backend), npm (Frontend)

## 📋 Prerequisites

Ensure you have the following installed:

*   **Java 17+**
*   **Node.js (v16+) & npm**
*   **MySQL Server**
*   **Docker Desktop** (Optional, for containerized run)

---

## ⚙️ Configuration & Secrets (CRITICAL)

**IMPORTANT:** This repository does **NOT** contain sensitive credentials (database passwords, API keys, etc.). You must create the following configuration files manually before running the application.

### 1. Backend Secrets (`application-secret.properties`)

Create a file named `application-secret.properties` in the following directory:
`Backend/BOOKWORM/src/main/resources/`

Add your secrets to this file:

```properties
# Database Password
spring.datasource.password=YOUR_DB_PASSWORD

# Google OAuth2 Client Secret
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET

# Email Service Password (App Password for Gmail)
spring.mail.password=YOUR_EMAIL_APP_PASSWORD
```

### 2. Docker Secrets (`.env`)

If running with Docker, create a `.env` file in the `Backend/` directory:

```env
# MySQL Database Password
DB_PASSWORD=YOUR_DB_PASSWORD
```

---

## 🏃‍♂️ Running Locally (Manual Setup)

### 1. Database Setup
1.  Create a MySQL database named `bookworm_master`.
2.  Import the initial data from `seed_data.sql` located in the root directory.

### 2. Backend (Spring Boot)
Open a terminal in `Backend/BOOKWORM`:

```bash
# Clean and install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Frontend (React)
Open a new terminal in `Backend/Frontend`:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
The frontend will start on `http://localhost:5173` (or as specified).

---

## 🐳 Running with Docker

This is the easiest way to run the full stack (Database + Backend + Frontend).

1.  Ensure Docker Desktop is running.
2.  Navigate to the `Backend/` directory.
3.  Ensure you have created the `.env` file as described in the **Configuration** section.
4.  Run:

```bash
docker-compose up --build
```

Access the application at `http://localhost:3000`.

---

## 📂 Project Structure

```text
/
├── Backend/
│   ├── .env                    (Docker environment variables - Create manually!)
│   ├── docker-compose.yml      (Docker orchestration)
│   ├── HOW_TO_RUN_DOCKER.md    (Docker instructions)
│   ├── database/               (Database initialization scripts)
│   ├── BOOKWORM/               (Spring Boot Backend)
│   │   ├── Dockerfile          (Backend container definition)
│   │   ├── pom.xml             (Maven dependencies)
│   │   ├── mvnw / mvnw.cmd     (Maven Wrapper)
│   │   └── src/                (Java source code)
│   │       ├── main/
│   │       │   ├── java/com/example/
│   │   │   │   │   ├── config/     (Security, CORS, & App Config)
│   │   │   │   │   ├── controller/ (REST API Controllers)
│   │   │   │   │   ├── dto/        (Data Transfer Objects)
│   │   │   │   │   ├── model/      (JPA Entities)
│   │   │   │   │   ├── repository/ (Data Access Layer)
│   │   │   │   │   ├── service/    (Business Logic)
│   │   │   │   │   └── util/       (Utility Classes like JWT)
│   │       │   └── resources/
│   │       │       ├── application.properties        (Main config)
│   │       │       └── application-secret.properties (Secrets - Create manually!)
│   └── Frontend/               (React Frontend)
│       ├── Dockerfile          (Frontend container definition)
│       ├── nginx.conf          (Nginx configuration for production)
│       ├── package.json        (Npm dependencies)
│       ├── vite.config.js      (Vite configuration)
│       ├── public/             (Static assets)
│       └── src/                (React source code)
│           ├── api/            (Axios instances & API calls)
│           ├── components/     (Reusable UI components)
│           ├── context/        (React Context for Auth, Cart, etc.)
│           ├── pages/          (Application pages like Login, Library, etc.)
│           └── App.jsx         (Main application component)
├── media/                      (External Media Storage)
│   ├── audiobooks/             (MP3 files)
│   ├── covers/                 (Book cover images)
│   └── ebooks/                 (PDF files)
├── seed_data.sql               (Initial database schema & data)
└── README.md                   (Project documentation)
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---
**Note**: The implementation details for external file storage are configured in `application.properties` pointing to the `../media` directory relative to the backend execution context.
