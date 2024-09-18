use std::collections::HashMap;

use crate::{
    api::{get, post},
    database::with_db,
};
use libsql::Connection;
use warp::{body::json, Filter};

pub fn routes(
    db: Connection,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    // GET routes

    let get_manga = warp::path!("api" / "manga" / String)
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::get_manga);

    let get_manga_collection = warp::path!("api" / "manga")
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::get_manga_collection);

    let get_manga_aggregate = warp::path!("api" / "manga" / String / "aggregate")
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::get_manga_aggregate);

    let get_chapter = warp::path!("api" / "chapter" / String)
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::get_chapter);

    let get_chapter_collection = warp::path!("api" / "chapter")
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::get_chapter_collection);

    let at_home_server = warp::path!("api" / "homeserver" / String)
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::at_home_server);

    let proxy_image = warp::path!("api" / "proxyimage")
        .and(warp::get())
        .and(warp::query::<HashMap<String, String>>())
        .and_then(get::proxy_image);

    let get_preferences = warp::path!("api" / "user" / String / "preferences")
        .and(warp::get())
        .and(with_db(db.clone()))
        .and_then(get::user_preferences);

    let get_user_details = warp::path!("api" / "user" / String / "details")
        .and(warp::get())
        .and(with_db(db.clone()))
        .and_then(get::user_details);

    // POST routes

    let insert_preferences = warp::path!("api" / "user" / String / "preferences")
        .and(warp::post())
        .and(json())
        .and(with_db(db.clone()))
        .and_then(post::insert_preferences);

    get_manga
        .or(proxy_image)
        .or(get_manga_collection)
        .or(get_manga_aggregate)
        .or(get_chapter)
        .or(get_chapter_collection)
        .or(at_home_server)
        .or(insert_preferences)
        .or(get_preferences)
        .or(get_user_details)
}
