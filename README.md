Project Name
RealEstatePricing


Prerequisites
Docker ↗
Docker Compose ↗
Getting Started
Clone the repository:


git clone https://github.com/your-username/your-repo.git


Build and start the Docker containers:


docker-compose up --build
Access the web application at http://localhost:5173.

Project Structure
stylus

```
project-root/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── ...
├── backend/
│   ├── node_modules/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── ...
├── docker-compose.yml
└── README.md
```

frontend/ - Frontend source code.
backend/ - Backend source code.
docker-compose.yml - Docker Compose configuration file.
README.md - Project documentation.
Frontend
The frontend is built with Vite, Vue 3, and Flowbite.

Development
To run the frontend locally:

Create a .env file in the frontend/ directory with the following contents:

awk

VITE_API_BASE_URL=[http://localhost:3000/api ↗](http://localhost:3000/api)


This sets the [base URL](poe://www.poe.com/_api/key_phrase?phrase=base%20URL&prompt=Tell%20me%20more%20about%20base%20URL.) for [API requests](poe://www.poe.com/_api/key_phrase?phrase=API%20requests&prompt=Tell%20me%20more%20about%20API%20requests.) to the backend.

Install dependencies:


cd frontend/
npm install


Start the development server:


npm run dev
This will start the development server at http://localhost:8080.

Production
To build the frontend for production:

Create a .env file in the frontend/ directory with the following contents:


VITE_API_BASE_URL=http://your-api-url/api


This sets the base URL for API requests to the backend.

Install dependencies:


cd frontend/
npm install


Build the production bundle:


npm run build
This will generate a production-ready build in the frontend/dist/ directory.

Backend
The backend is built with Node.js and Express.js, and uses MySQL2 as the database driver.

Development
To run the backend locally:

Create a .env file in the backend/ directory with the following contents:


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=mydatabase
This sets the database configuration for the backend. You can customize these values as needed.

Install dependencies:

cd backend/
npm install
Start the development server:


npm run dev
This will start the development server at http://localhost:3000.

Production
To run the backend in production:

Create a .env file in the backend/ directory with the following contents:

DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_DATABASE=your-db-database
This sets the database configuration for the backend. You should replace the values with your actual database configuration.

Install dependencies:

cd backend/
npm install
Build the production bundle:

npm run build
This will generate a production-ready build in the backend/dist/ directory.

Docker
Docker is used to containerize the frontend, backend, and the MySQL database.

Docker Compose
The docker-compose.yml file contains the configuration for the Docker containers.

To build and start the Docker containers:

docker-compose up --build
This will build the Docker images and start the containers.

docker-compose up -d
This will build the Docker images and start the containers.


To stop the containers:

docker-compose down
License
MIT
