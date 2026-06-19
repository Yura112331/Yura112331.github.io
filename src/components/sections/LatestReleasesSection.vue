<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSpotify } from '@/composables/useSpotify'
import { formatDate } from '@/utils'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { ExternalLink, Music } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
const { data, isLoading, isError } = useSpotify()

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    album: t('discography.typeAlbum'),
    single: t('discography.typeSingle'),
    compilation: t('discography.typeEP')
  }
  return map[type] || type
}
</script>

<template>
  <section class="section bg-surface-100">
    <div class="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div class="flex items-end justify-between mb-16">
          <div>
            <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-3">— {{ t('releases.label') }}</p>
            <h2 class="text-4xl md:text-6xl font-bold text-white" style="font-family: Syne, sans-serif">{{
              t('releases.title') }}</h2>
          </div>
          <RouterLink to="/discography"
            class="hidden md:inline-flex text-sm text-white/40 hover:text-white transition-colors">
            {{ t('releases.all') }}
          </RouterLink>
        </div>
      </ScrollReveal>

      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="glass rounded-2xl overflow-hidden animate-pulse">
          <div class="aspect-square bg-surface-300" />
          <div class="p-5 space-y-3">
            <div class="h-4 bg-surface-300 rounded w-3/4" />
            <div class="h-3 bg-surface-300 rounded w-1/2" />
          </div>
        </div>
      </div>

      <div v-else-if="isError" class="text-center py-20 text-white/40">
        <Music :size="40" class="mx-auto mb-4 opacity-30" />
        <p>{{ t('releases.error') }}</p>
        <p class="text-sm mt-2">{{ t('releases.errorHint') }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal v-for="(album, i) in (data?.albums ?? []).slice(0, 6)" :key="album.id" :delay="i * 0.08">
          <div
            class="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/30 hover:shadow-[0_0_40px_rgba(0,191,255,0.08)] transition-all duration-500 hover:-translate-y-1 h-full">
            <div class="relative aspect-square overflow-hidden">
              <img v-if="album.images[0]" :src="album.images[0].url" :alt="album.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy" />
              <div v-else class="w-full h-full bg-surface-300 flex items-center justify-center">
                <Music :size="40" class="text-white/20" />
              </div>
              <div class="absolute top-3 left-3">
                <span class="px-2 py-1 text-xs rounded-full glass border border-white/10 text-white/70 font-mono">{{
                  getTypeLabel(album.album_type) }}</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-white truncate mb-1" style="font-family: Syne, sans-serif">{{ album.name }}
              </h3>
              <p class="text-xs text-white/40 mb-4">{{ formatDate(album.release_date) }}</p>
              <div class="rounded-xl overflow-hidden mb-4">
                <iframe :src="`https://open.spotify.com/embed/album/${album.id}?utm_source=generator&theme=0`"
                  width="100%" height="80" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
                  class="block" />
              </div>
              <a :href="album.external_urls.spotify" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-xs text-accent-blue hover:text-accent-cyan transition-colors">
                {{ t('releases.spotify') }}
                <ExternalLink :size="12" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div class="mt-10 text-center md:hidden">
        <RouterLink to="/discography" class="text-sm text-white/40 hover:text-white transition-colors">{{
          t('releases.all') }}</RouterLink>
      </div>
    </div>
  </section>
</template>