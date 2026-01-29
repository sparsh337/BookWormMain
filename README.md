# BookWorm - Online Book Platform

A full-stack application for buying, selling, and managing books online with library subscriptions and digital shelf management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Database Configuration](#database-configuration)
- [OAuth2 Google Authentication](#oauth2-google-authentication)
- [API Documentation](#api-documentation)
- [Project Branches](#project-branches)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Management
- User registration and authentication with JWT tokens
- Google OAuth2 login integration
- User profile management
- Role-based access control (Admin, Customer)

### Book Management
- Browse and search books with advanced filtering
- Detailed book information with authors and genres
- Book ratings and reviews
- Multiple product types support

### Shopping & Orders
- Shopping cart functionality
- Secure checkout process
- Invoice generation and PDF download
- Order history and tracking
- Transaction management

### Library & Subscriptions
- Digital shelf for purchased books
- Library package subscriptions
- User library management
- Book attribute tracking (language, format, etc.)

### Admin Features
- Admin dashboard for content management
- User and order management
- Category and product management
- Library package administration
- Royalty transaction tracking

## 🛠 Tech Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Language:** Java
- **Database:** MySQL
- **Security:** Spring Security + JWT
- **ORM:** JPA/Hibernate
- **Build:** Maven
- **PDF Generation:** iText/Apache PDFBox

### Frontend
- **Framework:** React 18.x
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Styling:** CSS3
- **State Management:** Context API
- **Authentication:** JWT Token Storage

### DevOps
- **Version Control:** Git
- **Repository:** GitHub

## 📁 Project Structure

```
BookWorm/
├── Backend/
│   ├── BOOKWORM/                          # Spring Boot Application
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/example/
│   │   │   │   │   ├── aspect/            # AOP aspects
│   │   │   │   │   ├── config/            # Configuration classes
│   │   │   │   │   ├── controller/        # REST Controllers
│   │   │   │   │   ├── filter/            # Security filters
│   │   │   │   │   ├── model/             # JPA entities
│   │   │   │   │   ├── repository/        # Data access layer
│   │   │   │   │   ├── service/           # Business logic
│   │   │   │   │   └── util/              # Utility classes
│   │   │   │   └── resources/
│   │   │   │       ├── application.properties
│   │   │   │       └── images/
│   │   │   └── test/
│   │   ├── pom.xml
│   │   └── HELP.md
│   ├── Frontend/                          # React Application
│   │   ├── src/
│   │   │   ├── components/                # Reusable components
│   │   │   ├── pages/                     # Page components
│   │   │   ├── context/                   # Context API providers
│   │   │   ├── api/                       # API integration
│   │   │   └── assets/
│   │   ├── public/
│   │   │   └── images/
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── .gitignore                         # Git ignore rules
│   ├── .env.example                       # Environment variables template
│   └── README.md
```

## 📋 Prerequisites

### Required Software
- **Java:** JDK 11 or higher
- **Node.js:** v18 or higher
- **npm:** v9 or higher
- **MySQL:** v5.7 or higher
- **Git:** Latest version

### Accounts Required
- Google Cloud Console account (for OAuth2 credentials)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sparsh337/BookWormMain.git
cd BookWormMain/Backend
```

### 2. Backend Setup

#### Step 1: Configure Database

Update `BOOKWORM/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_testbookworm
spring.datasource.username=root
spring.datasource.password=YOUR_DATABASE_PASSWORD
```

#### Step 2: Setup Google OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new OAuth 2.0 application
3. Add authorized redirect URI: `http://localhost:8080/login/oauth2/code/google`
4. Copy Client ID and Client Secret
5. Update in `application.properties`:

```properties
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
```

#### Step 3: Install Backend Dependencies

```bash
cd BOOKWORM
mvn clean install
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

## ▶️ Running the Application

### Backend (Spring Boot)

```bash
cd BOOKWORM
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### Frontend (React + Vite)

```bash
cd Frontend
npm run dev
```

Frontend will start on: `http://localhost:5173`

### Production Build

**Frontend:**
```bash
npm run build
```

## 🗄 Database Configuration

### MySQL Setup

Create database:
```sql
CREATE DATABASE db_testbookworm;
```

Tables will be auto-created by Hibernate on first run (`ddl-auto=update`).

### Supported Entities
- User, Customer, Registration
- Product, Author, Genre, Language
- Cart, Invoice, Invoice Details
- Library Package, User Library
- Shelf, MyShelf
- Royalty Transactions
- And more...

## 🔐 OAuth2 Google Authentication

The application supports Google OAuth2 login:

1. **Frontend:** Click "Login with Google"
2. **Redirect:** User is redirected to Google consent screen
3. **Backend:** OAuth2LoginSuccessHandler processes the response
4. **JWT:** Token generated and stored for session management

Configure redirect URI in Google Console:
```
http://localhost:8080/login/oauth2/code/google
http://yourdomain.com/login/oauth2/code/google (production)
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Book Management
- `GET /api/products` - List all books
- `GET /api/products/{id}` - Get book details
- `POST /api/products` - Create book (Admin)
- `PUT /api/products/{id}` - Update book (Admin)

### Shopping
- `POST /api/cart/add` - Add to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/{id}` - Remove from cart
- `POST /api/invoice` - Create order

### User Library
- `GET /api/library/books` - Get user's books
- `GET /api/shelf` - Get user's shelf
- `POST /api/shelf` - Add book to shelf

### Admin
- `GET /api/admin/dashboard` - Admin metrics
- `GET /api/admin/users` - List users
- `GET /api/admin/orders` - List orders

**Full API documentation available at:** `http://localhost:8080/swagger-ui.html`

## 🌿 Project Branches

### Main Branch
- **Branch:** `main`
- **Status:** Production-ready
- **Contents:** Java Spring Boot backend + React frontend
- **Use:** Bug fixes and Java feature development

### .NET Branch
- **Branch:** `dotnet`
- **Status:** In development (coming soon)
- **Contents:** .NET implementation of the backend
- **Use:** .NET/C# development (separate from Java)

**To switch branches:**
```bash
git checkout main      # For Java/React development
git checkout dotnet    # For .NET development
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

### Code Standards
- Follow Java naming conventions
- Use meaningful variable/function names
- Add comments for complex logic
- Write unit tests for new features

## 🔒 Security Notes

- **Credentials:** Never commit `application.properties` with real credentials
- **JWT:** Tokens stored securely in localStorage
- **Database:** Use strong passwords in production
- **OAuth2:** Keep Client Secret confidential
- **CORS:** Configure appropriately for your domain

## 📝 Environment Variables

See `.env.example` and `application.properties.example` for all available configuration options.

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Check MySQL is running
- Verify credentials in `application.properties`
- Ensure database `db_testbookworm` exists

**OAuth2 Login Fails:**
- Verify Google Client ID and Secret
- Check redirect URI in Google Console matches configuration
- Clear browser cache and cookies

**Port Already in Use:**
- Change port in `application.properties`: `server.port=8081`
- Or kill process using the port

## 📄 License

This project is private and proprietary. All rights reserved.

## 📧 Contact

For issues or questions, please contact the development team.

---

**Happy Coding! 🚀**
