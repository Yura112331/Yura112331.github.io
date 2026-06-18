<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { ChevronLeft, ChevronRight, Star } from 'lucide-vue-next'

const testimonials = [
  { name: 'Олексій М.',  role: 'Музикант',           text: 'InkBeat написав для мене текст, який точно відобразив те, що я хотів сказати. Професійно, швидко, з душею. Рекомендую всім артистам.', stars: 5 },
  { name: 'Вікторія К.', role: 'Блогер',              text: 'Замовила вірш для особливого моменту — отримала шедевр. Слова торкнулися серця. Буду повертатись ще.', stars: 5 },
  { name: 'Дмитро Л.',   role: 'Початківець-артист',  text: 'Дуже задоволений колаборацією. InkBeat розуміє музику на глибокому рівні. Наша спільна пісня вийшла неймовірно.', stars: 5 },
  { name: 'Марія П.',    role: 'Event-менеджер',      text: 'Замовили авторський текст для корпоративного гімну. Результат перевершив очікування. Дуже рекомендую.', stars: 5 }
]

const index = ref(0)
const direction = ref(1)
let timer: ReturnType<typeof setInterval>

function go(dir: number) {
  direction.value = dir
  index.value = (index.value + dir + testimonials.length) % testimonials.length
}

onMounted(() => { timer = setInterval(() => go(1), 5000) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="section bg-surface-100">
    <div class="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div class="text-center mb-16">
          <p class="text-xs tracking-widest uppercase text-accent-cyan font-mono mb-3">— Відгуки</p>
          <h2 class="text-4xl md:text-5xl font-bold text-white" style="font-family: Syne, sans-serif">
            Що кажуть клієнти
          </h2>
        </div>
      </ScrollReveal>

      <div class="relative">
        <Transition :name="direction > 0 ? 'slide-left' : 'slide-right'" mode="out-in">
          <div
            :key="index"
            class="glass rounded-3xl p-10 md:p-14 border border-white/5 text-center"
          >
            <div class="flex justify-center gap-1 mb-6">
              <Star v-for="i in testimonials[index].stars" :key="i" :size="18" class="text-yellow-400 fill-yellow-400" />
            </div>
            <blockquote class="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 italic">
              "{{ testimonials[index].text }}"
            </blockquote>
            <p class="font-semibold text-white" style="font-family: Syne, sans-serif">{{ testimonials[index].name }}</p>
            <p class="text-sm text-white/40">{{ testimonials[index].role }}</p>
          </div>
        </Transition>

        <!-- Controls -->
        <div class="flex items-center justify-center gap-4 mt-8">
          <button
            class="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-accent-blue transition-all"
            @click="go(-1)"
          >
            <ChevronLeft :size="18" />
          </button>

          <div class="flex gap-2">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              class="h-1 rounded-full transition-all duration-300"
              :class="i === index ? 'w-8 bg-accent-blue' : 'w-2 bg-white/20'"
              @click="() => { direction = i > index ? 1 : -1; index = i }"
            />
          </div>

          <button
            class="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-accent-blue transition-all"
            @click="go(1)"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.slide-left-enter-from  { opacity: 0; transform: translateX(50px); }
.slide-left-leave-to    { opacity: 0; transform: translateX(-50px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-50px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(50px); }
</style>