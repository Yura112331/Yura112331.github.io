<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  href?: string
  target?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'primary',
  size: 'md'
})

const tx = ref(0)
const ty = ref(0)
const el = ref<HTMLElement | null>(null)

function onMove(e: MouseEvent) {
  const rect = el.value!.getBoundingClientRect()
  tx.value = (e.clientX - rect.left - rect.width / 2) * 0.3
  ty.value = (e.clientY - rect.top - rect.height / 2) * 0.3
}

function onLeave() {
  tx.value = 0
  ty.value = 0
}

const sizeClass = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-base',
  lg: 'px-10 py-4 text-lg'
}

const variantClass = {
  primary: 'bg-gradient-to-r from-accent-blue to-accent-purple text-black font-bold hover:shadow-[0_0_30px_rgba(0,191,255,0.5)]',
  outline: 'border border-white/20 text-white hover:border-accent-blue hover:text-accent-blue hover:shadow-[0_0_20px_rgba(0,191,255,0.2)]',
  ghost: 'text-white/70 hover:text-white'
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    ref="el"
    class="inline-flex items-center gap-2 rounded-full transition-all duration-300 select-none tracking-wide font-semibold"
    :class="[sizeClass[size], variantClass[variant]]"
    :style="{ transform: `translate(${tx}px, ${ty}px)`, transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)' }"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <slot />
  </component>
</template>