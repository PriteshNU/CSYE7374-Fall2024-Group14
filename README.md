## KnowledgeForge

KnowledgeForge is an innovative online platform designed to seamlessly manage and deliver a wealth of educational resources. This comprehensive hub serves as a dynamic repository for courses, learning materials, and educational content, providing users with a centralized and intuitive interface to explore and enhance their knowledge.



<p float="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" width="100" /> 
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" width="100" />
</p>

## Team Members

Pritesh Nimje <br>

### TECH USED
-   React
-   Node
-   Mongo db
-   Express
-   Redux
-   TailwindCSS
-   Mongoose

## DATABASE USED
- Mongo



## Following is the Entity Relation Diagram of the project

![Alt DDD](assets/KnowledgeForge.jpeg)

## Project Structure

The project is divided into two main folders:

### KnowledgeForge Server

This folder contains the backend of the application built with Node.js, Express, and MongoDB. It handles the API endpoints, database operations, and authentication.

### KnowledgeForge App

This folder contains the frontend of the application built with React.js. It handles the user interface, interactions, and communication with the backend server.

## Getting Started

### Prerequisites

- Node.js installed globally
- MongoDB installed and running

### Steps to Run the Server

1. **Set up Environment Variables**

    - In the `KnowledgeForge Server` directory, create a `.env` file.
    - Add necessary environment variables (e.g., database connection string,Port number API keys) following the `.env.example` file provided.

2. **Install Dependencies**

   ```bash
   cd KnowledgeForge_server
   npm install
   ```

3. **Run the Server**
   ```bash
   npm start
   ```
   This will start the backend server at `http://localhost:YourPort`.

### Steps to Run the Frontend App

1. **Install Dependencies**

   ```bash
   cd KnowledgeForge-app
   npm install
   ```

2. **Start the App**

   ```bash
   npm start
   ```

   This will launch the frontend application at `http://localhost:3000`.

3. **Connect to the Backend**
    - Ensure the backend server is running at the specified port.
    - Update the frontend's API endpoint configuration (if needed) to match the backend's address.

## Additional Notes

- Remember to restart the server or rebuild the frontend whenever you make changes.
- Refer to individual `README.md` files in each directory for more specific instructions.

## WEB Page Flow

**Register Page**

![Alt DDD](assets/RegisterPage.png)

**Home Page**

![Alt DDD](assets/HomePage.png)

**Login Page**

![Alt DDD](assets/LoginPage.png)

**Course detail for non enrolled users**

![Alt DDD](assets/EnrollNow.png)

**Course Details Page**

![Alt DDD](assets/CourseDetails.png)

**Module Completion**

![Alt DDD](assets/ModuleCompleted.png)

**Add Course Page for instructor**

![Alt DDD](assets/AddCourse.png)

**Internationalization**

![Alt DDD](assets/Internationalization.png)

**Settings Page**

![Alt DDD](assets/Settings.png)

**Team**

![Alt DDD](assets/Team.png)
