<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}>(), {
  delay: 0,
  direction: 'up'
})

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return

  const dirMap = {
    up: 'translateY(40px)',
    left: 'translateX(50px)',
    right: 'translateX(-50px)',
    none: 'none'
  }

  el.value.style.opacity = '0'
  el.value.style.transform = dirMap[props.direction]
  el.value.style.transition = `opacity 0.8s ease ${props.delay}s, transform 0.8s ease ${props.delay}s`

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.value!.style.opacity = '1'
        el.value!.style.transform = 'none'
        observer.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '-60px' }
  )

  observer.observe(el.value)
})
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>