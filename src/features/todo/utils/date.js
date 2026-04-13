// Semua state tanggal disimpan sebagai key YYYY-MM-DD supaya mudah dibandingkan,
// disimpan di storage, dan langsung kompatibel dengan input type="date".
export function getTodayKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Date key diubah kembali ke Date hanya saat butuh formatter bawaan browser.
export function parseDateKey(dateKey) {
  if (!dateKey) {
    return new Date()
  }

  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Formatter tanggal dipusatkan di sini agar locale id-ID konsisten di seluruh UI.
export function formatDate(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseDateKey(dateKey))
}

export function formatCompactDate(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseDateKey(dateKey))
}

export function formatShortWeekday(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
  }).format(parseDateKey(dateKey))
}

export function formatDayNumber(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
  }).format(parseDateKey(dateKey))
}

export function formatShortMonth(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    month: 'short',
  }).format(parseDateKey(dateKey))
}

export function formatClock(date) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDateTime(dateString) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

// Kalender mini di dashboard dibangun dari tanggal aktif agar navigasi tanggal
// terasa cepat tanpa perlu membuka date picker terus-menerus.
export function getDateStrip(centerDateKey, total = 5) {
  const centerDate = parseDateKey(centerDateKey)
  const middle = Math.floor(total / 2)

  return Array.from({ length: total }, (_, index) => {
    const currentDate = new Date(centerDate)
    currentDate.setDate(centerDate.getDate() + index - middle)

    const dateKey = getTodayKey(currentDate)

    return {
      dateKey,
      weekday: formatShortWeekday(dateKey),
      dayNumber: formatDayNumber(dateKey),
      month: formatShortMonth(dateKey),
    }
  })
}
