import { defineStore } from 'pinia'

interface RaynerState {
  port?: number
  isRunning?: boolean
}

export const useRaynerStore = defineStore('ranyer', {
  state: (): RaynerState => ({
    port: undefined,
    isRunning: false
  }),

  actions: {
    setRaynerPort (value: number) {
      this.port = value
    },

    setRaynerRuningState (value: boolean) {
      this.isRunning = value
    }
  }
})
