use crate::api;
use sqlx::SqlitePool;
use warp::Filter;

pub fn routes(
    pool: SqlitePool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let get_manga = warp::path!("api" / "manga" / String)
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::get_manga);

    let get_manga_collection = warp::path!("api" / "manga")
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::get_manga_collection);

    let get_manga_aggregate = warp::path!("api" / "manga" / String / "aggregate")
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::get_manga_aggregate);

    let get_chapter = warp::path!("api" / "chapter" / String)
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::get_chapter);

    let get_chapter_collection = warp::path!("api" / "chapter")
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::get_chapter_collection);

    let at_home_server = warp::path!("api" / "homeserver" / String)
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::at_home_server);

    let proxy_image = warp::path!("api" / "proxyimage")
        .and(warp::get())
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::proxy_image);

    let health_check = warp::path!("api" / "health")
        .and(warp::get())
        .map(|| warp::reply::json(&1));

    get_manga
        .or(proxy_image)
        .or(health_check)
        .or(get_manga_collection)
        .or(get_manga_aggregate)
        .or(get_chapter)
        .or(get_chapter_collection)
        .or(at_home_server)
}
