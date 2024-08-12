use mangadex_api_schema_rust::v5::{AtHomeServer, ChapterData, MangaAggregate, MangaData};
use serde::{Deserialize, Serialize};
use warp::{http::Response, hyper::Body, Rejection, Reply};

use crate::request;

const MANGADEX_API: &str = "https://api.mangadex.org";

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Error {
    text: String,
    cat: String,
}

pub async fn get_manga(uuid: String) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/manga/{}", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<MangaData>(full_url).await)
}

pub async fn get_manga_aggregate(uuid: String) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/manga/{}/aggregate", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<MangaAggregate>(full_url).await)
}

pub async fn get_chapter(uuid: String) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/chapter/{}", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<ChapterData>(full_url).await)
}

pub async fn proxy_image(
    query: std::collections::HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    if let Some(url) = query.get("url") {
        let client = reqwest::Client::new();
        let res = client
            .get(url)
            .send()
            .await
            .map_err(|_| warp::reject::not_found())?;
        let body = res.bytes().await.map_err(|_| warp::reject::not_found())?;

        let response = Response::builder()
            .header("Content-Type", "image/jpeg")
            .body(Body::from(body));

        Ok(response)
    } else {
        Err(warp::reject::not_found())
    }
}

pub async fn at_home_server(uuid: String) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/at-home/server/{}", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<AtHomeServer>(full_url).await)
}
