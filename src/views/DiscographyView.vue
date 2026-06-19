<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSpotify } from '@/composables/useSpotify'
import { formatDate } from '@/utils'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { Search, ExternalLink, Music } from 'lucide-vue-next'
import type { SpotifyAlbum } from '@/types/spotify'

const { t } = useI18n()
const { data, isLoading, isError } = useSpotify()

type Filter = 'all' | 'single' | 'album' | 'compilation'
const filter = ref<Filter>('all')
const search = ref('')
const expandedId = ref<string | null>(null)

const filterOptions = computed(() => [
  { value: 'all' as Filter, label: t('discography.filterAll') },
  { value: 'single' as Filter, label: t('discography.filterSingle') },
  { value: 'album' as Filter, label: t('discography.filterAlbum') },
  { value: 'compilation' as Filter, label: t('discography.filterEP') }
])

const filtered = computed<SpotifyAlbum[]>(() =>
  (data.value?.albums ?? []).filter(a =>
    (filter.value === 'all' || a.album_type === filter.value) &&
    a.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    album: t('discography.typeAlbum'),
    single: t('discography.typeSingle'),
    compilation: t('discography.typeEP')
  }
  return map[type] || type
}

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
  <!-- Header -->
  <section class="pt-40 pb-16 relative overflow-hidden bg-black">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/3 w-[600px] h-[400px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(ellipse, #00BFFF, transparent 70%)" />
    </div>
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <ScrollReveal>
        <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-4">— t('discography.label')</p>
        <h1 class="text-5xl md:text-8xl font-bold text-white leading-tight mb-4" style="font-family: Syne, sans-serif">
          t('discography.title') <span class="gradient-text">t('discography.highlight')</span>
        </h1>
        <p class="text-white/40 text-lg">
          {{ data?.albums?.length ?? '...' }} релізів • Автоматично зі Spotify
        </p>
      </ScrollReveal>
    </div>
  </section>

  <!-- Controls -->
  <section class="py-6 bg-surface-100 sticky top-[64px] z-30 border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <!-- Filters -->
      <div class="flex gap-2 flex-wrap">
        <button v-for="opt in filterOptions" :key="opt.value"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300" :class="filter === opt.value
            ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-black'
            : 'glass border border-white/10 text-white/60 hover:text-white hover:border-white/30'"
          @click="filter = opt.value">
          {{ opt.label }}
        </button>
      </div>

      <!-- Search -->
      <div class="relative">
        <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input v-model="search" type="text" placeholder="Пошук..."
          class="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-colors w-52" />
      </div>
    </div>
  </section>

  <!-- Grid -->
  <section class="section bg-surface-100">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="glass rounded-2xl overflow-hidden animate-pulse">
          <div class="aspect-square bg-surface-300" />
          <div class="p-5 space-y-3">
            <div class="h-4 bg-surface-300 rounded w-3/4" />
            <div class="h-3 bg-surface-300 rounded w-1/2" />
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="text-center py-20 text-white/40">
        <Music :size="50" class="mx-auto mb-4 opacity-20" />
        <p class="mb-2">Не вдалося завантажити релізи.</p>
        <p class="text-sm">Перевірте налаштування Spotify API і чи запущений сервер на порту 3001.</p>
      </div>

      <!-- Empty -->
      <div v-else-if="filtered.length === 0" class="text-center py-20 text-white/30">
        <Music :size="50" class="mx-auto mb-4 opacity-20" />
        <p>Нічого не знайдено</p>
      </div>

      <!-- Albums grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="album in filtered" :key="album.id"
          class="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,191,255,0.06)] hover:-translate-y-1">
          <!-- Cover -->
          <div class="relative aspect-square overflow-hidden">
            <img v-if="album.images[0]" :src="album.images[0].url" :alt="album.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy" />
            <div v-else class="w-full h-full bg-surface-300 flex items-center justify-center">
              <Music :size="40" class="text-white/20" />
            </div>
            <div class="absolute top-3 left-3">
              <span class="px-2 py-1 text-xs rounded-full glass border border-white/10 text-white/70 font-mono">
                {{ getAlbumTypeLabel(album.album_type) }}
              </span>
            </div>
          </div>

          <!-- Info -->
          <div class="p-5">
            <h3 class="font-bold text-white truncate mb-1" style="font-family: Syne, sans-serif">
              {{ album.name }}
            </h3>
            <p class="text-xs text-white/40 mb-4">{{ formatDate(album.release_date) }}</p>

            <!-- Toggle player -->
            <button class="text-xs text-accent-blue hover:text-accent-cyan transition-colors mb-3"
              @click="toggleExpand(album.id)">
              {{ expandedId === album.id ? 'Сховати ↑' : 'Слухати ▶' }}
            </button>

            <Transition name="slide">
              <div v-if="expandedId === album.id" class="overflow-hidden mb-3">
                <iframe :src="`https://open.spotify.com/embed/album/${album.id}?utm_source=generator&theme=0`"
                  width="100%" height="80" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
                  class="rounded-xl" />
              </div>
            </Transition>

            <a :href="album.external_urls.spotify" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
              Відкрити в Spotify
              <ExternalLink :size="11" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 200px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>