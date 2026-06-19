<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { tm } from 'vue-i18n'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import CTASection from '@/components/sections/CTASection.vue'

const { t, tm } = useI18n()

const portfolioStats = computed(() => [
  { num: '50+', label: t('portfolio.s1') },
  { num: '20+', label: t('portfolio.s2') },
  { num: '5', label: t('portfolio.s3') },
  { num: '100%', label: t('portfolio.s4') }
])

const works = [
  {
    type: 'Текст пісні', title: 'Нічне місто',
    excerpt: 'Вогні мерехтять у темряві ночі,\nТвій силует — мій єдиний маяк.\nМи — два вогника в цьому морі...',
    tags: ['поп', 'лірика', 'ніч'], color: '#00BFFF'
  },
  {
    type: 'Поезія', title: 'Між рядками',
    excerpt: 'Між словами — тиша,\nМіж нами — відстань.\nАле музика — вище\nБудь-яких перешкод...',
    tags: ['поезія', 'почуття'], color: '#BF5FFF'
  },
  {
    type: 'Реп-текст', title: 'Перший крок',
    excerpt: 'Починав з нуля, мав лише мрію в кишені,\nМій шлях — не рівний, але кожен крок — мій.\nНе шукав схвалення — робив своє...',
    tags: ['реп', 'мотивація', 'хіп-хоп'], color: '#00FFE5'
  },
  {
    type: 'Текст пісні', title: 'Осінній дощ',
    excerpt: 'Краплі б\'ються об вікно,\nЯк слова, що я не сказав.\nОсінь знову принесла\nТе, що я так довго ховав...',
    tags: ['акустика', 'осінь', 'ностальгія'], color: '#00BFFF'
  },
  {
    type: 'Кейс — Колаборація', title: 'Спільний проект',
    excerpt: 'Написав текст для спільного треку з локальним артистом. Результат: 10K+ стримів за перший місяць. Взаємна промоція дала +500 підписників обом авторам.',
    tags: ['кейс', 'колаборація', 'результат'], color: '#BF5FFF'
  },
  {
    type: 'Поезія', title: 'Свобода',
    excerpt: 'Свобода — не відсутність меж,\nА вміння танцювати в них.\nЯ вільний, бо обрав свій шлях...',
    tags: ['поезія', 'свобода', 'філософія'], color: '#00FFE5'
  },
  {
    type: 'Текст для бренду', title: 'Корпоративний гімн',
    excerpt: 'Ми разом будуємо — крок за кроком,\nНаша сила — в єдності та мрії спільній...',
    tags: ['корпоратив', 'мотивація', 'бренд'], color: '#00BFFF'
  },
  {
    type: 'Реліз', title: 'Spotify — перший сингл',
    excerpt: 'Дебютний сингл набрав 5000+ стримів органічно за 2 тижні. Потрапив до кількох редакційних плейлистів. Відгуки слухачів перевищили очікування.',
    tags: ['досягнення', 'Spotify', 'реліз'], color: '#BF5FFF'
  }
]

const stats = [
  { num: '50+', label: 'Написаних текстів' },
  { num: '20+', label: 'Релізів на Spotify' },
  { num: '5', label: 'Типів послуг' },
  { num: '100%', label: 'Задоволені клієнти' }
]

</script>

<template>
  <!-- Header -->
  <section class="pt-40 pb-20 relative overflow-hidden bg-black">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(circle, #00FFE5, transparent 70%)" />
    </div>
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <ScrollReveal>
        <p class="text-xs tracking-widest uppercase text-accent-cyan font-mono mb-4">— {{ t('portfolio.label') }}</p>
        <h1 class="text-5xl md:text-8xl font-bold text-white leading-tight mb-6" style="font-family: Syne, sans-serif">
          {{ t('portfolio.title') }} <span class="gradient-text">{{ t('portfolio.highlight') }}</span>
        </h1>
        <p class="text-white/40 text-lg max-w-xl">
          {{ t('portfolio.subtitle') }}
        </p>
      </ScrollReveal>
    </div>
  </section>

  <!-- Masonry -->
  <section class="section bg-surface-100">
    <div class="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div class="masonry">
          <div v-for="(work, i) in works" :key="i"
            class="glass rounded-2xl p-6 border border-white/5 hover:-translate-y-1 transition-all duration-500 cursor-default"
            :style="{ borderColor: work.color + '10' }">
            <!-- Badge -->
            <span class="px-3 py-1 rounded-full text-xs font-mono border inline-block mb-4"
              :style="{ color: work.color, borderColor: work.color + '40', background: work.color + '10' }">
              {{ work.type }}
            </span>

            <h3 class="text-lg font-bold text-white mb-3" style="font-family: Syne, sans-serif">
              {{ work.title }}
            </h3>

            <p class="text-white/50 text-sm leading-relaxed mb-4 whitespace-pre-line italic">
              "{{ work.excerpt }}"
            </p>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in work.tags" :key="tag"
                class="text-xs text-white/30 px-2 py-0.5 rounded-full bg-white/5">
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-20 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="s in stats" :key="s.label">
            <div class="text-4xl font-bold gradient-text mb-2" style="font-family: Syne, sans-serif">{{ s.num }}</div>
            <p class="text-white/40 text-sm">{{ s.label }}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>

  <CTASection />
</template>