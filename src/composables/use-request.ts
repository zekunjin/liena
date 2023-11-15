import { ref } from 'vue'
import { type HttpVerb, type FetchOptions, Body, fetch, ResponseType } from '@tauri-apps/api/http'

export interface CreateRequestOptions {
  baseUrl?: string
  timeout?: number
}

export interface RequestOptions {
  method?: HttpVerb
  body?: Record<any, any>
}

export const createRequest = ({ baseUrl, timeout }: CreateRequestOptions = { baseUrl: '/' }) => async <T>(url: string, options: RequestOptions = {}) => {
  const _url = baseUrl + url
  const _options: FetchOptions = { method: options.method ?? 'GET', timeout, responseType: ResponseType.JSON }

  if (options.body) {
    _options.body = Body.json(options.body)
  }

  const data = ref<T>()

  const execute = async () => {
    const response = await fetch(_url, _options)
    if (response.ok) { data.value = response.data as T }
  }

  await execute()

  return { data, execute }
}