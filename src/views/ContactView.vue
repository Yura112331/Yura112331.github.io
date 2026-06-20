<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { Mail, Music2, Send, CheckCircle2, AlertCircle } from 'lucide-vue-next'

const { t } = useI18n()

const socials = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/6hkNwIjIfDcMDp5AObEbO9', color: '#1DB954' },
  { label: 'Instagram', href: 'https://www.instagram.com/_.inkbeat._/', color: '#E1306C' },
  { label: 'YouTube', href: 'https://www.youtube.com/@1nkBeat12/shorts', color: '#FF0000' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@inkbeat_', color: '#00BFFF' },
  { label: 'Apple Music', href: 'https://music.apple.com/ua/artist/inkbeat/1850263830?l=uk', color: '#FC3C44' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/akabbvwcbvle', color: '#FF5500' }
]

const form = reactive({ name: '', email: '', subject: '', message: '', honeypot: '' })
const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const statusMsg = ref('')

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim()) errors.name = t('contact.fName')
  if (!form.email.trim()) errors.email = t('contact.fEmail')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email'
  if (!form.message.trim()) errors.message = t('contact.fMessage')
  return Object.keys(errors).length === 0
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function submit() {
  if (form.honeypot || !validate()) return
  status.value = 'loading'
  try {
    const res = await fetch(`${API}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      status.value = 'success'
      statusMsg.value = data.message
      Object.assign(form, { name: '', email: '', subject: '', message: '' })
    } else {
      status.value = 'error'
      statusMsg.value = data.error
    }
  } catch {
    status.value = 'error'
    statusMsg.value = 'Server unavailable. Email: inkbeat.mail@gmail.com'
  }
}
</script>

<template>
  <!-- Header -->
  <section class="pt-40 pb-20 relative overflow-hidden bg-black">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style="background: radial-gradient(circle, #00BFFF, transparent 70%)" />
    </div>
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <ScrollReveal>
        <p class="text-xs tracking-widest uppercase text-accent-blue font-mono mb-4">— {{ t('contact.label') }}</p>
        <h1 class="text-5xl md:text-8xl font-bold text-white leading-tight" style="font-family: Syne, sans-serif">
          {{ t('contact.title') }} <span class="gradient-text">{{ t('contact.highlight') }}</span>
        </h1>
      </ScrollReveal>
    </div>
  </section>

  <!-- Content -->
  <section class="section bg-surface-100">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">

        <!-- Left: info -->
        <ScrollReveal direction="left">
          <div class="space-y-12">
            <!-- Email -->
            <div>
              <h3 class="text-xs tracking-widest uppercase text-white/30 font-mono mb-4">{{ t('contact.emailLabel') }}
              </h3>
              <a href="mailto:inkbeat.mail@gmail.com"
                class="flex items-center gap-3 text-xl text-white hover:text-accent-blue transition-colors">
                <Mail :size="24" class="text-accent-blue" />
                inkbeat.mail@gmail.com
              </a>
            </div>

            <!-- Status -->
            <div class="glass rounded-2xl p-6 border border-white/5">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span class="text-sm text-green-400">{{ t('contact.status') }}</span>
              </div>
              <p class="text-white/60 text-sm">
                {{ t('contact.statusText') }} <strong class="text-white">{{ t('contact.statusHours') }}</strong>.
                {{ t('contact.statusHint') }}
              </p>
            </div>

            <!-- Socials -->
            <div>
              <h3 class="text-xs tracking-widest uppercase text-white/30 font-mono mb-6">{{ t('contact.socialsLabel') }}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-3 p-3 rounded-xl glass border border-white/5 hover:border-white/20 transition-all group">
                  <Music2 :size="18" :style="{ color: s.color }" />
                  <span class="text-sm text-white/60 group-hover:text-white transition-colors">{{ s.label }}</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <!-- Right: form -->
        <ScrollReveal direction="right" :delay="0.2">
          <form class="glass rounded-3xl p-8 border border-white/5 space-y-5" @submit.prevent="submit">
            <!-- Honeypot (hidden from humans) -->
            <input v-model="form.honeypot" type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" />

            <!-- Name -->
            <div>
              <label class="block text-sm text-white/60 mb-2">{{ t('contact.fName') }}</label>
              <!-- <input v-model="form.name" type="text" placeholder="t('contact.fNamePlaceholder')"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-colors"
                :class="errors.name ? 'border-red-500/50' : 'border-white/10'" /> -->
              <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm text-white/60 mb-2">{{ t('contact.fEmail') }}</label>
              <!-- <input v-model="form.email" type="email" placeholder="t('contact.fEmailPlaceholder')"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-colors"
                :class="errors.email ? 'border-red-500/50' : 'border-white/10'" /> -->
              <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <!-- Subject -->
            <div>
              <label class="block text-sm text-white/60 mb-2">{{ t('contact.fSubject') }}</label>
              <!-- <input v-model="form.subject" type="text" placeholder="t('contact.fSubjectPlaceholder')"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-colors" /> -->
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm text-white/60 mb-2">{{ t('contact.fMessage') }}</label>
              <!-- <textarea v-model="form.message" rows="5" placeholder="t('contact.fNessagePlaceholder')"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                :class="errors.message ? 'border-red-500/50' : 'border-white/10'" /> -->
              <p v-if="errors.message" class="text-red-400 text-xs mt-1">{{ errors.message }}</p>
            </div>

            <!-- Status message -->
            <Transition name="fade">
              <div v-if="status === 'success'"
                class="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle2 :size="18" class="text-green-400 flex-shrink-0" />
                <p class="text-green-400 text-sm">{{ statusMsg }}</p>
              </div>
              <div v-else-if="status === 'error'"
                class="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <AlertCircle :size="18" class="text-red-400 flex-shrink-0" />
                <p class="text-red-400 text-sm">{{ statusMsg }}</p>
              </div>
            </Transition>

            <!-- Submit -->
            <button type="submit" :disabled="status === 'loading'"
              class="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style="background: linear-gradient(135deg, #00BFFF, #BF5FFF)">
              <span v-if="status === 'loading'">t('contact.fSending')</span>
              <template v-else>
                <Send :size="18" />
                t('contact.fSend')
              </template>
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>