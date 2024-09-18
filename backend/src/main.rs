mod api;
mod database;
mod models;
mod paths;
mod request;

use dotenvy::dotenv;
use std::env;

#[tokio::main]
async fn main() {
    // Load environment variables
    dotenv().ok();

    let pool = database::create_pool().await;
    let api = paths::routes(pool);

    let port: u16 = env::var("PORT")
        .expect("Expected PORT to be defined in environment.")
        .parse()
        .expect("PORT is not a number!");

    println!("Server started at http://localhost:{port}");
    warp::serve(api).run(([127, 0, 0, 1], port)).await;
}
