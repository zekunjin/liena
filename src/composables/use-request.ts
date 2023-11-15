import { ref } from 'vue'
import { type HttpVerb, type FetchOptions, Body, fetch, ResponseType } from '@tauri-apps/api/http'
import defu from 'defu'
import { useRaynerStore } from '~/store/rayner'

export interface CreateRequestOptions {
  baseUrl?: string
  timeout?: number
}

export interface RequestOptions {
  method?: HttpVerb
  body?: Record<any, any>
}

interface KeepCallingOptions {
  url: string
  timeout: number
}

export const checkHealth = (options: Partial<KeepCallingOptions> = { }): Promise<void> => {
  const _options = defu(options, { url: '/', timeout: 20 * 1000 }) as KeepCallingOptions

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => { reject() }, _options.timeout)

    const call = async () => {
      try {
        const response = await fetch(_options.url, { method: 'GET', responseType: ResponseType.JSON })
        if (response.ok) {
          clearTimeout(timeoutId)
          resolve()
        } else {
          call()
        }
      } catch (error) {
        call()
      }
    }

    call()
  })
}

export const createRequest = ({ baseUrl, timeout }: CreateRequestOptions = { baseUrl: '/' }) => async <T>(url: string, options: RequestOptions = {}) => {
  const _url = baseUrl + url
  const _options: FetchOptions = { method: options.method ?? 'GET', timeout, responseType: ResponseType.JSON }

  if (options.body) {
    _options.body = Body.json(options.body)
  }

  const data = ref<T>()

  const execute = async () => {
    const store = useRaynerStore()

    if (!store.isRunning) {
      try {
        await checkHealth({ url: baseUrl })
        store.setRaynerRuningState(true)
      } catch (error) {
        store.setRaynerRuningState(false)
        throw error
      }
    }

    if (store.isRunning) {
      const response = await fetch(_url, _options)
      if (response.ok) { data.value = response.data as T }
    }
  }

  await execute()

  return { data, execute }
}
