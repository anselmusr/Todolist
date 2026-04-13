import { DEFAULT_PROFILE, PRIORITY_META, PRIORITY_ORDER } from '../constants'

// Pembacaan dari localStorage selalu dibungkus fallback + sanitizer supaya app
// tetap hidup meski data lama rusak atau shape-nya berubah.
export function readFromStorage(key, fallback, sanitizer) {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const rawValue = window.localStorage.getItem(key)

    if (!rawValue) {
      return fallback
    }

    return sanitizer(JSON.parse(rawValue))
  } catch {
    return fallback
  }
}

// Profile lama dibersihkan ke shape minimum yang selalu aman dipakai UI.
export function sanitizeProfile(value) {
  if (!value || typeof value !== 'object') {
    return DEFAULT_PROFILE
  }

  return {
    name:
      typeof value.name === 'string' && value.name.trim()
        ? value.name
        : DEFAULT_PROFILE.name,
    role:
      typeof value.role === 'string' && value.role.trim()
        ? value.role
        : DEFAULT_PROFILE.role,
  }
}

// Task dari storage dinormalisasi agar field penting selalu ada sebelum dipakai
// untuk filter, sort, atau render.
export function sanitizeTasks(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((task) => {
      if (!task || typeof task !== 'object') {
        return null
      }

      const title = typeof task.title === 'string' ? task.title.trim() : ''
      const priority =
        typeof task.priority === 'string' && PRIORITY_META[task.priority]
          ? task.priority
          : 'medium'
      const dueDate =
        typeof task.dueDate === 'string' && task.dueDate ? task.dueDate : null
      const createdAt =
        typeof task.createdAt === 'string' && task.createdAt
          ? task.createdAt
          : new Date().toISOString()

      if (!title || !dueDate) {
        return null
      }

      return {
        id:
          typeof task.id === 'string' && task.id ? task.id : `task-${createdAt}`,
        title,
        priority,
        dueDate,
        createdAt,
        completed: Boolean(task.completed),
        completedAt:
          typeof task.completedAt === 'string' && task.completedAt
            ? task.completedAt
            : null,
      }
    })
    .filter(Boolean)
}

// Urutan utama daftar aktif: tanggal terdekat, prioritas tertinggi, lalu task terbaru.
export function sortTasks(firstTask, secondTask) {
  if (firstTask.dueDate !== secondTask.dueDate) {
    return firstTask.dueDate.localeCompare(secondTask.dueDate)
  }

  if (firstTask.priority !== secondTask.priority) {
    return PRIORITY_ORDER[firstTask.priority] - PRIORITY_ORDER[secondTask.priority]
  }

  return new Date(secondTask.createdAt) - new Date(firstTask.createdAt)
}

// Task dianggap overdue hanya jika belum selesai dan tanggalnya sudah lewat.
export function isOverdue(task, todayKey) {
  return !task.completed && task.dueDate < todayKey
}

// Avatar teks memakai maksimal dua huruf awal agar tetap ringkas di sidebar.
export function getInitials(name) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)

  if (!parts.length) {
    return 'AP'
  }

  return parts.map((part) => part[0].toUpperCase()).join('')
}
