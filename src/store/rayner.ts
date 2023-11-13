import { defineStore } from 'pinia'
import { useRayner } from '~/composables/use-rayner'

interface RaynerState {
  port?: number
}

export const useRaynerStore = defineStore('ranyer', {
  state: (): RaynerState => ({
    port: undefined
  }),

  actions: {
    async setup () {
      const { port } = await useRayner().execute()
      this.port = port
    }
  }
})
