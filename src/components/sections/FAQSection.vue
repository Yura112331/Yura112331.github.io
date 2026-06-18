<script setup lang="ts">
import { ref } from 'vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { Plus, Minus } from 'lucide-vue-next'

const faqs = [
  { q: 'Як замовити пісню або текст?',    a: 'Заповніть форму на сторінці Контакти або напишіть на inkbeat.mail@gmail.com. Опишіть запит, стиль та бажаний результат. Відповідаю протягом 24 годин.' },
  { q: 'Скільки коштують послуги?',        a: 'Вартість залежить від типу замовлення, обсягу та терміновості. Напишіть — обговоримо деталі та погодимо ціну індивідуально.' },
  { q: 'Які терміни виконання?',           a: 'Зазвичай від 2 до 7 робочих днів. Термінові замовлення — до 24 годин (за домовленістю).' },
  { q: 'Чи можна переглянути приклади?',   a: 'Так! Перейдіть на сторінку Портфоліо — там є приклади текстів, лірики та кейси.' },
  { q: 'Чи можливе виправлення?',          a: 'Включено 2 безкоштовних раунди правок. Ваша задоволеність — мій пріоритет.' },
  { q: 'Хто отримує авторські права?',     a: 'Після оплати всі права передаються вам. Я зберігаю право вказувати роботу в портфоліо (за погодженням).' }
]

const openIdx = ref<number | null>(null)
const toggle = (i: number) => { openIdx.value = openIdx.value === i ? null : i }
</script>

<template>
  <section class="section">
    <div class="max-w-3xl mx-auto px-6">
      <ScrollReveal>
        <div class="text-center mb-16">
          <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-3">— FAQ</p>
          <h2 class="text-4xl md:text-5xl font-bold text-white" style="font-family: Syne, sans-serif">
            Часті питання
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="0.2">
        <div class="glass rounded-3xl p-6 md:p-10 border border-white/5">
          <div v-for="(item, i) in faqs" :key="i" class="border-b border-white/5 last:border-0">
            <button
              class="w-full flex items-center justify-between py-6 text-left gap-4 group"
              @click="toggle(i)"
            >
              <span class="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                {{ item.q }}
              </span>
              <span class="flex-shrink-0 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 group-hover:border-accent-blue group-hover:text-accent-blue transition-all">
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
.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.35s ease, opacity 0.3s ease;
  max-height: 300px;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>