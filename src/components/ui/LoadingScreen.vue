<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)
const progress = ref(0)
const letters = 'INKBEAT'.split('')

onMounted(() => {
  const interval = setInterval(() => {
    progress.value = Math.min(progress.value + Math.random() * 15 + 5, 100)
    if (progress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => (visible.value = false), 400)
    }
  }, 80)
})
</script>

<template>
  <Transition name="loading">
    <div v-if="visible" class="loading-screen">
      <!-- Glow orb -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none animate-pulse-slow"
        style="background: radial-gradient(circle, #00BFFF 0%, #BF5FFF 50%, transparent 70%)"
      />

      <div class="relative z-10 flex flex-col items-center gap-8">
        <!-- Letters -->
        <div class="flex items-center gap-1 overflow-hidden">
          <span
            v-for="(letter, i) in letters"
            :key="i"
            class="text-6xl font-bold gradient-text letter-anim"
            :style="{ animationDelay: `${i * 0.05 + 0.3}s`, fontFamily: 'Syne, sans-serif' }"
          >
            {{ letter }}
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-64 h-px bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-100"
            style="background: linear-gradient(90deg, #00BFFF, #BF5FFF)"
            :style="{ width: Math.min(progress, 100) + '%' }"
          />
        </div>

        <p class="text-white/30 text-sm tracking-widest uppercase font-mono">
          {{ Math.round(Math.min(progress, 100)) }}%
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.letter-anim {
  animation: letterUp 0.7s cubic-bezier(0.76, 0, 0.24, 1) both;
}

@keyframes letterUp {
  from { opacity: 0; transform: translateY(60px); }
  to   { opacity: 1; transform: translateY(0); }
}

.loading-leave-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.loading-leave-to { opacity: 0; transform: scale(1.05); }
</style>