// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cmds;

use std::{
    os::windows::process::CommandExt,
    process::{Child, Command},
};

use tauri::CustomMenuItem;

const CREATE_NO_WINDOW: u32 = 0x08000000;

fn main() {
    let mut command = Command::new("./resources/_rayner.exe");

    #[cfg(target_os = "windows")]
    command.creation_flags(CREATE_NO_WINDOW);

    let mut child: Child = command.spawn().expect("failed to execute process");

    let dashboard = CustomMenuItem::new("dashboard".to_string(), "Dashboard");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new().add_item(dashboard).add_item(quit);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    child.kill().expect("failed to kill process");
                    std::process::exit(0);
                }
                "dashboard" => {
                    let window = app.get_window("main").unwrap();
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            cmds::get_rayner_port,
            cmds::get_sys_proxy,
            cmds::set_sys_proxy
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    child.kill().expect("failed to kill process");
}
