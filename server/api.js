require('dotenv').config({ path: '.env.local' })

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const ARTIST_ID = process.env.SPOTIFY_ARTIST_ID || '6hkNwIjIfDcMDp5AObEbO9'

let cachedToken = null
let tokenExpiresAt = 0

async function getToken() {
    if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        throw new Error('SPOTIFY_CLIENT_ID та SPOTIFY_CLIENT_SECRET не задані в .env.local')
    }

    const creds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Не вдалося отримати токен Spotify: ${res.status} ${text}`)
    }

    const data = await res.json()
    cachedToken = data.access_token
    tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000
    return cachedToken
}

async function spotifyFetch(endpoint) {
    const token = await getToken()
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error(`Spotify API error: ${res.status} на ${endpoint}`)
    return res.json()
}

// ── GET /api/spotify ──────────────────────────────────────
app.get('/api/spotify', async (req, res) => {
    try {
        const [artist, albumsData] = await Promise.all([
            spotifyFetch(`/artists/${ARTIST_ID}`),
            spotifyFetch(`/artists/${ARTIST_ID}/albums?include_groups=album,single,compilation&market=UA&limit=50`)
        ])

        // Дедуплікація по назві (Spotify іноді дублює)
        const seen = new Set()
        const albums = albumsData.items.filter(a => {
            const key = a.name.toLowerCase()
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })

        res.json({ artist, albums })
    } catch (err) {
        console.error('❌ Spotify error:', err.message)
        res.status(500).json({ error: err.message })
    }
})

// ── POST /api/contact ─────────────────────────────────────
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message, honeypot } = req.body

    // Захист від ботів
    if (honeypot) {
        return res.json({ success: true })
    }

    // Валідація
    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Введіть ваше ім'я" })
    }

    if (!email || !email.trim()) {
        return res.status(400).json({ error: 'Введіть email' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Невірний формат email' })
    }

    if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Введіть повідомлення' })
    }

    if (message.trim().length < 10) {
        return res.status(400).json({ error: 'Повідомлення занадто коротке (мінімум 10 символів)' })
    }

    // Лог повідомлення (в продакшні тут буде відправка email)
    console.log('📩 Нове повідомлення з сайту:')
    console.log('   Ім\'я:', name)
    console.log('   Email:', email)
    console.log('   Тема:', subject || '—')
    console.log('   Повідомлення:', message)

    res.json({
        success: true,
        message: 'Повідомлення надіслано! Відповімо протягом 24 годин.'
    })
})

// ── Старт сервера ─────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ API сервер запущено на http://localhost:${PORT}`)
    console.log(`   Spotify Artist ID: ${ARTIST_ID}`)
    console.log(`   Spotify Client ID: ${process.env.SPOTIFY_CLIENT_ID ? '✓ задано' : '✗ НЕ ЗАДАНО'}`)
    console.log(`   Spotify Secret:    ${process.env.SPOTIFY_CLIENT_SECRET ? '✓ задано' : '✗ НЕ ЗАДАНО'}`)
})