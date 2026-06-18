<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const stats = [
  { label: 'Релізів', to: 20, suffix: '+' },
  { label: 'Прослуховувань', to: 50, suffix: 'K+' },
  { label: 'Рік початку', to: 2024, suffix: '' },
  { label: 'Платформ', to: 6, suffix: '' }
]

const counts = ref(stats.map(() => 0))

function animateCounter(index: number, to: number) {
  const start = Date.now()
  const duration = 2000
  const frame = () => {
    const p = Math.min((Date.now() - start) / duration, 1)
    counts.value[index] = Math.round((1 - Math.pow(1 - p, 3)) * to)
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

onMounted(() => {
  const el = document.querySelector('.stats-section')
  if (!el) return
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      stats.forEach((s, i) => animateCounter(i, s.to))
      obs.disconnect()
    }
  }, { threshold: 0.3 })
  obs.observe(el)
})
</script>

<template>
  <section class="stats-section py-24 relative">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#00BFFF]/40" />
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <ScrollReveal v-for="(stat, i) in stats" :key="stat.label" :delay="i * 0.1">
          <div class="text-center">
            <div
              class="text-5xl md:text-6xl font-bold mb-2 gradient-text"
              style="font-family: Syne, sans-serif"
            >
              {{ counts[i] }}{{ stat.suffix }}
            </div>
            <p class="text-white/40 text-sm tracking-widest uppercase">{{ stat.label }}</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>