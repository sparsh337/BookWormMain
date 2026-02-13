# Bookworm v7 - Deployment Guide

This document explains how to package and deploy the Bookworm backend application.

## 🛠️ 1. Building the Application

### Frontend (React + Vite)
Go to `Backend/Frontend` and run:
```bash
npm run build
```
This generates a `dist/` folder containing your production-ready website.

### Backend (Java + Spring Boot)
To create a JAR file, run the following command from the `Backend/BOOKWORM` directory:
```bash
mvn clean package -DskipTests
```
This will generate a JAR file in the `target/` directory.

> [!NOTE]
> **To serve the frontend from the backend (Single JAR):** Copy the contents of the frontend `dist/` folder into `Backend/BOOKWORM/src/main/resources/static/` before running the Maven package command.

## 📁 2. Recommended Deployment Structure
To keep things clean, it is recommended to create a dedicated "Release" or "Production" folder and structure it as follows:

```text
/Release/
  ├── bookworm.jar           (The compiled JAR from your target folder)
  └── media/                 (The external media folder)
        ├── ebooks/          (PDF files)
        ├── audiobooks/      (MP3 files)
        └── covers/          (JPG/PNG cover images)
```

## 🚀 3. How to Run the JAR File
Because different environments (local dev vs. server) might have the folders in different places, the best way to run the JAR is by passing the absolute path to the media folder as a command-line argument. This overrides whatever is set in the `application.properties` file.

### Run Command:
```bash
java -jar bookworm.jar --bookworm.media.path=./media/
```

> [!TIP]
> Using `./media/` works if the `media/` folder is in the same directory as the JAR file. For maximum reliability on a production server, you can provide the full absolute path such as `/opt/bookworm/media/`.

---
*Note: This setup uses "Strategy #1: External File System Storage" to keep the build artifacts lightweight and allow for dynamic content updates without recompilation.*
