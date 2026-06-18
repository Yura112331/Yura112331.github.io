<script setup lang="ts">
const socials = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/6hkNwIjIfDcMDp5AObEbO9' },
  { label: 'Instagram', href: 'https://www.instagram.com/_.inkbeat._/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@1nkBeat12/shorts' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@inkbeat_' },
  { label: 'Apple Music', href: 'https://music.apple.com/ua/artist/inkbeat/1850263830?l=uk' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/akabbvwcbvle' }
]

const navLinks = [
  { href: '/', label: 'Головна' },
  { href: '/about', label: 'Про мене' },
  { href: '/discography', label: 'Дискографія' },
  { href: '/services', label: 'Послуги' },
  { href: '/portfolio', label: 'Портфоліо' },
  { href: '/contact', label: 'Контакти' }
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/5 bg-surface-100">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-40" />

    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <!-- Brand -->
        <div>
          <span class="text-3xl font-bold tracking-wider gradient-text" style="font-family: Syne, sans-serif">
            INKBEAT
          </span>
          <p class="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
            Музичний артист • Автор пісень • Автор текстів. Музика, яка залишає слід.
          </p>
          <a href="mailto:inkbeat.mail@gmail.com" class="mt-4 inline-block text-sm text-accent-blue hover:text-accent-cyan transition-colors">
            inkbeat.mail@gmail.com
          </a>
        </div>

        <!-- Nav -->
        <div>
          <h4 class="text-xs tracking-widest uppercase text-white/30 mb-6">Навігація</h4>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.href">
              <RouterLink :to="link.href" class="text-white/50 hover:text-white text-sm transition-colors">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Socials -->
        <div>
          <h4 class="text-xs tracking-widest uppercase text-white/30 mb-6">Соцмережі</h4>
          <ul class="space-y-3">
            <li v-for="s in socials" :key="s.label">
              <a :href="s.href" target="_blank" rel="noopener noreferrer"
                class="text-white/50 hover:text-accent-blue text-sm transition-colors">
                {{ s.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
        <p class="text-white/20 text-xs">© {{ year }} InkBeat. Всі права захищені.</p>
        <p class="text-white/20 text-xs">Зроблено з ♥ в Україні</p>
      </div>
    </div>
  </footer>
</template>