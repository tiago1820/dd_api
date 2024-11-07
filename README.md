<p align="center">
  <img src="https://www.worldhistory.org/uploads/images/14847.jpg?v=1709243469-0" alt="Descripción de la imagen">
</p>

*Original image by Henri Bouchard and Paul Landowski, uploaded by Celina Bebenek, published on November 11, 2021. Licensed under Creative Commons Attribution-ShareAlike (CC BY-SA). This license allows remixing, tweaking, and building upon the work, even for commercial purposes, as long as the original authors are credited and new creations are licensed under identical terms. Link to original content: https://www.worldhistory.org/image/14847/reformation-wall/.*

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
