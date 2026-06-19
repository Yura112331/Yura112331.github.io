<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggle() {
    locale.value = locale.value === 'uk' ? 'en' : 'uk'
    localStorage.setItem('lang', locale.value)
}
</script>

<template>
    <button @click="toggle"
        class="flex items-center gap-1 px-3 py-1.5 rounded-full glass border border-white/10 hover:border-accent-blue/50 transition-all duration-300 text-sm font-mono">
        <span :class="locale === 'uk' ? 'text-white' : 'text-white/30'">UA</span>
        <span class="text-white/20 mx-0.5">|</span>
        <span :class="locale === 'en' ? 'text-white' : 'text-white/30'">EN</span>
    </button>
</template>