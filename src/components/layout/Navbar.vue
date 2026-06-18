<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const scrolled = ref(false)
const open = ref(false)

const links = [
  { href: '/', label: 'Головна' },
  { href: '/about', label: 'Про мене' },
  { href: '/discography', label: 'Дискографія' },
  { href: '/services', label: 'Послуги' },
  { href: '/portfolio', label: 'Портфоліо' },
  { href: '/contact', label: 'Контакти' }
]

const onScroll = () => (scrolled.value = window.scrollY > 40)
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-3 glass border-b border-white/5' : 'py-6'"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="relative group">
        <span
          class="text-2xl font-bold tracking-wider gradient-text"
          style="font-family: Syne, sans-serif"
        >INKBEAT</span>
        <span class="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-accent-blue to-accent-purple group-hover:w-full transition-all duration-500" />
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="relative text-sm text-white/60 hover:text-white transition-colors tracking-wide group"
        >
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 h-px w-0 bg-accent-blue group-hover:w-full transition-all duration-300" />
        </RouterLink>
      </nav>

      <!-- CTA -->
      <RouterLink
        to="/contact"
        class="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold border border-white/15 text-white hover:border-accent-blue hover:text-accent-blue hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] transition-all duration-300"
      >
        Замовити
      </RouterLink>

      <!-- Burger -->
      <button class="md:hidden text-white" @click="open = !open" aria-label="Menu">
        <X v-if="open" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </div>
  </header>

  <!-- Mobile overlay -->
  <Transition name="mobile-menu">
    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
    >
      <RouterLink
        v-for="(link, i) in links"
        :key="link.href"
        :to="link.href"
        class="text-3xl font-bold text-white/80 hover:text-white transition-colors"
        style="font-family: Syne, sans-serif"
        :style="{ animationDelay: `${i * 0.07}s` }"
        @click="open = false"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; transform: translateX(100%); }
</style>