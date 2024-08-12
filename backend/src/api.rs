use std::collections::HashMap;

use mangadex_api_schema_rust::v5::{
    AtHomeServer, ChapterData, MangaAggregate, MangaCollection, MangaData,
};
use reqwest::header::{CONTENT_TYPE, USER_AGENT};
use serde::{Deserialize, Serialize};
use warp::{http::Response, hyper::Body, Rejection, Reply};

use crate::request;

const MANGADEX_API: &str = "https://api.mangadex.org";

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Error {
    text: String,
    cat: String,
}

pub async fn get_manga_collection(query: HashMap<String, String>) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/manga", MANGADEX_API);
    Ok(request::json::<MangaCollection>(full_url, query).await)
}

pub async fn get_manga(
    uuid: String,
    query: HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/manga/{}", MANGADEX_API, uuid);
    Ok(request::json::<MangaData>(full_url, query).await)
}

pub async fn get_manga_aggregate(
    uuid: String,
    query: HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/manga/{}/aggregate", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<MangaAggregate>(full_url, query).await)
}

pub async fn get_chapter(
    uuid: String,
    query: HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/chapter/{}", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<ChapterData>(full_url, query).await)
}

pub async fn proxy_image(
    query: std::collections::HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    if let Some(url) = query.get("url") {
        println!("{}", url);
        let client = reqwest::Client::new();
        let response = client
            .get(url)
            .header("Referer", "https://mangadex.org")
            .header(
                USER_AGENT,
                "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0",
            )
            .send()
            .await
            .map_err(|_| warp::reject::not_found())?;

        let content_type = &response
            .headers()
            .get(CONTENT_TYPE)
            .and_then(|value| value.to_str().ok())
            .unwrap_or("application/octet-stream")
            .to_owned();

        let body = response
            .bytes()
            .await
            .map_err(|_| warp::reject::not_found())?;

        let response = Response::builder()
            .header("Content-Type", content_type)
            .body(Body::from(body))
            .unwrap();

        Ok(response)
    } else {
        Err(warp::reject::not_found())
    }
}

pub async fn at_home_server(
    uuid: String,
    query: HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/at-home/server/{}", MANGADEX_API, uuid);
    println!("{}", full_url);
    Ok(request::json::<AtHomeServer>(full_url, query).await)
}
