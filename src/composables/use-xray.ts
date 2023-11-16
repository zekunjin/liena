import { useRaynerRequest } from './use-rayner'

export const useXray = () => {
  const data = ref<any>({})
  const isFetching = ref(false)

  const execute = async () => {
    isFetching.value = true
    const client = await useRaynerRequest()
    const response = await client('/xray-profiles/default')
    data.value = response
    isFetching.value = false
    console.log(response)
    return data.value
  }

  execute()

  return { data, isFetching, execute }
}
