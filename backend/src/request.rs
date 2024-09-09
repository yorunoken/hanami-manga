use std::{collections::HashMap, fmt::Write};

use reqwest::header::{CONTENT_TYPE, USER_AGENT};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use warp::{http::StatusCode, reply, Reply};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Error {
    text: String,
    cat: String,
}

pub async fn json<T: serde::de::DeserializeOwned + serde::Serialize>(
    url: String,
    query: HashMap<String, String>,
) -> impl Reply {
    let client = reqwest::Client::new();

    println!("full URL: {}", url);
    println!("original query: {:#?}", query);

    let parsed_query = parse_query(&query);
    println!("parsed query: {:#?}", parsed_query);

    let res = match client
        .get(format!("{}?{}", url, parsed_query))
        .header(CONTENT_TYPE, "application/json")
        .header(
            USER_AGENT,
            "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0",
        )
        .send()
        .await
    {
        Ok(o) => o,
        Err(e) => {
            let error_code = e
                .status()
                .unwrap_or(reqwest::StatusCode::INTERNAL_SERVER_ERROR)
                .as_u16();

            let error = Error {
                text: format!("{}", e),
                cat: format!("http.cat/{}.jpg", error_code),
            };

            return reply::with_status(
                reply::json(&error),
                StatusCode::from_u16(error_code).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR),
            );
        }
    };

    match res.json::<Value>().await {
        Ok(ok) => reply::with_status(reply::json(&ok), StatusCode::OK),
        Err(err) => {
            let mut e: &dyn std::error::Error = &err;
            println!("Main error: {e}");

            while let Some(source) = e.source() {
                println!("  - caused by: {source}");
                e = source;
            }

            let error = Error {
                text: format!("Couldn't deserialize JSON: {}", err),
                cat: String::from("http.cat/418.jpg"),
            };
            reply::with_status(reply::json(&error), StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

fn parse_query(query: &HashMap<String, String>) -> String {
    let mut parsed_query = String::new();

    for (key, value) in query.iter() {
        if let Some(parsed) = parse_arrays(key, value) {
            let _ = write!(parsed_query, "{}&", parsed);
        } else {
            let _ = write!(parsed_query, "{}={}&", key, value);
        }
    }
    parsed_query.pop(); // Remove the last `&`
    parsed_query
}

fn parse_arrays(key: &String, value: &String) -> Option<String> {
    if !value.contains(',') {
        return None;
    }

    let values: Vec<&str> = value.split(",").collect();

    Some(
        values
            .iter()
            .map(|v| format!("{}[]={}", key, v.trim()))
            .collect::<Vec<String>>()
            .join("&"),
    )
}
