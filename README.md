# Nexus Estate

Nexus Estate is a Real Estate web application built using the MERN (MongoDB, Express, React, Node.js) stack. It provides a platform for users to browse, list, and manage properties with advanced authentication and search functionality.

## Features
- **Property Listings** – Users can create, view, update, and delete property listings.
- **User Management** – Authentication and authorization for users to manage their properties.
- **Advanced Search** – Search functionality to filter properties based on various criteria.
- **CRUD Operations** – Full implementation of Create, Read, Update, and Delete for properties.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/nexus-estate.git
   cd nexus-estate
   ```

2. Install dependencies for both client and server:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory and add necessary credentials like MongoDB URI, JWT Secret, etc.

4. Start the development server:
   ```sh
   cd server
   npm start
   ```

5. Start the frontend:
   ```sh
   cd client
   npm start
   ```

## Usage
- Users can register and log in.
- Property owners can create and manage their listings.
- Visitors can browse and search for properties.
