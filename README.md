<p align="center">
  <img src="https://www.worldhistory.org/uploads/images/14847.jpg?v=1709243469-0" alt="Descripción de la imagen">
</p>

<p align="center">
  <a href="https://commons.wikimedia.org/wiki/File:ReformationsdenkmalGenf1.jpg">Reformation Wall</a> by <a href="https://www.picswiss.ch/Genf/GE-05-1.jpg">Roland Zumbühl</a>, licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.
</p>

## Project Structure

The project follows a specific structure to organize its files and directories.

```plaintext
src                                 # Root directory of the source code
├── index.ts                        # Entry point of the application
├── app.ts                          # Configuration and initialization of the application
├── controllers                     # Controllers to handle business logic
│   └── reformers.controller.ts     # Controller for reformers
│   └── locations.controller.ts     # Controller for locations
├── databases                       # Database connection handling
│   └── connection.ts               # Database connection configuration
├── models                          # Definition of data models
│   └── reformer.model.ts           # Model for reformer
│   └── location.model.ts           # Model for location
├── services                        # Contains business logic and database interactions
│   └── reformers.services.ts       # Handles operations related to reformers
│   └── locations.services.ts       # Handles operations related to locations
└── routes                          # Definition of API routes
    └── reformers.routes.ts         # Routes for reformers
    └── locations.routes.ts         # Routes for locations

```
