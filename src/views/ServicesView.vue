<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mic2, FileText, PenTool, Music2, Users, CheckCircle2 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import CTASection from '@/components/sections/CTASection.vue'

const { t, tm } = useI18n()

const icons = [Mic2, FileText, PenTool, Music2, Users]
const colors = ['#00BFFF', '#BF5FFF', '#00FFE5', '#00BFFF', '#BF5FFF']

const services = computed(() =>
  (tm('servicesPage.items') as { title: string; desc: string; price: string; benefits: string[] }[])
    .map((item, i) => ({ ...item, icon: icons[i], color: colors[i] }))
)
</script>

<template>
  <!-- Header -->
  <section class="pt-40 pb-20 relative overflow-hidden bg-black">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 right-1/3 w-[600px] h-[400px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(ellipse, #BF5FFF, transparent 70%)" />
    </div>
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <ScrollReveal>
        <p class="text-xs tracking-widest uppercase text-accent-purple font-mono mb-4">— t('servicesPage.label')</p>
        <h1 class="text-5xl md:text-8xl font-bold text-white leading-tight mb-6" style="font-family: Syne, sans-serif">
          t('servicesPage.title') <span class="gradient-text">t('servicesPage.highlight')</span>
        </h1>
        <p class="text-white/40 text-lg max-w-xl">
          t('servicesPage.subtitle')
        </p>
      </ScrollReveal>
    </div>
  </section>

  <!-- Services -->
  <section class="section bg-surface-100">
    <div class="max-w-7xl mx-auto px-6 space-y-8">
      <ScrollReveal v-for="(s, i) in services" :key="s.title" :delay="i * 0.08">
        <div
          class="glass rounded-3xl p-8 md:p-12 border border-white/5 hover:shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-all duration-500">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <!-- Left -->
            <div>
              <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  :style="{ background: s.color + '15', border: `1px solid ${s.color}40` }">
                  <component :is="s.icon" :size="26" :style="{ color: s.color }" />
                </div>
                <div>
                  <h2 class="text-xl md:text-2xl font-bold text-white" style="font-family: Syne, sans-serif">
                    {{ s.title }}
                  </h2>
                  <span class="text-sm font-mono" :style="{ color: s.color }">{{ s.price }}</span>
                </div>
              </div>
              <p class="text-white/60 leading-relaxed mb-8">{{ s.desc }}</p>
              <RouterLink to="/contact"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border"
                :style="{ borderColor: s.color + '40', color: s.color }">
                t('servicesPage.order')
              </RouterLink>
            </div>

            <!-- Right: benefits -->
            <div class="space-y-3">
              <div v-for="b in s.benefits" :key="b" class="flex items-center gap-3">
                <CheckCircle2 :size="18" :style="{ color: s.color, flexShrink: 0 }" />
                <span class="text-white/70 text-sm">{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <CTASection />
</template>