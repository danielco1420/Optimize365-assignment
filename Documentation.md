# Optimize365 Assignment: "Who's That Pokémon?" Game

This project is a full-stack, monorepo web application that implements a classic "Who's That Pokémon?" guessing game. It uses npm workspaces to manage a backend Express API and a frontend client, spinning both up simultaneously using concurrently.

## Architecture & Tech Stack

The repository is structured as a monorepo containing two main workspaces:

Backend (/backend): A Node.js server powered by Express and written in TypeScript (index.ts). It runs on port 3000 and acts as a proxy/aggregator for the external PokeAPI.

Frontend (/frontend): A client-side web application (served on port 5173, indicating a tool like Vite is likely used) utilizing TypeScript/JavaScript (main.js/ts). It handles the UI, image obfuscation, and game logic.

## Key Features

Randomized Gameplay: The backend queries the PokeAPI for the total number of species, generates a random ID, and fetches a random Pokémon to ensure varied gameplay.

Visual Teasing: The frontend applies a CSS class (.silhouette) to hide the Pokémon's identity until a guess is submitted.

Fuzzy Guess Matching: The game normalizes user input and the official Pokémon name (stripping spaces, hyphens, and capitalization) so that minor formatting differences don't fail a correct guess (e.g., guessing "mr mime" works for "mr-mime").

Unified Startup: A single command runs both the backend server and frontend development server concurrently.

## Setup and Execution

Prerequisites: Node.js and npm installed.

Extract or clone the project folder.

Open a terminal in the root directory.

Install the dependencies for all workspaces:

```
npm install
```


Start the application (runs both frontend and backend):

```
npm run app
```


Open your browser and navigate to http://localhost:5173/ to play.

## API Reference

```
GET /api/fetch-data
```

Fetches a random Pokémon and returns its name and image URL.

Success Response (200 OK):

```
{
  "success": true,
  "name": "pikachu",
  "image": "https://raw.githubusercontent.com/PokeAPI/.../pikachu.png"
}
```


Error Response (500 Internal Server Error):

```
{
  "success": false,
  "error": "Failed to fetch data from the API"
}
```
