<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let rafId: number

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; color: string
}

onMounted(() => {
  const c = canvas.value!
  const ctx = c.getContext('2d')!
  const colors = ['#00BFFF', '#BF5FFF', '#00FFE5']

  const resize = () => {
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles: Particle[] = Array.from({ length: 80 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)]
  }))

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height)

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = c.width
      if (p.x > c.width) p.x = 0
      if (p.y < 0) p.y = c.height
      if (p.y > c.height) p.y = 0
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0')
      ctx.fill()
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0,191,255,${(1 - dist / 120) * 0.08})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    rafId = requestAnimationFrame(draw)
  }
  draw()

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(rafId)
  })
})
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 pointer-events-none" />
</template>