## Project Structure

The project follows a specific structure to organize its files and directories.

```plaintext
src                                 # Root directory of the source code
├── index.ts                        # Entry point of the application
├── app.ts                          # Configuration and initialization of the application
├── controllers                     # Controllers to handle business logic
│   └── reformers.controller.ts     # Controller for reformers
├── databases                       # Database connection handling
│   └── connection.ts               # Database connection configuration
├── models                          # Definition of data models
│   └── reformer.model.ts           # Model for reformer
├── services                        # Contains business logic and database interactions
│   └── reformers.services.ts       # Handles operations related to reformers
└── routes                          # Definition of API routes
    └── reformers.routes.ts         # Routes for reformers
```