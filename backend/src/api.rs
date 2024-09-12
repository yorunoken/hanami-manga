use std::collections::HashMap;

use mangadex_api_schema_rust::v5::{
    AtHomeServer, ChapterCollection, ChapterData, MangaAggregate, MangaCollection, MangaData,
};
use reqwest::header::{CONTENT_TYPE, USER_AGENT};
use sqlx::{Row, SqlitePool};
use warp::{
    http::{Response, StatusCode},
    hyper::Body,
    Rejection, Reply,
};

use crate::{
    models::{Message, Preferences},
    request,
};

const MANGADEX_API: &str = "https://api.mangadex.org";

// GET routes

pub async fn get_preferences(
    query: HashMap<String, String>,
    pool: SqlitePool,
) -> Result<impl Reply, Rejection> {
    let discord_id = match query.get("id") {
        None => return Err(warp::reject::not_found()),
        Some(s) => s,
    };

    let rows = sqlx::query(&"SELECT * FROM users WHERE discord_id = ?")
        .bind(discord_id)
        .fetch_all(&pool)
        .await
        .map_err(|e| {
            eprintln!("failed to get query: {e}");
            warp::reject::not_found()
        })?;

    if rows.is_empty() {
        println!("empty rows");
        Ok(warp::reply::with_status(
            warp::reply::json(&Message {
                message: "Empty rows.".to_string(),
            }),
            StatusCode::OK,
        ))
    } else {
        let users: Vec<Preferences> = rows
            .iter()
            .map(|row| Preferences {
                discord_id: row.get("discord_id"),
                auto_bookmark: row.get("auto_bookmark"),
                image_quality: row.get("image_quality"),
                language: row.get("language"),
                reading_view: row.get("reading_view"),
                show_nsfw: row.get("show_nsfw"),
            })
            .collect();

        Ok(warp::reply::with_status(
            warp::reply::json(&users),
            StatusCode::OK,
        ))
    }
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
    request: Preferences,
    pool: SqlitePool,
) -> Result<impl Reply, Rejection> {
    let Preferences {
        discord_id,
        show_nsfw,
        reading_view,
        language,
        image_quality,
        auto_bookmark,
    } = request;

    sqlx::query!(
        "INSERT OR REPLACE INTO users (discord_id, language, reading_view, image_quality, auto_bookmark, show_nsfw) VALUES (?, ?, ?, ?, ?, ?)",
        discord_id,
        language,
        reading_view,
        image_quality,
        auto_bookmark,
        show_nsfw
    )
    .execute(&pool)
    .await
    .map_err(|e| {
        eprintln!("Failed to insert feedback: {:?}", e);
        warp::reject::reject()
    })?;

    Ok(warp::reply::with_status(
        "Added preferences to database",
        StatusCode::OK,
    ))
}
