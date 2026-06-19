<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Menu, X } from 'lucide-vue-next'
import LangSwitcher from '@/components/ui/LangSwitcher.vue'

const { t } = useI18n()
const scrolled = ref(false)
const open = ref(false)

const links = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { href: '/discography', key: 'nav.discography' },
  { href: '/services', key: 'nav.services' },
  { href: '/portfolio', key: 'nav.portfolio' },
  { href: '/contact', key: 'nav.contact' }
]

const onScroll = () => (scrolled.value = window.scrollY > 40)
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-3 glass border-b border-white/5' : 'py-6'">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <RouterLink to="/" class="relative group">
        <span class="text-2xl font-bold tracking-wider gradient-text"
          style="font-family: Syne, sans-serif">INKBEAT</span>
        <span
          class="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-accent-blue to-accent-purple group-hover:w-full transition-all duration-500" />
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8">
        <RouterLink v-for="link in links" :key="link.href" :to="link.href"
          class="relative text-sm text-white/60 hover:text-white transition-colors tracking-wide group">
          {{ t(link.key) }}
          <span
            class="absolute -bottom-1 left-0 h-px w-0 bg-accent-blue group-hover:w-full transition-all duration-300" />
        </RouterLink>
      </nav>

      <div class="hidden md:flex items-center gap-3">
        <LangSwitcher />
        <RouterLink to="/contact"
          class="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold border border-white/15 text-white hover:border-accent-blue hover:text-accent-blue transition-all duration-300">
          {{ t('nav.order') }}
        </RouterLink>
      </div>

      <button class="md:hidden text-white" @click="open = !open">
        <X v-if="open" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </div>
  </header>

  <Transition name="mobile-menu">
    <div v-if="open"
      class="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
      <RouterLink v-for="link in links" :key="link.href" :to="link.href"
        class="text-3xl font-bold text-white/80 hover:text-white transition-colors"
        style="font-family: Syne, sans-serif" @click="open = false">
        {{ t(link.key) }}
      </RouterLink>
      <LangSwitcher />
    </div>
  </Transition>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>