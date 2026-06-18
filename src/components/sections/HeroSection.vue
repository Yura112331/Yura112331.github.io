<script setup lang="ts">
import { ref } from 'vue'
import ParticleBackground from '@/components/ui/ParticleBackground.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'
import { ChevronDown } from 'lucide-vue-next'

const titleRef = ref<HTMLElement | null>(null)

function onTitleMove(e: MouseEvent) {
  const el = titleRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
  el.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`
}
function onTitleLeave() {
  if (titleRef.value) titleRef.value.style.transform = ''
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
    <ParticleBackground />

    <!-- Orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(circle, #00BFFF, transparent 70%)"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(circle, #BF5FFF, transparent 70%)"
      />
    </div>

    <!-- Grid -->
    <div
      class="absolute inset-0 opacity-[0.02]"
      style="background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px);background-size:80px 80px"
    />

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-6xl mx-auto hero-content">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
        <span class="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
        <span class="text-xs tracking-widest text-white/60 uppercase font-mono">Незалежний артист</span>
      </div>

      <!-- Title -->
      <h1
        ref="titleRef"
        class="text-[clamp(4rem,14vw,12rem)] font-bold leading-none tracking-tighter mb-6 transition-transform duration-200"
        style="font-family: Syne, sans-serif"
        @mousemove="onTitleMove"
        @mouseleave="onTitleLeave"
      >
        <span class="gradient-text">INK</span><span class="text-white">BEAT</span>
      </h1>

      <!-- Sub -->
      <p class="text-white/40 text-base md:text-xl tracking-[0.3em] uppercase mb-12">
        Музичний артист • Автор пісень • Автор текстів
      </p>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <MagneticButton href="https://open.spotify.com/artist/6hkNwIjIfDcMDp5AObEbO9" target="_blank" variant="primary" size="lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Слухати музику
        </MagneticButton>
        <MagneticButton href="/services" variant="outline" size="lg">Замовити пісню</MagneticButton>
        <MagneticButton href="/contact" variant="ghost" size="lg">Зв'язатися →</MagneticButton>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 scroll-hint">
      <span class="text-xs tracking-widest uppercase font-mono">Scroll</span>
      <ChevronDown :size="16" class="animate-bounce" />
    </div>
  </section>
</template>

<style scoped>
.hero-content { animation: heroIn 0.9s cubic-bezier(0.76,0,0.24,1) 2s both; }
.scroll-hint  { animation: fadeIn 0.6s ease 3s both; }

@keyframes heroIn {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>