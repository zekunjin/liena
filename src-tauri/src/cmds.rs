use anyhow::Result;
use serde_yaml::Mapping;
use std::fs;
use sysproxy::Sysproxy;
use tauri::{api, AppHandle, Icon, Manager};

type CmdResult<T = ()> = Result<T, String>;

#[cfg(target_os = "windows")]
static DEFAULT_BYPASS: &str = "localhost;127.*;192.168.*;<local>";
#[cfg(target_os = "linux")]
static DEFAULT_BYPASS: &str = "localhost,127.0.0.1,::1";
#[cfg(target_os = "macos")]
static DEFAULT_BYPASS: &str = "127.0.0.1,localhost,<local>";

#[tauri::command]
pub fn get_rayner_port() -> CmdResult<String> {
    let content = fs::read_to_string("./resources/.rayner/rayner.port").unwrap_or("".to_string());
    Ok(content)
}

#[tauri::command]
pub fn get_sys_proxy(app: AppHandle) -> CmdResult<Mapping> {
    let current = Sysproxy::get_system_proxy().unwrap();

    let mut map = Mapping::new();
    map.insert("enable".into(), current.enable.into());
    map.insert(
        "server".into(),
        format!("{}:{}", current.host, current.port).into(),
    );
    map.insert("bypass".into(), current.bypass.into());

    let indication_icon = if current.enable.into() {
        include_bytes!("../icons/32x32.png").to_vec()
    } else {
        include_bytes!("../icons/32x32__disabled.png").to_vec()
    };

    app.tray_handle()
        .set_icon(Icon::Raw(indication_icon))
        .unwrap();

    Ok(map)
}

#[tauri::command]
pub fn set_sys_proxy(enable: bool, port: u16) -> CmdResult {
    let sysproxy = Sysproxy {
        enable,
        host: "127.0.0.1".into(),
        port,
        bypass: DEFAULT_BYPASS.into(),
    };

    let _ = sysproxy.set_system_proxy();

    Ok(())
}

#[tauri::command]
pub fn open_file(app: AppHandle, path: String) {
    api::shell::open(&app.shell_scope(), path, None).unwrap();
}
