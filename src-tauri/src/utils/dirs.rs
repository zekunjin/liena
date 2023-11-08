use anyhow::Result;
use std::path::PathBuf;
use tauri::{api::path::resource_dir, Env, PackageInfo};

static XRAY_CONFIG: &str = "config.json";
static mut RESOURCE_DIR: Option<PathBuf> = None;

pub static mut APP_VERSION: &str = "0.0.0";

pub fn app_resources_dir(package_info: &PackageInfo) -> Result<PathBuf> {
    let res_dir = resource_dir(package_info, &Env::default())
        .ok_or(anyhow::anyhow!("failed to get the resource dir"))?
        .join("resources");

    unsafe {
        RESOURCE_DIR = Some(res_dir.clone());

        let ver = package_info.version.to_string();
        let ver_str = format!("v{ver}");
        APP_VERSION = Box::leak(Box::new(ver_str));
    }

    Ok(res_dir)
}

pub fn xray_path() -> Result<PathBuf> {
    unsafe {
        let res_dir = RESOURCE_DIR
            .clone()
            .ok_or(anyhow::anyhow!("failed to get the resource dir"))?;
        Ok(res_dir.join("xra.exe"))
    }
}
