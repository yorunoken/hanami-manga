use libsql::{Builder, Connection};
use warp::Filter;

pub async fn create_pool() -> Connection {
    let url = std::env::var("LIBSQL_URL").expect("LIBSQL_URL must be set");
    let token = std::env::var("LIBSQL_TOKEN").expect("LIBSQL_TOKEN must be set");

    let builder = Builder::new_remote(url, token)
        .build()
        .await
        .expect("Failed to build database.");

    let db = builder
        .connect()
        .expect("Failed to connect to the database.");

    db
}

pub fn with_db(
    db: Connection,
) -> impl Filter<Extract = (Connection,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || db.clone())
}
