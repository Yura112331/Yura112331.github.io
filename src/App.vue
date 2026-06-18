<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import CustomCursor from '@/components/ui/CustomCursor.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { useScrollReveal } from '@/composables/useScrollReveal'

useSmoothScroll()
useScrollReveal()
</script>

<template>
  <LoadingScreen />
  <CustomCursor />
  <Navbar />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <Footer />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>