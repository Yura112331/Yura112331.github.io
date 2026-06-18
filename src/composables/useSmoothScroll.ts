import { onMounted, onUnmounted } from 'vue'
import Lenis from '@studio-freight/lenis'

export function useSmoothScroll() {
  let lenis: Lenis | null = null
  let rafId: number

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    })

    function raf(time: number) {
      lenis!.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    lenis?.destroy()
    cancelAnimationFrame(rafId)
  })
}