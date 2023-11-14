import { tryOnMounted } from '@vueuse/core'
import { invoke } from '@tauri-apps/api/tauri'

export const useSystemProxy = () => {
  const config = ref()

  tryOnMounted(() => { getSystemProxy() })

  const getSystemProxy = async () => {
    config.value = await invoke('get_sys_proxy')
  }

  const setSystemProxy = async (args: { enable: boolean, port: number }) => {
    await invoke('set_sys_proxy', args)
    getSystemProxy()
  }

  return { config, setSystemProxy }
}
