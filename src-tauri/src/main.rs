// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cmds;

use std::{
    os::windows::process::CommandExt,
    process::{Child, Command},
};

const CREATE_NO_WINDOW: u32 = 0x08000000;

fn main() {
    let mut command = Command::new("./resources/_rayner.exe");

    #[cfg(target_os = "windows")]
    command.creation_flags(CREATE_NO_WINDOW);

    let mut child: Child = command.spawn().expect("failed to execute process");

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
