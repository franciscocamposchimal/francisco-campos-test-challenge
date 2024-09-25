## Installation

Follow these steps to get your environment setup:

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   ```

2. Copy the `env.example` file to create your `.env` file:
   ```
   cp env.example .env
   ```

3. Obtain your Mercado Pago credentials and add them to the `.env` file.

4. Install project dependencies using `npm`:
   ```
   npm install
   ```

## Database Setup

The project uses a Dockerized database. You can start the database using Docker Compose.

1. Start the Docker containers:
   ```
   docker-compose up -d
   ```

2. To stop the containers:
   ```
   docker-compose down
   ```

## Running Migrations

Once the database is up, apply the database migrations:

1. Run the migrations using TypeORM:
   ```
   npm run typeorm migration:run
   ```

## Running the Project

Start the NestJS application with the following command:

1. For development:
   ```
   npm run start:dev
   ```

2. For production:
   ```
   npm run start:prod
   ```

The project should now be running at `http://localhost:3000`.

## Postman Collection

To easily test the API, a Postman collection is included in the repository.

1. The Postman collection is located at: `./postman/collection.json`.

2. To use it:
   - Import the collection into Postman.
   - Ensure the environment variables (e.g., base URL, API keys) are configured correctly in Postman.

3. You can run the requests against the API to verify functionality.

## Changelog

For details on version history, check the [CHANGELOG.md](./CHANGELOG.md).
