# Customer Layout (React Application)

The **Customer Layout** is a React-based user interface designed for seamless customer interaction with the Supply Chain Management Platform. This lightweight front-end application enables customers to browse products, place orders, and track deliveries.

---

## 🛠 Setup Instructions

### Prerequisites
- Ensure **Node.js** and **npm** are installed on your machine.

### Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Application**:
   ```bash
   npm start
   ```

3. **API Connectivity**:
   - Firt make sure follow the guide on API repo [here](https://github.com/DBMS-CS3043-GROUP-38/SCMS-API) to setup the API server.
   - Ensure the **API server** and the hosting machine for this application are on the same network.
   - The application is configured to connect to the API server via the following code in `src\services\apiService.js`:
     ```javascript
     import axios from "axios";

     const BASE_URL = `http://${window.location.hostname}:3000/customer`;
     ```
   - If the API server runs on a different port or IP address, update this setting accordingly.

4. **Serve the Application**:
    - To serve the application for production, run:
      ```bash
      npm run build
      ```
    - This will create a production build in the `build` directory.

5. **Deploy the Application**:
    - Deploy the contents of the `build` directory to a web server to host the application.

---

## 🔧 Troubleshooting

### API Connection Issues
- If the application cannot connect to the API server:
  1. Verify that the API server is running.
  2. Ensure the port and hostname in `src\services\apiService.js` are correct.
  3. If the API and application are on different networks, adjust the **CORS settings** in the backend API to allow cross-origin requests.

### CORS Adjustments (Backend)
- Update the backend API CORS configuration to allow secure connections:
  ```javascript
  const cors = require("cors");

  app.use(cors({
      origin: '*', // Replace with specific origin(s) for better security in production
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
  }));
  ```

---

## 🎨 User Interface Overview

### Login Page
- Existing customers can log in using the Login page.
![Login Page](/images/Screenshot%202024-12-11%20165846.png)

### Sign-Up Page
- New users can register using the Sign-Up page.
![Sign-Up Page](/images/image.png)

### Default Passwords
- If dummy data is added during setup, the default password for all customers is:
- Somehow need to check a username manually from the database
  ```
  Password@Customer
  ```

---

## 🧩 Contribution Guidelines

We welcome contributions to this React application. Please ensure you:
- Follow React and JavaScript best practices.
- Test your changes locally before submitting a pull request.
- Document any new features or components.

---