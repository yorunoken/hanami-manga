# Hanami Manga

your cozy corner for discovering and reading your favorite manga! 🌸📚

## Features

- **Browse Manga:** Explore a vast amount of mangas.
- **Favorite Manga:** Save your favorite manga to easily find them later.
- **Reading History:** Easily keep track of your history locally on your browser.
- **Profiles:** Coming soon :)
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

2. Install the front end dependencies:

   ```bash
   cd frontend && bun install
   ```

### Environment Variables

Before running the application, you need to set up the following environment variables:

There will be two `.env.example` files and you will need to rename them to `.env` before continuing, there will be one in `frontend` and one in `backend` and you'll need to fill them out accordingly.

## Frontend's .env file

- `BACKEND_PORT`: The port of your backend, this should be the same as the PORT in the .env file of your backend.

```env
BACKEND_PORT=port number
```

## Backend's .env file

- `DATABASE_URL`: The URL of your database. I used `sqlite` for the backend so it should start with `sqlite://`, then followed by the name of your database at the root of the project. If you want to have postgres or anything else, feel free to shoot me a DM on Discord and I can work on a branch, or you could do it yourself :)
- `PORT`: The port of your backend, this should be the same as the BACKEND_PORT in the .env file of your frontend.


```env
DATABASE_URL=
PORT=
```

### Running the Application

1. Start the server in dev mode:

   ```bash
   bun dev
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
