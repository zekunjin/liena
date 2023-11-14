// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cmds;

use std::process::{Child, Command};

fn main() {
    let mut child: Child = Command::new("./resources/_rayner.exe")
        .spawn()
        .expect("failed to execute process");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmds::get_rayner_port,
            cmds::get_sys_proxy,
            cmds::set_sys_proxy
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    child.kill().expect("failed to kill process");
}
