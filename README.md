# Hanami Manga

Your cozy corner for reading your favorite manga! 🌸📚

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
    bun install
    ```

3. Configure environment variables:

    For the backend:
        - Navigate to the `backend` folder
        - Rename `.env.example` to `.env`
        - Open `.env` and fill it in:
        ```
        LIBSQL_URL=
        LIBSQL_TOKEN=
        PORT=8000
        ```

    For the frontend:
        - Navigate to the `frontend` folder
        - Rename `.env.example` to `.env`
        ```
        BACKEND_PORT=8000
        PORT=3000
        DISCORD_CLIENT_ID= # Your Discord client ID. Can be found in `https://discord.com/developers/applications/ID/oauth2`
        DISCORD_CLIENT_SECRET= # Your Discord client secret. Can be found in `https://discord.com/developers/applications/ID/oauth2`
        NEXTAUTH_URL= # This will be the callback URL, `http://localhost:{PORT}` if you're in dev, and the url of the website if in prod.
        NEXTAUTH_SECRET= # The secret code for auth, can get a new one by executing `openssl rand -hex 32`
        ```

4. Install the front end dependencies:

   ```bash
   cd frontend && bun install
   ```

5. Build backend and frontend
    ```
    bun run build
    ```

### Usage

1. Start the server:

   ```bash
   bun run start
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
