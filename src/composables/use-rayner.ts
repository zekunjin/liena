import { computed, ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { tryOnMounted } from '@vueuse/core'
import { fetch } from '@tauri-apps/api/http'
import { defu } from 'defu'
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
  index?: number
}

export interface RaynerSubscription {
  link: string
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

  const outbounds = computed(() => data.value.sort((a, b) => {
    if (!a.index) { return 1 }
    if (!b.index) { return -1 }
    return a.index - b.index
  }))

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

  return { data, outbounds, isFetching, execute }
}

export const usePatchRaynerOutbounds = async (outbounds: RaynerOutbound[] = []) => {
  const client = await useRaynerRequest()
  const body = outbounds.map((o, index) => ({ ...o, index: index + 1 }))
  return client<RaynerOutbound[]>('/outbounds', { method: 'PATCH', body })
}

export const isRaynerServiceRunning = (options: Partial<{ timeout: number }> = {}): Promise<{ port: number }> => {
  const _options = defu(options, { timeout: 20 * 1000 })

  return new Promise((resolve, reject) => {
    let isTimeout = false

    const timeoutId = setTimeout(() => {
      isTimeout = true
      reject()
    }, _options.timeout)

    const ping = async () => {
      try {
        const { port } = await useRayner().execute()
        const _RAYNER_SERVER = `http://localhost:${port}`
        const response = await fetch(_RAYNER_SERVER, { method: 'GET' })
        if (response.ok) {
          clearTimeout(timeoutId)
          resolve({ port: port as number })
        }

        if (!response.ok && !isTimeout) {
          ping()
        }
      } catch (error) {
        if (!isTimeout) { ping() }
      }
    }

    ping()
  })
}

export const useRaynerSubscriptions = () => {
  const data = ref<RaynerSubscription[]>([])
  const isFetching = ref(false)

  const execute = async () => {
    isFetching.value = true
    const client = await useRaynerRequest()
    client<RaynerSubscription[]>('/subscriptions').then((response) => {
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
