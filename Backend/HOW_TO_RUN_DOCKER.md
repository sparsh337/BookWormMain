# How to Run BookWorm Application (Dockerized)

This guide explains how to start, stop, and manage the BookWorm application using Docker.

## Prerequisites
- Docker Desktop must be installed and running.

## 1. Starting the Application
To start the entire application (Database, Backend, and Frontend), open your terminal in the `Backend` directory (where `docker-compose.yml` is located) and run:

```powershell
docker-compose up -d
```

- **`-d`**: Runs the containers in "detached" mode (in the background), so they don't lock up your terminal.
- **Access the App**: Once running, open your browser to **[http://localhost:3000](http://localhost:3000)**.

## 2. Stopping the Application
To stop the application and remove the containers:

```powershell
docker-compose down
```

## 3. Applying Code Changes
If you make changes to the code (Frontend or Backend), you need to rebuild the containers for the changes to take effect.

### If you changed Frontend code only:
```powershell
docker-compose up -d --build frontend
```

### If you changed Backend code only:
```powershell
    docker-compose up -d --build backend
```

### If you changed both or are unsure:
```powershell
docker-compose up -d --build
```

## 4. Resetting the Database (Optional)
If you need to completely wipe the database and start fresh (WARNING: this deletes all data):

1. Stop the app: `docker-compose down`
2. Remove the volume: `docker volume rm backend_db_data` (Check exact name with `docker volume ls`)
3. Restart: `docker-compose up -d`

## Troubleshooting
- **Logs**: If something isn't working, check the logs:
    - Backend logs: `docker logs -f bookworm_backend`
    - Frontend/Nginx logs: `docker logs -f bookworm_frontend`
- **Rebuild**: If weird issues persist, try forcing a rebuild: `docker-compose up -d --build --force-recreate`
