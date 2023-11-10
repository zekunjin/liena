// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Child, Command};

fn main() {
    let mut child: Child =
        Command::new("C:\\Users\\zekun.jin\\Documents\\Projects\\liena\\.resources\\rayner.exe")
            .spawn()
            .expect("failed to execute process");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    child.kill().expect("failed to kill process");
}
