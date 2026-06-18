<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { RouterLink } from 'vue-router'
import { Mic2, FileText, PenTool, Music2, Users } from 'lucide-vue-next'

const services = [
  { icon: Mic2,     title: 'Написання пісень',  desc: 'Авторські пісні під ваш стиль',         color: '#00BFFF' },
  { icon: FileText, title: 'Тексти пісень',      desc: 'Глибокі тексти для вашої музики',       color: '#BF5FFF' },
  { icon: PenTool,  title: 'Вірші та поезія',    desc: 'Авторська поезія для будь-яких цілей',  color: '#00FFE5' },
  { icon: Music2,   title: 'Під ключ',           desc: 'Повноцінні авторські композиції',        color: '#00BFFF' },
  { icon: Users,    title: 'Колаборації',         desc: 'Спільні проєкти для артистів',          color: '#BF5FFF' }
]
</script>

<template>
  <section class="section">
    <div class="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div class="text-center mb-16">
          <p class="text-xs tracking-widest uppercase text-accent-purple font-mono mb-3">— Послуги</p>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4" style="font-family: Syne, sans-serif">
            Творчі послуги
          </h2>
          <p class="text-white/40 max-w-xl mx-auto">
            Допомагаю артистам та брендам знаходити своє звучання через слова та музику
          </p>
        </div>
      </ScrollReveal>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        <ScrollReveal v-for="(s, i) in services" :key="s.title" :delay="i * 0.1">
          <div class="glass rounded-2xl p-6 border border-white/5 hover:-translate-y-2 transition-all duration-500 text-center">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              :style="{ background: s.color + '15', border: `1px solid ${s.color}30` }"
            >
              <component :is="s.icon" :size="22" :style="{ color: s.color }" />
            </div>
            <h3 class="font-semibold text-white text-sm mb-2" style="font-family: Syne, sans-serif">{{ s.title }}</h3>
            <p class="text-white/40 text-xs leading-relaxed">{{ s.desc }}</p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div class="text-center">
          <RouterLink
            to="/services"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white hover:border-accent-purple hover:text-accent-purple hover:shadow-[0_0_30px_rgba(191,95,255,0.2)] transition-all duration-300 font-semibold"
          >
            Детальніше про послуги →
          </RouterLink>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>