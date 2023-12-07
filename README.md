
# Social-Sync
SocialSync is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that provides a platform for users to share photos, connect with others, and engage in a social network experience.

## Features
- User Authentication: Secure sign-up, login, and logout functionality using JSON Web Tokens (JWT). 
- Photo Management: Users can upload, view, and manage their photos. Photos are stored on Cloudinary, and MongoDB stores the photo URLs.
- Social Interaction: Like photos, leave comments, follow/unfollow other users, and see following posts.
- Profile Management: Update, change, or remove the profile picture. View user profiles.
- Security Features: Passwords are hashed using bcrypt for enhanced security.

## Technologies Used
  + Frontend: React
  + Backend: Node.js, Express.js
  +  Database: MongoDB
  + Authentication: JSON Web Tokens (JWT), bcrypt for password hashing
  + Photo Storage: Cloudinary
  + Validation: Regex for email and password validity
  + Notifications: React-Toastify

### Prerequisites

  - Node.js and npm installed on your machine.
  - MongoDB installed locally or configured connection to a MongoDB instance.


### Installation

# Windows

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/socialsync.git
   ```

2. Change into the project directory:

   ```bash
   cd socialsync
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the `server` directory with the following:

     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```

5. Run the application:

   ```bash
   # In the server directory
   npm start

   # In the client directory
   npm start
   ```

## Linux

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/socialsync.git
   ```

2. Change into the project directory:

   ```bash
   cd socialsync
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the `server` directory with the following:

     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```

5. Run the application:

   ```bash
   # In the server directory
   npm start

   # In the client directory
   npm start
   ```

This guide provides instructions for both Windows and Linux systems, ensuring that users on different platforms can easily set up and run the SocialSync application.
## Usage

1. Open your browser and go to `http://localhost:5000` to access the application.
2. Sign up or log in to start using SocialSync.

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.




---



 
