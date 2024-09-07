# Hanami Manga

your cozy corner for discovering and reading your favorite manga! 🌸📚

## Features

- **Browse Manga:** Explore a vast amount of mangas.
- **Favorite Manga:** Soon.
- **Reading History:** Soon.
- **Profiles:** Soon.
- **Self-Hosted:** The website is self-hosted on Hetzner.

## Tech Stack

- **Front End:** [NextJS](https://nextjs.org/)
- **Back End:** [Rust](https://www.rust-lang.org/)
- **Data Source:** [Mangadex API](https://api.mangadex.org)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Bun
- Rust
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yorunoken/hanami-manga.git
   cd hanami-manga
   ```

2. Set up root:
    ```
    npm install
    ```

3. Configure environment variables:

    For the backend:
        - Navigate to the `backend` folder
        - Rename `.env.example` to `.env`
        - Open `.env` and fill in your Discord bot token:
        ```
        PORT=8000
        DATABASE_URL=sqlite://data.db
        ```

    For the frontend:
        - Navigate to the `frontend` folder
        - Rename `.env.example` to `.env`
        - The default configuration should work, but you can modify if needed:
        ```
        BACKEND_PORT=8000
        PORT=3000
        ```
        be sure to change the port value in `frontend/src/lib/index.ts` if you end up changing the port.

4. Install the front end dependencies:

   ```bash
   cd frontend && npm install
   ```

5. Build backend and frontend
    ```
    npm run build
    ```

### Usage

1. Start the server:

   ```bash
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:PORT` to see Hanami Manga in action!

## Deployment

**Hanami Manga** is self-hosted on Hetzner. Here are the general steps to deploy it:

1. Build the front end and back end as described in the [Installation](#installation) section.
2. Set up a reverse proxy (e.g., Nginx) to serve the front end and back end.
3. Ensure your server has the necessary environment variables and dependencies installed.

## Contributing

I welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeatureName`).
6. Open a pull request.

## Contact

For any questions or feedback, please reach out to me at [contact@yorunoken.com].

Enjoy your manga journey with Hanami Manga! 🌸💖
