use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

use crate::models::{DetailsRow, Message, PreferencesRow};

pub async fn user_preferences(discord_id: String, db: Connection) -> Result<impl Reply, Rejection> {
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

    match rows.next().await {
        Ok(Some(row)) => {
            let preferences = PreferencesRow {
                discord_id: row.get(0).map_err(|_| warp::reject::reject())?,
                language: row.get(1).map_err(|_| warp::reject::reject())?,
                reading_view: row.get(2).map_err(|_| warp::reject::reject())?,
                image_quality: row.get(3).map_err(|_| warp::reject::reject())?,
                auto_bookmark: row.get(4).map_err(|_| warp::reject::reject())?,
                show_nsfw: row.get(5).map_err(|_| warp::reject::reject())?,
            };

            Ok(warp::reply::with_status(
                warp::reply::json(&preferences),
                StatusCode::OK,
            ))
        }
        Ok(None) => Ok(warp::reply::with_status(
            warp::reply::json(&Message {
                message: "No preferences found for this discord_id".to_string(),
            }),
            StatusCode::NOT_FOUND,
        )),
        Err(e) => {
            eprintln!("Error fetching row: {}", e);
            Ok(warp::reply::with_status(
                warp::reply::json(&Message {
                    message: format!("Error fetching preferences: {}", e),
                }),
                StatusCode::INTERNAL_SERVER_ERROR,
            ))
        }
    }
}

pub async fn user_details(discord_id: String, db: Connection) -> Result<impl Reply, Rejection> {
    // Reset the db??
    db.reset().await;

    let query = "
        SELECT u.discord_id, p.language, p.reading_view, p.image_quality, p.auto_bookmark, p.show_nsfw
        FROM users u
        JOIN preferences p ON u.discord_id = p.discord_id
        WHERE u.discord_id = ?
    ";
    let params = params![discord_id.clone()];

    let mut rows = match db.query(query, params).await {
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

    let details = match rows.next().await {
        Ok(Some(row)) => {
            let preferences = PreferencesRow {
                discord_id: row.get(0).map_err(|_| warp::reject::reject())?,
                language: row.get(1).map_err(|_| warp::reject::reject())?,
                reading_view: row.get(2).map_err(|_| warp::reject::reject())?,
                image_quality: row.get(3).map_err(|_| warp::reject::reject())?,
                auto_bookmark: row.get(4).map_err(|_| warp::reject::reject())?,
                show_nsfw: row.get(5).map_err(|_| warp::reject::reject())?,
            };

            DetailsRow {
                discord_id: row.get(0).map_err(|_| warp::reject::reject())?,
                preferences,
            }
        }
        _ => {
            return Ok(warp::reply::with_status(
                warp::reply::json(&Message {
                    message: "No details found for this discord_id".to_string(),
                }),
                StatusCode::NOT_FOUND,
            ))
        }
    };

    Ok(warp::reply::with_status(
        warp::reply::json(&details),
        StatusCode::OK,
    ))
}
