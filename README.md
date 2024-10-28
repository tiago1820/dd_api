## Project Structure

The project follows a specific structure to organize its files and directories.

```plaintext
src                                 # Root directory of the source code
├── index.ts                        # Entry point of the application
├── app.ts                          # Configuration and initialization of the application
├── controllers                     # Controllers to handle business logic
│   └── characters.controller.ts    # Controller for characters
├── databases                       # Database connection handling
│   └── connection.ts               # Database connection configuration
├── models                          # Definition of data models
│   └── characters.model.ts         # Model for characters
├── services                        # Contains business logic and database interactions
│   └── characters.services.ts      # Handles operations related to characters
└── routes                          # Definition of API routes
    └── characters.routes.ts        # Routes for characters
```