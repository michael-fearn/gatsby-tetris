import { useEffect } from "react"

export const useBindings = (bindings: { key: string; fn: Function }[]) => {
  useEffect(
    () => {
      const callbacks = bindings.map(binding => {
        const callback = (event: any) =>
          event.key === binding.key ? binding.fn() : null

        window.addEventListener("keydown", callback)
        return callback
      })

      return () => {
        callbacks.forEach(callback => {
          window.removeEventListener("keydown", callback)
        })
      }
    },
    bindings.map(binding => binding.fn)
  )
}
