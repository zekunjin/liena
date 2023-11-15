import { ref } from 'vue'
import { useRaynerRequest } from './use-rayner'

export const useSubscription = () => {
  const url = ref('')

  const parseOutbounds = async () => {
    const client = await useRaynerRequest()
    await client('/subscriptions', { method: 'POST', body: { link: url.value } })
    url.value = ''
  }

  return { url, parseOutbounds }
}
