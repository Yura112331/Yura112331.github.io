<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dotX = ref(0)
const dotY = ref(0)
const ringX = ref(0)
const ringY = ref(0)

let mouseX = 0
let mouseY = 0
let rafId: number

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  dotX.value = mouseX
  dotY.value = mouseY
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function animate() {
  ringX.value = lerp(ringX.value, mouseX, 0.12)
  ringY.value = lerp(ringY.value, mouseY, 0.12)
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    class="cursor-dot"
    :style="{ left: dotX + 'px', top: dotY + 'px' }"
  />
  <div
    class="cursor-ring"
    :style="{ left: ringX + 'px', top: ringY + 'px' }"
  />
</template>