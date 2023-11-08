use crate::utils::dirs;
use std::process::Command;
use tauri::App;

pub fn setup(app: &mut App) {
    let xray_core = dirs::xray_path();
    let child = Command::new("cd").spawn().expect("Failed to start process");

    // 获取新进程的PID
    let pid = child.id();

    // 输出PID
    println!("Started process with PID: {}", pid);
}
