# Hanami Manga

your cozy corner for discovering and reading your favorite manga! 🌸📚

## Features

- **Browse Manga:** Explore a wide range of manga titles from the Mangadex API.
- **Favorite Manga:** Save your favorite manga to easily find them later.
- **Reading History:** Keep track of what you've read and never lose your place.
- **Self-Hosted:** The website is self-hosted on Hetzner, ensuring reliability and control.

## Tech Stack

- **Front End:** [SvelteKit](https://kit.svelte.dev)
- **Back End:** [Go](https://golang.org)
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
   git clone https://github.com/yorunoken/Hanami Manga.git
   cd Hanami Manga
   ```

2. Install the front end dependencies:

   ```bash
   bun install
   ```

3. Build the project:

   ```bash
   bun run build
   ```

### Environment Variables

Before running the application, you need to set up the following environment variables:

- `access_token`: Your access token for adding changelogs in /changelog/add. This must match the value is your local storage.

You can set these variables in a `.env` file at the root of your project:

```env
access_token=your_access_token
```

Make sure to replace `your_access_token` with your actual credentials.

### Running the Application

1. Start the server in dev mode:

   ```bash
   bun dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see Hanami Manga in action!

## Deployment

Hanami Manga is self-hosted on Hetzner. Here are the general steps to deploy it:

1. Build the front end and back end as described in the [Installation](#installation) section.
2. Set up a reverse proxy (e.g., Nginx) to serve the front end and back end.
3. Ensure your server has the necessary environment variables and dependencies installed.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeatureName`).
6. Open a pull request.

## License

This project is licensed under the GPL License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to me at [contact@yorunoken.com].

Enjoy your manga journey with Hanami Manga! 🌸💖
