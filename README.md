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
   PORT=5000
   DB_URI=mongodb://127.0.0.1:27017/nerium
   BUCKET_NAME = 
   BUCKET_REGION = 
   ACCESS_KEY_ID = 
   SECRET_ACCESS_KEY= 
   NODE_ENV_S3 = dev
4. Run docker:
   ```bash
   docker-compose -f docker-compose-local.yaml up -d

### Scripts
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
   
