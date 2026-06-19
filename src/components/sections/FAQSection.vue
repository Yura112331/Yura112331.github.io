<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { Plus, Minus } from 'lucide-vue-next'

const { t, tm } = useI18n()
const openIdx = ref<number | null>(null)
const toggle = (i: number) => { openIdx.value = openIdx.value === i ? null : i }

const items = computed(() => tm('faq.items') as { q: string; a: string }[])
</script>

<template>
  <section class="section">
    <div class="max-w-3xl mx-auto px-6">
      <ScrollReveal>
        <div class="text-center mb-16">
          <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-3">— {{ t('faq.label') }}</p>
          <h2 class="text-4xl md:text-5xl font-bold text-white" style="font-family: Syne, sans-serif">{{ t('faq.title')
            }}</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="0.2">
        <div class="glass rounded-3xl p-6 md:p-10 border border-white/5">
          <div v-for="(item, i) in items" :key="i" class="border-b border-white/5 last:border-0">
            <button class="w-full flex items-center justify-between py-6 text-left gap-4 group" @click="toggle(i)">
              <span class="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors">{{
                item.q }}</span>
              <span
                class="flex-shrink-0 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 group-hover:border-accent-blue group-hover:text-accent-blue transition-all">
                <Minus v-if="openIdx === i" :size="14" />
                <Plus v-else :size="14" />
              </span>
            </button>
            <Transition name="accordion">
              <div v-if="openIdx === i" class="overflow-hidden">
                <p class="pb-6 text-white/50 leading-relaxed text-sm md:text-base">{{ item.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.35s ease, opacity 0.3s ease;
  max-height: 300px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>