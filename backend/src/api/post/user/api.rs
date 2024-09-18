use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

use crate::models::{Message, PreferencesRequest};

pub async fn insert_preferences(
    discord_id: String,
    request: PreferencesRequest,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset the db??
    db.reset().await;

    let PreferencesRequest {
        show_nsfw,
        reading_view,
        language,
        image_quality,
        auto_bookmark,
    } = request;

    match db
        .query(
            "INSERT OR IGNORE INTO users (discord_id) VALUES (?)",
            params![discord_id.clone()],
        )
        .await
    {
        Ok(rows) => rows,
        Err(e) => {
            eprintln!("failed to execute query: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&Message {
                    message: format!("failed to get query: {}", e),
                }),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    };

    match db
        .query(
            "INSERT OR REPLACE INTO preferences (discord_id, language, reading_view, image_quality, auto_bookmark, show_nsfw) VALUES (?, ?, ?, ?, ?, ?)",
            params![discord_id, language, reading_view, image_quality, auto_bookmark, show_nsfw],
        )
        .await
    {
        Ok(rows) => rows,
        Err(e) => {
            eprintln!("failed to execute query: {}", e);
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
