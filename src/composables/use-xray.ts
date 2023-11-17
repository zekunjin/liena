import { computed } from 'vue'
import { useRaynerRequest } from './use-rayner'

export const useXray = () => {
  const profile = ref<any>({})
  const isFetching = ref(false)

  const inbound = computed(() => profile.value.inbounds?.[0] ?? {})

  const execute = async () => {
    isFetching.value = true
    const client = await useRaynerRequest()
    const response = await client('/xray-profiles/default')
    profile.value = response.data.value
    isFetching.value = false
    return profile.value
  }

  execute()

  return { profile, inbound, isFetching, execute }
}
