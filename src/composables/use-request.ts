import { ref } from 'vue'
import { type HttpVerb, type FetchOptions, Body, fetch, ResponseType } from '@tauri-apps/api/http'
import { isRaynerServiceRunning } from './use-rayner'
import { useRaynerStore } from '~/store/rayner'

export interface CreateRequestOptions {
  baseUrl?: string
  timeout?: number
}

export interface RequestOptions {
  method?: HttpVerb
  body?: Record<any, any>
}

export const createRequest = ({ timeout }: CreateRequestOptions = {}) => async <T>(url: string, options: RequestOptions = {}) => {
  const _options: FetchOptions = { method: options.method ?? 'GET', timeout, responseType: ResponseType.JSON }

  if (options.body) {
    _options.body = Body.json(options.body)
  }

  const data = ref<T>()

  const execute = async () => {
    const store = useRaynerStore()

    if (!store.isRunning) {
      try {
        const { port } = await isRaynerServiceRunning()
        store.setRaynerRuningState(true)
        store.setRaynerPort(port)
      } catch (error) {
        store.setRaynerRuningState(false)
        throw error
      }
    }

    if (store.isRunning) {
      const _RAYNER_SERVER = `http://localhost:${store.port}`
      const _url = _RAYNER_SERVER + url
      const response = await fetch(_url, _options)
      if (response.ok) { data.value = response.data as T }
    }
  }

  await execute()

  return { data, execute }
}
