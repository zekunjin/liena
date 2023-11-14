import { ref } from 'vue'
import { useRaynerRequest } from './use-rayner'

export const useSubscription = () => {
  const url = ref('')

  const parseOutbounds = async () => {
    await useRaynerRequest()('/subscriptions').post({ link: url.value })
    url.value = ''
  }

  return { url, parseOutbounds }
}
