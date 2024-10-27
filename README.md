# AI Travel Planner

This project consists of a React-based frontend and a Python-based backend using crewAI. The application helps users plan their travel itineraries using AI assistance.

## Frontend

The frontend is built with React, TypeScript, and Vite.

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Frontend

To start the development server:

npm run dev

This will start the Vite development server, typically at `http://localhost:5173`.

### Building for Production

To create a production build:

npm run build

The built files will be in the `dist` directory.

### Other Scripts

- `npm run lint`: Run ESLint to check for code quality issues
- `npm run preview`: Preview the production build locally

## Backend

The backend is built with Python using crewAI.

### Prerequisites

- Python (version 3.10 to 3.13)
- Poetry (for dependency management)

### Installation

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies using Poetry:
   ```
   poetry install
   ```

### Running the Backend

To start the backend:

poetry run backend

This command runs the `run` function in the `backend.main` module.

## Development

### Frontend

The frontend uses the following key dependencies:

- React 18
- TypeScript
- Vite (for fast development and building)
- Tailwind CSS (for styling)
- Axios (for API requests)
- Lucide React (for icons)
- React Markdown (for rendering markdown content)

### Backend

The backend uses:

- crewAI (with additional tools)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
