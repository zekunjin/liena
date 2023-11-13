import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { createFetch, tryOnMounted } from '@vueuse/core'
import { useRaynerStore } from '~/store/rayner'

interface Rayner {
  port?: number
}

export const useRayner = () => {
  const data = ref<Rayner>({})
  const isFetching = ref(false)

  const execute = async () => {
    isFetching.value = true
    const response = await invoke<string>('get_rayner_port')
    data.value.port = Number(response)
    isFetching.value = false
    return data.value
  }

  tryOnMounted(() => { execute() })

  return { data, isFetching, execute }
}

export const useRaynerRequest = () => {
  const store = useRaynerStore()
  const _RAYNER_SERVER = `http://127.0.0.1:${store.port}`
  return createFetch({ baseUrl: _RAYNER_SERVER })
}
