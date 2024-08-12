use crate::api;
use warp::{
    http::{Response, StatusCode},
    Filter,
};

pub fn routes() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let get_manga = warp::path!("manga" / String)
        .and(warp::get())
        .and_then(api::get_manga);

    let get_manga_aggregate = warp::path!("manga" / String / "aggregate")
        .and(warp::get())
        .and_then(api::get_manga_aggregate);

    let get_chapter = warp::path!("chapter" / String)
        .and(warp::get())
        .and_then(api::get_chapter);

    let at_home_server = warp::path!("homeserver" / String)
        .and(warp::get())
        .and_then(api::at_home_server);

    let proxy_image = warp::path!("proxyimage")
        .and(warp::query::<std::collections::HashMap<String, String>>())
        .and_then(api::proxy_image)
        .recover(handle_rejection);

    let health_check = warp::path!("health")
        .and(warp::get())
        .map(|| warp::reply::json(&1));

    get_manga
        .or(get_manga_aggregate)
        .or(get_chapter)
        .or(at_home_server)
        .or(proxy_image)
        .or(health_check)
}

async fn handle_rejection(err: warp::Rejection) -> Result<impl warp::Reply, warp::Rejection> {
    if err.is_not_found() {
        let response = Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body("404 - Not Found");
        Ok(response)
    } else {
        Err(err)
    }
}
