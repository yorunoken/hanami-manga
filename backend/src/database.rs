use sqlx::sqlite::SqlitePool;
use warp::Filter;

pub async fn create_pool() -> SqlitePool {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqlitePool::connect(&database_url)
        .await
        .expect("Failed to connect to the database.")
}

pub fn with_db(
    pool: SqlitePool,
) -> impl Filter<Extract = (SqlitePool,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || pool.clone())
}
