use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Preferences {
    #[serde(rename = "discordId")]
    pub discord_id: String,
    pub language: String,
    #[serde(rename = "readingView")]
    pub reading_view: String,
    #[serde(rename = "imageQuality")]
    pub image_quality: String,
    #[serde(rename = "autoBookmark")]
    pub auto_bookmark: bool,
    #[serde(rename = "showNSFW")]
    pub show_nsfw: bool,
}

#[derive(Deserialize, Serialize)]
pub struct Message {
    pub message: String
}
