<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-32 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[100px] opacity-10"
        style="background: radial-gradient(ellipse, #00BFFF 0%, #BF5FFF 50%, transparent 70%)" />
    </div>
    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <ScrollReveal>
        <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-4">— {{ t('cta.label') }}</p>
        <h2 class="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight" style="font-family: Syne, sans-serif">
          {{ t('cta.title') }}<br /><span class="gradient-text">{{ t('cta.highlight') }}</span>
        </h2>
        <p class="text-white/40 text-lg mb-10 max-w-xl mx-auto">{{ t('cta.subtitle') }}</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink to="/contact"
            class="px-10 py-5 rounded-full font-bold text-black text-lg hover:shadow-[0_0_40px_rgba(0,191,255,0.5)] transition-all duration-300"
            style="background: linear-gradient(135deg, #00BFFF, #BF5FFF)">
            {{ t('cta.contact') }}
          </RouterLink>
          <RouterLink to="/services"
            class="px-10 py-5 rounded-full font-semibold text-white border border-white/15 hover:border-white/40 transition-all duration-300">
            {{ t('cta.services') }}
          </RouterLink>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>