# CRM Programming School - Backend

## Description

Backend part of a CRM system for managing applications in a programming school.

## 🔐 Login Credentials

To log in, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `admin`


## 🛠 Tech Stack

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Minimal and flexible web framework for building RESTful APIs.
- **Mongoose**: ODM library for MongoDB, enabling schema-based data modeling.
- **Joi**: Powerful schema description and data validation library.
- **bcrypt**: Library for hashing and verifying passwords securely.
- **jsonwebtoken**: For generating and validating JWT access and refresh tokens.
- **cookie-parser**: Middleware to parse cookies in incoming requests.
- **nodemailer**: Module for sending emails from the server (e.g., for password recovery or verification).
- **exceljs**: Library for reading and writing Excel files (XLSX, XLS).
- **winston**: Versatile logging library with support for multiple transports.
- **http-status**: Provides readable constants for HTTP response status codes.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>

2. Navigate to the project directory:

   ```bash
   cd <project_name>

3. Install the necessary dependencies:

   ```bash
   npm install

4. Create a .env file in the root of your project with the following content:
   ```code
   PORT=5001
   URL="http://localhost:3000"

   DB_USER=lamda
   DB_PASSWORD=TUcDkfnHovkH4EET
   DB_NAME=ldatasorse

   BCRYPT_SALT_ROUNDS=10

   JWT_SECRET="secret"
   JWT_ACCESS_EXPIRES=60000
   JWT_REFRESH_EXPIRES=300000
   JWT_ACTION_EXPIRES=1800000

   COOKIE_SAMESITE=strict
   COOKIE_SECURE=true

   EMAIL_USER=project.for.test.and@gmail.com
   EMAIL_PASSWORD="hpsl saqz yvmg jbkt"

## Scripts
1. **Run in development mode**: This command uses nodemon to watch for file changes and automatically restart the server.
   ```bash
   npm run dev

2. **Build the project**: This will compile TypeScript into JavaScript in the dist folder.
   ```bash
   npm run build

3. **Start the server**: Starts the server from the compiled dist folder after running the build command.
   ```bash
   npm run start

4. **Run linter in the project**:
    ```bash
   npm run lint
   
5. **Run prettier in the project**:
    ```bash
   npm run prettier

## Testing
For testing use the postman collection: postman/Lamdan Copy.postman_collection.json

⚠️ **Note:** For testing purposes, the access and refresh token lifetimes are intentionally set to short durations.

## Live Demo
👉 [lamdan.vercel.app](https://lamdan.vercel.app/)

## Author

This test project was developed by **Volodymyr Fylypiv** as part of a development journey.
If you have any questions or suggestions, feel free to reach out:

- **Email**: [ratecurrent@gmail.com](mailto:ratecurrent@gmail.com)
- **Linkedin**: [linkedin.com](https://www.linkedin.com/in/volodymyr-fylypiv/)
- **GitHub**: [github.com/Filain](https://github.com/Filain)