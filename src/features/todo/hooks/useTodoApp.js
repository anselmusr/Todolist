import { useEffect, useState } from 'react'

import {
  DEFAULT_PROFILE,
  FEEDBACK_CLASS_NAMES,
  STORAGE_KEYS,
} from '../constants'
import {
  formatDate,
  getDateStrip,
  getTodayKey,
} from '../utils/date'
import {
  isOverdue,
  readFromStorage,
  sanitizeProfile,
  sanitizeTasks,
  sortTasks,
} from '../utils/tasks'

// Hook ini menjadi pusat state, persistence, derived data, dan semua action task
// supaya komponen UI tetap fokus pada rendering.
export function useTodoApp() {
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

  // Jam di hero cukup diperbarui periodik agar terasa hidup tanpa rerender tiap detik.
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 30000)

    return () => window.clearInterval(intervalId)
  }, [])

  // Profile selalu ditulis ulang dalam bentuk yang sudah dibersihkan.
  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.profile,
      JSON.stringify(sanitizeProfile(profile)),
    )
  }, [profile])

  // Task disimpan apa adanya karena sudah ternormalisasi saat dibaca/dibuat.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks))
  }, [tasks])

  // Feedback sengaja sementara agar UI tidak penuh notifikasi lama.
  useEffect(() => {
    if (!feedback) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null)
    }, 2600)

    return () => window.clearTimeout(timeoutId)
  }, [feedback])

  // Semua turunan daftar dihitung di sini agar section UI tidak perlu mengulang
  // logika filter/sort yang sama.
  const activeTasks = tasks.filter((task) => !task.completed).sort(sortTasks)
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
  const selectedTasks = activeTasks.filter((task) => task.dueDate === selectedDate)
  const selectedDoneTasks = doneTasks.filter((task) => task.dueDate === selectedDate)
  const dateStrip = getDateStrip(selectedDate)

  // Helper kecil ini menjaga update form/profile tetap partial dan mudah dipakai komponen.
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

  function syncFormDueDate(nextDueDate) {
    setForm((currentForm) => ({
      ...currentForm,
      dueDate: nextDueDate,
    }))
  }

  // Submit membuat task baru, menyinkronkan tanggal aktif, lalu mereset field yang perlu.
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

  // Status selesai cukup diubah lewat flag; panel Done akan otomatis ikut terbarui
  // karena dihitung dari state yang sama.
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

  // Hapus massal diberi konfirmasi karena ini aksi yang paling berisiko hilang data lokal.
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
  const completionRate = tasks.length
    ? Math.round((doneTasks.length / tasks.length) * 100)
    : 0
  const selectedDateCompletionRate =
    selectedTasks.length || selectedDoneTasks.length
      ? Math.round(
          (selectedDoneTasks.length / (selectedTasks.length + selectedDoneTasks.length)) *
            100,
        )
      : 0
  const nextTask = activeTasks[0] ?? null
  const feedbackClassName = feedback
    ? FEEDBACK_CLASS_NAMES[feedback.tone]
    : FEEDBACK_CLASS_NAMES.warning

  return {
    activeProfileName,
    activeProfileRole,
    activeTasks,
    completionRate,
    dateStrip,
    doneTasks,
    feedback,
    feedbackClassName,
    form,
    handleDeleteAll,
    handleDeleteTask,
    handleSubmit,
    handleToggleTask,
    nextTask,
    now,
    overdueTasks,
    profile,
    selectedDate,
    selectedDateCompletionRate,
    selectedDateLabel,
    selectedDoneTasks,
    selectedTasks,
    setSelectedDate,
    syncFormDueDate,
    todayKey,
    todayTaskCount,
    updateForm,
    updateProfile,
  }
}
