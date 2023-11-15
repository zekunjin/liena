import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { tryOnMounted } from '@vueuse/core'
import { createRequest } from './use-request'

interface Rayner {
  port?: number
}

export interface RaynerOutbound {
  tag: string
  protocol: 'vmess' | 'shadowsocks'
  address: string
  port: number
  uuid?: string
  method?: string
  password?: string
  security?: string
  alterId?: number

  enabled?: boolean
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

export const useRaynerRequest = async () => {
  const { port } = await useRayner().execute()
  const _RAYNER_SERVER = `http://localhost:${port}`
  return createRequest({ baseUrl: port ? _RAYNER_SERVER : '/' })
}

export const useRaynerOutbounds = () => {
  const data = ref<RaynerOutbound[]>([])
  const isFetching = ref(false)

  const execute = async () => {
    isFetching.value = true
    const client = await useRaynerRequest()
    client<RaynerOutbound[]>('/outbounds').then((response) => {
      if (response.data.value) {
        data.value = response.data.value
      }
    }).finally(() => {
      isFetching.value = false
    })
  }
  
  execute()

  return { data, isFetching, execute }
}