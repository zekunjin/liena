use anyhow::Result;
use std::fs;

type CmdResult<T = ()> = Result<T, String>;

#[tauri::command]
pub fn get_rayner_port() -> CmdResult<String> {
    let content = fs::read_to_string("./resources/.rayner/rayner.port").unwrap_or("".to_string());
    Ok(content)
}
