use std::collections::HashMap;

use reqwest::header::{CONTENT_TYPE, USER_AGENT};
use serde::{Deserialize, Serialize};
use warp::{http::StatusCode, reply, Reply};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Error {
    text: String,
    cat: String,
}

pub async fn json<T>(url: String, query: HashMap<String, String>) -> impl Reply
where
    T: serde::de::DeserializeOwned + serde::Serialize,
{
    let client = reqwest::Client::new();

    println!("full URL: {}", url);
    println!("query: {:#?}", query);

    let res = match client
        .get(&url)
        .query(&query)
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
                .unwrap_or(reqwest::StatusCode::EXPECTATION_FAILED)
                .as_u16();

            let error = Error {
                text: format!("{}", e),
                cat: format!("http.cat/{}.jpg", error_code),
            };

            return reply::with_status(
                reply::json(&error),
                StatusCode::from_u16(error_code).unwrap_or(StatusCode::NOT_ACCEPTABLE),
            );
        }
    };

    match res.json::<T>().await {
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
            reply::with_status(reply::json(&error), StatusCode::IM_A_TEAPOT)
        }
    }
}
