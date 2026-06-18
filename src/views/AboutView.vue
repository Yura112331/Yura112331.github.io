<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import CTASection from '@/components/sections/CTASection.vue'
import { Music, Mic2, Globe, Award } from 'lucide-vue-next'

const timeline = [
  { year: '2024', title: 'Перший реліз', desc: 'Вихід першого синглу на всіх стримінгових платформах.' },
  { year: '2024', title: 'Spotify for Artists', desc: 'Верифікація профілю на Spotify та перші слухачі.' },
  { year: '2025', title: 'Зростання аудиторії', desc: 'Тисячі прослуховувань та активна присутність у соцмережах.' },
  { year: '2025', title: 'Розширення послуг', desc: 'Початок написання пісень та текстів на замовлення.' },
  { year: '2026', title: 'Новий рівень', desc: 'Активна студійна робота та колаборації з іншими артистами.' }
]

const skills = [
  { icon: Music,  label: 'Музика',       color: '#00BFFF' },
  { icon: Mic2,   label: 'Вокал',        color: '#BF5FFF' },
  { icon: Globe,  label: 'Тексти',       color: '#00FFE5' },
  { icon: Award,  label: 'Оригінальність', color: '#00BFFF' }
]
</script>

<template>
  <!-- Hero -->
  <section class="min-h-[50vh] flex items-end pb-20 pt-40 relative overflow-hidden bg-black">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(circle, #BF5FFF, transparent 70%)"
      />
    </div>
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <ScrollReveal>
        <p class="text-xs tracking-widest uppercase text-accent-purple font-mono mb-4">— Про мене</p>
        <h1 class="text-5xl md:text-8xl font-bold text-white leading-tight" style="font-family: Syne, sans-serif">
          Музика — це<br />
          <span class="gradient-text">мова душі</span>
        </h1>
      </ScrollReveal>
    </div>
  </section>

  <!-- Bio -->
  <section class="section bg-surface-100">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <!-- Photo placeholder -->
        <ScrollReveal direction="left">
          <div class="relative">
            <div class="aspect-[3/4] rounded-3xl bg-surface-300 overflow-hidden relative">
              <div class="absolute inset-0" style="background: linear-gradient(135deg,#00BFFF15,#BF5FFF15)" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-8xl font-bold mb-4 gradient-text" style="font-family: Syne, sans-serif">IB</div>
                  <p class="text-white/30 text-sm tracking-widest">INKBEAT</p>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-accent-blue/20 -z-10" />
          </div>
        </ScrollReveal>

        <!-- Text -->
        <ScrollReveal direction="right" :delay="0.2">
          <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold text-white" style="font-family: Syne, sans-serif">
              Привіт, я — InkBeat
            </h2>
            <div class="space-y-4 text-white/60 leading-relaxed">
              <p>
                Я незалежний музичний артист з України, який пише музику, яка торкається серця.
                Моє ім'я — InkBeat — відображає суть того, що я роблю: чорнило слів + пульс ритму.
              </p>
              <p>
                Починаючи з 2024 року я активно випускаю авторську музику на всіх стримінгових
                платформах — Spotify, Apple Music, YouTube Music, SoundCloud. Кожен трек — це
                особиста історія, емоція або послання.
              </p>
              <p>
                Паралельно я допомагаю іншим артистам та брендам знаходити своє звучання через
                слова. Написання пісень, текстів, поезії на замовлення — це частина моєї творчої місії.
              </p>
            </div>

            <!-- Skills -->
            <div class="grid grid-cols-2 gap-3 pt-4">
              <div
                v-for="s in skills"
                :key="s.label"
                class="flex items-center gap-3 p-3 rounded-xl glass border border-white/5"
              >
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  :style="{ background: s.color + '15', border: `1px solid ${s.color}30` }"
                >
                  <component :is="s.icon" :size="16" :style="{ color: s.color }" />
                </div>
                <span class="text-sm text-white/70">{{ s.label }}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>

  <!-- Timeline -->
  <section class="section">
    <div class="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div class="text-center mb-16">
          <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-3">— Шлях</p>
          <h2 class="text-4xl md:text-5xl font-bold text-white" style="font-family: Syne, sans-serif">
            Творчий шлях
          </h2>
        </div>
      </ScrollReveal>

      <div class="relative">
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-transparent opacity-30" />

        <div class="space-y-12">
          <ScrollReveal
            v-for="(item, i) in timeline"
            :key="i"
            :delay="i * 0.1"
          >
            <div class="relative flex items-start gap-8" :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
              <!-- Dot -->
              <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue border-2 border-black shadow-[0_0_10px_#00BFFF]" />
              <!-- Card -->
              <div class="ml-16 md:ml-0 md:w-1/2" :class="i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'">
                <div class="glass rounded-2xl p-6 border border-white/5">
                  <span class="text-xs font-mono text-accent-blue mb-2 block">{{ item.year }}</span>
                  <h3 class="text-lg font-bold text-white mb-2" style="font-family: Syne, sans-serif">{{ item.title }}</h3>
                  <p class="text-white/50 text-sm leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>

  <CTASection />
</template>