import { useEffect, useState } from 'react'

const STORAGE_KEYS = {
  profile: 'todo.mobile.profile',
  tasks: 'todo.mobile.tasks',
}

const DEFAULT_PROFILE = {
  name: 'Anisa Putri',
  role: 'Mobile Productivity Planner',
}

const PRIORITY_META = {
  low: {
    label: 'Low',
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700 ring-emerald-100',
  },
  medium: {
    label: 'Medium',
    className: 'border-amber-200 bg-amber-50 text-amber-700 ring-amber-100',
  },
  high: {
    label: 'High',
    className: 'border-rose-200 bg-rose-50 text-rose-700 ring-rose-100',
  },
}

const PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
}

function getTodayKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function parseDateKey(dateKey) {
  if (!dateKey) {
    return new Date()
  }

  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDate(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseDateKey(dateKey))
}

function formatCompactDate(dateKey) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseDateKey(dateKey))
}

function formatClock(date) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatDateTime(dateString) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function readFromStorage(key, fallback, sanitizer) {
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

function sanitizeProfile(value) {
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

function sanitizeTasks(value) {
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

function sortTasks(firstTask, secondTask) {
  if (firstTask.dueDate !== secondTask.dueDate) {
    return firstTask.dueDate.localeCompare(secondTask.dueDate)
  }

  if (firstTask.priority !== secondTask.priority) {
    return PRIORITY_ORDER[firstTask.priority] - PRIORITY_ORDER[secondTask.priority]
  }

  return new Date(secondTask.createdAt) - new Date(firstTask.createdAt)
}

function isOverdue(task, todayKey) {
  return !task.completed && task.dueDate < todayKey
}

function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority]

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ring-4 ${meta.className}`}
    >
      {meta.label}
    </span>
  )
}

function EmptyState({ title, description }) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 px-5 py-6 text-center">
      <p className="font-display text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  )
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const todayKey = getTodayKey(now)
  const [profile, setProfile] = useState(() =>
    readFromStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE, sanitizeProfile),
  )
  const [tasks, setTasks] = useState(() =>
    readFromStorage(STORAGE_KEYS.tasks, [], sanitizeTasks),
  )
  const [selectedDate, setSelectedDate] = useState(() => todayKey)
  const [form, setForm] = useState(() => ({
    title: '',
    dueDate: todayKey,
    priority: 'medium',
  }))
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 30000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.profile,
      JSON.stringify(sanitizeProfile(profile)),
    )
  }, [profile])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (!feedback) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null)
    }, 2600)

    return () => window.clearTimeout(timeoutId)
  }, [feedback])

  const activeTasks = tasks.filter((task) => !task.completed).sort(sortTasks)
  const selectedTasks = activeTasks.filter((task) => task.dueDate === selectedDate)
  const doneTasks = tasks
    .filter((task) => task.completed)
    .sort(
      (firstTask, secondTask) =>
        new Date(secondTask.completedAt ?? secondTask.createdAt) -
        new Date(firstTask.completedAt ?? firstTask.createdAt),
    )
  const overdueTasks = activeTasks
    .filter((task) => isOverdue(task, todayKey))
    .sort(sortTasks)

  function updateProfile(field, value) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }))
  }

  function updateForm(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const taskTitle = form.title.trim()

    if (!taskTitle) {
      setFeedback({
        tone: 'warning',
        text: 'Tuliskan agenda terlebih dahulu sebelum menekan submit.',
      })
      return
    }

    const taskDate = form.dueDate || todayKey

    const nextTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
      title: taskTitle,
      dueDate: taskDate,
      priority: form.priority,
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
    }

    setTasks((currentTasks) => [nextTask, ...currentTasks])
    setSelectedDate(taskDate)
    setForm({
      title: '',
      dueDate: taskDate,
      priority: 'medium',
    })
    setFeedback({
      tone: 'success',
      text: `Agenda baru tersimpan untuk ${formatDate(taskDate)}.`,
    })
  }

  function handleToggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: true,
              completedAt: new Date().toISOString(),
            }
          : task,
      ),
    )

    setFeedback({
      tone: 'success',
      text: 'Tugas selesai dan dipindahkan ke kolom Done.',
    })
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    setFeedback({
      tone: 'danger',
      text: 'Satu agenda berhasil dihapus dari daftar.',
    })
  }

  function handleDeleteAll() {
    if (!tasks.length) {
      setFeedback({
        tone: 'warning',
        text: 'Belum ada agenda yang bisa dihapus.',
      })
      return
    }

    const hasConfirmed = window.confirm(
      'Hapus seluruh to do list yang sudah dibuat?',
    )

    if (!hasConfirmed) {
      return
    }

    setTasks([])
    setFeedback({
      tone: 'danger',
      text: 'Semua agenda berhasil dihapus.',
    })
  }

  const activeProfileName = profile.name.trim() || DEFAULT_PROFILE.name
  const activeProfileRole = profile.role.trim() || DEFAULT_PROFILE.role
  const selectedDateLabel = formatDate(selectedDate)
  const todayTaskCount = activeTasks.filter((task) => task.dueDate === todayKey).length
  const feedbackClassName =
    feedback?.tone === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : feedback?.tone === 'danger'
        ? 'border-rose-200 bg-rose-50 text-rose-700'
        : 'border-amber-200 bg-amber-50 text-amber-700'

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-[36px] bg-slate-950 text-white shadow-[0_40px_100px_-45px_rgba(2,6,23,0.95)]">
          <div className="pointer-events-none absolute -left-16 top-12 h-44 w-44 rounded-full bg-teal-400/25 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-200">
                Responsive To-Do List
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                {activeProfileName}, atur agenda harianmu dengan cepat dari mobile
                ataupun desktop.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Profil disimpan di browser agar aplikasi bisa mengenali user saat
                dibuka kembali. Tambahkan tugas, pilih level prioritas, cek list
                yang selesai, dan pantau tugas yang sudah lewat deadline.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                    Profile
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold text-white">
                    {activeProfileName}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{activeProfileRole}</p>
                  <p className="mt-4 text-xs leading-6 text-slate-400">
                    Identitas ini tersimpan lokal agar user tetap dikenali di sesi
                    berikutnya.
                  </p>
                </article>

                <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                    Time
                  </p>
                  <p className="mt-3 font-display text-3xl font-bold text-white">
                    {formatClock(now)}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{formatDate(todayKey)}</p>
                  <p className="mt-4 text-xs leading-6 text-slate-400">
                    Saat menekan submit, tanggal agenda otomatis mengikuti hari
                    yang dipilih dan default-nya adalah hari ini.
                  </p>
                </article>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                  Tugas Hari Ini
                </p>
                <p className="mt-4 font-display text-4xl font-bold text-white">
                  {todayTaskCount}
                </p>
                <p className="mt-2 text-sm text-slate-300">Agenda aktif untuk hari ini</p>
              </article>

              <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                  To Do Aktif
                </p>
                <p className="mt-4 font-display text-4xl font-bold text-white">
                  {activeTasks.length}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Tugas yang belum dicentang selesai
                </p>
              </article>

              <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                  Done
                </p>
                <p className="mt-4 font-display text-4xl font-bold text-white">
                  {doneTasks.length}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Tugas yang sudah selesai dikerjakan
                </p>
              </article>

              <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                  Overdue
                </p>
                <p className="mt-4 font-display text-4xl font-bold text-white">
                  {overdueTasks.length}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Agenda terlambat yang perlu dibereskan
                </p>
              </article>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6">
            <article className="glass-panel p-5 sm:p-6">
              <p className="eyebrow">Profile Setup</p>
              <h2 className="panel-title mt-2">Sesuaikan identitas user</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Nama dan jabatan ini tampil di kartu profil dan tersimpan di
                browser.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="field-label">Nama</span>
                  <input
                    className="field-base"
                    type="text"
                    placeholder="Masukkan nama user"
                    value={profile.name}
                    onChange={(event) => updateProfile('name', event.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="field-label">Jabatan</span>
                  <input
                    className="field-base"
                    type="text"
                    placeholder="Masukkan jabatan"
                    value={profile.role}
                    onChange={(event) => updateProfile('role', event.target.value)}
                  />
                </label>
              </div>
            </article>

            <article className="glass-panel p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Create Task</p>
                  <h2 className="panel-title mt-2">Tulis agenda to-do list baru</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Gunakan text area, pilih tanggal pekerjaan, lalu tentukan level
                    prioritas sebelum menekan submit.
                  </p>
                </div>

                <button className="danger-button" type="button" onClick={handleDeleteAll}>
                  Delete All
                </button>
              </div>

              {feedback && (
                <div
                  className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-medium ${feedbackClassName}`}
                >
                  {feedback.text}
                </div>
              )}

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="field-label">Text Area Tugas</span>
                  <textarea
                    className="field-base min-h-32 resize-none"
                    placeholder="Contoh: Selesaikan wireframe homepage untuk presentasi besok pagi."
                    value={form.title}
                    onChange={(event) => updateForm('title', event.target.value)}
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="field-label">Hari Agenda</span>
                    <input
                      className="field-base"
                      type="date"
                      value={form.dueDate}
                      onChange={(event) => updateForm('dueDate', event.target.value)}
                    />
                  </label>

                  <div>
                    <span className="field-label">Level Prioritas</span>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {Object.entries(PRIORITY_META).map(([priorityKey, meta]) => {
                        const isSelected = form.priority === priorityKey

                        return (
                          <button
                            key={priorityKey}
                            className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                              isSelected
                                ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_35px_-18px_rgba(15,23,42,0.95)]'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:bg-teal-50'
                            }`}
                            type="button"
                            onClick={() => updateForm('priority', priorityKey)}
                          >
                            {meta.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="primary-button sm:min-w-44" type="submit">
                    Submit Task
                  </button>
                  <button
                    className="secondary-button sm:min-w-44"
                    type="button"
                    onClick={() => {
                      setSelectedDate(todayKey)
                      setForm((currentForm) => ({
                        ...currentForm,
                        dueDate: todayKey,
                      }))
                    }}
                  >
                    Gunakan Hari Ini
                  </button>
                </div>
              </form>
            </article>

            <article className="glass-panel p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">To Do</p>
                  <h2 className="panel-title mt-2">Agenda untuk {selectedDateLabel}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Daftar ini menampilkan tugas aktif yang harus dikerjakan pada
                    hari tertentu.
                  </p>
                </div>

                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                  {selectedTasks.length} tugas aktif
                </div>
              </div>

              <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200 xl:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50/80">
                      <tr className="text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        <th className="px-4 py-4">Check</th>
                        <th className="px-4 py-4">Tugas</th>
                        <th className="px-4 py-4">Prioritas</th>
                        <th className="px-4 py-4">Tanggal</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white/90 text-sm text-slate-700">
                      {selectedTasks.map((task) => (
                        <tr key={task.id}>
                          <td className="px-4 py-4">
                            <button
                              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-600"
                              type="button"
                              aria-label={`Tandai ${task.title} selesai`}
                              onClick={() => handleToggleTask(task.id)}
                            >
                              <span className="h-5 w-5 rounded-md border-2 border-current" />
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-slate-900">{task.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              Dibuat {formatDateTime(task.createdAt)}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <PriorityBadge priority={task.priority} />
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {formatCompactDate(task.dueDate)}
                          </td>
                          <td className="px-4 py-4">
                            {isOverdue(task, todayKey) ? (
                              <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                                Overdue
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                                On Track
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              className="tiny-button text-rose-600 hover:border-rose-200 hover:bg-rose-50"
                              type="button"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 space-y-4 xl:hidden">
                {selectedTasks.map((task) => (
                  <article
                    key={task.id}
                    className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.45)]"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-600"
                        type="button"
                        aria-label={`Tandai ${task.title} selesai`}
                        onClick={() => handleToggleTask(task.id)}
                      >
                        <span className="h-5 w-5 rounded-md border-2 border-current" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-6 text-slate-900">
                          {task.title}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <PriorityBadge priority={task.priority} />
                          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                            {formatCompactDate(task.dueDate)}
                          </span>
                          {isOverdue(task, todayKey) && (
                            <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                          Dibuat {formatDateTime(task.createdAt)}
                        </p>
                      </div>
                    </div>

                    <button
                      className="tiny-button mt-4 w-full justify-center text-rose-600 hover:border-rose-200 hover:bg-rose-50"
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </article>
                ))}
              </div>

              {!selectedTasks.length && (
                <div className="mt-6">
                  <EmptyState
                    title="Belum ada agenda untuk tanggal ini"
                    description="Tambah tugas baru atau ganti filter tanggal untuk melihat daftar yang berbeda."
                  />
                </div>
              )}
            </article>
          </div>
          <div className="space-y-6">
            <article className="glass-panel p-5 sm:p-6">
              <p className="eyebrow">Date Filter</p>
              <h2 className="panel-title mt-2">Pilih hari yang ingin ditinjau</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Gunakan filter ini untuk menampilkan daftar to-do list yang harus
                dikerjakan pada tanggal tertentu.
              </p>

              <label className="mt-6 block">
                <span className="field-label">Tanggal yang ditampilkan</span>
                <input
                  className="field-base"
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </label>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Hari Dipilih
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-slate-900">
                    {selectedDateLabel}
                  </p>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Hari Ini
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-slate-900">
                    {formatDate(todayKey)}
                  </p>
                </div>
              </div>
            </article>

            <article className="glass-panel p-5 sm:p-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Overdue</p>
                  <h2 className="panel-title mt-2">Agenda yang terlambat</h2>
                </div>
                <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                  {overdueTasks.length} item
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {overdueTasks.length ? (
                  overdueTasks.map((task) => (
                    <article
                      key={task.id}
                      className="rounded-[24px] border border-rose-100 bg-rose-50/70 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold leading-6 text-slate-900">
                            {task.title}
                          </p>
                          <p className="mt-2 text-sm text-rose-700">
                            Deadline {formatCompactDate(task.dueDate)}
                          </p>
                        </div>
                        <PriorityBadge priority={task.priority} />
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <button
                          className="secondary-button flex-1 justify-center"
                          type="button"
                          onClick={() => {
                            setSelectedDate(task.dueDate)
                            setForm((currentForm) => ({
                              ...currentForm,
                              dueDate: task.dueDate,
                            }))
                          }}
                        >
                          Lihat Tanggal
                        </button>
                        <button
                          className="tiny-button flex-1 justify-center text-rose-600 hover:border-rose-200 hover:bg-rose-100"
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <EmptyState
                    title="Tidak ada tugas overdue"
                    description="Semua agenda masih sesuai jadwal atau sudah berhasil diselesaikan."
                  />
                )}
              </div>
            </article>

            <article className="glass-panel p-5 sm:p-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Done</p>
                  <h2 className="panel-title mt-2">Daftar tugas yang selesai</h2>
                </div>
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {doneTasks.length} selesai
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {doneTasks.length ? (
                  doneTasks.map((task) => (
                    <article
                      key={task.id}
                      className="rounded-[24px] border border-emerald-100 bg-emerald-50/60 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              d="m5 12 4 4L19 6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-6 text-slate-900 line-through decoration-2">
                            {task.title}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <PriorityBadge priority={task.priority} />
                            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700">
                              {formatCompactDate(task.dueDate)}
                            </span>
                          </div>
                          <p className="mt-3 text-xs text-slate-500">
                            Selesai pada {formatDateTime(task.completedAt ?? task.createdAt)}
                          </p>
                        </div>
                      </div>

                      <button
                        className="tiny-button mt-4 w-full justify-center text-rose-600 hover:border-rose-200 hover:bg-rose-100"
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </article>
                  ))
                ) : (
                  <EmptyState
                    title="Belum ada tugas selesai"
                    description="Centang checkbox pada daftar To Do agar tugas otomatis tercoret dan masuk ke kolom Done."
                  />
                )}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
