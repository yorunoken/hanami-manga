use std::collections::HashMap;

use libsql::{params, Connection};
use mangadex_api_schema_rust::v5::{
    AtHomeServer, ChapterCollection, ChapterData, MangaAggregate, MangaCollection, MangaData,
};
use reqwest::header::{CONTENT_TYPE, USER_AGENT};
use warp::{
    http::{Response, StatusCode},
    hyper::Body,
    Rejection, Reply,
};

use crate::{
    models::{Message, Preferences, PreferencesReturn},
    request,
};

const MANGADEX_API: &str = "https://api.mangadex.org";

// GET routes

pub async fn get_preferences(discord_id: String, db: Connection) -> Result<impl Reply, Rejection> {
    // Reset the db??
    db.reset().await;

    let mut rows = match db
        .query(
            "SELECT * FROM preferences WHERE discord_id = ?",
            params![discord_id.clone()],
        )
        .await
    {
        Ok(rows) => rows,
        Err(e) => {
            eprintln!("failed to get query: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&Message {
                    message: format!("failed to get query: {}", e),
                }),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    };

    let mut users = Vec::new();

    while let Ok(row) = rows.next().await {
        match row {
            None => break,
            Some(row) => users.push(PreferencesReturn {
                discord_id: row.get(0).map_err(|_| warp::reject::reject())?,
                language: row.get(1).map_err(|_| warp::reject::reject())?,
                reading_view: row.get(2).map_err(|_| warp::reject::reject())?,
                image_quality: row.get(3).map_err(|_| warp::reject::reject())?,
                auto_bookmark: row.get(4).map_err(|_| warp::reject::reject())?,
                show_nsfw: row.get(5).map_err(|_| warp::reject::reject())?,
            }),
        }
    }

    Ok(warp::reply::with_status(
        warp::reply::json(&users),
        StatusCode::OK,
    ))
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
    Ok(request::json::<MangaAggregate>(full_url, query).await)
}

pub async fn get_chapter(
    uuid: String,
    query: HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/chapter/{}", MANGADEX_API, uuid);
    Ok(request::json::<ChapterData>(full_url, query).await)
}

pub async fn get_chapter_collection(
    query: HashMap<String, String>,
) -> Result<impl Reply, Rejection> {
    let full_url = format!("{}/chapter", MANGADEX_API);
    Ok(request::json::<ChapterCollection>(full_url, query).await)
}

pub async fn proxy_image(query: HashMap<String, String>) -> Result<impl Reply, Rejection> {
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
    Ok(request::json::<AtHomeServer>(full_url, query).await)
}

// POST routes

pub async fn insert_preferences(
    discord_id: String,
    request: Preferences,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset the db??
    db.reset().await;

    let Preferences {
        show_nsfw,
        reading_view,
        language,
        image_quality,
        auto_bookmark,
    } = request;

    match db
        .query(
            "INSERT OR REPLACE INTO preferences (discord_id, language, reading_view, image_quality, auto_bookmark, show_nsfw) VALUES (?, ?, ?, ?, ?, ?)",
            params![discord_id, language,
                reading_view,
                image_quality,
                auto_bookmark,
                show_nsfw],
        )
        .await
    {
        Ok(rows) => rows,
        Err(e) => {
            eprintln!("failed to get query: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&Message {
                    message: format!("failed to get query: {}", e),
                }),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    };

    Ok(warp::reply::with_status(
        warp::reply::json(&Message {
            message: "Added preferences to database.".to_string(),
        }),
        StatusCode::OK,
    ))
}
